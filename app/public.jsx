/* SkillMitra — Landing, Login, Onboarding, Workspace switch */
import React, { useState, useEffect, useRef } from 'react';

const lpCss = `
.lp{background:var(--bg)}
.lp-nav{position:sticky;top:0;z-index:30;background:var(--top-bg);backdrop-filter:blur(14px) saturate(160%);border-bottom:1px solid var(--line);transition:background-color .2s, border-color .2s}
.lp-nav .in{max-width:1240px;margin:0 auto;padding:0 32px;height:68px;display:flex;align-items:center;gap:36px}
.lp-nav nav{display:flex;gap:28px;font-size:14px;font-weight:600;color:var(--ink-2)}
.lp-nav nav a{transition:color .15s}
.lp-nav nav a:hover{color:var(--blue)}
.lp-wrap{max-width:1240px;margin:0 auto;padding:0 32px}
.lp-hero{padding:80px 0 96px;display:grid;grid-template-columns:1fr 1.15fr;gap:56px;align-items:center;position:relative}
.lp-hero::before{content:"";position:absolute;top:-40px;left:20%;width:500px;height:400px;background:radial-gradient(circle, var(--blue-glow) 0%, transparent 70%);pointer-events:none;z-index:0;animation:lpAmbientDrift 10s ease-in-out infinite alternate;will-change:transform,opacity}
.lp-hero::after{content:"";position:absolute;right:8%;top:12%;width:260px;height:260px;border:1px solid rgba(99,102,241,.16);border-radius:50%;box-shadow:inset 0 0 70px rgba(59,130,246,.08),0 0 70px rgba(59,130,246,.06);pointer-events:none;z-index:0;animation:lpHalo 6s ease-in-out infinite alternate}
.lp-hero-copy,.lp-hero>div:nth-child(2){position:relative;z-index:1}
.lp-hero h1{font-size:58px;line-height:1.06;font-weight:800;letter-spacing:-.045em}
.lp-hero h1 .lp-title-line{display:block;opacity:0;animation:lpTextReveal .85s cubic-bezier(.16,1,.3,1) both}
.lp-hero h1 .lp-title-line:first-child{animation-delay:.16s}
.lp-hero h1 .lp-title-accent{background:linear-gradient(110deg,#3B82F6 0%,#818CF8 34%,#4F46E5 55%,#3B82F6 78%);background-size:220% 100%;background-position:0% 50%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:lpTextReveal .9s cubic-bezier(.16,1,.3,1) .34s both,lpGradientSweep 7s ease-in-out 1.3s infinite alternate}
.lp-hero-copy .lp-kicker{animation:lpFadeUp .65s cubic-bezier(.16,1,.3,1) .04s both}
.lp-hero-copy .sub{animation:lpFadeUp .7s cubic-bezier(.16,1,.3,1) .52s both}
.lp-hero-cta{animation:lpFadeUp .7s cubic-bezier(.16,1,.3,1) .66s both}
.lp-hero-copy .lp-trust{animation:lpFadeUp .7s cubic-bezier(.16,1,.3,1) .78s both}
.lp-hero>div:nth-child(2){animation:lpFadeUp .9s cubic-bezier(.16,1,.3,1) .3s both,lpPreviewFloat 6s ease-in-out 1.3s infinite}
.lp-hero-cta .btn-primary svg{animation:lpArrowNudge 1.8s ease-in-out 2.2s infinite}
@keyframes lpTextReveal{from{opacity:0;transform:translateY(.38em);filter:blur(9px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}
@keyframes lpFadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes lpGradientSweep{from{background-position:0% 50%}to{background-position:100% 50%}}
@keyframes lpAmbientDrift{from{transform:translate3d(-18px,-12px,0) scale(.92);opacity:.48}to{transform:translate3d(28px,20px,0) scale(1.12);opacity:1}}
@keyframes lpHalo{from{transform:scale(.88);opacity:.24}to{transform:scale(1.08);opacity:.7}}
@keyframes lpPreviewFloat{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-12px) rotate(.35deg)}}
@keyframes lpArrowNudge{0%,70%,100%{transform:translateX(0)}82%{transform:translateX(4px)}}
.lp-hero .sub{font-size:17px;line-height:1.6;color:var(--ink-2);margin:22px 0 32px;max-width:500px}
.lp-kicker{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--ink-2);margin-bottom:22px;padding:6px 14px 6px 8px;border:1px solid var(--line);border-radius:99px;background:var(--surface);box-shadow:var(--sh-1)}
.lp-kicker b{background:var(--green-50);color:var(--green);padding:3px 9px;border-radius:99px;font-size:11.5px;border:1px solid var(--green-100)}
.lp-trust{display:flex;gap:28px;margin-top:40px;padding-top:24px;border-top:1px solid var(--line)}
.lp-trust div b{display:block;font-size:22px;font-weight:800;letter-spacing:-.03em}
.lp-trust div span{font-size:13px;color:var(--ink-3)}
.lp-prev{position:relative;overflow:hidden;background:var(--surface);border:1px solid var(--line);border-radius:20px;padding:22px;box-shadow:var(--sh-3);transition:transform .3s ease}
.lp-prev::after{content:"";position:absolute;z-index:5;inset:-45% auto -45% -55%;width:34%;pointer-events:none;transform:translateX(-180%) rotate(18deg);background:linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);animation:lpCardSheen 7s ease-in-out 2.4s infinite}
@keyframes lpCardSheen{0%,28%{transform:translateX(-180%) rotate(18deg)}62%,100%{transform:translateX(520%) rotate(18deg)}}
.lp-hero>div:nth-child(2):hover{animation-play-state:paused}
.lp-prev:hover{transform:translateY(-3px)}
.lp-prev .bar-top{display:flex;align-items:center;gap:7px;margin-bottom:16px}
.lp-prev .bar-top i{width:9px;height:9px;border-radius:50%;background:var(--ink-3);opacity:0.4}
.lp-prev .grid2{display:grid;grid-template-columns:1.1fr 1fr;gap:14px}
.lp-mini{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:18px;box-shadow:var(--sh-1)}
.lp-float{position:absolute;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:14px;box-shadow:var(--sh-3);padding:14px 16px;display:flex;gap:10px;align-items:center;font-size:13px}
.lp-sec{padding:96px 0;border-top:1px solid var(--line)}
.lp-sec.alt{background:var(--surface-alt)}
.lp-h2{font-size:38px;font-weight:800;letter-spacing:-.035em;line-height:1.15}
.lp-lead{font-size:16.5px;color:var(--ink-2);margin-top:14px;max-width:560px;line-height:1.6}
.lp-steps{display:grid;grid-template-columns:repeat(5,1fr);margin-top:56px;border-top:2px solid var(--ink)}
.lp-step{padding:26px 24px 0 0;position:relative}
.lp-step::before{content:"";position:absolute;top:-7px;left:0;width:12px;height:12px;border-radius:50%;background:var(--surface);border:2px solid var(--ink)}
.lp-step.on::before{background:var(--blue);border-color:var(--blue);box-shadow:0 0 0 4px var(--blue-50)}
.lp-step .n{font-family:var(--mono);font-size:11.5px;color:var(--ink-3);font-weight:600}
.lp-step h3{font-size:19px;margin:8px 0 8px}
.lp-step p{font-size:13.5px;color:var(--ink-2);line-height:1.55}
.lp-feat{display:grid;grid-template-columns:repeat(6,1fr);gap:18px;margin-top:48px}
.lp-feat .card{padding:28px;grid-column:span 2}
.lp-feat .card.wide{grid-column:span 3}
.lp-feat h3{font-size:18px;margin:18px 0 8px}
.lp-feat p{font-size:13.5px;color:var(--ink-2);line-height:1.6}
.lp-why{display:grid;grid-template-columns:1fr 1.2fr;gap:64px;align-items:center}
.lp-quote{font-size:34px;font-weight:700;letter-spacing:-.03em;line-height:1.25}
.lp-chain{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid var(--line);border-radius:16px;overflow:hidden;background:var(--surface);box-shadow:var(--sh-1)}
.lp-chain > div{padding:24px 20px;border-right:1px solid var(--line);position:relative}
.lp-chain > div:last-child{border-right:0;background:linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);color:#fff}
.lp-chain > div:last-child .faint{color:rgba(255,255,255,.8)}
.lp-chain b{display:block;font-size:16px;margin:12px 0 4px}
.lp-cta{background:linear-gradient(180deg, #1E293B 0%, #0F172A 100%);color:#fff;border-radius:22px;padding:60px;display:flex;justify-content:space-between;align-items:center;gap:32px;box-shadow:var(--sh-3);border:1px solid rgba(255,255,255,0.12)}
.lp-cta h2{color:#fff;font-size:36px;letter-spacing:-.035em}
.lp-foot{border-top:1px solid var(--line);padding:56px 0 40px;background:var(--surface)}
.lp-foot .cols{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:32px}
.lp-foot h4{font-size:13px;margin-bottom:14px;font-weight:700}
.lp-foot a{display:block;font-size:13.5px;color:var(--ink-2);margin-bottom:10px;transition:color .15s}
.lp-foot a:hover{color:var(--blue)}
.flow{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:28px}
.flow span{font-size:13px;font-weight:600;padding:7px 12px;border-radius:8px;background:var(--surface);color:var(--ink);border:1px solid var(--line);box-shadow:var(--sh-1)}
.flow svg{width:14px;height:14px;color:var(--ink-3)}
@media (max-width:1024px){
  .lp-hero{grid-template-columns:1fr;padding:48px 0 64px}
  .lp-hero h1{font-size:48px}
  .lp-steps{grid-template-columns:1fr 1fr 1fr;row-gap:32px;border-top:0}
  .lp-step{border-top:2px solid var(--ink)}
  .lp-feat .card,.lp-feat .card.wide{grid-column:span 3}
  .lp-why{grid-template-columns:1fr;gap:32px}
  .lp-nav nav{display:none}
}
@media (max-width:640px){
  .lp-wrap,.lp-nav .in{padding:0 18px}
  .lp-hero h1{font-size:38px}
  .lp-hero::after{width:190px;height:190px;right:-8%;top:8%}
  .lp-hero .sub{font-size:16px}
  .lp-prev .grid2{grid-template-columns:1fr}
  .lp-float{display:none}
  .lp-sec{padding:64px 0}
  .lp-h2{font-size:30px}
  .lp-steps{grid-template-columns:1fr}
  .lp-feat .card,.lp-feat .card.wide{grid-column:span 6}
  .lp-chain{grid-template-columns:1fr 1fr}
  .lp-chain > div:nth-child(2){border-right:0}
  .lp-chain > div:nth-child(-n+2){border-bottom:1px solid var(--line)}
  .lp-cta{flex-direction:column;align-items:flex-start;padding:32px}
  .lp-cta h2{font-size:28px}
  .lp-foot .cols{grid-template-columns:1fr 1fr}
  .lp-trust{gap:18px}
  .lp-nav .hide-sm{display:none}
}
@media (prefers-reduced-motion:reduce){
  .lp-hero h1 .lp-title-line,.lp-hero-copy .lp-kicker,.lp-hero-copy .sub,.lp-hero-cta,.lp-hero-copy .lp-trust,.lp-hero>div:nth-child(2){animation:none!important;opacity:1;transform:none;filter:none}
  .lp-hero h1 .lp-title-accent{background-position:0 50%}
  .lp-hero::before,.lp-hero::after,.lp-prev::after,.lp-hero-cta .btn-primary svg{animation:none!important;will-change:auto}
}
`;

