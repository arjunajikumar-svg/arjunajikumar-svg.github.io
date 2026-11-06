(function(){
var $=function(s){return document.querySelector(s)},$$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
/* loader */
var n=0,t=setInterval(function(){n=Math.min(100,n+Math.ceil(Math.random()*7));$("#pct").textContent=n;$("#bar").style.width=n+"%";if(n>=100){clearInterval(t);$("#enter").classList.add("on");$("#enter").focus()}},60);
$("#enter").onclick=function(){$("#loader").classList.add("out");setTimeout(function(){$("#loader").style.display="none"},950)};
/* links */
function setLinks(sel,url,txt){$$(sel).forEach(function(a){if(url){a.href=url;var s=a.querySelector("span");if(s)s.textContent=url.replace(/^https?:\/\/(www\.)?/,"")}else a.classList.add("hid")})}
setLinks("[data-gh]",CONFIG.github);setLinks("[data-li]",CONFIG.linkedin);
if(!CONFIG.github)$("#github").classList.add("hid");
/* photo */
if(CONFIG.photo){var im=new Image();im.alt="Arjun Ajikumar, Data Analyst";im.decoding="async";im.src=CONFIG.photo;$("#phimg").textContent="";$("#phimg").appendChild(im)}
/* projects */
var g=$("#pgrid"),P=CONFIG.projects||[];
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
if(!P.length){g.innerHTML='<div class="empty">My GitHub projects are being added here. Check back soon.</div>'}
else P.forEach(function(p,i){var a=document.createElement("a");a.className="pj rv";a.href=p.url;a.target="_blank";a.rel="noopener";
 a.innerHTML='<div class="th">'+(p.image?'<img loading="lazy" decoding="async" alt="'+esc(p.title)+' preview" src="'+esc(p.image)+'">':'')+'<div class="ov">View Project →</div></div><div class="meta"><span class="no">0'+(i+1)+'</span><span class="cat">'+esc(p.category||"Project")+'</span></div><h3>'+esc(p.title)+'</h3><p>'+esc(p.desc||"")+'</p><div class="tags">'+(p.tech||[]).map(function(x){return"<span>"+esc(x)+"</span>"}).join("")+'</div><span class="go">View Project →</span>';
 g.appendChild(a)});
/* menu */
var menu=$("#menu");function sm(o){menu.classList.toggle("open",o);menu.setAttribute("aria-hidden",!o);$("#mOpen").setAttribute("aria-expanded",o)}
$("#mOpen").onclick=function(){sm(true)};$("#mClose").onclick=function(){sm(false)};
$$("#menu a").forEach(function(a){a.addEventListener("click",function(){sm(false)})});
document.addEventListener("keydown",function(e){if(e.key==="Escape")sm(false)});
function tick(){$("#lt").textContent=new Date().toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}tick();setInterval(tick,30000);
/* scroll fx */
var hd=$("#hd"),ph=$("#ph"),rm=matchMedia("(prefers-reduced-motion:reduce)").matches,tk=false;
addEventListener("scroll",function(){if(tk)return;tk=true;requestAnimationFrame(function(){var y=scrollY;hd.classList.toggle("sc",y>30);if(!rm&&y<900)ph.style.transform="translateY("+(y*.08)+"px)";tk=false})},{passive:true});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
$$(".rv").forEach(function(e){io.observe(e)});
})();
