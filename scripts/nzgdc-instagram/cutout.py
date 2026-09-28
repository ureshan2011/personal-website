"""Key the headshot off its pink studio backdrop -> RGBA image for post.html.

Usage (needs Pillow, numpy, scipy):
  python3 scripts/nzgdc-instagram/cutout.py \
    assets/files/speaker-kit/yasas-sri-wickramasinghe-headshot.jpg \
    scripts/nzgdc-instagram/headshot-cutout.webp
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi

src, dst = sys.argv[1], sys.argv[2]
im = np.asarray(Image.open(src).convert('RGB')).astype(np.float64)
h, w, _ = im.shape
yy, xx = np.mgrid[0:h, 0:w]
xn, yn = xx / w, yy / h

# 1. Smooth background model: quadratic surface fitted to border pixels.
border = np.zeros((h, w), bool)
border[:, :36] = True
border[:, -36:] = True
border[:36, :] = True
# the shirt reaches the side edges near the bottom, so drop those rows
border[int(h * 0.80):, :] = False
feats = np.stack([np.ones_like(xn), xn, yn, xn * yn, xn ** 2, yn ** 2], -1)
A = feats[border]
bg = np.zeros_like(im)
for c in range(3):
    coef, *_ = np.linalg.lstsq(A, im[..., c][border], rcond=None)
    bg[..., c] = feats @ coef

# 2. Distance to the backdrop, weighted towards hue (pink vs skin separates on B-G).
def chroma(a):
    return np.stack([a[..., 0] - a[..., 1], a[..., 2] - a[..., 1], a.mean(-1)], -1)
d = chroma(im) - chroma(bg)
D = np.sqrt(1.0 * d[..., 0] ** 2 + 1.6 * d[..., 1] ** 2 + 0.8 * d[..., 2] ** 2)
t0, t1 = 14.0, 34.0
alpha = np.clip((D - t0) / (t1 - t0), 0, 1)

# 3. Topology clean-up: background = low-alpha regions touching the image border.
low = alpha < 0.5
lab, n = ndi.label(low)
edge_labels = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
bgmask = np.isin(lab, list(edge_labels))
# anything not connected to the outside is subject (holes inside face/shirt)
for i in range(1, n + 1):
    if i in edge_labels:
        continue
    reg = lab == i
    if reg.sum() > 800 and D[reg].mean() < t0 + 6:
        bgmask |= reg
alpha = np.where(~bgmask & low, 1.0, alpha)
# drop floating specks in the backdrop
hi = alpha >= 0.5
lab2, n2 = ndi.label(hi)
sizes = ndi.sum(hi, lab2, range(1, n2 + 1))
keep = np.zeros(n2 + 1, bool)
keep[1:] = sizes > 2000
alpha = np.where(hi & ~keep[lab2], 0.0, alpha)
alpha = np.where(bgmask & (alpha < 0.5), alpha * 0.0, alpha)

# 4. Soft edge: small blur on the matte, then tighten.
a_img = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.1))
alpha = np.asarray(a_img).astype(np.float64) / 255
# erode ~1.5px so the JPEG chroma fringe along the shirt falls outside the matte
alpha = ndi.grey_erosion(alpha, size=(3, 3)) * 0.5 + alpha * 0.5
alpha = np.clip((alpha - 0.14) / 0.80, 0, 1)

# 5. Colour decontamination: remove the pink spill from semi-transparent edges.
a3 = alpha[..., None]
fg = np.where(a3 > 0.02, (im - (1 - a3) * bg) / np.maximum(a3, 0.02), im)
fg = np.clip(fg, 0, 255)
# Replace the outer ~4px of the subject with the colour of its nearest interior
# pixel: kills the pink/red rim that JPEG chroma left along hair and shirt.
inside = alpha > 0.5
dist = ndi.distance_transform_edt(inside)
coremask = dist >= 5
_, (iy, ix) = ndi.distance_transform_edt(~coremask, return_indices=True)
core = fg[iy, ix]
core = np.stack([ndi.gaussian_filter(core[..., c], 1.5) for c in range(3)], -1)
wgt = np.clip((4.0 - dist) / 2.5, 0, 1)
wgt = np.where(inside, wgt, 1.0)[..., None]
fg = fg * (1 - wgt) + core * wgt
# tuck the matte in by ~1px
alpha = np.clip(ndi.grey_erosion(alpha, size=(2, 2)) * 0.6 + alpha * 0.4, 0, 1)

out = np.dstack([fg, alpha * 255]).astype(np.uint8)
Image.fromarray(out, 'RGBA').save(dst, optimize=True)
print('saved', dst, w, h)
