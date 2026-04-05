(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();function M(i,r,a,s,t,o,n){const e=`https://placehold.co/600x400/D50032/ffffff?text=${encodeURIComponent(r)}`,u=n||e,l=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s} ${o} Cardiff University UK`)}`,c=t||o?`<a href="${l}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold hover:underline mt-1 pl-6 block relative z-20 transition-colors cursor-pointer w-fit">
            ${t} ${o}
           </a>`:"";return`
        <div data-topic-id="${i}" class="event-card relative group cursor-pointer transition-all duration-300 h-full">
            <div class="absolute -inset-0.5 bg-red-600 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-500"></div>
            
            <div class="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col h-full z-10">
                
                <div class="h-40 w-full overflow-hidden bg-gray-100 relative">
                    <img src="${u}" alt="${r}" 
                         referrerpolicy="no-referrer"
                         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                         onerror="this.onerror=null; this.src='${e}'">
                </div>

                <div class="p-5 flex flex-col flex-grow">
                    <div class="flex justify-between items-start mb-3 relative z-20">
                        <span class="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-[10px] uppercase tracking-widest font-black px-2 py-1 rounded">
                            ${a}
                        </span>
                    </div>
                    
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">
                        ${r}
                    </h3>

                    <div class="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col">
                        <div class="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300">
                            <svg class="w-4 h-4 mr-2 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                            <span class="truncate">${s}</span>
                        </div>
                        ${c}
                    </div>
                </div>
            </div>
        </div>
    `}function j(i,r){const a=document.createElement("header");a.className="bg-cardiff-red text-white shadow-md sticky top-0 z-50 transition-colors duration-300",a.innerHTML=`
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        
        <div id="logo-home-btn" class="flex items-center gap-3 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity" title="Return Home">
          <img src="public/cu-logo.svg" alt="Cardiff University Logo" class="h-8 w-auto bg-white p-1 rounded shrink-0" onerror="this.src='/cu-logo.svg'" />
          <span class="font-bold text-base sm:text-lg truncate">Open Day Planner</span>
        </div>

        <div class="flex items-center gap-2 sm:gap-4">
          
          <button id="desktop-home-btn" class="hidden sm:flex items-center gap-2 text-white font-bold hover:text-gray-200 transition-colors mr-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Home
          </button>

          <div class="hidden sm:flex items-center bg-white/20 rounded-md px-3 py-1.5 focus-within:bg-white/30 transition-colors">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input id="desktop-search" type="text" placeholder="Search events..." class="bg-transparent text-sm text-white placeholder-white/70 focus:outline-none ml-2 w-48" />
          </div>

          <button id="theme-toggle" class="p-1.5 text-white hover:bg-white/20 rounded-md transition-colors ml-1" aria-label="Toggle Dark Mode">
            <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
          </button>

          <button id="mobile-search-toggle" class="sm:hidden p-1.5 text-white hover:bg-white/20 rounded-md transition-colors" aria-label="Search">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>

          <button id="mobile-menu-btn" class="sm:hidden p-1.5 text-white hover:bg-white/20 rounded-md transition-colors" aria-label="Open menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>

        </div>
      </div>
    </div>

    <div id="mobile-search-container" class="hidden sm:hidden bg-cardiff-red border-t border-white/10 px-4 py-3 shadow-inner transition-colors duration-300">
      <div class="flex items-center bg-white rounded-xl px-3 py-2 shadow-sm">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <input id="mobile-search-input" type="text" placeholder="Search by department or postcode..." class="bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none ml-2 w-full" />
      </div>
    </div>
  `;const s=a.querySelector("#desktop-search"),t=a.querySelector("#mobile-search-input"),o=a.querySelector("#mobile-search-container"),n=a.querySelector("#theme-toggle"),e=a.querySelector("#theme-toggle-dark-icon"),u=a.querySelector("#theme-toggle-light-icon"),d=window.matchMedia("(prefers-color-scheme: dark)"),l=m=>{m?(document.documentElement.classList.add("dark"),u?.classList.remove("hidden"),e?.classList.add("hidden")):(document.documentElement.classList.remove("dark"),u?.classList.add("hidden"),e?.classList.remove("hidden"))};localStorage.getItem("color-theme")==="dark"||!("color-theme"in localStorage)&&d.matches?l(!0):l(!1),d.addEventListener("change",m=>{"color-theme"in localStorage||l(m.matches)}),n?.addEventListener("click",()=>{const m=document.documentElement.classList.contains("dark");l(!m),m?localStorage.setItem("color-theme","light"):localStorage.setItem("color-theme","dark")});const c=m=>{const f=m.target.value;m.target===s&&(t.value=f),m.target===t&&(s.value=f),i(f)};s?.addEventListener("input",c),t?.addEventListener("input",c);const h=m=>{if(m.key==="Enter"){const f=m.target;f.blur(),f===t&&o?.classList.add("hidden")}};s?.addEventListener("keydown",h),t?.addEventListener("keydown",h);const g=()=>{s.value="",t.value="",i("")};return a.querySelector("#logo-home-btn")?.addEventListener("click",g),a.querySelector("#desktop-home-btn")?.addEventListener("click",g),a.querySelector("#mobile-search-toggle")?.addEventListener("click",()=>{o?.classList.toggle("hidden"),o?.classList.contains("hidden")||t?.focus()}),a.querySelector("#mobile-menu-btn")?.addEventListener("click",r),a}const C={"Physical Sciences & Engineering":["Architecture","Chemistry","Computer Science and Informatics","Earth and Environmental Sciences","Engineering","Mathematics","Physics and Astronomy"],"Biomedical & Life Sciences":["Biosciences","Dentistry and Dental Therapy and Hygiene","Healthcare Sciences","Medicine","Optometry and Vision Sciences","Pharmacy and Pharmaceutical Sciences (including Medical Pharmacology)","Psychology"],"Arts, Humanities & Social":["Business","English, Communication and Philosophy","Geography and Planning","History, Archaeology and Heritage","Journalism, Media and Culture","Law","Modern Languages","Music","Politics and International Relations","Social Sciences","Welsh"],"Campus Life":["Sport","Students' Union","General Talks and Activities","Residences"]};function I(i){const r=document.createElement("div");r.className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm relative z-40";let a=`
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hidden sm:flex flex-wrap items-center gap-2 py-3">
    `,s=`
        <div id="mobile-sidebar" class="fixed inset-y-0 left-0 w-72 bg-white dark:bg-gray-900 shadow-2xl transform -translate-x-full transition-transform duration-300 z-50 flex flex-col sm:hidden overflow-y-auto">
            <div class="p-4 bg-red-700 text-white flex justify-between items-center">
                <span class="font-bold text-lg">Menu</span>
                <button id="close-sidebar-btn" class="p-1 hover:bg-red-800 rounded">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div class="p-4">
                <button class="dept-btn w-full text-left font-bold py-2 mb-4 text-red-600 border-b border-gray-100 flex items-center gap-2" data-dept="">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    Home / All Events
                </button>
    `;Object.entries(C).forEach(([d,l])=>{a+=`
            <div class="relative group flex-1 min-w-max">
                <button class="college-btn w-full bg-gray-50 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-800 dark:text-gray-200 font-semibold py-2 px-3 rounded-lg transition-colors text-sm text-center" data-college="${d}">
                    ${d}
                </button>
                <div class="absolute left-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 grid gap-1 p-2 max-h-[70vh] overflow-y-auto z-50">
                    ${l.map(c=>`<button class="dept-btn text-left text-sm px-3 py-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors" data-dept="${c}">${c}</button>`).join("")}
                </div>
            </div>
        `,s+=`
            <div class="mb-2">
                <button class="mobile-accordion-btn w-full flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg font-semibold text-gray-800 dark:text-gray-200">
                    ${d}
                    <svg class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div class="mobile-accordion-content hidden pl-4 pt-2 space-y-1">
                    <button class="college-btn w-full text-left text-sm py-2 px-2 font-bold text-red-600 rounded hover:bg-red-50" data-college="${d}">
                        ↳ View All in ${d}
                    </button>
                    ${l.map(c=>`<button class="dept-btn w-full text-left text-sm py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400" data-dept="${c}">${c}</button>`).join("")}
                </div>
            </div>
        `}),a+="</div>",s+="</div></div>";const t='<div id="sidebar-overlay" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 hidden sm:hidden transition-opacity"></div>';r.innerHTML=a+s+t,r.querySelectorAll(".dept-btn").forEach(d=>{d.addEventListener("click",l=>{const c=l.currentTarget.getAttribute("data-dept")||"";i(c),u()})}),r.querySelectorAll(".college-btn").forEach(d=>{d.addEventListener("click",l=>{const c=l.currentTarget.getAttribute("data-college")||"";i(c),u()})}),r.querySelectorAll(".mobile-accordion-btn").forEach(d=>{d.addEventListener("click",l=>{const c=l.currentTarget.nextElementSibling,h=l.currentTarget.querySelector("svg");c?.classList.toggle("hidden"),h?.classList.toggle("rotate-180")})});const o=r.querySelector("#mobile-sidebar"),n=r.querySelector("#sidebar-overlay"),e=r.querySelector("#close-sidebar-btn"),u=()=>{o?.classList.add("-translate-x-full"),n?.classList.add("hidden")};return e?.addEventListener("click",u),n?.addEventListener("click",u),r.toggleSidebar=()=>{o?.classList.remove("-translate-x-full"),n?.classList.remove("hidden")},r}function q(i,r){if(!i)return"Date TBC";try{const a=new Date(i),s=a.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}),t={hour:"2-digit",minute:"2-digit",hour12:!0},o=a.toLocaleTimeString("en-GB",t);if(!r)return`${s} | ${o}`;const n=new Date(r).toLocaleTimeString("en-GB",t);return`${s} | ${o} - ${n}`}catch{return"Date & Time TBC"}}function D(i,r,a){const s=document.createElement("div");s.className="w-full rounded-2xl overflow-hidden shadow-2xl mb-8 relative group cursor-pointer bg-gray-900";const t=i.filter(n=>n.description);t.length===0&&t.push({description:"Welcome to Cardiff Open Day",cover_image:null});let o='<div id="carousel-track" class="flex transition-transform duration-700 ease-in-out h-[350px] sm:h-80 md:h-96 w-full">';if(t.forEach(n=>{const e=n.cover_image||"https://cardiff.imgix.net/__data/assets/image/0012/657669/Open-Day-banner-image-small.jpg?w=1000&fit=crop&q=60&auto=format",u=n.description||"Cardiff University Event",d=q(n.start_time,n.end_time),l=n.id&&r.includes(String(n.id)),c=!!n.website,h=l||c,g=h?"line-clamp-3 md:line-clamp-2":"line-clamp-5 md:line-clamp-4",m=h?`
            <button class="hero-read-more pointer-events-auto mt-3 md:mt-4 inline-flex items-center bg-white text-gray-900 hover:bg-gray-200 text-xs sm:text-sm font-bold py-2 px-5 rounded-full shadow-lg transition-transform active:scale-95" data-id="${l?n.id:""}" data-website="${c?n.website:""}">
                Read More <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
        `:"";o+=`
            <div class="w-full min-w-full max-w-full relative h-full flex-shrink-0 overflow-hidden">
                <img src="${e}" class="w-full h-full object-cover opacity-60">
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                
                <div class="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between md:justify-end z-10 pointer-events-none">
                    <div class="md:mb-4 mt-2 md:mt-0 w-full">
                        <span class="bg-red-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg border border-red-500 inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                            ${d}
                        </span>
                    </div>
                    <div class="w-full">
                        <h1 class="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-md ${g} break-words transition-all">
                            ${u}
                        </h1>
                        ${m}
                    </div>
                </div>
            </div>
        `}),o+="</div>",t.length>1&&(o+=`
            <button id="prev-btn" class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-700 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg backdrop-blur-sm z-20 items-center justify-center pointer-events-auto">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button id="next-btn" class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-700 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg backdrop-blur-sm z-20 items-center justify-center pointer-events-auto">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
            </button>
            
            <div class="hidden md:flex absolute bottom-6 right-6 space-x-2 z-20 max-w-[50%] flex-wrap justify-end gap-y-2">
                ${t.map((n,e)=>`<button class="dot-btn w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white transition-all shadow-sm flex-shrink-0 m-1" data-index="${e}"></button>`).join("")}
            </div>
        `),s.innerHTML=o,s.querySelectorAll(".hero-read-more").forEach(n=>{n.addEventListener("click",e=>{e.stopPropagation();const u=e.currentTarget.getAttribute("data-id"),d=e.currentTarget.getAttribute("data-website");u&&a?a(u):d&&window.open(d,"_blank")})}),t.length>1){const n=s.querySelector("#carousel-track"),e=s.querySelectorAll(".dot-btn"),u=s.querySelector("#prev-btn"),d=s.querySelector("#next-btn");let l=0,c=null,h=!1;const g=b=>{l=b,l<0&&(l=t.length-1),l>=t.length&&(l=0),n.style.transform=`translateX(-${l*100}%)`,e.forEach((w,E)=>{E===l?(w.classList.replace("bg-white/40","bg-white"),w.classList.add("scale-150")):(w.classList.replace("bg-white","bg-white/40"),w.classList.remove("scale-150"))})},m=()=>g(l+1),f=()=>g(l-1),y=()=>{!c&&!h&&(c=setInterval(m,3500))},x=()=>{c&&(clearInterval(c),c=null)};s.addEventListener("mouseenter",()=>{h=!0,x()}),s.addEventListener("mouseleave",()=>{h=!1,y()}),s.addEventListener("click",()=>{h=!0,x(),setTimeout(()=>{h=!1,y()},5e3)}),d?.addEventListener("click",b=>{b.stopPropagation(),m(),x()}),u?.addEventListener("click",b=>{b.stopPropagation(),f(),x()}),e.forEach((b,w)=>{b.addEventListener("click",E=>{E.stopPropagation(),g(w),x()})}),g(0),y()}return s}function S(i,r){if(!i)return"Check Schedule";try{const a={hour:"2-digit",minute:"2-digit",hour12:!0},s=new Date(i).toLocaleTimeString("en-GB",a);if(!r)return s;const t=new Date(r).toLocaleTimeString("en-GB",a);return`${s} - ${t}`}catch{return"Various Times"}}function A(i){if(!i)return"Date TBC";try{return new Date(i).toLocaleDateString("en-GB",{weekday:"short",month:"short",day:"numeric"})}catch{return"Date TBC"}}let v=[],p=null,B=[];async function H(){try{const[i,r]=await Promise.all([fetch("api/OpenDay.json"),fetch("api/OpenDayList.json").catch(()=>null)]);p=await i.json(),v=p.topics||[],B=r&&r.ok?await r.json():[p],_(),k(v)}catch(i){console.error("Failed to load data:",i)}}function $(i){const r=document.getElementById("hero-container"),a=document.getElementById("main-grid-view"),s=document.getElementById("detail-view-container");if(a?.classList.remove("hidden"),s?.classList.add("hidden"),!i||i.trim()===""){L("All Departments & Events"),k(v),r?.classList.remove("hidden"),window.scrollTo({top:0,behavior:"smooth"});return}r?.classList.add("hidden");const t=v.filter(e=>e.name&&e.name.toLowerCase()===i.toLowerCase());if(t.length>0){L(t[0].name),k(t),window.scrollTo({top:0,behavior:"smooth"});return}if(C[i]){const e=C[i],u=v.filter(d=>d.name&&e.includes(d.name));L(`Departments in: ${i}`),k(u),window.scrollTo({top:0,behavior:"smooth"});return}const o=i.toLowerCase().replace(/,/g," ").split(/\s+/).filter(e=>e.length>0),n=v.filter(e=>{const u=(e.name||"").toLowerCase();let d="",l="",c="",h="";if(e.programs&&e.programs.length>0&&e.programs[0].location){const m=e.programs[0].location;d=(m.title||m.building_name||"").toLowerCase(),l=(m.address||"").toLowerCase(),c=(m.postcode||"").toLowerCase(),h=c.replace(/\s+/g,"")}const g=`${u} ${d} ${l} ${c} ${h}`;return o.every(m=>g.includes(m))});L(`Search Results for "${i}"`),k(n),window.scrollTo({top:0,behavior:"smooth"})}function L(i){const r=document.getElementById("grid-title");r&&(r.innerText=i)}function _(){const i=I(n=>$(n)),r=j($,()=>i.toggleSidebar());document.body.insertBefore(i,document.body.firstChild),document.body.insertBefore(r,i);const a=document.getElementById("app");if(!a)return;a.innerHTML=`
        <div id="hero-container" class="mb-8"></div>
        <div id="main-grid-view">
            <h2 id="grid-title" class="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-4">All Departments & Events</h2>
            <div id="gridContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2"></div>
        </div>
        <div id="detail-view-container" class="hidden pb-12 mt-4"></div>

        <button id="back-to-top-btn" class="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-red-700 hover:bg-red-800 text-white p-3.5 rounded-full shadow-2xl z-50 transition-all duration-300 transform translate-y-16 opacity-0 pointer-events-none focus:outline-none group" aria-label="Scroll to top">
            <svg class="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
        </button>
    `;const s=v.map(n=>String(n.id)),t=D(B,s,n=>T(n));document.getElementById("hero-container")?.appendChild(t);const o=document.getElementById("back-to-top-btn");window.addEventListener("scroll",()=>{window.scrollY>400?(o?.classList.remove("translate-y-16","opacity-0","pointer-events-none"),o?.classList.add("translate-y-0","opacity-100","pointer-events-auto")):(o?.classList.add("translate-y-16","opacity-0","pointer-events-none"),o?.classList.remove("translate-y-0","opacity-100","pointer-events-auto"))},{passive:!0}),o?.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}function k(i){const r=document.getElementById("gridContainer");if(!r)return;if(i.length===0){r.innerHTML='<div class="col-span-full text-center text-gray-500 py-12 bg-white rounded-xl border border-dashed border-gray-300">No events found matching your search.</div>';return}let a="",s="Check Schedule";p&&p.start_time&&p.end_time&&(s=S(p.start_time,p.end_time)),i.forEach(t=>{const o=t.name||"Cardiff Event";let n="Cardiff University Campus",e="",u="";if(t.programs&&t.programs.length>0){const l=t.programs[0];l.location&&(n=l.location.title||l.location.building_name||"Cardiff University Campus",e=l.location.address||"",u=l.location.postcode||"")}const d=t.cover_image||p&&p.cover_image||"";a+=M(t.id,o,s,n,e,u,d)}),r.innerHTML=a,document.querySelectorAll(".event-card").forEach(t=>{t.addEventListener("click",()=>{const o=t.getAttribute("data-topic-id");T(o)})})}function T(i){if(!i)return;const r=v.find(e=>String(e.id)===String(i));if(!r)return;const a=document.getElementById("detail-view-container");if(!a)return;const s=r.cover_image||p&&p.cover_image||`https://placehold.co/1200x400/e11d48/ffffff?text=${encodeURIComponent(r.name)}`,t=r.website||`https://www.cardiff.ac.uk/search?query=${encodeURIComponent(r.name)}`;let o=`
        <button id="backToGridBtn" class="mb-6 flex items-center text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 font-bold transition-colors group">
            <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Events
        </button>

        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mb-10">
            <div class="h-48 sm:h-64 md:h-80 w-full bg-gray-200 relative">
                <img src="${s}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div class="absolute bottom-0 left-0 p-6 sm:p-10 w-full">
                    <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-lg">${r.name}</h1>
                </div>
            </div>
            
            <div class="p-6 sm:p-10">
                <p class="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed max-w-4xl">${r.description||"Join us to learn more about this department and discover our world-class facilities."}</p>
                <a href="${t}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm">
                    Visit Official Website
                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
            </div>
        </div>

        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 pl-2 border-l-4 border-red-600">Scheduled Events & Locations</h3>
    `;const n=r.programs||[];n.length>0?(o+='<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">',n.forEach(e=>{const u=e.title||e.name||"General Event",d=S(e.start_time,e.end_time),l=A(e.start_time||p?.start_time),c=e.description||"Join us for this scheduled session to explore our facilities, meet the staff, and learn more about this specific program.";let h=e.location?.title||e.location?.building_name||"Location TBC",g=e.room||e.room_name||e.location_name||"",m=h;g&&g!==h&&g!=="TBC"&&(m=`${h} <br/> <span class="text-xs text-gray-500 dark:text-gray-400 font-normal leading-tight block mt-0.5">${g}</span>`);let f='<div class="mt-auto opacity-70 text-sm italic border-t border-red-500 pt-3">Location TBC</div>';if(e.location?.address||e.location?.postcode){const y=`${h} ${e.location.address||""} ${e.location.postcode||""} Cardiff UK`.replace(/\s+/g," ").trim();f=`
                    <a href="${`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(y)}`}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="mt-auto inline-flex items-center justify-center bg-white text-red-800 hover:bg-gray-100 font-bold py-2.5 px-4 rounded-lg transition-colors shadow-md w-full relative z-50 cursor-pointer">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                        Open in Maps
                    </a>
                `}o+=`
                <div class="flip-card-container group cursor-pointer relative w-full">
                    <div class="flip-glow absolute -inset-0.5 bg-red-600 rounded-xl blur opacity-0 md:group-hover:opacity-60 transition duration-500 z-0"></div>
                    
                    <div class="flip-inner grid [transform-style:preserve-3d] transition-transform duration-500 relative z-10 w-full h-full md:group-hover:[transform:rotateY(180deg)]">
                        
                        <div class="[grid-area:1/1] bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col justify-between [backface-visibility:hidden] shadow-sm">
                            <div>
                                <h4 class="font-bold text-xl text-gray-900 dark:text-white leading-tight mb-4">${u}</h4>
                                <div class="text-sm text-gray-700 dark:text-gray-300 flex items-start font-bold">
                                    <svg class="w-4 h-4 mr-1.5 mt-0.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                                    <div class="flex-1">${m}</div>
                                </div>
                            </div>
                            
                            <div class="border-t border-gray-100 dark:border-gray-700 pt-4 mt-6 flex justify-between items-center">
                                <div class="inline-block bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-3 py-1.5 rounded-md text-sm font-black">
                                    ${d}
                                </div>
                                
                                <div class="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-300 shadow-sm transition-transform group-hover:bg-red-100 group-hover:text-red-500" aria-label="Flip Card">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div class="[grid-area:1/1] bg-red-700 p-6 rounded-xl text-white flex flex-col [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-xl h-full">
                            <div class="text-sm font-black mb-3 text-red-100 uppercase tracking-wide border-b border-red-500/50 pb-2 flex items-center">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                ${l}
                            </div>
                            <p class="text-sm font-medium leading-relaxed overflow-y-auto flex-grow mb-4 opacity-95">
                                ${c}
                            </p>
                            ${f}
                        </div>

                    </div>
                </div>
            `}),o+="</div>"):o+='<div class="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 text-center text-gray-500 italic shadow-sm">No specific scheduled events found. Visit their main booth anytime!</div>',a.innerHTML=o,document.querySelectorAll(".flip-card-container").forEach(e=>{const u=e.querySelector(".flip-inner"),d=e.querySelector(".flip-glow");e.addEventListener("click",l=>{l.target.closest("a")||(u?.classList.toggle("[transform:rotateY(180deg)]"),d?.classList.toggle("opacity-60"))})}),window.addEventListener("scroll",()=>{document.querySelectorAll(".flip-inner").forEach(e=>e.classList.remove("[transform:rotateY(180deg)]")),document.querySelectorAll(".flip-glow").forEach(e=>e.classList.remove("opacity-60"))},{passive:!0}),document.getElementById("hero-container")?.classList.add("hidden"),document.getElementById("main-grid-view")?.classList.add("hidden"),a.classList.remove("hidden"),document.getElementById("backToGridBtn")?.addEventListener("click",()=>{a.classList.add("hidden"),document.getElementById("main-grid-view")?.classList.remove("hidden");const e=document.getElementById("desktop-search");(!e||e.value.trim()==="")&&document.getElementById("hero-container")?.classList.remove("hidden"),window.scrollTo({top:0,behavior:"smooth"})}),window.scrollTo({top:0,behavior:"smooth"})}H();
