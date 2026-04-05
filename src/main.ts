/**
 * @file main.ts
 * @author Jawmanah Emam
 * @description 
 * Main application logic for the Cardiff University Open Day Planner. 
 * I built this as a lightweight Single Page Application (SPA) to handle asynchronous 
 * data fetching, complex multi-parameter searching, and dynamic DOM manipulation 
 * without the overhead of heavy external frameworks.
 */

import { createEventCard } from './components/EventCard';
import { createHeader } from './components/Header'; 
import { createFilterTabs, collegeData } from './components/FilterTabs';
import { createHeroCarousel } from './components/HeroCarousel';

// UTILITY FUNCTIONALITY 

/**
 * Formats raw ISO date strings into clean 12-hour time formats.
 */
function formatTime(startStr: string, endStr: string): string {
    if (!startStr) return "Check Schedule";
    try {
        const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        const startTime = new Date(startStr).toLocaleTimeString('en-GB', options);
        if (!endStr) return startTime;
        const endTime = new Date(endStr).toLocaleTimeString('en-GB', options);
        return `${startTime} - ${endTime}`;
    } catch {
        return "Various Times";
    }
}

/**
 * Parses full timestamps into compact dates for mobile readability.
 */
function formatDate(dateStr: string): string {
    if (!dateStr) return "Date TBC";
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch {
        return "Date TBC";
    }
}

// THE GLOBAL STATE OF THE WEBSITE
let allTopics: any[] = [];
let globalData: any = null;
let openDayList: any[] = []; 

// INITIALIZATION LOGIC
/**
 * Asynchronously fetches JSON payloads concurrently.
 * Handles the event list and falls back cleanly if the Carousel payload fails.
 */
async function loadOpenDayData() {
    try {
        const [eventRes, listRes] = await Promise.all([
            fetch('api/OpenDay.json'),
            fetch('api/OpenDayList.json').catch(() => null)
        ]);
        
        globalData = await eventRes.json();
        allTopics = globalData.topics || [];
        openDayList = (listRes && listRes.ok) ? await listRes.json() : [globalData]; 

        setupUI();
        renderGrid(allTopics);
    } catch (error) {
        console.error("Failed to load data:", error);
    }
}

//  SEARCH LOGIC
/**
 * I designed this search handler to manage complex routing queries. 
 * It supports exact matching, category filtering, and deep keyword searching 
 * across building names, postcodes, and department titles.
 */
