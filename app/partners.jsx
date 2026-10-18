/* SkillMitra — Institution & Industry dashboards (secondary) */
import React, { useState, useEffect } from 'react';

const ptCss = `
.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.kpi{padding:18px 20px}
.kpi .v{font-size:30px;font-weight:800;letter-spacing:-.035em;line-height:1.1;margin-top:6px}
.pt-2{display:grid;grid-template-columns:1.3fr 1fr;gap:20px;margin-top:20px}
.hbar{display:grid;grid-template-columns:120px 1fr 44px;gap:12px;align-items:center;padding:9px 0;font-size:13.5px}
.ind-wrap{display:grid;grid-template-columns:1fr 360px;gap:20px;align-items:start}
@media (max-width:1024px){.kpis{grid-template-columns:1fr 1fr}.pt-2,.ind-wrap{grid-template-columns:1fr}}
@media (max-width:520px){.kpis{grid-template-columns:1fr 1fr}.kpi .v{font-size:24px}.hbar{grid-template-columns:96px 1fr 36px}}
`;

function HBar({ label, n, max, tone='blue' }){
  const m = useMounted(120);
  return (
    <div className="hbar">
      <span style={{ fontWeight:600 }}>{label}</span>
      <div className="bar" style={{ height:10 }}><i style={{ width:(m?n/max*100:0)+'%', background: tone==='amber'?'#D9921F':'var(--blue)' }}/></div>
      <b className="num" style={{ textAlign:'right' }}>{n}</b>
    </div>
  );
}

