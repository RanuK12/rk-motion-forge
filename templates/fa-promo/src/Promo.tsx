import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import timing from '../public/timing.json';

// Brand: landing CSS (dark) + Mini App mint accent
const C = {bg:'#0B1017', surface:'#121A24', border:'#243142', brand:'#6EA8FF', brandDeep:'#1D4ED8', accent:'#FBBF24', mint:'#64FFDA', text:'#E8EDF3', text2:'#A5B1C2'};
// Same stack as landing --font; Inter is what renders on this Linux box
const FONT = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Inter, Roboto, "Helvetica Neue", Arial, sans-serif';
const FPS=30, LEAD=5, TAIL=7, TR=12;
// Safe area for TikTok/Reels UI: top 160, bottom 420, right 150
const SAFE={top:160,bottom:420,side:90,right:150};

type Kind='simple'|'ai'|'hook'|'problem'|'shot'|'alert'|'cta'|'outro';
type Scene = {kind:Kind; cont?:boolean; img?:string; scroll?:number; extra?:number};
type Timed = {vo:string; dur:number; words:{w:string;t:number}[]};
export type PromoProps = {bot:string; url:string; music:string; scenes:Scene[]; timed:Timed[]};

// Template: edit public/script.json, run `python3 ../make_vo.py [deepgram-model]` -> vo*.mp3 + timing.json
export const promoDefaults: PromoProps = {
  bot:'@flightalertpro_bot', url:'flightalert.ranuk.dev', music:'music.mp3', timed: timing as Timed[],
  scenes:[{kind:'hook'},{kind:'problem'},{kind:'shot',img:'03-resultados-dark.png',scroll:0.22},
    {kind:'shot',img:'04-alertas-dark.png',scroll:0,cont:true},{kind:'alert'},{kind:'simple',img:'05-teclado-es-dark.png'},{kind:'ai'},{kind:'cta'},{kind:'outro',extra:0}],
};
const frames = (p:PromoProps,i:number) => LEAD+Math.ceil(p.timed[i].dur*FPS)+TAIL+(p.scenes[i].extra??0);
export const totalFrames = (p:PromoProps) => p.scenes.reduce((a,_,i)=>a+frames(p,i),0)-TR*(p.scenes.length-1);

// Plane: nose at +x; rotated by the path tangent, so it always faces where it flies.
const Plane: React.FC<{size:number; color:string; angle?:number}> = ({size,color,angle=0}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{transform:`rotate(${angle}deg)`, display:'block'}}><path fill={color}
    d="M22 12c0-.8-.7-1.5-1.5-1.5H15L10 3H8l2.5 7.5H5L3.5 8.5H2l1 3.5-1 3.5h1.5L5 13.5h5.5L8 21h2l5-7.5h5.5c.8 0 1.5-.7 1.5-1.5z"/></svg>
);

const Caption: React.FC<{t:Timed}> = ({t}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const sec = (f-LEAD)/fps; const s = spring({frame:f-LEAD+3, fps, config:{damping:18}});
  return <div style={{position:'absolute', left:SAFE.side, right:SAFE.right, bottom:SAFE.bottom, display:'flex', justifyContent:'center',
    opacity:s, transform:`translateY(${(1-s)*30}px)`}}>
    <div style={{fontFamily:FONT, fontWeight:800, fontSize:60, lineHeight:1.25, textAlign:'center', padding:'18px 34px', borderRadius:40,
      background:'rgba(18,26,36,0.72)', border:`2px solid rgba(110,168,255,0.25)`, backdropFilter:'blur(8px)', boxShadow:'0 12px 40px rgba(0,0,0,0.35)'}}>
      {t.words.map((w,i)=>{if(w.w==='|') return <br key={i}/>; const nx=t.words.slice(i+1).find(x=>x.w!=='|'); const next=nx?.t??t.dur; const active=sec>=w.t&&sec<next; const done=sec>=next;
        return <span key={i} style={{color: active?C.mint: done?C.text:'rgba(232,237,243,0.45)', display:'inline-block',
          transform:`scale(${active?1.06:1})`, transition:'none', marginRight:14}}>{w.w}</span>;})}
    </div></div>;
};

const Bg: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{background:`radial-gradient(circle at ${50+Math.sin(f/90)*10}% ${30+Math.sin(f/60)*6}%, #15295a 0%, ${C.bg} 62%)`}}>
    {[...Array(16)].map((_,i)=>{ const x=((i*137+f*(0.6+(i%3)*0.4))%1400)-160; const y=(i*211)%1900;
      return <div key={i} style={{position:'absolute', left:x, top:y, width:100+(i%4)*60, height:2, borderRadius:2, background:C.brand, opacity:0.1}}/>;})}
  </AbsoluteFill>;
};

