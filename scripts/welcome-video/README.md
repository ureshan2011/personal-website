# Homepage welcome video (LongCat-Video-Avatar)

The homepage portrait has a **Say hello** button. Clicking it plays a short talking clip that fades in over the photo and fades back out when it finishes. The clip is generated from the portrait itself (`assets/images/home/hero-portrait-900.webp`), so its first frame matches the photo and the swap isn't visible.

The button stays hidden until `assets/video/welcome.mp4` is deployed, so this can ship before the video exists. Nothing downloads until a visitor presses play, so page speed (LCP) isn't affected.

## 1. Record your voice (on your phone is fine)
Read `welcome-script.txt` aloud (about 20–25 s) in a quiet room, without music. Your real voice gives the most natural result and the best lip sync. Save it as `voice.m4a` or `voice.wav`.

## 2. Generate on a GPU (about 20–40 min including the weights download)
This needs a Linux machine with an NVIDIA GPU: 1× A100/H100 80 GB, or 2× smaller cards, or a 48 GB card with `INT8=1`. RunPod, Lambda, Vast.ai and Colab Pro (A100) all work.

```bash
git clone https://github.com/ureshan2011/personal-website.git && cd personal-website
# upload voice.m4a to this folder, then:
bash scripts/welcome-video/generate.sh voice.m4a        # or: INT8=1 bash ...
bash scripts/welcome-video/finalize.sh
```

`finalize.sh` writes `assets/video/welcome.webm`, `welcome.mp4` (720p, small, fast-start) and `welcome.en.vtt` (captions, timed by word count, so check them once). Commit `assets/video/` and deploy, and the button appears.

## Tuning
- **Lips slightly off:** re-run. Each run uses a new random seed, so make 2–3 takes and keep the best.
- **Repetitive head motion:** in `generate.sh`, raise `--ref_img_index` to 30 or `--mask_frame_range` to 5.
- **Look/expression:** edit the `prompt` in `input.json`. Longer, specific descriptions work better.
- **Wording:** edit `welcome-script.txt` and record again. Captions are rebuilt from this file.