function LineChart({ data, labels }){
  const W=560, H=180, P=24;
  const min=40, max=70;
  const x = i => P + i*(W-2*P)/(data.length-1);
  const y = v => H-P - (v-min)/(max-min)*(H-2*P);
  const d = data.map((v,i)=>`${i?'L':'M'}${x(i)},${y(v)}`).join(' ');
  const area = d + ` L${x(data.length-1)},${H-P} L${x(0)},${H-P} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width:'100%', height:'auto', display:'block' }} role="img" aria-label="Average readiness trend">
      {[40,50,60,70].map(g=><g key={g}><line x1={P} x2={W-P} y1={y(g)} y2={y(g)} stroke="var(--line)"/><text x={0} y={y(g)+4} fontSize="10" fill="var(--ink-3)" fontFamily="IBM Plex Mono">{g}</text></g>)}
      <path d={area} fill="var(--blue)" opacity=".12"/>
      <path d={d} fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinejoin="round"/>
      {data.map((v,i)=><circle key={i} cx={x(i)} cy={y(v)} r={i===data.length-1?5:3} fill={i===data.length-1?'var(--blue)':'var(--surface)'} stroke="var(--blue)" strokeWidth="2"/>)}
      {labels.map((l,i)=><text key={l} x={x(i)} y={H-4} fontSize="10.5" textAnchor="middle" fill="var(--ink-3)">{l}</text>)}
    </svg>
  );
}

function Institution(){
  const I = D.institution;
  const { notify } = useStore();
  const [range, setRange] = useState('Semester');
  return (<>
    <style>{ptCss}</style>
    <PageHead eyebrow={I.name} title="Learning Insights" sub="How your students are progressing toward their career goals."
      right={<><div className="tabs" style={{ margin:0, border:0 }}>{['Month','Semester','Year'].map(r=><button key={r} className={range===r?'on':''} onClick={()=>setRange(r)}>{r}</button>)}</div>
        <button className="btn btn-secondary" onClick={()=>notify('Report exported (demo)')}><Icon name="download"/>Export</button></>}/>
    <div className="kpis">
      {[['Total Students',I.students,'users',null],['Average Readiness',I.avgReadiness+'%','gauge',`+${I.avgDelta} pts`],['Active Learners',I.activeLearners,'activity',`${Math.round(I.activeLearners/I.students*100)}% of total`],['Skills Validated',I.validated.toLocaleString('en-IN'),'badge-check','This semester']].map(([l,v,ic,s])=>(
        <div key={l} className="card kpi">
          <div className="between"><span className="faint" style={{ fontSize:13, fontWeight:600 }}>{l}</span><Icon name={ic} size={17} className="faint"/></div>
          <div className="v num">{v}</div>
          {s && <div style={{ fontSize:12.5, fontWeight:600, color: s.startsWith('+')?'var(--green)':'var(--ink-3)' }}>{s}</div>}
        </div>
      ))}
    </div>
    <div className="pt-2">
      <div className="card card-pad">
        <div className="card-head"><div><h3 className="card-title">Average readiness</h3><div className="faint" style={{ fontSize:13 }}>All students · {range.toLowerCase()} view</div></div><span className="chip chip-green"><Icon name="trending-up"/>+13 pts since Feb</span></div>
        <LineChart data={I.trend} labels={I.trendLabels}/>
      </div>
      <div className="card card-pad">
        <div className="card-head"><h3 className="card-title">Top Skill Gaps</h3><span className="faint" style={{ fontSize:12 }}>students</span></div>
        {I.gaps.map((g,i)=><HBar key={g.s} label={g.s} n={g.n} max={I.gaps[0].n} tone={i===0?'amber':'blue'}/>)}
      </div>
    </div>
    <div className="pt-2">
      <div className="card" style={{ overflow:'hidden' }}>
        <div className="card-pad" style={{ paddingBottom:8 }}><h3 className="card-title">Learning Progress by cohort</h3></div>
        <table className="tbl tbl-resp">
          <thead><tr><th>Cohort</th><th>Students</th><th>Readiness</th><th>Roadmap progress</th></tr></thead>
          <tbody>{I.cohorts.map(c=>(
            <tr key={c.c}>
              <td className="full" data-l="Cohort"><b>{c.c}</b></td>
              <td data-l="Students" className="num">{c.n}</td>
              <td data-l="Readiness"><b className="num">{c.r}%</b></td>
              <td data-l="Progress" style={{ minWidth:140 }}><div className="row" style={{ gap:10 }}><Bar value={c.p} size="sm" style={{ flex:1 }}/><span className="num" style={{ fontSize:13 }}>{c.p}%</span></div></td>
            </tr>))}</tbody>
        </table>
      </div>
      <div>
        <div className="card card-pad" style={{ background:'var(--blue-50)', borderColor:'var(--blue-100)' }}>
          <div className="row" style={{ gap:8, marginBottom:10 }}><Icon name="lightbulb" size={17} style={{ color:'var(--blue)' }}/><b>Curriculum Insight</b></div>
          <p style={{ fontSize:15, lineHeight:1.55 }}>SQL appears as a common skill gap across Data Analytics learners.</p>
          <p className="muted" style={{ fontSize:13, marginTop:8 }}>42 of 138 students targeting Data Analyst are below the required SQL level. Consider a lab-based SQL elective in Semester 5.</p>
          <button className="btn btn-primary btn-sm" style={{ marginTop:14 }} onClick={()=>notify('Insight shared with curriculum committee')}>Share with faculty</button>
        </div>
        <div className="card card-pad" style={{ marginTop:16 }}>
          <h3 className="card-title" style={{ marginBottom:10 }}>Career goals</h3>
          {I.goals.map(g=><HBar key={g.g} label={g.g} n={g.n} max={I.goals[0].n}/>)}
        </div>
      </div>
    </div>
  </>);
}

function Industry(){
  const X = D.industry;
  const { notify } = useStore();
  const [skills, setSkills] = useState(X.skills);
  const [newS, setNewS] = useState('');
  const [posted, setPosted] = useState(X.posted);
  const [form, setForm] = useState(null); // 'project' | 'internship'
  const [title, setTitle] = useState('');
  const add = e => { e.preventDefault(); const v=newS.trim(); if(v && !skills.some(s=>s.s===v)){ setSkills([...skills,{s:v,l:'Intermediate'}]); } setNewS(''); };
  const post = e => { e.preventDefault(); if(!title.trim()) return; setPosted([{ t:title, type: form==='project'?'Real-world project':'Internship', apps:0, status:'Open' }, ...posted]); setTitle(''); setForm(null); notify('Published to matching students'); };
  return (<>
    <style>{ptCss}</style>
    <PageHead eyebrow={X.org} title="Role Requirements" sub="Tell students what your teams need. SkillMitra turns it into learning paths."
      right={<><button className="btn btn-secondary" onClick={()=>setForm('project')}><Icon name="folder-plus"/>Post project</button><button className="btn btn-primary" onClick={()=>setForm('internship')}><Icon name="plus"/>Offer internship</button></>}/>
    <div className="ind-wrap">
      <div>
        <div className="card card-pad">
          <div className="card-head"><div><div className="eyebrow">Role</div><h2 style={{ fontSize:22, fontWeight:800, marginTop:4 }}>{X.role}</h2></div><span className="chip chip-green"><span className="dot"/>Shared</span></div>
          <div className="eyebrow" style={{ marginBottom:10 }}>Required skills</div>
          {skills.map((s,i)=>(
            <div key={s.s} className="between" style={{ padding:'12px 0', borderTop:'1px solid var(--line-2)' }}>
              <b>{s.s}</b>
              <div className="row" style={{ gap:8 }}>
                <select className="input" style={{ height:34, width:150, fontSize:13 }} value={s.l} aria-label={`${s.s} level`} onChange={e=>setSkills(skills.map((x,k)=>k===i?{...x,l:e.target.value}:x))}>{['Beginner','Intermediate','Advanced'].map(l=><option key={l}>{l}</option>)}</select>
                <button className="iconbtn" style={{ width:34, height:34 }} aria-label={`Remove ${s.s}`} onClick={()=>setSkills(skills.filter((_,k)=>k!==i))}><Icon name="x" size={15}/></button>
              </div>
            </div>
          ))}
          <form className="row" style={{ marginTop:12 }} onSubmit={add}><input className="input" value={newS} onChange={e=>setNewS(e.target.value)} placeholder="Add a skill, e.g. Statistics" aria-label="Add skill"/><button className="btn btn-secondary" style={{ height:44 }}>Add</button></form>
          <div className="row" style={{ justifyContent:'flex-end', marginTop:16 }}><button className="btn btn-primary" onClick={()=>notify('Requirements shared with 38 partner colleges')}><Icon name="share-2"/>Share skill requirements</button></div>
        </div>
        <div className="card" style={{ marginTop:20, overflow:'hidden' }}>
          <div className="card-pad" style={{ paddingBottom:8 }}><h3 className="card-title">Projects & internships</h3></div>
          {form && (
            <form className="card-pad reveal" style={{ background:'var(--bg)', borderTop:'1px solid var(--line-2)', borderBottom:'1px solid var(--line-2)' }} onSubmit={post}>
              <label className="label" htmlFor="pt">{form==='project'?'Project title':'Internship title'}</label>
              <div className="row" style={{ flexWrap:'wrap' }}><input id="pt" className="input" style={{ flex:1, minWidth:200 }} autoFocus value={title} onChange={e=>setTitle(e.target.value)} placeholder={form==='project'?'e.g. Inventory Forecasting Challenge':'e.g. Data Analyst Intern · 3 months'}/>
                <button className="btn btn-primary" style={{ height:44 }} disabled={!title.trim()}>Publish</button><button type="button" className="btn btn-ghost" style={{ height:44 }} onClick={()=>setForm(null)}>Cancel</button></div>
            </form>
          )}
          <table className="tbl tbl-resp"><thead><tr><th>Title</th><th>Type</th><th>Applicants</th><th>Status</th></tr></thead>
            <tbody>{posted.map(p=>(
              <tr key={p.t}><td className="full" data-l="Title"><b>{p.t}</b></td><td data-l="Type" className="muted">{p.type}</td><td data-l="Applicants" className="num">{p.apps}</td>
                <td data-l="Status"><span className={`chip ${p.status==='Open'?'chip-green':'chip-amber'}`}>{p.status}</span></td></tr>))}</tbody>
          </table>
        </div>
      </div>
      <div style={{ position:'sticky', top:84 }}>
        <div className="card card-pad">
          <div className="icon-tile green"><Icon name="user-check"/></div>
          <div className="num" style={{ fontSize:44, fontWeight:800, letterSpacing:'-.04em', marginTop:14, lineHeight:1 }}>{Math.max(6, X.matches - (skills.length-4)*5)}</div>
          <p style={{ fontSize:15, fontWeight:600, marginTop:6 }}>students currently match the core skill requirements.</p>
          <p className="faint" style={{ fontSize:13, marginTop:6 }}>Another {X.near} are within one skill — most commonly Power BI.</p>
          <div className="divider"/>
          <div className="eyebrow" style={{ marginBottom:8 }}>Match funnel</div>
          {[['On SkillMitra path',412],['Within one skill',X.near+X.matches],['Full match',X.matches]].map(([l,n],k)=>(
            <div key={l} style={{ marginBottom:10 }}><div className="between" style={{ fontSize:13, marginBottom:4 }}><span className="muted">{l}</span><b className="num">{n}</b></div><Bar value={n/412*100} size="sm" tone={k===2?'green':''}/></div>
          ))}
          <p className="faint" style={{ fontSize:12, marginTop:12 }}>Students choose whether to share their profile with partners.</p>
        </div>
      </div>
    </div>
  </>);
}

Object.assign(window, { Institution, Industry });
