(function(){
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function toast(t){var e=$("#toast");e.textContent=t;e.classList.add("on");setTimeout(function(){e.classList.remove("on")},2200)}
/* links + photo */
function setLinks(sel,url){$$(sel).forEach(function(a){if(url){a.href=url;var s=a.querySelector("[data-t]");if(s)s.textContent=url.replace(/^https?:\/\/(www\.)?/,"")}else a.classList.add("hid")})}
setLinks("[data-gh]",CONFIG.github);setLinks("[data-li]",CONFIG.linkedin);
if(CONFIG.photo){var im=new Image();im.alt="Arjun Ajikumar, Data Analyst";im.decoding="async";im.src=CONFIG.photo;$("#phimg").textContent="";$("#phimg").appendChild(im)}
/* word-split headings */
function wrap(n,c){Array.prototype.slice.call(n.childNodes).forEach(function(k){if(k.nodeType===3){var f=document.createDocumentFragment();k.textContent.split(/(\s+)/).forEach(function(w){if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(" "));return}var s=document.createElement("span");s.className="w";var i=document.createElement("i");i.style.setProperty("--i",c.n++);i.textContent=w;s.appendChild(i);f.appendChild(s)});k.replaceWith(f)}else if(k.nodeType===1)wrap(k,c)})}
$$(".sp").forEach(function(e){wrap(e,{n:0})});
/* projects */
var g=$("#pgrid"),P=CONFIG.projects||[];
if(!P.length)g.innerHTML='<div class="empty">Projects are being added. Check back soon.</div>';
P.forEach(function(p,i){var a=document.createElement("article");a.className="pj rv";a.dataset.t=(p.tech||[]).join("|");
 var notes=(p.notes&&p.notes.length)?"<h5>Highlights</h5><ul>"+p.notes.map(function(x){return"<li>"+esc(x)+"</li>"}).join("")+"</ul>":"";
 a.innerHTML='<a class="th" href="'+esc(p.url)+'" target="_blank" rel="noopener" aria-label="Open '+esc(p.title)+' on GitHub">'+(p.image?'<img loading="lazy" decoding="async" alt="'+esc(p.title)+' preview" src="'+esc(p.image)+'">':'')+'<div class="ov">View project →</div></a><div class="meta"><span class="no">0'+(i+1).toString().slice(-2).replace(/^(\d)$/,"$1")+'</span><span class="cat">'+esc(p.category||"Project")+'</span></div><h3>'+esc(p.title)+'</h3><p>'+esc(p.desc||"")+'</p><div class="tags">'+(p.tech||[]).map(function(x){return"<span>"+esc(x)+"</span>"}).join("")+'</div><div class="acts"><button class="cs" type="button" aria-expanded="false">Case study <b>+</b></button><a href="'+esc(p.url)+'" target="_blank" rel="noopener">Repository ↗</a></div><div class="panel"><div><div class="in2"><h5>What it is</h5><p style="margin:0 0 8px">'+esc(p.desc||"")+'</p>'+notes+'<h5>Tools</h5><p style="margin:0">'+esc((p.tech||[]).join(" · ")||"—")+'</p></div></div></div>';
 var n=i+1;a.querySelector(".no").textContent=(n<10?"0":"")+n;
 a.querySelector(".cs").onclick=function(){var o=a.classList.toggle("open");this.setAttribute("aria-expanded",o)};
 g.appendChild(a)});
/* skill ↔ project highlight */
$$(".tool").forEach(function(t){var k=t.dataset.k,hits=$$(".pj").filter(function(p){return p.dataset.t.split("|").indexOf(k)>-1});
 if(hits.length)$(".cnt",t).textContent="Used in "+hits.length+(hits.length>1?" projects":" project");
 function on(){$$(".pj").forEach(function(p){p.classList.toggle("dim",hits.indexOf(p)<0)})}function off(){$$(".pj").forEach(function(p){p.classList.remove("dim")})}
 if(hits.length){t.addEventListener("mouseenter",on);t.addEventListener("mouseleave",off);t.addEventListener("focus",on);t.addEventListener("blur",off)}});
