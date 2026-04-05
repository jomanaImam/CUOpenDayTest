/**
 * @file FilterTabs.ts
 * @author Jawmanah Emam
 * @description 
 * I created this component to handle the categorization of university departments.
 * It renders a horizontal dropdown menu on desktop and seamlessly converts into a 
 * sliding accordion sidebar for mobile devices to preserve screen real estate.
 */

export const collegeData: Record<string, string[]> = {
    "Physical Sciences & Engineering": [
        "Architecture", "Chemistry", "Computer Science and Informatics", 
        "Earth and Environmental Sciences", "Engineering", "Mathematics", "Physics and Astronomy"
    ],
    "Biomedical & Life Sciences": [
        "Biosciences", "Dentistry and Dental Therapy and Hygiene", "Healthcare Sciences",
        "Medicine", "Optometry and Vision Sciences", "Pharmacy and Pharmaceutical Sciences (including Medical Pharmacology)", 
        "Psychology"
    ],
    "Arts, Humanities & Social": [
        "Business", "English, Communication and Philosophy", "Geography and Planning",
        "History, Archaeology and Heritage", "Journalism, Media and Culture", "Law", 
        "Modern Languages", "Music", "Politics and International Relations", "Social Sciences", "Welsh"
    ],
    "Campus Life": [
        "Sport", "Students' Union", "General Talks and Activities", "Residences"
    ]
};

export function createFilterTabs(onDepartmentSelect: (department: string) => void): HTMLElement {
    const container = document.createElement('div');
    container.className = "w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm relative z-40";

    // Desktop layout 
    let desktopHtml = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hidden sm:flex flex-wrap items-center gap-2 py-3">
    `;
    
    // Mobile layout
    let mobileHtml = `
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
    `;

    Object.entries(collegeData).forEach(([college, departments]) => {
        // Desktop mode 
        desktopHtml += `
            <div class="relative group flex-1 min-w-max">
                <button class="college-btn w-full bg-gray-50 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-800 dark:text-gray-200 font-semibold py-2 px-3 rounded-lg transition-colors text-sm text-center" data-college="${college}">
                    ${college}
                </button>
                <div class="absolute left-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 grid gap-1 p-2 max-h-[70vh] overflow-y-auto z-50">
                    ${departments.map(dept => `<button class="dept-btn text-left text-sm px-3 py-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors" data-dept="${dept}">${dept}</button>`).join('')}
                </div>
            </div>
        `;

        // Mobile mode 
        mobileHtml += `
            <div class="mb-2">
                <button class="mobile-accordion-btn w-full flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg font-semibold text-gray-800 dark:text-gray-200">
                    ${college}
                    <svg class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div class="mobile-accordion-content hidden pl-4 pt-2 space-y-1">
                    <button class="college-btn w-full text-left text-sm py-2 px-2 font-bold text-red-600 rounded hover:bg-red-50" data-college="${college}">
                        ↳ View All in ${college}
                    </button>
                    ${departments.map(dept => `<button class="dept-btn w-full text-left text-sm py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400" data-dept="${dept}">${dept}</button>`).join('')}
                </div>
            </div>
        `;
    });

    desktopHtml += `</div>`;
    mobileHtml += `</div></div>`; 

    const overlayHtml = `<div id="sidebar-overlay" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 hidden sm:hidden transition-opacity"></div>`;
    container.innerHTML = desktopHtml + mobileHtml + overlayHtml;

    // Event listeners for the different department buttons 
    container.querySelectorAll('.dept-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const deptName = (e.currentTarget as HTMLButtonElement).getAttribute('data-dept') || "";
            onDepartmentSelect(deptName);
            closeMobileSidebar();
        });
    });

    container.querySelectorAll('.college-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const collegeName = (e.currentTarget as HTMLButtonElement).getAttribute('data-college') || "";
            onDepartmentSelect(collegeName);
            closeMobileSidebar();
        });
    });

    container.querySelectorAll('.mobile-accordion-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const content = (e.currentTarget as HTMLElement).nextElementSibling;
            const icon = (e.currentTarget as HTMLElement).querySelector('svg');
            content?.classList.toggle('hidden');
            icon?.classList.toggle('rotate-180');
        });
    });

    // The Mobile sidebar state management
    const sidebar = container.querySelector('#mobile-sidebar');
    const overlay = container.querySelector('#sidebar-overlay');
    const closeBtn = container.querySelector('#close-sidebar-btn');

    const closeMobileSidebar = () => {
        sidebar?.classList.add('-translate-x-full');
        overlay?.classList.add('hidden');
    };

    closeBtn?.addEventListener('click', closeMobileSidebar);
    overlay?.addEventListener('click', closeMobileSidebar);

    // Exposiing the toggle function to the parent component
    (container as any).toggleSidebar = () => {
        sidebar?.classList.remove('-translate-x-full');
        overlay?.classList.remove('hidden');
    };

    return container;
}