# Deepgram Aura-2 VO + word timings. Key: env DEEPGRAM_API_KEY, else macOS Keychain
# (service "ranukita/DEEPGRAM_API_KEY", account "ranukita"). Never hardcode or print it.
import json,os,subprocess,sys,urllib.request
def _key():
    k=os.environ.get('DEEPGRAM_API_KEY','').strip()
    if k: return k
    try:
        return subprocess.check_output(['security','find-generic-password','-s','ranukita/DEEPGRAM_API_KEY','-a','ranukita','-w'],stderr=subprocess.DEVNULL,text=True).strip()
    except Exception:
        sys.exit('DEEPGRAM_API_KEY not found (env or Keychain ranukita/DEEPGRAM_API_KEY)')
KEY=_key()
VOICE=sys.argv[1] if len(sys.argv)>1 else 'aura-2-diana-es'
lines=json.load(open('public/script.json'))
out=[]
for i,t in enumerate(lines,1):
    r=urllib.request.Request(f'https://api.deepgram.com/v1/speak?model={VOICE}&encoding=mp3',json.dumps({'text':t['say']}).encode(),{'Authorization':'Token '+KEY,'Content-Type':'application/json'})
    open(f'public/vo{i}.mp3','wb').write(urllib.request.urlopen(r).read())
    r=urllib.request.Request('https://api.deepgram.com/v1/listen?model=nova-3&language=es',open(f'public/vo{i}.mp3','rb').read(),{'Authorization':'Token '+KEY,'Content-Type':'audio/mpeg'})
    w=json.load(urllib.request.urlopen(r))['results']['channels'][0]['alternatives'][0]['words']
    cap=t['caption'].split(); spoken=[c for c in cap if c!='|']; dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'public/vo{i}.mp3']))
    # map caption words onto spoken timeline proportionally between first/last spoken word
    s0,s1=(w[0]['start'],w[-1]['end']) if w else (0,dur)
    words=[];k=0
    for c in cap:
        words.append({'w':c,'t':round(s0+(s1-s0)*k/len(spoken),3)})
        if c!='|': k+=1
    out.append({'vo':f'vo{i}.mp3','dur':dur,'words':words})
json.dump(out,open('public/timing.json','w'),ensure_ascii=False,indent=1)
R=float(os.environ.get("TEMPO","1.156"))  # speed-up keeps ad <=30s; set TEMPO=1 to disable
for o in out:
    f="public/"+o["vo"]; subprocess.run(["ffmpeg","-v","error","-y","-i",f,"-filter:a",f"atempo={R}","/tmp/fa_vo_tmp.mp3"],check=True); os.replace("/tmp/fa_vo_tmp.mp3",f)
    o["dur"]=round(o["dur"]/R,3); [w.update(t=round(w["t"]/R,3)) for w in o["words"]]
json.dump(out,open("public/timing.json","w"),ensure_ascii=False,indent=1)
print([round(o['dur'],2) for o in out])