function handleSearch(rawSearch: string) {
    const heroContainer = document.getElementById('hero-container');
    const mainGridView = document.getElementById('main-grid-view');
    const detailView = document.getElementById('detail-view-container');
    
    // Reset view state
    mainGridView?.classList.remove('hidden');
    detailView?.classList.add('hidden');

    if (!rawSearch || rawSearch.trim() === "") {
        updateGridTitle("All Departments & Events");
        renderGrid(allTopics);
        heroContainer?.classList.remove('hidden'); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    heroContainer?.classList.add('hidden');

    // 1. Exact Name Matching
    const exactMatch = allTopics.filter(topic => 
        topic.name && topic.name.toLowerCase() === rawSearch.toLowerCase()
    );

    if (exactMatch.length > 0) {
        updateGridTitle(exactMatch[0].name);
        renderGrid(exactMatch);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    // 2. Broad Category Filtering
    if (collegeData[rawSearch]) {
        const collegeDepartments = collegeData[rawSearch];
        const filteredTopics = allTopics.filter(topic => 
            topic.name && collegeDepartments.includes(topic.name)
        );
        updateGridTitle(`Departments in: ${rawSearch}`);
        renderGrid(filteredTopics);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    // 3.Search bar functionality to search across names, locations, and postcodes
    const searchWords = rawSearch.toLowerCase().replace(/,/g, ' ').split(/\s+/).filter(word => word.length > 0);
    const filteredTopics = allTopics.filter(topic => {
        const tName = (topic.name || "").toLowerCase();
        let lName = "", lAddress = "", lPostcode = "", cleanPostcode = "";

        if (topic.programs && topic.programs.length > 0 && topic.programs[0].location) {
            const loc = topic.programs[0].location;
            lName = (loc.title || loc.building_name || "").toLowerCase();
            lAddress = (loc.address || "").toLowerCase();
            lPostcode = (loc.postcode || "").toLowerCase();
            cleanPostcode = lPostcode.replace(/\s+/g, ''); 
        }

        const superString = `${tName} ${lName} ${lAddress} ${lPostcode} ${cleanPostcode}`;
        return searchWords.every(word => superString.includes(word));
    });
    
    updateGridTitle(`Search Results for "${rawSearch}"`);
    renderGrid(filteredTopics);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateGridTitle(title: string) {
    const titleEl = document.getElementById('grid-title');
    if (titleEl) titleEl.innerText = title;
}

/**
 * Initializing the DOM scaffolding and injects modular components
 */
function setupUI() {
    const filterTabsElement = createFilterTabs((department: string) => handleSearch(department));
    const headerElement = createHeader(handleSearch, () => (filterTabsElement as any).toggleSidebar());

    document.body.insertBefore(filterTabsElement, document.body.firstChild);
    document.body.insertBefore(headerElement, filterTabsElement);

    const appContainer = document.getElementById('app');
    if (!appContainer) return;

    appContainer.innerHTML = `
        <div id="hero-container" class="mb-8"></div>
        <div id="main-grid-view">
            <h2 id="grid-title" class="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-4">All Departments & Events</h2>
            <div id="gridContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2"></div>
        </div>
        <div id="detail-view-container" class="hidden pb-12 mt-4"></div>

        <button id="back-to-top-btn" class="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-red-700 hover:bg-red-800 text-white p-3.5 rounded-full shadow-2xl z-50 transition-all duration-300 transform translate-y-16 opacity-0 pointer-events-none focus:outline-none group" aria-label="Scroll to top">
            <svg class="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
        </button>
    `;

    const validTopicIds = allTopics.map(t => String(t.id));
    const heroElement = createHeroCarousel(openDayList, validTopicIds, (eventId) => openDepartmentView(eventId));
    document.getElementById('hero-container')?.appendChild(heroElement);

    // Dynamic Scroll to jump back to the top 
    const backToTopBtn = document.getElementById('back-to-top-btn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn?.classList.remove('translate-y-16', 'opacity-0', 'pointer-events-none');
            backToTopBtn?.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
        } else {
            backToTopBtn?.classList.add('translate-y-16', 'opacity-0', 'pointer-events-none');
            backToTopBtn?.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
        }
    }, { passive: true });

    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function renderGrid(topicsToRender: any[]) {
    const gridContainer = document.getElementById('gridContainer');
    if (!gridContainer) return;

    if (topicsToRender.length === 0) {
        gridContainer.innerHTML = `<div class="col-span-full text-center text-gray-500 py-12 bg-white rounded-xl border border-dashed border-gray-300">No events found matching your search.</div>`;
        return;
    }

    let htmlContent = "";
    let globalTime = "Check Schedule";
    if (globalData && globalData.start_time && globalData.end_time) {
        globalTime = formatTime(globalData.start_time, globalData.end_time);
    }

    topicsToRender.forEach((topic: any) => {
        const title = topic.name || "Cardiff Event";
        let locationName = "Cardiff University Campus";
        let address = "";
        let postcode = "";
        
        if (topic.programs && topic.programs.length > 0) {
            const firstProgram = topic.programs[0];
            if (firstProgram.location) {
                locationName = firstProgram.location.title || firstProgram.location.building_name || "Cardiff University Campus";
                address = firstProgram.location.address || "";
                postcode = firstProgram.location.postcode || "";
            }
        }
        
        const image = topic.cover_image || (globalData && globalData.cover_image) || "";
        htmlContent += createEventCard(topic.id, title, globalTime, locationName, address, postcode, image);
    });

    gridContainer.innerHTML = htmlContent;

    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
            const topicId = card.getAttribute('data-topic-id');
            openDepartmentView(topicId);
        });
    });
}

/**
 * Handles the detailed breakdown view of a specific department.
 * Features 3D CSS animations, touch-event handling for mobile, and grid stacking logic.
 */