// quadratic bezier helpers for the curved flight path
const qb=(p0:number,p1:number,p2:number,t:number)=>(1-t)**2*p0+2*(1-t)*t*p1+t*t*p2;
const qd=(p0:number,p1:number,p2:number,t:number)=>2*(1-t)*(p1-p0)+2*t*(p2-p1);

const Phone: React.FC<{img:string; scroll:number; n:number; cont?:boolean; tap?:{x:number;y:number;at:number}}> = ({img,scroll,n,cont,tap}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const s = cont?1:spring({frame:f, fps, config:{damping:20, mass:0.9}});
  const y = interpolate(f,[20,n-10],[0,scroll*100],{extrapolateLeft:'clamp',extrapolateRight:'clamp', easing:Easing.inOut(Easing.cubic)});
  const float = Math.sin(f/22)*8, tilt = Math.sin(f/40)*1.2, zoom = interpolate(f,[0,n],[1,1.04]);
  const tp = tap? Math.max(0,f-tap.at):0;
  return <div style={{position:'absolute', left:'50%', top:SAFE.top-10, width:500, height:1000, marginLeft:-250, borderRadius:78, padding:14,
    background:'linear-gradient(145deg,#3a4656,#11161d 40%,#2a3442)', boxShadow:'0 40px 120px rgba(110,168,255,0.28), inset 0 0 0 2px #4b5768',
    transform:`perspective(1600px) rotateY(${tilt}deg) scale(${(0.88+0.12*s)*zoom}) translateY(${(1-s)*160+float}px)`}}>
    <div style={{position:'relative', width:'100%', height:'100%', borderRadius:64, overflow:'hidden', background:C.surface}}>
      <Img src={staticFile(img)} style={{width:'100%', transform:`translateY(-${y}%)`}}/>
      <div style={{position:'absolute', top:16, left:'50%', width:150, height:42, marginLeft:-75, borderRadius:21, background:'#000'}}/>
      {tap && tp>0 && <div style={{position:'absolute', left:`${tap.x}%`, top:`${tap.y}%`, width:120, height:120, margin:-60, borderRadius:60,
        border:`5px solid ${C.mint}`, background:`${C.mint}33`, opacity:Math.max(0,1-tp/18), transform:`scale(${0.4+tp/12})`}}/>}
      {tap && <div style={{position:'absolute', left:`${tap.x}%`, top:`${tap.y}%`, width:70, height:70, margin:-35, borderRadius:35,
        background:'rgba(255,255,255,0.85)', opacity:interpolate(f,[tap.at-12,tap.at-4,tap.at+6,tap.at+14],[0,0.9,0.9,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
        transform:`scale(${tp>0&&tp<6?0.8:1})`}}/>}
    </div></div>;
};

const Visual: React.FC<{s:Scene; p:PromoProps; n:number}> = ({s,p,n}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const pop = spring({frame:f, fps, config:{damping:14}});
  if (s.kind==='hook') {
    const P=[[-80,1000],[540,330],[1180,760]] as const;
    const t = interpolate(f,[0,n],[0,1],{easing:Easing.inOut(Easing.quad)});
    const x=qb(P[0][0],P[1][0],P[2][0],t), y=qb(P[0][1],P[1][1],P[2][1],t);
    const ang=Math.atan2(qd(P[0][1],P[1][1],P[2][1],t), qd(P[0][0],P[1][0],P[2][0],t))*180/Math.PI;
    const d=`M${P[0][0]},${P[0][1]} Q${P[1][0]},${P[1][1]} ${P[2][0]},${P[2][1]}`;
    return <AbsoluteFill>
      <svg width={1080} height={1920} style={{position:'absolute'}}><path d={d} fill="none" stroke={C.brand} strokeWidth={6}
        strokeDasharray="4 22" strokeLinecap="round" opacity={0.55} pathLength={1000} strokeDashoffset={-f*2}/></svg>
      <div style={{position:'absolute', left:x-80, top:y-80, filter:`drop-shadow(0 0 24px ${C.accent}88)`}}><Plane size={160} color={C.accent} angle={ang}/></div>
      <div style={{position:'absolute', top:880, width:'100%', textAlign:'center', fontFamily:FONT, fontWeight:900, fontSize:96, color:C.text,
        opacity:pop, transform:`translateY(${(1-pop)*40}px)`, letterSpacing:-2}}>Flight <span style={{color:C.mint}}>Alert</span></div>
    </AbsoluteFill>;
  }
  if (s.kind==='problem') {
    const pts = [...Array(46)].map((_,i)=>`${i*20},${270+Math.sin(i*0.8+f/9)*100+Math.cos(i*0.33)*60}`).join(' ');
    const reveal = interpolate(f,[0,45],[0,1],{extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
    return <div style={{position:'absolute', top:420, left:110, width:860, height:600, background:'rgba(18,26,36,0.85)', borderRadius:44,
      border:`2px solid ${C.border}`, overflow:'hidden', transform:`scale(${0.92+0.08*pop}) translateY(${Math.sin(f/25)*6}px)`, opacity:pop}}>
      <div style={{fontFamily:FONT, color:C.text2, fontSize:40, margin:'36px 44px'}}>Precio del vuelo · día a día</div>
      <svg width={860} height={500} style={{position:'absolute', top:90}}><polyline points={pts} fill="none" stroke={C.accent} strokeWidth={9}
        strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1-reveal}/></svg></div>;
  }
  if (s.kind==='shot') return <Phone img={s.img!} scroll={s.scroll??0} n={n} cont={s.cont}/>;
  if (s.kind==='simple') return <Phone img={s.img!} scroll={0} n={n} tap={{x:50,y:84,at:Math.round(n*0.55)}}/>;
  if (s.kind==='alert') {
    const drop = spring({frame:f-8, fps, config:{damping:13}});
    const ring = (k:number)=>{const ph=((f+k*14)%42)/42; return <div key={k} style={{position:'absolute', left:'50%', top:470, width:200, height:200, marginLeft:-100, marginTop:-100,
      borderRadius:100, border:`4px solid ${C.mint}`, opacity:(1-ph)*0.6, transform:`scale(${0.7+ph*1.2})`}}/>;};
    return <AbsoluteFill>{[0,1,2].map(ring)}
      <div style={{position:'absolute', top:400, left:'50%', marginLeft:-70, fontSize:130, lineHeight:1, transformOrigin:'50% 10%',
        transform:`rotate(${Math.sin(f/2.2)*14*Math.max(0,1-f/45)}deg) scale(${1+0.05*Math.sin(f/6)})`}}>🔔</div>
      <div style={{position:'absolute', top:680, left:100, right:100, background:'rgba(18,26,36,0.78)', backdropFilter:'blur(12px)', borderRadius:40,
        border:`2px solid ${C.mint}66`, padding:'38px 42px', fontFamily:FONT, opacity:drop,
        transform:`translateY(${(1-drop)*-140+Math.sin(f/20)*5}px) scale(${0.95+0.05*drop})`,
        boxShadow:`0 0 ${40+12*Math.sin(f/10)}px ${C.mint}44, 0 30px 80px rgba(0,0,0,0.5)`}}>
        <div style={{display:'flex', alignItems:'center', gap:22}}>
          <div style={{width:84,height:84,borderRadius:42,background:C.brandDeep,display:'flex',alignItems:'center',justifyContent:'center'}}><Plane size={50} color="#fff"/></div>
          <div><div style={{color:C.text,fontSize:42,fontWeight:800}}>Flight Alert</div><div style={{color:C.text2,fontSize:30}}>Telegram · ahora</div></div></div>
        <div style={{color:C.mint, fontSize:58, fontWeight:900, marginTop:28}}>↓ Bajó el precio</div>
        <div style={{color:C.text, fontSize:38, marginTop:8}}>Te avisamos apenas detectamos la baja.</div></div></AbsoluteFill>;
  }
  if (s.kind==='ai') {
    const q='Madrid a Roma en marzo, lo más barato';
    const typed=q.slice(0,Math.floor(interpolate(f,[3,26],[0,q.length],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})));
    const reply=spring({frame:f-30, fps, config:{damping:15}});
    const badge=spring({frame:f-2, fps, config:{damping:10}});
    const chip=(t:string,i:number)=><span key={i} style={{display:'inline-block',margin:'8px 10px 0 0',padding:'10px 22px',borderRadius:999,
      background:'rgba(100,255,218,0.12)',border:`2px solid ${C.mint}88`,color:C.mint,fontSize:36,fontWeight:700}}>{t}</span>;
    return <AbsoluteFill style={{fontFamily:FONT}}>
      <div style={{position:'absolute',top:SAFE.top+40,width:'100%',textAlign:'center'}}>
        <span style={{display:'inline-block',padding:'14px 34px',borderRadius:999,background:C.accent,color:'#1A1300',fontSize:44,fontWeight:900,
          transform:`scale(${badge*(1+0.03*Math.sin(f/8))})`,boxShadow:`0 0 40px ${C.accent}66`}}>MUY PRONTO</span>
        <div style={{color:C.text,fontSize:72,fontWeight:900,marginTop:30,letterSpacing:-1}}>Pro con <span style={{color:C.mint}}>IA</span></div></div>
      <div style={{position:'absolute',top:640,right:110,maxWidth:760,background:C.brandDeep,color:'#fff',fontSize:46,fontWeight:600,
        padding:'28px 36px',borderRadius:'40px 40px 8px 40px',transform:`translateY(${Math.sin(f/20)*4}px)`}}>
        {typed}<span style={{opacity:f%20<10?1:0}}>|</span></div>
      <div style={{position:'absolute',top:860,left:110,maxWidth:800,background:'rgba(18,26,36,0.85)',border:`2px solid ${C.border}`,
        padding:'28px 34px',borderRadius:'40px 40px 40px 8px',opacity:reply,transform:`translateY(${(1-reply)*40}px)`,
        boxShadow:`0 0 40px ${C.mint}22`}}>
        <div style={{display:'flex',alignItems:'center',gap:16,color:C.text2,fontSize:34}}><Plane size={40} color={C.brand}/>Entendido:</div>
        {['MAD → ROM','marzo','lo más barato'].map(chip)}</div>
    </AbsoluteFill>;
  }
  if (s.kind==='cta') {
    const glow = 0.5+0.5*Math.sin(f/10);
    return <div style={{position:'absolute', top:SAFE.top+60, width:'100%', textAlign:'center', fontFamily:FONT, transform:`scale(${0.9+0.1*pop}) translateY(${Math.sin(f/24)*6}px)`, opacity:pop}}>
      <div style={{display:'inline-flex',width:200,height:200,borderRadius:100,background:C.brandDeep,alignItems:'center',justifyContent:'center',
        boxShadow:`0 0 ${30+30*glow}px ${C.brand}88`}}><Plane size={116} color="#fff"/></div>
      <div style={{color:C.text, fontSize:76, fontWeight:900, marginTop:46}}>{p.bot}</div>
      <div style={{display:'inline-block', marginTop:44, background:C.mint, color:'#06101F', fontSize:56, fontWeight:900, padding:'24px 46px', borderRadius:999,
        transform:`scale(${1+0.03*glow})`}}>{p.url}</div>
      <div style={{color:C.text2, fontSize:40, marginTop:34}}>Gratis para empezar</div></div>;
  }
  return <div style={{position:'absolute', top:SAFE.top, bottom:SAFE.bottom+220, left:0, right:0, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', fontFamily:FONT, opacity:pop, transform:`scale(${0.95+0.05*pop})`}}>
    <div style={{display:'inline-block', transform:`translateX(${interpolate(f,[0,n],[-30,30])}px)`}}><Plane size={110} color={C.accent}/></div>
    <div style={{color:C.text, fontSize:104, fontWeight:900, letterSpacing:-2}}>Flight <span style={{color:C.mint}}>Alert</span></div>
    <div style={{color:C.brand, fontSize:50, marginTop:16}}>{p.url}</div></div>;
};

export const Promo: React.FC<PromoProps> = (p) => {
  const total = totalFrames(p);
  return <AbsoluteFill style={{background:C.bg}}><Bg/>
    <Audio src={staticFile(p.music)} volume={(f)=>interpolate(f,[0,15,total-90,total-5],[0,0.09,0.09,0],{extrapolateRight:'clamp'})}/>
    <TransitionSeries>{p.scenes.flatMap((s,i)=>{const n=frames(p,i); const out=[
      <TransitionSeries.Sequence key={'s'+i} durationInFrames={n}><AbsoluteFill>
        <Visual s={s} p={p} n={n}/>
        <Sequence from={LEAD}><Audio src={staticFile(p.timed[i].vo)}/></Sequence>
        <Caption t={p.timed[i]}/></AbsoluteFill></TransitionSeries.Sequence>];
      if(i<p.scenes.length-1) out.push(<TransitionSeries.Transition key={'t'+i} timing={springTiming({config:{damping:200},durationInFrames:TR})}
        presentation={(i%2||p.scenes[i+1].cont)? fade(): slide({direction:'from-right'})}/>);
      return out;})}</TransitionSeries>
  </AbsoluteFill>;
};
