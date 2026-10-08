#!/usr/bin/env bash
# Generate the homepage welcome video with LongCat-Video-Avatar 1.5.
#
# Run this on a Linux GPU box (one 80 GB GPU, or two smaller ones), not locally.
# Usage:  bash generate.sh path/to/voice.(wav|mp3|m4a) [num_gpus]
#         INT8=1 bash generate.sh voice.m4a      # lower VRAM (e.g. a 48 GB card)
#
# Output: work/raw.mp4. Then run finalize.sh to make the web-ready files.
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$HERE/../.." && pwd)"
VOICE="${1:?usage: generate.sh voice.wav [num_gpus]}"
GPUS="${2:-$(nvidia-smi -L | wc -l)}"
WORK="$HERE/work"
LC="$WORK/LongCat-Video"
mkdir -p "$WORK"

# 1. Inputs: the same portrait the homepage shows (pink backdrop), so the first
#    frame of the video lines up with the still image and the swap is invisible.
ffmpeg -y -loglevel error -i "$REPO_ROOT/assets/images/home/hero-portrait-900.webp" "$WORK/cond-portrait.png"
# Clean mono 16 kHz speech, light loudness normalisation, 0.3 s lead-in silence
ffmpeg -y -loglevel error -i "$VOICE" -af "adelay=300,loudnorm=I=-16:TP=-1.5:LRA=11" -ac 1 -ar 16000 "$WORK/voice.wav"

# 2. Model code + weights (~80 GB download the first time)
if [ ! -d "$LC" ]; then
  git clone --depth 1 https://github.com/meituan-longcat/LongCat-Video.git "$LC"
fi
cd "$LC"
pip install -q -r requirements.txt -r requirements_avatar.txt "huggingface_hub[cli]" librosa
huggingface-cli download meituan-longcat/LongCat-Video --local-dir ./weights/LongCat-Video
huggingface-cli download meituan-longcat/LongCat-Video-Avatar-1.5 --local-dir ./weights/LongCat-Video-Avatar-1.5

# 3. Input JSON with absolute paths
python3 - "$HERE/input.json" "$WORK" <<'PY'
import json, sys, os
src, work = sys.argv[1], sys.argv[2]
d = json.load(open(src))
d["cond_image"] = os.path.join(work, "cond-portrait.png")
d["cond_audio"]["person1"] = os.path.join(work, "voice.wav")
json.dump(d, open(os.path.join(work, "input.json"), "w"), indent=2)
PY

# 4. Segments: the first clip is 93 frames, each continuation adds 80 (25 fps)
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$WORK/voice.wav")
SEGMENTS=$(python3 -c "import math; d=$DUR; print(max(1, 1 + math.ceil(max(0, d*25 - 93) / 80)))")
echo "Audio ${DUR}s -> ${SEGMENTS} segments on ${GPUS} GPU(s)"

# 5. Generate (Audio + Image -> Video, then continuation for long audio)
torchrun --nproc_per_node="$GPUS" run_demo_avatar_single_audio_to_video.py \
  --context_parallel_size="$GPUS" \
  --checkpoint_dir=./weights/LongCat-Video-Avatar-1.5 \
  --model_type avatar-v1.5 --use_distill ${INT8:+--use_int8} \
  --stage_1=ai2v \
  --input_json="$WORK/input.json" \
  --num_segments="$SEGMENTS" --ref_img_index=10 --mask_frame_range=3 \
  --resolution=480p \
  --output_dir="$WORK/out"

# The last continuation holds the full-length result
RAW=$(ls -v "$WORK"/out/video_continue_*.mp4 2>/dev/null | grep -v -- '-temp' | tail -1 || true)
RAW="${RAW:-$WORK/out/ai2v_demo_1.mp4}"
cp "$RAW" "$WORK/raw.mp4"
echo "Done: $WORK/raw.mp4  (next: bash finalize.sh)"
