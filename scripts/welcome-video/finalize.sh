#!/usr/bin/env bash
# Turn the raw LongCat output into small web files the homepage picks up.
# Usage:  bash finalize.sh [work/raw.mp4]
# Writes: assets/video/welcome.mp4, welcome.webm, welcome.en.vtt
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$HERE/../.." && pwd)"
RAW="${1:-$HERE/work/raw.mp4}"
OUT="$REPO_ROOT/assets/video"
mkdir -p "$OUT"

# 720px tall is plenty for a ~440px-wide frame on 2x screens; light denoise
VF="scale=-2:720:flags=lanczos,hqdn3d=1.5:1.5:3:3,format=yuv420p"

ffmpeg -y -loglevel error -i "$RAW" -vf "$VF" \
  -c:v libx264 -profile:v high -preset slow -crf 23 -movflags +faststart \
  -c:a aac -b:a 96k -ac 1 "$OUT/welcome.mp4"

ffmpeg -y -loglevel error -i "$RAW" -vf "$VF" \
  -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 -deadline good \
  -c:a libopus -b:a 64k -ac 1 "$OUT/welcome.webm"

# Captions: spread the script's sentences over the clip by word count.
# Check the timings by eye once and nudge them if needed.
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT/welcome.mp4")
python3 - "$HERE/welcome-script.txt" "$DUR" "$OUT/welcome.en.vtt" <<'PY'
import re, sys
text, dur, out = open(sys.argv[1]).read(), float(sys.argv[2]), sys.argv[3]
cues = []
for s in re.split(r'(?<=[.!?])\s+', " ".join(text.split())):
    # Long sentences are split at commas so each cue fits on the portrait
    cur = ""
    for part in re.split(r'(?<=,)\s+', s):
        if cur and len((cur + " " + part).split()) > 9:
            cues.append(cur); cur = part
        else:
            cur = (cur + " " + part).strip()
    if cur: cues.append(cur)
words = [len(c.split()) for c in cues]
lead, tail = 0.3, 0.4
span, t = max(dur - lead - tail, 1.0), lead
fmt = lambda s: "%02d:%02d:%06.3f" % (s // 3600, s % 3600 // 60, s % 60)
lines = ["WEBVTT", ""]
for c, w in zip(cues, words):
    end = t + span * w / sum(words)
    lines += [fmt(t) + " --> " + fmt(end), c, ""]
    t = end
open(out, "w").write("\n".join(lines))
PY

ls -lh "$OUT"
echo "Done. Commit assets/video/ and the homepage shows the 'Say hello' button."