/* menu */
var menu=$("#menu");function sm(o){menu.classList.toggle("open",o);menu.setAttribute("aria-hidden",!o);$("#mOpen").setAttribute("aria-expanded",o)}
$("#mOpen").onclick=function(){sm(true)};$("#mClose").onclick=function(){sm(false)};
$$("#menu a").forEach(function(a){a.addEventListener("click",function(){sm(false)})});
document.addEventListener("keydown",function(e){if(e.key==="Escape")sm(false)});
/* reveal */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
$$(".rv,.sp").forEach(function(e){io.observe(e)});
setTimeout(function(){$("#h1").classList.add("in")},150);
/* count-up */
var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;cio.unobserve(e.target);var end=+e.target.dataset.n,t0=performance.now();if(RM)return;(function f(t){var p=Math.min(1,(t-t0)/1200);e.target.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)})},{threshold:.6});
$$("[data-n]").forEach(function(e){cio.observe(e)});
/* nav active */
var links=$$(".dn a"),secs=["about","log","projects","skills","experience","contact"].map(function(i){return document.getElementById(i)});
var sio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)links.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id)})})},{rootMargin:"-45% 0px -50% 0px"});
secs.forEach(function(s){if(s)sio.observe(s)});
/* scroll effects */
var hd=$("#hd"),pr=$("#prog"),ph=$("#ph"),tlw=$("#tlw"),ly=0,tk=false;
function onS(){var y=scrollY,h=document.documentElement.scrollHeight-innerHeight;pr.style.transform="scaleX("+(h>0?y/h:0)+")";hd.classList.toggle("sc",y>30);hd.classList.toggle("hide",y>ly&&y>260&&!menu.classList.contains("open"));ly=y;
 if(!RM&&y<900)ph.style.transform="translateY("+y*.07+"px)";
 var r=tlw.getBoundingClientRect();tlw.style.setProperty("--p",Math.max(0,Math.min(1,(innerHeight*.65-r.top)/r.height)));tk=false}
addEventListener("scroll",function(){if(!tk){tk=true;requestAnimationFrame(onS)}},{passive:true});onS();
$$(".ms").forEach(function(m){});
/* hero glow follows pointer */
var hero=$("#home"),au=$("#aura");if(!RM)hero.addEventListener("pointermove",function(e){var r=hero.getBoundingClientRect();au.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%");au.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%")});
/* copy email */
var cb=$("#copy");if(cb)cb.onclick=function(){var e="arjunajikumar002@gmail.com";(navigator.clipboard?navigator.clipboard.writeText(e):Promise.reject()).then(function(){toast("Email copied ✓")},function(){toast(e)})};
/* commit log */
(function(){var u=(CONFIG.github||"").split("/").pop(),sec=$("#log");if(!u){sec.classList.add("hid");return}
fetch("https://github-contributions-api.jogruber.de/v4/"+u+"?y=last").then(function(r){return r.json()}).then(function(d){var a=d.contributions||[];if(!a.length)throw 0;
var hm=$("#hm"),tot=0,act=0,run=0,best=0,f=document.createDocumentFragment(),pad=new Date(a[0].date+"T00:00:00").getDay();
for(var i=0;i<pad;i++)f.appendChild(document.createElement("i")).style.visibility="hidden";
a.forEach(function(x){var s=document.createElement("i");s.className="l"+x.level;s.dataset.t=new Date(x.date+"T00:00:00").toDateString()+": "+x.count+(x.count===1?" contribution":" contributions");f.appendChild(s);tot+=x.count;if(x.count){act++;run++;if(run>best)best=run}else run=0});
hm.appendChild(f);$("#hs1").textContent=tot;$("#hs2").textContent=act;$("#hs3").textContent=best+" days";
function hint(e){if(e.target.dataset&&e.target.dataset.t)$("#hint").textContent=e.target.dataset.t}hm.addEventListener("mouseover",hint);hm.addEventListener("click",hint)}).catch(function(){sec.classList.add("hid");links.forEach(function(a){if(a.getAttribute("href")==="#log")a.classList.add("hid")})})})();
})();
