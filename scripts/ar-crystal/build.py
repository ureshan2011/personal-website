"""Build the AR crystal shown on ar.html, in both formats the phone viewers need.

    assets/models/crystal.glb   — Android (Scene Viewer)
    assets/models/crystal.usdz  — iPhone / iPad (AR Quick Look)

Both files come from the same geometry, so the object looks the same on every
phone. It is a low-poly crystal cluster on a rock, about 30 cm tall, with its
origin at the centre of its flat base so it sits on whatever floor or table the
viewer finds.

    python3 -m venv .venv && .venv/bin/pip install usd-core numpy scipy
    .venv/bin/python scripts/ar-crystal/build.py

The output is deterministic (fixed random seed), so re-running it only changes
the files when this script changes.
"""
import json
import math
import os
import struct
import tempfile

import numpy as np
from scipy.spatial import ConvexHull
from pxr import Gf, Kind, Sdf, Usd, UsdGeom, UsdShade, UsdUtils, UsdValidation, Vt

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(ROOT, "assets", "models")
SCALE = 1.15          # the cluster below is ~26 cm tall; this makes it ~30 cm
rng = np.random.default_rng(7)


def srgb_to_linear(hex_colour):
    c = [int(hex_colour[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    return [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c]


# Linear-space PBR values. Both glTF factors and UsdPreviewSurface inputs are
# linear, so the same numbers feed both files.
MATERIALS = {
    "CrystalDeep": dict(color=srgb_to_linear("#3d74ff"), roughness=0.16, metallic=0.0,
                        emissive=srgb_to_linear("#0a1a55")),
    "CrystalIce": dict(color=srgb_to_linear("#a8c4ff"), roughness=0.22, metallic=0.0,
                       emissive=srgb_to_linear("#101c40")),
    "Rock": dict(color=srgb_to_linear("#4a505c"), roughness=0.88, metallic=0.0,
                 emissive=[0.0, 0.0, 0.0]),
}


# ---------------------------------------------------------------- geometry
# Every mesh is a flat list of triangles (no shared vertices) so each facet
# gets its own normal and reads as a cut face.

def flat(tris):
    tris = np.asarray(tris, dtype=np.float64).reshape(-1, 3, 3)
    n = np.cross(tris[:, 1] - tris[:, 0], tris[:, 2] - tris[:, 0])
    n /= np.linalg.norm(n, axis=1, keepdims=True)
    return tris.reshape(-1, 3), np.repeat(n, 3, axis=0)


def rock():
    pts = []
    for i in range(11):                                   # flat footprint
        a = i / 11 * 2 * math.pi + rng.uniform(-0.12, 0.12)
        r = rng.uniform(0.105, 0.125)
        pts.append([r * math.cos(a), 0.0, 0.86 * r * math.sin(a)])
    for i in range(9):                                    # shoulder
        a = i / 9 * 2 * math.pi + rng.uniform(-0.15, 0.15)
        r = rng.uniform(0.10, 0.118)
        pts.append([r * math.cos(a), rng.uniform(0.028, 0.042), 0.86 * r * math.sin(a)])
    for i in range(7):                                    # crown
        a = i / 7 * 2 * math.pi + rng.uniform(-0.2, 0.2)
        r = rng.uniform(0.05, 0.075)
        pts.append([r * math.cos(a), rng.uniform(0.058, 0.072), 0.86 * r * math.sin(a)])
    pts.append([0.01, 0.078, -0.005])
    pts = np.array(pts)
    hull = ConvexHull(pts)
    tris = []
    centre = pts.mean(axis=0)
    for simplex in hull.simplices:
        a, b, c = pts[simplex]
        if np.dot(np.cross(b - a, c - a), a - centre) < 0:   # wind outwards
            b, c = c, b
        tris.append([a, b, c])
    return flat(tris)


def rotation(tilt_deg, toward_deg, spin_deg):
    """Spin about the crystal's own axis, then lean it `tilt` degrees toward
    the compass direction `toward` (0 = +X, 90 = +Z)."""
    s = math.radians(spin_deg)
    spin = np.array([[math.cos(s), 0, math.sin(s)], [0, 1, 0], [-math.sin(s), 0, math.cos(s)]])
    t = math.radians(tilt_deg)
    d = math.radians(toward_deg)
    axis = np.array([-math.sin(d), 0.0, math.cos(d)])     # perpendicular to the lean
    k = np.array([[0, -axis[2], axis[1]], [axis[2], 0, -axis[0]], [-axis[1], axis[0], 0]])
    lean = np.eye(3) + math.sin(-t) * k + (1 - math.cos(t)) * (k @ k)
    return lean @ spin


def crystal(base, radius, body, tip, tilt, toward, spin):
    """A hexagonal prism with a six-sided point, its foot buried in the rock."""
    bury = 0.03
    ring_lo, ring_hi = [], []
    for i in range(6):
        a = i / 6 * 2 * math.pi
        r = radius * rng.uniform(0.9, 1.08)
        ring_lo.append([r * math.cos(a), -bury, r * math.sin(a)])
        ring_hi.append([0.94 * r * math.cos(a), body + rng.uniform(-0.006, 0.006), 0.94 * r * math.sin(a)])
    apex = [rng.uniform(-0.15, 0.15) * radius, body + tip, rng.uniform(-0.15, 0.15) * radius]
    floor = [0.0, -bury, 0.0]
    tris = []
    for i in range(6):
        j = (i + 1) % 6
        tris += [[ring_lo[i], ring_hi[i], ring_hi[j]], [ring_lo[i], ring_hi[j], ring_lo[j]]]
        tris.append([ring_hi[i], apex, ring_hi[j]])
        tris.append([floor, ring_lo[i], ring_lo[j]])
    tris = np.array(tris)
    m = rotation(tilt, toward, spin)
    tris = tris @ m.T + np.array(base)
    return flat(tris)


def build():
    # (base xyz, radius, body, tip, tilt°, toward°, spin°, material)
    layout = [
        ((0.000, 0.060, 0.000), 0.036, 0.165, 0.065, 4, 30, 10, "CrystalDeep"),
        ((0.048, 0.050, 0.018), 0.025, 0.110, 0.046, 24, 15, 25, "CrystalIce"),
        ((-0.052, 0.052, 0.012), 0.027, 0.125, 0.050, 22, 170, 5, "CrystalDeep"),
        ((0.014, 0.052, -0.046), 0.021, 0.090, 0.040, 28, 280, 40, "CrystalIce"),
        ((-0.020, 0.050, 0.050), 0.019, 0.075, 0.036, 32, 100, 15, "CrystalIce"),
        ((0.062, 0.036, -0.032), 0.015, 0.050, 0.028, 42, 320, 0, "CrystalDeep"),
        ((-0.064, 0.036, -0.030), 0.016, 0.056, 0.030, 40, 210, 30, "CrystalIce"),
    ]
    parts = {"Rock": [rock()], "CrystalDeep": [], "CrystalIce": []}
    for base, r, body, tip, tilt, toward, spin, mat in layout:
        parts[mat].append(crystal(base, r, body, tip, tilt, toward, spin))
    meshes = []
    for name in ("Rock", "CrystalDeep", "CrystalIce"):
        pos = np.concatenate([p for p, _ in parts[name]]) * SCALE
        nor = np.concatenate([n for _, n in parts[name]])
        meshes.append((name, pos.astype(np.float32), nor.astype(np.float32)))
    return meshes


# --------------------------------------------------------------------- glTF

def write_glb(meshes, path):
    blob = bytearray()
    views, accessors, gl_meshes, nodes, materials = [], [], [], [], []
    names = list(MATERIALS)
    for name, mat in MATERIALS.items():
        materials.append({
            "name": name,
            "pbrMetallicRoughness": {
                "baseColorFactor": mat["color"] + [1.0],
                "metallicFactor": mat["metallic"],
                "roughnessFactor": mat["roughness"],
            },
            "emissiveFactor": mat["emissive"],
        })
    for name, pos, nor in meshes:
        idx = {}
        for key, arr in (("POSITION", pos), ("NORMAL", nor)):
            data = arr.tobytes()
            views.append({"buffer": 0, "byteOffset": len(blob), "byteLength": len(data), "target": 34962})
            blob += data
            acc = {"bufferView": len(views) - 1, "componentType": 5126, "count": len(arr), "type": "VEC3"}
            if key == "POSITION":
                acc["min"] = arr.min(axis=0).tolist()
                acc["max"] = arr.max(axis=0).tolist()
            accessors.append(acc)
            idx[key] = len(accessors) - 1
        gl_meshes.append({"name": name, "primitives": [{"attributes": idx, "material": names.index(name)}]})
        nodes.append({"name": name, "mesh": len(gl_meshes) - 1})
    gltf = {
        "asset": {"version": "2.0", "generator": "scripts/ar-crystal/build.py"},
        "scene": 0,
        "scenes": [{"name": "Crystal", "nodes": [len(nodes)]}],
        "nodes": nodes + [{"name": "Crystal", "children": list(range(len(nodes)))}],
        "meshes": gl_meshes,
        "materials": materials,
        "accessors": accessors,
        "bufferViews": views,
        "buffers": [{"byteLength": len(blob)}],
    }
    js = json.dumps(gltf, separators=(",", ":")).encode()
    js += b" " * (-len(js) % 4)
    blob += b"\0" * (-len(blob) % 4)
    total = 12 + 8 + len(js) + 8 + len(blob)
    with open(path, "wb") as f:
        f.write(struct.pack("<4sII", b"glTF", 2, total))
        f.write(struct.pack("<I4s", len(js), b"JSON") + js)
        f.write(struct.pack("<I4s", len(blob), b"BIN\0") + bytes(blob))


# ---------------------------------------------------------------------- USD

def write_usdz(meshes, path):
    tmp = tempfile.mkdtemp()
    usdc = os.path.join(tmp, "crystal.usdc")
    stage = Usd.Stage.CreateNew(usdc)
    UsdGeom.SetStageUpAxis(stage, UsdGeom.Tokens.y)
    UsdGeom.SetStageMetersPerUnit(stage, 1.0)
    root = UsdGeom.Xform.Define(stage, "/Crystal")
    stage.SetDefaultPrim(root.GetPrim())
    Usd.ModelAPI(root).SetKind(Kind.Tokens.component)

    looks = {}
    for name, mat in MATERIALS.items():
        material = UsdShade.Material.Define(stage, f"/Crystal/Materials/{name}")
        shader = UsdShade.Shader.Define(stage, f"/Crystal/Materials/{name}/Surface")
        shader.CreateIdAttr("UsdPreviewSurface")
        shader.CreateInput("diffuseColor", Sdf.ValueTypeNames.Color3f).Set(Gf.Vec3f(*mat["color"]))
        shader.CreateInput("roughness", Sdf.ValueTypeNames.Float).Set(mat["roughness"])
        shader.CreateInput("metallic", Sdf.ValueTypeNames.Float).Set(mat["metallic"])
        shader.CreateInput("emissiveColor", Sdf.ValueTypeNames.Color3f).Set(Gf.Vec3f(*mat["emissive"]))
        material.CreateSurfaceOutput().ConnectToSource(shader.ConnectableAPI(), "surface")
        looks[name] = material

    for name, pos, nor in meshes:
        mesh = UsdGeom.Mesh.Define(stage, f"/Crystal/Geom/{name}")
        n = len(pos)
        mesh.CreatePointsAttr(Vt.Vec3fArray.FromNumpy(pos))
        mesh.CreateNormalsAttr(Vt.Vec3fArray.FromNumpy(nor))
        mesh.SetNormalsInterpolation(UsdGeom.Tokens.vertex)
        mesh.CreateFaceVertexCountsAttr(Vt.IntArray([3] * (n // 3)))
        mesh.CreateFaceVertexIndicesAttr(Vt.IntArray(list(range(n))))
        mesh.CreateSubdivisionSchemeAttr(UsdGeom.Tokens.none)   # keep the facets sharp
        mesh.CreateExtentAttr(Vt.Vec3fArray([Gf.Vec3f(*pos.min(axis=0).tolist()), Gf.Vec3f(*pos.max(axis=0).tolist())]))
        UsdShade.MaterialBindingAPI.Apply(mesh.GetPrim()).Bind(looks[name])

    stage.GetRootLayer().Save()
    if os.path.exists(path):
        os.remove(path)
    if not UsdUtils.CreateNewARKitUsdzPackage(usdc, path):
        raise SystemExit("usdz packaging failed")

    # The same checks `usdchecker` runs: package layout, shading, bindings.
    registry = UsdValidation.ValidationRegistry()
    validators = registry.GetOrLoadValidatorsByName(
        [m.name for m in registry.GetAllValidatorMetadata()])
    errors = UsdValidation.ValidationContext(validators).Validate(Usd.Stage.Open(path))
    if errors:
        raise SystemExit("usdz validation failed:\n" + "\n".join(e.GetErrorAsString() for e in errors))


def main():
    os.makedirs(OUT, exist_ok=True)
    meshes = build()
    write_glb(meshes, os.path.join(OUT, "crystal.glb"))
    write_usdz(meshes, os.path.join(OUT, "crystal.usdz"))
    allpos = np.concatenate([p for _, p, _ in meshes])
    size = allpos.max(axis=0) - allpos.min(axis=0)
    tris = sum(len(p) for _, p, _ in meshes) // 3
    print(f"{tris} triangles, {size[0]*100:.0f} x {size[1]*100:.0f} x {size[2]*100:.0f} cm (w x h x d)")
    for f in ("crystal.glb", "crystal.usdz"):
        print(f, os.path.getsize(os.path.join(OUT, f)), "bytes")


if __name__ == "__main__":
    main()