function openDepartmentView(topicId: string | null) {
    if (!topicId) return;
    
    const topic = allTopics.find(t => String(t.id) === String(topicId));
    if (!topic) return;

    const detailContainer = document.getElementById('detail-view-container');
    if (!detailContainer) return;

    const coverImage = topic.cover_image || (globalData && globalData.cover_image) || `https://placehold.co/1200x400/e11d48/ffffff?text=${encodeURIComponent(topic.name)}`;
    const officialWebsite = topic.website || `https://www.cardiff.ac.uk/search?query=${encodeURIComponent(topic.name)}`;

    let html = `
        <button id="backToGridBtn" class="mb-6 flex items-center text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 font-bold transition-colors group">
            <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Events
        </button>

        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mb-10">
            <div class="h-48 sm:h-64 md:h-80 w-full bg-gray-200 relative">
                <img src="${coverImage}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div class="absolute bottom-0 left-0 p-6 sm:p-10 w-full">
                    <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-lg">${topic.name}</h1>
                </div>
            </div>
            
            <div class="p-6 sm:p-10">
                <p class="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed max-w-4xl">${topic.description || "Join us to learn more about this department and discover our world-class facilities."}</p>
                <a href="${officialWebsite}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm">
                    Visit Official Website
                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
            </div>
        </div>

        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 pl-2 border-l-4 border-red-600">Scheduled Events & Locations</h3>
    `;

    const programs = topic.programs || [];
    if (programs.length > 0) {
        html += `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">`;
        
        programs.forEach((prog: any) => {
            const progTitle = prog.title || prog.name || "General Event";
            const progTime = formatTime(prog.start_time, prog.end_time);
            const progDate = formatDate(prog.start_time || globalData?.start_time);
            const progDesc = prog.description || "Join us for this scheduled session to explore our facilities, meet the staff, and learn more about this specific program.";
            
            let buildingName = prog.location?.title || prog.location?.building_name || "Location TBC";
            let roomName = prog.room || prog.room_name || prog.location_name || "";
            
            let locDisplay = buildingName;
            if (roomName && roomName !== buildingName && roomName !== "TBC") {
                locDisplay = `${buildingName} <br/> <span class="text-xs text-gray-500 dark:text-gray-400 font-normal leading-tight block mt-0.5">${roomName}</span>`;
            }

            let mapHtml = `<div class="mt-auto opacity-70 text-sm italic border-t border-red-500 pt-3">Location TBC</div>`;
            if (prog.location?.address || prog.location?.postcode) {
                const queryStr = `${buildingName} ${prog.location.address || ''} ${prog.location.postcode || ''} Cardiff UK`.replace(/\s+/g, ' ').trim();
                const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryStr)}`;
                
                mapHtml = `
                    <a href="${mapLink}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="mt-auto inline-flex items-center justify-center bg-white text-red-800 hover:bg-gray-100 font-bold py-2.5 px-4 rounded-lg transition-colors shadow-md w-full relative z-50 cursor-pointer">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                        Open in Maps
                    </a>
                `;
            }

            // Grid area implementation to prevent overflow issues 
            html += `
                <div class="flip-card-container group cursor-pointer relative w-full">
                    <div class="flip-glow absolute -inset-0.5 bg-red-600 rounded-xl blur opacity-0 md:group-hover:opacity-60 transition duration-500 z-0"></div>
                    
                    <div class="flip-inner grid [transform-style:preserve-3d] transition-transform duration-500 relative z-10 w-full h-full md:group-hover:[transform:rotateY(180deg)]">
                        
                        <div class="[grid-area:1/1] bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col justify-between [backface-visibility:hidden] shadow-sm">
                            <div>
                                <h4 class="font-bold text-xl text-gray-900 dark:text-white leading-tight mb-4">${progTitle}</h4>
                                <div class="text-sm text-gray-700 dark:text-gray-300 flex items-start font-bold">
                                    <svg class="w-4 h-4 mr-1.5 mt-0.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                                    <div class="flex-1">${locDisplay}</div>
                                </div>
                            </div>
                            
                            <div class="border-t border-gray-100 dark:border-gray-700 pt-4 mt-6 flex justify-between items-center">
                                <div class="inline-block bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-3 py-1.5 rounded-md text-sm font-black">
                                    ${progTime}
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
                                ${progDate}
                            </div>
                            <p class="text-sm font-medium leading-relaxed overflow-y-auto flex-grow mb-4 opacity-95">
                                ${progDesc}
                            </p>
                            ${mapHtml}
                        </div>

                    </div>
                </div>
            `;
        });
        html += `</div>`;
    } else {
        html += `<div class="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 text-center text-gray-500 italic shadow-sm">No specific scheduled events found. Visit their main booth anytime!</div>`;
    }

    detailContainer.innerHTML = html;

    // Mobile interaction uncoupling
    document.querySelectorAll('.flip-card-container').forEach(card => {
        const inner = card.querySelector('.flip-inner');
        const glow = card.querySelector('.flip-glow');

        card.addEventListener('click', (e) => {
            if ((e.target as HTMLElement).closest('a')) return;
            inner?.classList.toggle('[transform:rotateY(180deg)]');
            glow?.classList.toggle('opacity-60');
        });
    });

    window.addEventListener('scroll', () => {
        document.querySelectorAll('.flip-inner').forEach(el => el.classList.remove('[transform:rotateY(180deg)]'));
        document.querySelectorAll('.flip-glow').forEach(el => el.classList.remove('opacity-60'));
    }, { passive: true });

    document.getElementById('hero-container')?.classList.add('hidden');
    document.getElementById('main-grid-view')?.classList.add('hidden');
    detailContainer.classList.remove('hidden');

    document.getElementById('backToGridBtn')?.addEventListener('click', () => {
        detailContainer.classList.add('hidden');
        document.getElementById('main-grid-view')?.classList.remove('hidden');
        
        const desktopSearch = document.getElementById('desktop-search') as HTMLInputElement;
        if (!desktopSearch || desktopSearch.value.trim() === "") {
            document.getElementById('hero-container')?.classList.remove('hidden');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}


loadOpenDayData();