/**
 * @file HeroCarousel.ts
 * @author Jawmanah Emam
 * @description 
 * I developed this Hero Carousel to highlight featured events. It features an automated 
 * slide interval that smartly pauses upon user interaction. I used strict max-width constraints 
 * to prevent text overflow on mobile, and included dynamic fallback routing for the 'Read More' buttons.
 */

function formatEventDateTime(startStr: string, endStr: string): string {
    if (!startStr) return "Date TBC";
    try {
        const dateObj = new Date(startStr);
        const date = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        
        const timeOpts: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        const start = dateObj.toLocaleTimeString('en-GB', timeOpts);
        
        if (!endStr) return `${date} | ${start}`;
        const end = new Date(endStr).toLocaleTimeString('en-GB', timeOpts);
        
        return `${date} | ${start} - ${end}`;
    } catch {
        return "Date & Time TBC";
    }
}

export function createHeroCarousel(events: any[], validTopicIds: string[], onEventClick?: (id: string) => void): HTMLElement {
    const container = document.createElement('div');
    container.className = "w-full rounded-2xl overflow-hidden shadow-2xl mb-8 relative group cursor-pointer bg-gray-900";

    const validEvents = events.filter(e => e.description);
    if (validEvents.length === 0) {
        validEvents.push({ description: "Welcome to Cardiff Open Day", cover_image: null });
    }

    let html = `<div id="carousel-track" class="flex transition-transform duration-700 ease-in-out h-[350px] sm:h-80 md:h-96 w-full">`;

    validEvents.forEach((event) => {
        const imageUrl = event.cover_image || "https://cardiff.imgix.net/__data/assets/image/0012/657669/Open-Day-banner-image-small.jpg?w=1000&fit=crop&q=60&auto=format";
        const title = event.description || "Cardiff University Event";
        const dateTimeStr = formatEventDateTime(event.start_time, event.end_time);

        // Link verification to ensure not rendering dead links
        const hasValidId = event.id && validTopicIds.includes(String(event.id));
        const hasWebsite = !!event.website;
        const hasLink = hasValidId || hasWebsite;

        const titleClasses = hasLink ? "line-clamp-3 md:line-clamp-2" : "line-clamp-5 md:line-clamp-4";
        
        const buttonHtml = hasLink ? `
            <button class="hero-read-more pointer-events-auto mt-3 md:mt-4 inline-flex items-center bg-white text-gray-900 hover:bg-gray-200 text-xs sm:text-sm font-bold py-2 px-5 rounded-full shadow-lg transition-transform active:scale-95" data-id="${hasValidId ? event.id : ''}" data-website="${hasWebsite ? event.website : ''}">
                Read More <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
        ` : '';

        // used min-w-full and max-w-full here to prevent layout breakages from long strings
        html += `
            <div class="w-full min-w-full max-w-full relative h-full flex-shrink-0 overflow-hidden">
                <img src="${imageUrl}" class="w-full h-full object-cover opacity-60">
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                
                <div class="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between md:justify-end z-10 pointer-events-none">
                    <div class="md:mb-4 mt-2 md:mt-0 w-full">
                        <span class="bg-red-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg border border-red-500 inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                            ${dateTimeStr}
                        </span>
                    </div>
                    <div class="w-full">
                        <h1 class="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-md ${titleClasses} break-words transition-all">
                            ${title}
                        </h1>
                        ${buttonHtml}
                    </div>
                </div>
            </div>
        `;
    });

    html += `</div>`; 

    // Slide controls
    if (validEvents.length > 1) {
        html += `
            <button id="prev-btn" class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-700 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg backdrop-blur-sm z-20 items-center justify-center pointer-events-auto">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button id="next-btn" class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-700 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg backdrop-blur-sm z-20 items-center justify-center pointer-events-auto">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
            </button>
            
            <div class="hidden md:flex absolute bottom-6 right-6 space-x-2 z-20 max-w-[50%] flex-wrap justify-end gap-y-2">
                ${validEvents.map((_, i) => `<button class="dot-btn w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white transition-all shadow-sm flex-shrink-0 m-1" data-index="${i}"></button>`).join('')}
            </div>
        `;
    }

    container.innerHTML = html;

    // The carousel interactive logic 
    container.querySelectorAll('.hero-read-more').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const eventId = (e.currentTarget as HTMLElement).getAttribute('data-id');
            const website = (e.currentTarget as HTMLElement).getAttribute('data-website');

            if (eventId && onEventClick) {
                onEventClick(eventId);
            } else if (website) {
                window.open(website, '_blank');
            }
        });
    });

    if (validEvents.length > 1) {
        const track = container.querySelector('#carousel-track') as HTMLElement;
        const dots = container.querySelectorAll('.dot-btn');
        const prevBtn = container.querySelector('#prev-btn') as HTMLElement;
        const nextBtn = container.querySelector('#next-btn') as HTMLElement;

        let currentIndex = 0;
        let autoPlayInterval: ReturnType<typeof setInterval> | null = null;
        let isInteracting = false;

        const updateCarousel = (index: number) => {
            currentIndex = index;
            if (currentIndex < 0) currentIndex = validEvents.length - 1;
            if (currentIndex >= validEvents.length) currentIndex = 0;

            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            dots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.replace('bg-white/40', 'bg-white');
                    dot.classList.add('scale-150');
                } else {
                    dot.classList.replace('bg-white', 'bg-white/40');
                    dot.classList.remove('scale-150');
                }
            });
        };

        const nextSlide = () => updateCarousel(currentIndex + 1);
        const prevSlide = () => updateCarousel(currentIndex - 1);

        const startAutoPlay = () => {
            if (!autoPlayInterval && !isInteracting) {
                autoPlayInterval = setInterval(nextSlide, 3500); 
            }
        };

        const stopAutoPlay = () => {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        };

        // Interaction handling to pause  while the user is reading 
        container.addEventListener('mouseenter', () => {
            isInteracting = true;
            stopAutoPlay();
        });

        container.addEventListener('mouseleave', () => {
            isInteracting = false;
            startAutoPlay();
        });

        container.addEventListener('click', () => {
            isInteracting = true;
            stopAutoPlay();
            
            setTimeout(() => {
                isInteracting = false;
                startAutoPlay();
            }, 5000);
        });

        nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); nextSlide(); stopAutoPlay(); });
        prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); prevSlide(); stopAutoPlay(); });
        dots.forEach((dot, i) => { dot.addEventListener('click', (e) => { e.stopPropagation(); updateCarousel(i); stopAutoPlay(); }); });

        updateCarousel(0);
        startAutoPlay();
    }

    return container;
}