function HeroPreview(){
  const mini = [
    { s:'Python', st:'strong' },{ s:'Excel', st:'strong' },{ s:'SQL', st:'developing' },{ s:'Statistics', st:'developing' },{ s:'Power BI', st:'missing' },
  ];
  return (
    <div style={{ position:'relative' }}>
      <div className="lp-prev" aria-label="SkillMitra dashboard preview">
        <div className="bar-top"><i/><i/><i/><span className="faint" style={{ fontSize:11.5, marginLeft:10, fontFamily:'var(--mono)' }}>app.skillmitra.in/dashboard</span></div>
        <div className="lp-mini" style={{ marginBottom:12, display:'flex', alignItems:'center', gap:18 }}>
          <Ring value={68} size={92} stroke={8} color="var(--green)" sub="ready"/>
          <div style={{ flex:1 }}>
            <div className="eyebrow">Target career</div>
            <div style={{ fontWeight:800, fontSize:20, letterSpacing:'-.02em', margin:'2px 0 10px' }}>Data Analyst</div>
            <div className="between" style={{ fontSize:12, marginBottom:5 }}><span className="muted">Roadmap progress</span><b>64%</b></div>
            <Bar value={64}/>
          </div>
        </div>
        <div className="grid2">
          <div className="lp-mini">
            <div className="between" style={{ marginBottom:10 }}><b style={{ fontSize:13 }}>Skill gap</b><span className="faint" style={{ fontSize:11 }}>vs. role</span></div>
            {mini.map(m=>(
              <div key={m.s} className="between" style={{ padding:'6px 0', fontSize:13, borderTop:'1px solid var(--line-2)' }}>
                <span style={{ fontWeight:600 }}>{m.s}</span><StatusDot status={m.st} size={20}/>
              </div>
            ))}
          </div>
          <div className="lp-mini">
            <b style={{ fontSize:13 }}>Your path</b>
            {['SQL Fundamentals','Statistics','Power BI','Analytics Project'].map((s,i)=>(
              <div key={s} className="row" style={{ gap:10, marginTop:12 }}>
                <span style={{ width:20, height:20, borderRadius:'50%', display:'grid', placeItems:'center', fontSize:10.5, fontWeight:700,
                  background:i===0?'var(--blue)':'#fff', color:i===0?'#fff':'var(--ink-3)', border:i===0?'0':'1.5px solid var(--line)' }}>{i+1}</span>
                <span style={{ fontSize:13, fontWeight:600, color:i===0?'var(--ink)':'var(--ink-2)' }}>{s}</span>
                {i===0 && <span className="chip chip-blue" style={{ marginLeft:'auto', height:20, fontSize:10.5 }}>45%</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lp-float" style={{ left:-28, bottom:36 }}>
        <div className="icon-tile green" style={{ width:32, height:32 }}><Icon name="badge-check"/></div>
        <div><b>SQL validated</b><div className="faint" style={{ fontSize:12 }}>Beginner → Intermediate</div></div>
      </div>
      <div className="lp-float" style={{ right:-18, top:-18 }}>
        <div className="icon-tile amber" style={{ width:32, height:32 }}><Icon name="folder-kanban"/></div>
        <div><b>Project matched</b><div className="faint" style={{ fontSize:12 }}>Student Performance Analytics</div></div>
      </div>
    </div>
  );
}

function Landing(){
  const { theme, toggleTheme } = useStore();
  const steps = [
    { n:'01', t:'Understand', d:'We read your resume, academics and self-declared skills to build a real picture of where you stand.' },
    { n:'02', t:'Identify', d:'Your profile is compared with curated industry requirements for the role you want.' },
    { n:'03', t:'Learn', d:'A step-by-step roadmap with the right courses, videos and practice — in the right order.' },
    { n:'04', t:'Practice', d:'Apply each skill in practical projects built around real problems.' },
    { n:'05', t:'Validate', d:'Short assessments confirm the skill, so your progress means something.' },
  ];
  const feats = [
    { i:'scan-search', t:'AI Skill Analysis', d:'Your resume, coursework and assessments combined into one clear skill profile.', w:true },
    { i:'route', t:'Personalized Learning', d:'A roadmap that adapts as you learn — no generic syllabus.', w:true },
    { i:'folder-kanban', t:'Practical Projects', d:'Portfolio projects matched to the exact skills you are building.' },
    { i:'badge-check', t:'Skill Validation', d:'Assessments that move your level from claimed to proven.' },
    { i:'gauge', t:'Career Readiness', d:'One honest score showing how close you are to your target role.' },
  ];
  return (
    <div className="lp">
      <style>{lpCss}</style>
      <header className="lp-nav"><div className="in">
        <Logo/>
        <nav aria-label="Main"><a href="#how" onClick={e=>{e.preventDefault();window.scrollTo({top:document.getElementById('how').offsetTop-68,behavior:'smooth'});}}>How it works</a>
          <a href="#feat" onClick={e=>{e.preventDefault();window.scrollTo({top:document.getElementById('feat').offsetTop-68,behavior:'smooth'});}}>Features</a>
          <A to="/institution-login">For Institutions</A><A to="/industry-login">For Industry</A></nav>
        <div style={{ flex:1 }}/>
        <button 
          className="iconbtn" 
          style={{ width:36, height:36, marginRight:8 }} 
          onClick={toggleTheme} 
          aria-label={`Switch to ${theme==='dark'?'light':'dark'} mode`} 
          title={`Switch to ${theme==='dark'?'light':'dark'} mode`}
        >
          <Icon name={theme==='dark'?'sun':'moon'} size={17}/>
        </button>
        <A to="/login" className="btn btn-ghost hide-sm">Log in</A>
        <A to="/login" className="btn btn-primary">Get started</A>
      </div></header>

      <section className="lp-wrap lp-hero">
        <div className="lp-hero-copy">
          <div className="lp-kicker"><b>New</b>Personalised roadmaps for 4 career paths</div>
          <h1><span className="lp-title-line">Know What to Learn.</span><span className="lp-title-line lp-title-accent">Know Where You’re Going.</span></h1>
          <p className="sub">SkillMitra analyzes your skills, identifies your gaps and creates a personalized path from learning to career readiness.</p>
          <div className="row lp-hero-cta" style={{ flexWrap:'wrap' }}>
            <A to="/login" className="btn btn-primary btn-lg">Build My Learning Path<Icon name="arrow-right"/></A>
            <a href="#how" className="btn btn-secondary btn-lg" onClick={e=>{e.preventDefault();window.scrollTo({top:document.getElementById('how').offsetTop-68,behavior:'smooth'});}}>Explore SkillMitra</a>
          </div>
          <div className="lp-trust">
            <div><b>12,000+</b><span>students learning</span></div>
            <div><b>38</b><span>partner colleges</span></div>
            <div><b>+26 pts</b><span>avg. readiness gain</span></div>
          </div>
        </div>
        <HeroPreview/>
      </section>

      <section className="lp-sec alt" id="how"><div className="lp-wrap">
        <div className="eyebrow" style={{ marginBottom:12 }}>How it works</div>
        <h2 className="lp-h2">From Skill Gap to Career Readiness</h2>
        <p className="lp-lead">A connected journey, not a pile of courses. Every step feeds the next.</p>
        <div className="lp-steps">{steps.map((s,i)=>(
          <div key={s.n} className={`lp-step ${i===0?'on':''}`}><div className="n">{s.n}</div><h3>{s.t}</h3><p>{s.d}</p></div>
        ))}</div>
        <div className="flow">
          {['Student','AI Skill Analysis','Skill Gap','Learning Roadmap','Projects','Career Readiness'].map((f,i,a)=>(
            <React.Fragment key={f}><span style={i===a.length-1?{background:'var(--green-50)',borderColor:'var(--green-100)',color:'var(--green)'}:null}>{f}</span>{i<a.length-1 && <Icon name="arrow-right"/>}</React.Fragment>
          ))}
        </div>
      </div></section>

      <section className="lp-sec" id="feat"><div className="lp-wrap">
        <div className="eyebrow" style={{ marginBottom:12 }}>Features</div>
        <h2 className="lp-h2">Built Around You</h2>
        <p className="lp-lead">Your goal, your current skills and your pace decide what you see next.</p>
        <div className="lp-feat">{feats.map(f=>(
          <div key={f.t} className={`card card-hover ${f.w?'wide':''}`}>
            <div className="icon-tile"><Icon name={f.i}/></div>
            <h3>{f.t}</h3><p>{f.d}</p>
          </div>
        ))}</div>
      </div></section>

      <section className="lp-sec alt"><div className="lp-wrap lp-why">
        <div>
          <div className="eyebrow" style={{ marginBottom:14 }}>Why SkillMitra?</div>
          <p className="lp-quote">Because completing a course is not the same as building a skill.</p>
          <p className="lp-lead">Certificates show attendance. SkillMitra tracks what you can actually do — and shows you exactly what’s left.</p>
        </div>
        <div className="lp-chain">
          {[['book-open','Learning','Structured, in order'],['hammer','Practice','Real projects'],['badge-check','Validation','Proven, not claimed'],['flag','Readiness','Career-ready']].map(([i,t,s])=>(
            <div key={t}><Icon name={i} size={20}/><b>{t}</b><span className="faint" style={{ fontSize:13 }}>{s}</span></div>
          ))}
        </div>
      </div></section>

      <section className="lp-sec"><div className="lp-wrap">
        <div className="lp-cta">
          <div><h2>See your path in under five minutes.</h2><p style={{ color:'rgba(255,255,255,.7)', marginTop:10, fontSize:16 }}>Upload your resume, pick a goal, and get a roadmap built for you.</p></div>
          <A to="/login" className="btn btn-white btn-lg">Build My Learning Path<Icon name="arrow-right"/></A>
        </div>
      </div></section>

      <footer className="lp-foot"><div className="lp-wrap">
        <div className="cols">
          <div><Logo/><p className="muted" style={{ marginTop:14, fontSize:14, maxWidth:280 }}>Your Skills. Your Path. Your Future.<br/>An AI-powered personalised learning and career-readiness platform.</p></div>
          <div><h4>Product</h4><A to="/login">Student app</A><A to="/institution-login">For Institutions</A><A to="/industry-login">For Industry</A></div>
          <div><h4>Explore</h4><A to="/login">Career paths</A><A to="/login">Projects</A><A to="/login">Assessments</A></div>
          <div><h4>Company</h4><a href="mailto:hello@skillmitra.in">hello@skillmitra.in</a><span className="faint" style={{ fontSize:14 }}>Bengaluru, India</span></div>
        </div>
        <div className="between faint" style={{ marginTop:48, paddingTop:20, borderTop:'1px solid var(--line-2)', fontSize:13, flexWrap:'wrap' }}>
          <span>© 2026 SkillMitra Learning Pvt. Ltd.</span><span>Made in India for learners everywhere</span>
        </div>
      </div></footer>
    </div>
  );
}

/* ---------------- Login ---------------- */
const authCss = `
.auth{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;background:var(--surface);color:var(--ink)}
.auth-l{padding:40px 56px;display:flex;flex-direction:column}
.auth-form{max-width:380px;width:100%;margin:auto}
.auth-r{background:var(--bg);border-left:1px solid var(--line);padding:56px;display:flex;flex-direction:column;justify-content:center}
@media (max-width:900px){.auth{grid-template-columns:1fr}.auth-r{display:none}.auth-l{padding:28px 20px}}
`;
function Login({ variant='student' }){
  const { update, notify } = useStore();
  const [email, setEmail] = useState(''); const [pw, setPw] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(null);
  const cfg = {
    student:{ title:'Welcome back', sub:'Log in to continue your learning path.', demo:'Use Demo Student', to:'/dashboard', role:'student' },
    institution:{ title:'Institution login', sub:'Learning insights for your students and cohorts.', demo:'Use Demo Institution', to:'/institution', role:'institution' },
    industry:{ title:'Industry partner login', sub:'Share role requirements and real-world projects.', demo:'Use Demo Industry Partner', to:'/industry', role:'industry' },
  }[variant];
  const submit = e => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr('Enter a valid email address.');
    if (pw.length < 6) return setErr('Password must be at least 6 characters.');
    setErr(''); setBusy('form');
    setTimeout(()=>{ update({ auth:cfg.role }); if (variant==='student'){ update({ onboarded:false }); go('/onboarding'); } else go(cfg.to); }, 700);
  };
  const demo = () => { setBusy('demo'); setTimeout(()=>{ update({ auth:cfg.role, onboarded:true }); notify(variant==='student'?'Signed in as Anshuman (demo)':'Signed in to demo workspace'); go(cfg.to); }, 500); };
  return (
    <div className="auth"><style>{authCss}</style>
      <div className="auth-l">
        <Logo/>
        <div className="auth-form">
          <h1 style={{ fontSize:30, fontWeight:800, letterSpacing:'-.03em' }}>{cfg.title}</h1>
          <p className="muted" style={{ margin:'8px 0 28px' }}>{cfg.sub}</p>
          <button className="btn btn-secondary btn-lg btn-block" onClick={demo} disabled={!!busy} style={{ justifyContent:'space-between' }}>
            <span className="row" style={{ gap:10 }}>
              <span className="avatar" style={{ width:28, height:28, fontSize:11, ...(variant!=='student'?{background:'linear-gradient(160deg,#C9D6F7,#9AB0EE)',color:'#152B8A'}:{}) }}>{variant==='student'?'AM':variant==='institution'?'MI':'RK'}</span>
              {cfg.demo}
            </span>
            {busy==='demo' ? <Icon name="loader-2" className="spin"/> : <Icon name="arrow-right"/>}
          </button>
          <div className="row" style={{ margin:'24px 0', gap:12 }}><div style={{ flex:1, height:1, background:'var(--line)' }}/><span className="faint" style={{ fontSize:12.5 }}>or with email</span><div style={{ flex:1, height:1, background:'var(--line)' }}/></div>
          <form onSubmit={submit} noValidate>
            <div className="field"><label className="label" htmlFor="em">Email</label><input id="em" className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@college.edu" autoComplete="email"/></div>
            <div className="field"><div className="between"><label className="label" htmlFor="pw">Password</label><button type="button" className="link" style={{ fontSize:12.5, marginBottom:6 }} onClick={()=>notify('Reset link sent (demo)')}>Forgot?</button></div>
              <input id="pw" className="input" type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="At least 6 characters" autoComplete="current-password"/></div>
            {err && <div className="err" role="alert" style={{ marginTop:-6, marginBottom:12 }}>{err}</div>}
            <button className="btn btn-primary btn-lg btn-block" disabled={!!busy}>{busy==='form'?<Icon name="loader-2" className="spin"/>:null}Continue</button>
          </form>
          <p className="faint" style={{ fontSize:13, marginTop:20, textAlign:'center' }}>
            {variant==='student' ? <>Institution or employer? <A to="/switch" className="link">Choose workspace</A></> : <>Student? <A to="/login" className="link">Student login</A></>}
          </p>
        </div>
        <div className="faint" style={{ fontSize:12.5 }}><A to="/">← Back to home</A></div>
      </div>
      <div className="auth-r">
        <div style={{ maxWidth:440 }}>
          <div className="eyebrow">Anshuman’s progress</div>
          <p style={{ fontSize:26, fontWeight:700, letterSpacing:'-.025em', lineHeight:1.3, margin:'12px 0 28px' }}>“I stopped collecting certificates and started closing gaps. My readiness went from 42% to 68% in two months.”</p>
          <div className="card card-pad">
            <div className="between" style={{ marginBottom:14 }}><b>Career readiness</b><span className="chip chip-green"><Icon name="trending-up"/>+26 pts</span></div>
            <div style={{ display:'flex', alignItems:'flex-end', gap:12, height:110 }}>
              {[42,46,51,55,59,63,68].map((v,i)=>(<div key={i} style={{ flex:1, height:v*1.5, background:i===6?'var(--green)':'var(--blue-100)', borderRadius:'4px 4px 0 0' }}/>))}
            </div>
            <div className="between faint" style={{ fontSize:11.5, marginTop:8 }}><span>Jul</span><span>Sep</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Switch(){
  const { update } = useStore();
  const opts = [
    { t:'Student', d:'Your roadmap, projects and readiness.', i:'graduation-cap', to:'/login' },
    { t:'Institution', d:'Learning insights across your students.', i:'building-2', to:'/institution-login' },
    { t:'Industry partner', d:'Share requirements, post projects.', i:'briefcase', to:'/industry-login' },
  ];
  return (
    <div style={{ minHeight:'100vh', display:'grid', placeItems:'center', padding:24, background:'var(--bg)' }}>
      <div style={{ maxWidth:720, width:'100%' }}>
        <Logo/>
        <h1 style={{ fontSize:28, fontWeight:800, margin:'32px 0 6px' }}>Choose a workspace</h1>
        <p className="muted" style={{ marginBottom:24 }}>SkillMitra is built for students, with lighter tools for institutions and employers.</p>
        <div className="grid" style={{ gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))' }}>
          {opts.map(o=>(
            <button key={o.t} className="card card-pad card-hover" style={{ textAlign:'left' }} onClick={()=>{ update({auth:null}); go(o.to); }}>
              <div className="icon-tile"><Icon name={o.i}/></div>
              <div style={{ fontWeight:700, fontSize:16, margin:'16px 0 4px' }}>{o.t}</div>
              <div className="muted" style={{ fontSize:13.5 }}>{o.d}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Onboarding ---------------- */
const SKILL_OPTS = ['Python','Java','C','C++','JavaScript','React','HTML & CSS','Excel','SQL','Power BI','Statistics','Figma','Git'];
const INTEREST_OPTS = [
  { t:'Data Analytics', i:'bar-chart-3' },{ t:'Web Development', i:'code-2' },{ t:'Artificial Intelligence', i:'cpu' },
  { t:'UI/UX', i:'pen-tool' },{ t:'Cloud Computing', i:'cloud' },{ t:'Cybersecurity', i:'shield' },
];
const obCss = `
.ob{min-height:100vh;background:var(--bg);display:flex;flex-direction:column}
.ob-top{height:68px;display:flex;align-items:center;justify-content:space-between;padding:0 32px;background:var(--surface);border-bottom:1px solid var(--line)}
.ob-body{flex:1;display:grid;grid-template-columns:280px 1fr;max-width:1080px;width:100%;margin:0 auto;padding:40px 32px;gap:48px}
.ob-steps{list-style:none;margin:0;padding:0}
.ob-steps li{display:flex;gap:14px;padding:10px 0;position:relative}
.ob-steps li:not(:last-child)::after{content:"";position:absolute;left:13px;top:40px;bottom:-6px;width:2px;background:var(--line)}
.ob-steps li.done::after{background:var(--blue)}
.ob-steps .c{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:700;border:2px solid var(--line);background:var(--surface);color:var(--ink-3);flex-shrink:0}
.ob-steps li.on .c{border-color:var(--blue);color:var(--blue)}
.ob-steps li.done .c{background:var(--blue);border-color:var(--blue);color:#fff}
.sel{display:flex;align-items:center;gap:8px;height:40px;padding:0 14px;border-radius:9px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-weight:600;font-size:14px;transition:all .15s}
.sel:hover{border-color:var(--blue-200)}
.sel.on{background:var(--blue-50);border-color:var(--blue);color:var(--blue)}
.sel svg{width:15px;height:15px}
.opt{display:flex;gap:14px;align-items:flex-start;text-align:left;padding:18px;border-radius:12px;border:1.5px solid var(--line);background:var(--surface);color:var(--ink);transition:all .15s;width:100%}
.opt:hover{border-color:var(--blue-200)}
.opt.on{border-color:var(--blue);box-shadow:0 0 0 3px var(--blue-100)}
.drop{border:1.5px dashed var(--line);border-radius:14px;padding:40px;text-align:center;background:var(--surface-alt);color:var(--ink);transition:all .15s}
.drop.over{border-color:var(--blue);background:var(--blue-50)}
@media (max-width:860px){.ob-body{grid-template-columns:1fr;padding:24px 16px;gap:20px}.ob-steps{display:flex;gap:6px}.ob-steps li{padding:0;flex:1}.ob-steps li::after{display:none}.ob-steps li .lbl{display:none}.ob-steps li{height:4px;border-radius:4px;background:var(--line)}.ob-steps li.on,.ob-steps li.done{background:var(--blue)}.ob-steps .c{display:none}.ob-top{padding:0 16px}}
`;
function Onboarding(){
  const { state, update, notify } = useStore();
  const [step, setStep] = useState(0);
  const [p, setP] = useState({ ...state.profile });
  const [goal, setGoal] = useState(state.goal);
  const [skillQ, setSkillQ] = useState('');
  const [resume, setResume] = useState({ status: 'idle' }); // idle | processing | done
  const [over, setOver] = useState(false);
  const [errs, setErrs] = useState({});
  const labels = ['Basic Profile','Skills','Interests','Career Goal','Resume'];
  const set = (k,v) => setP(x=>({ ...x, [k]:v }));
  const toggle = (k,v) => setP(x=>({ ...x, [k]: x[k].includes(v) ? x[k].filter(s=>s!==v) : [...x[k], v] }));
  const fileRef = useRef();

  const startProcessing = (name) => {
    setResume({ status:'processing', name: name || 'Anshuman_Mishra_Resume.pdf', stage:0 });
    [1,2,3].forEach((s,i)=> setTimeout(()=>setResume(r=>({ ...r, stage:s })), 700*(i+1)));
    setTimeout(()=>setResume(r=>({ ...r, status:'done' })), 2800);
  };
  const next = () => {
    if (step===0){
      const e = {}; ['name','college','degree','branch','semester'].forEach(k=>{ if(!String(p[k]||'').trim()) e[k]='Required'; });
      setErrs(e); if (Object.keys(e).length) return;
    }
    if (step===1 && p.skills.length===0) return setErrs({ skills:'Add at least one skill.' });
    if (step===2 && p.interests.length===0) return setErrs({ interests:'Pick at least one interest.' });
    setErrs({}); setStep(s=>s+1); window.scrollTo(0,0);
  };
  const finish = () => {
    update({ profile:{ ...p, resume: resume.name || p.resume }, goal, onboarded:true });
    go('/analysis?run=1');
  };
  const ready = step===5;

  return (
    <div className="ob"><style>{obCss}</style>
      <div className="ob-top"><Logo/><div className="row"><span className="faint hide-sm" style={{ fontSize:13 }}>{ready?'Complete':`Step ${step+1} of 5`}</span><A to="/dashboard" className="btn btn-ghost btn-sm">Skip for now</A></div></div>
      <div className="ob-body">
        <ol className="ob-steps" aria-label="Onboarding progress">
          {labels.map((l,i)=>(
            <li key={l} className={i<step||ready?'done':i===step?'on':''}>
              <span className="c">{i<step||ready?<Icon name="check" size={14} strokeWidth={3}/>:i+1}</span>
              <span className="lbl"><div style={{ fontWeight:700, fontSize:14, color:i<=step?'var(--ink)':'var(--ink-3)' }}>{l}</div>
                <div className="faint" style={{ fontSize:12.5 }}>{['About you','What you know','What excites you','Where you’re headed','Fill in the details'][i]}</div></span>
            </li>
          ))}
        </ol>
        <div className="card" style={{ padding:'36px 40px', minHeight:480, display:'flex', flexDirection:'column' }} key={step}>
          <div className="reveal" style={{ flex:1 }}>
          {step===0 && <>
            <h2 style={{ fontSize:24, fontWeight:800 }}>Let’s start with you</h2>
            <p className="muted" style={{ margin:'6px 0 28px' }}>This helps us understand your academic stage.</p>
            <div className="field"><label className="label" htmlFor="f-name">Full name</label><input id="f-name" className="input" value={p.fullName} onChange={e=>{ set('fullName', e.target.value); set('name', e.target.value.split(' ')[0]); }}/>{errs.name && <div className="err">{errs.name}</div>}</div>
            <div className="field"><label className="label" htmlFor="f-col">College</label><input id="f-col" className="input" value={p.college} onChange={e=>set('college',e.target.value)}/>{errs.college && <div className="err">{errs.college}</div>}</div>
            <div className="grid" style={{ gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:14 }}>
              <div className="field"><label className="label" htmlFor="f-deg">Degree</label><select id="f-deg" className="input" value={p.degree} onChange={e=>set('degree',e.target.value)}>{['B.Tech','B.E.','B.Sc','BCA','MCA','M.Tech'].map(o=><option key={o}>{o}</option>)}</select></div>
              <div className="field"><label className="label" htmlFor="f-br">Branch</label><input id="f-br" className="input" value={p.branch} onChange={e=>set('branch',e.target.value)}/>{errs.branch && <div className="err">{errs.branch}</div>}</div>
              <div className="field"><label className="label" htmlFor="f-sem">Semester</label><select id="f-sem" className="input" value={p.semester} onChange={e=>set('semester',e.target.value)}>{['1','2','3','4','5','6','7','8'].map(o=><option key={o}>{o}</option>)}</select></div>
            </div>
          </>}
          {step===1 && <>
            <h2 style={{ fontSize:24, fontWeight:800 }}>What skills do you have?</h2>
            <p className="muted" style={{ margin:'6px 0 24px' }}>Add anything you’ve used in coursework or projects. We’ll verify levels later.</p>
            <form className="row" style={{ marginBottom:18 }} onSubmit={e=>{e.preventDefault(); const v=skillQ.trim(); if(v && !p.skills.includes(v)) set('skills',[...p.skills,v]); setSkillQ('');}}>
              <input className="input" value={skillQ} onChange={e=>setSkillQ(e.target.value)} placeholder="Type a skill and press Enter" aria-label="Add skill"/>
              <button className="btn btn-secondary" style={{ height:44 }}><Icon name="plus"/>Add</button>
            </form>
            {p.skills.length>0 && <div style={{ marginBottom:22 }}><div className="eyebrow" style={{ marginBottom:10 }}>Your skills · {p.skills.length}</div>
              <div className="row" style={{ flexWrap:'wrap', gap:8 }}>{p.skills.map(s=><button key={s} className="sel on" onClick={()=>toggle('skills',s)} aria-label={`Remove ${s}`}>{s}<Icon name="x"/></button>)}</div></div>}
            <div className="eyebrow" style={{ marginBottom:10 }}>Suggestions</div>
            <div className="row" style={{ flexWrap:'wrap', gap:8 }}>{SKILL_OPTS.filter(s=>!p.skills.includes(s)).map(s=><button key={s} className="sel" onClick={()=>toggle('skills',s)}><Icon name="plus"/>{s}</button>)}</div>
            {errs.skills && <div className="err">{errs.skills}</div>}
          </>}
          {step===2 && <>
            <h2 style={{ fontSize:24, fontWeight:800 }}>What are you interested in?</h2>
            <p className="muted" style={{ margin:'6px 0 24px' }}>Pick one or more. This shapes project and course suggestions.</p>
            <div className="grid" style={{ gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12 }}>
              {INTEREST_OPTS.map(o=>{ const on=p.interests.includes(o.t); return (
                <button key={o.t} className={`opt ${on?'on':''}`} onClick={()=>toggle('interests',o.t)} aria-pressed={on}>
                  <div className={`icon-tile ${on?'':'gray'}`}><Icon name={o.i}/></div>
                  <div style={{ flex:1, fontWeight:700, paddingTop:8 }}>{o.t}</div>
                  {on && <Icon name="check-circle-2" size={18} style={{ color:'var(--blue)', marginTop:9 }}/>}
                </button>);})}
            </div>
            {errs.interests && <div className="err">{errs.interests}</div>}
          </>}
          {step===3 && <>
            <h2 style={{ fontSize:24, fontWeight:800 }}>Where are you headed?</h2>
            <p className="muted" style={{ margin:'6px 0 24px' }}>Choose a target career. You can change this anytime.</p>
            <div className="grid" style={{ gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:12 }}>
              {Object.values(D.roles).map(r=>{ const on=goal===r.id; return (
                <button key={r.id} className={`opt ${on?'on':''}`} onClick={()=>setGoal(r.id)} aria-pressed={on}>
                  <div className={`icon-tile ${on?'':'gray'}`}><Icon name={r.icon}/></div>
                  <div style={{ flex:1 }}>
                    <div className="between"><b style={{ fontSize:15 }}>{r.title}</b>{on && <Icon name="check-circle-2" size={18} style={{ color:'var(--blue)' }}/>}</div>
                    <div className="muted" style={{ fontSize:13, marginTop:4 }}>{r.summary}</div>
                    <div className="row" style={{ gap:6, marginTop:10, flexWrap:'wrap' }}>{r.required.slice(0,3).map(s=><span key={s.skill} className="tag" style={{ height:22, fontSize:11.5 }}>{s.skill}</span>)}</div>
                  </div>
                </button>);})}
            </div>
            {p.interests.includes('Data Analytics') && <p className="hint" style={{ marginTop:14 }}><Icon name="sparkles" size={13}/> Based on your interest in Data Analytics, <b>Data Analyst</b> is a strong fit.</p>}
          </>}
          {step===4 && <>
            <h2 style={{ fontSize:24, fontWeight:800 }}>Upload your resume</h2>
            <p className="muted" style={{ margin:'6px 0 24px' }}>We’ll extract skills, projects and experience to make your analysis more accurate.</p>
            {resume.status==='idle' && (
              <div className={`drop ${over?'over':''}`} onDragOver={e=>{e.preventDefault();setOver(true);}} onDragLeave={()=>setOver(false)}
                onDrop={e=>{e.preventDefault();setOver(false); const f=e.dataTransfer.files[0]; startProcessing(f&&f.name);}}>
                <div className="icon-tile" style={{ margin:'0 auto 14px', width:48, height:48 }}><Icon name="upload-cloud"/></div>
                <b style={{ fontSize:15 }}>Drag your resume here</b>
                <p className="faint" style={{ fontSize:13, margin:'4px 0 18px' }}>PDF or DOCX, up to 5 MB</p>
                <div className="row" style={{ justifyContent:'center', flexWrap:'wrap' }}>
                  <button className="btn btn-primary" onClick={()=>fileRef.current.click()}><Icon name="upload"/>Upload Resume</button>
                  <button className="btn btn-secondary" onClick={()=>startProcessing()}>Use sample resume</button>
                </div>
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" hidden onChange={e=>{ const f=e.target.files[0]; if(f) startProcessing(f.name); }}/>
              </div>
            )}
            {resume.status!=='idle' && (
              <div className="card card-pad" style={{ background:'var(--bg)' }}>
                <div className="row"><div className="icon-tile"><Icon name="file-text"/></div><div style={{ flex:1, minWidth:0 }}><b style={{ wordBreak:'break-all' }}>{resume.name}</b><div className="faint" style={{ fontSize:12.5 }}>{resume.status==='done'?'Processed':'Processing…'}</div></div>
                  {resume.status==='done' ? <span className="chip chip-green"><Icon name="check"/>Done</span> : <Icon name="loader-2" className="spin" style={{ color:'var(--blue)' }}/>}</div>
                <div className="divider"/>
                {['Reading document','Extracting skills & projects','Matching to your profile'].map((t,i)=>{
                  const st = resume.status==='done' || resume.stage>i+1 ? 'done' : resume.stage===i+1 || (i===0 && resume.stage===0) ? 'run' : 'wait';
                  return <div key={t} className="row" style={{ padding:'6px 0', fontSize:14, color: st==='wait'?'var(--ink-3)':'var(--ink)' }}>
                    {st==='done'?<Icon name="check-circle-2" size={17} style={{ color:'var(--green)' }}/>:st==='run'?<Icon name="loader-2" size={17} className="spin" style={{ color:'var(--blue)' }}/>:<Icon name="circle" size={17}/>}{t}</div>;
                })}
                {resume.status==='done' && <div className="reveal" style={{ marginTop:14 }}>
                  <div className="eyebrow" style={{ marginBottom:8 }}>Found in resume</div>
                  <div className="row" style={{ flexWrap:'wrap', gap:6 }}>{['Python','Excel','C','pandas','2 projects','Coursework: DBMS'].map(s=><span key={s} className="tag">{s}</span>)}</div>
                </div>}
              </div>
            )}
          </>}
          {ready && (
            <div style={{ textAlign:'center', padding:'24px 0' }}>
              <div className="icon-tile green" style={{ margin:'0 auto 18px', width:56, height:56, borderRadius:14 }}><Icon name="check" size={26} strokeWidth={2.6}/></div>
              <h2 style={{ fontSize:28, fontWeight:800 }}>Your profile is ready.</h2>
              <p className="muted" style={{ margin:'8px auto 28px', maxWidth:420 }}>We have everything we need to analyse your skills against the <b>{D.roles[goal].title}</b> path.</p>
              <div className="row" style={{ justifyContent:'center', gap:8, flexWrap:'wrap', marginBottom:32 }}>
                <span className="tag">{p.degree} {p.branch.split(' ')[0]} · Sem {p.semester}</span>
                <span className="tag">{p.skills.length} skills</span>
                <span className="tag">{p.interests.length} interests</span>
                <span className="tag">Resume {resume.status==='done'?'processed':'skipped'}</span>
              </div>
              <button className="btn btn-primary btn-lg" onClick={finish}>Analyze My Skills<Icon name="arrow-right"/></button>
            </div>
          )}
          </div>
          {!ready && <div className="between" style={{ marginTop:32, paddingTop:20, borderTop:'1px solid var(--line-2)' }}>
            <button className="btn btn-ghost" onClick={()=>step===0?go('/login'):setStep(s=>s-1)}><Icon name="arrow-left"/>Back</button>
            <div className="row">
              {step===4 && resume.status==='idle' && <button className="btn btn-ghost" onClick={()=>setStep(5)}>Skip</button>}
              <button className="btn btn-primary" onClick={next} disabled={step===4 && resume.status!=='done'}>{step===4?'Finish':'Continue'}<Icon name="arrow-right"/></button>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Landing, Login, Onboarding, Switch });
