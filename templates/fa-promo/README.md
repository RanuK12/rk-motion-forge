# Flight Alert promo template (Remotion 4)
1. Edit public/script.json: per scene {"say": spoken text, "caption": on-screen text}. Never put invented prices.
2. Voice (default Deepgram Aura-2, aura-2-diana-es; key from env DEEPGRAM_API_KEY or Keychain ranukita/DEEPGRAM_API_KEY, never printed):
     python3 make_vo.py                # or another model, e.g. aura-2-olivia-es
   -> public/vo*.mp3 + public/timing.json (scene lengths and karaoke subtitles follow the audio automatically)
3. Scenes/visuals: `scenes` in src/Promo.tsx (hook, problem, shot, alert, cta, outro). Screenshots go in public/.
4. Render: npx remotion render src/index.ts Promo out/video.mp4 --codec h264
Safe areas (TikTok/Reels): top 160, bottom 420, right 150 px. Music: public/music.mp3 at -21 dB-ish (volume 0.09), CC BY attribution required.
VO is sped up 1.156x by default (TEMPO env).
