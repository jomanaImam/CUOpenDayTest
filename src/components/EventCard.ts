/**
 * @file EventCard.ts
 * @author Jawmanah Emam
 * @description 
 * A reusable UI component for generating the grid items. I implemented fallback handling 
 * for missing images and dynamic external links for map routing.
 */

export function createEventCard(id: number, title: string, time: string, location: string, address: string, postcode: string, image: string): string {
    
    //implementing a placeholder fallback to utilize the official color palette
    const fallbackUrl = `https://placehold.co/600x400/D50032/ffffff?text=${encodeURIComponent(title)}`;
    const finalImage = image ? image : fallbackUrl;

    // to generate secure Google Maps link based on the location and postcode
    const mapQuery = encodeURIComponent(`${location} ${postcode} Cardiff University UK`);
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

    // ensuring the address link sits cleanly over the card overlay
    const addressHtml = address || postcode 
        ? `<a href="${mapLink}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold hover:underline mt-1 pl-6 block relative z-20 transition-colors cursor-pointer w-fit">
            ${address} ${postcode}
           </a>` 
        : ``;

    return `
        <div data-topic-id="${id}" class="event-card relative group cursor-pointer transition-all duration-300 h-full">
            <div class="absolute -inset-0.5 bg-red-600 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-500"></div>
            
            <div class="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col h-full z-10">
                
                <div class="h-40 w-full overflow-hidden bg-gray-100 relative">
                    <img src="${finalImage}" alt="${title}" 
                         referrerpolicy="no-referrer"
                         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                         onerror="this.onerror=null; this.src='${fallbackUrl}'">
                </div>

                <div class="p-5 flex flex-col flex-grow">
                    <div class="flex justify-between items-start mb-3 relative z-20">
                        <span class="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-[10px] uppercase tracking-widest font-black px-2 py-1 rounded">
                            ${time}
                        </span>
                    </div>
                    
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">
                        ${title}
                    </h3>

                    <div class="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col">
                        <div class="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300">
                            <svg class="w-4 h-4 mr-2 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                            <span class="truncate">${location}</span>
                        </div>
                        ${addressHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
}