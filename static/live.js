const box=document.getElementById('live');let stage=null;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function tick(){try{const r=await fetch('/api/live',{cache:'no-store'});if(!r.ok)return;const d=await r.json();
if(stage&&stage!==d.stage)return location.reload();stage=d.stage;
const voting=d.stage==='voting'||d.stage==='closed';
let o='<div class=stats>'+d.stats.map(s=>`<div class=stat><b>${s[1]}</b><span>${esc(s[0])}</span></div>`).join('')+'</div><div class=grid>';
d.cats.forEach(c=>{const mx=Math.max(1,...c.items.map(i=>i.n));
o+=`<div class=card><h3>${esc(c.name)}</h3><div class=mut style="margin-bottom:6px">${voting?'Votes':'Nominations'}: ${c.total} · ${c.slots} candidate slot(s)</div>`+
(c.items.length?c.items.map((i,k)=>`<div class=row><div style="width:42%;font-size:13px;${i.top?'':'opacity:.55'}">${d.stage==='closed'&&k===0&&i.n?'🏆 ':''}${esc(i.name)}</div><div class=bar><i style="width:${i.n/mx*100}%"></i></div><b>${i.n}</b></div>`).join(''):'<p class=mut>Nothing yet.</p>')+'</div>'});
box.innerHTML=o+'</div>'}catch(e){}}
tick();setInterval(tick,2000);
