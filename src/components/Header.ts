/**
 * @file Header.ts
 * @author Jawmanah Emam 
 * @description 
 * Built this dynamic header component to handle global navigation, cross-device searching, 
 * and an intelligent Dark/Light mode toggle. The theme toggle synchronizes with the user's 
 *  OS-level preferences by default, but allows for manual overrides saved to localStorage.
 */

export function createHeader(onSearch: (query: string) => void, onMenuToggle: () => void): HTMLElement {
  const header = document.createElement('header');
  
  // Enforcing themUniversity red across all themes
  header.className = 'bg-cardiff-red text-white shadow-md sticky top-0 z-50 transition-colors duration-300';

  header.innerHTML = `
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
  `;

  // Element Selectors I added event listeners to the search inputs, theme toggle, and menu button to handle user interactions
  const desktopSearch = header.querySelector('#desktop-search') as HTMLInputElement;
  const mobileSearchInput = header.querySelector('#mobile-search-input') as HTMLInputElement;
  const mobileSearchContainer = header.querySelector('#mobile-search-container');
  
  // Theme Toggle Logic 
  // designed this to automatically detect the user's OS theme (Dark/Light) 
  // and apply it instantly, while still allowing manual user overrides.
  const themeToggleBtn = header.querySelector('#theme-toggle');
  const darkIcon = header.querySelector('#theme-toggle-dark-icon');
  const lightIcon = header.querySelector('#theme-toggle-light-icon');
  
  const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const applyTheme = (isDark: boolean) => {
      if (isDark) {
          document.documentElement.classList.add('dark');
          lightIcon?.classList.remove('hidden');
          darkIcon?.classList.add('hidden');
      } else {
          document.documentElement.classList.remove('dark');
          lightIcon?.classList.add('hidden');
          darkIcon?.classList.remove('hidden');
      }
  };

  // 1. Initialization: to check localStorage or fallback to OS settings
  if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && systemThemeQuery.matches)) {
      applyTheme(true);
  } else {
      applyTheme(false);
  }

  // 2. OS Sync: To listen to the dynamic changes in user system preferences
  systemThemeQuery.addEventListener('change', (e) => {
      if (!('color-theme' in localStorage)) {
          applyTheme(e.matches);
      }
  });

  // 3. Manual Override: To save the user preference and stop OS syncing
  themeToggleBtn?.addEventListener('click', () => {
      const isCurrentlyDark = document.documentElement.classList.contains('dark');
      applyTheme(!isCurrentlyDark);
      
      if (!isCurrentlyDark) {
          localStorage.setItem('color-theme', 'dark');
      } else {
          localStorage.setItem('color-theme', 'light');
      }
  });

  // Search Input Synchronization and Handling
  // Did this to keep the desktop and mobile search bars synced to prevent UX dissonance
  const handleInput = (e: Event) => {
    const query = (e.target as HTMLInputElement).value;
    if (e.target === desktopSearch) mobileSearchInput.value = query;
    if (e.target === mobileSearchInput) desktopSearch.value = query;
    onSearch(query);
  };

  desktopSearch?.addEventListener('input', handleInput);
  mobileSearchInput?.addEventListener('input', handleInput);

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        const inputElement = e.target as HTMLInputElement;
        inputElement.blur(); 
        if (inputElement === mobileSearchInput) {
            mobileSearchContainer?.classList.add('hidden');
        }
    }
  };

  desktopSearch?.addEventListener('keydown', handleKeydown);
  mobileSearchInput?.addEventListener('keydown', handleKeydown);

  //Click Listeners to Clear Search When Clicking Home Logo or Home Button
  const clearSearch = () => {
      desktopSearch.value = "";
      mobileSearchInput.value = "";
      onSearch(""); 
  };

  header.querySelector('#logo-home-btn')?.addEventListener('click', clearSearch);
  header.querySelector('#desktop-home-btn')?.addEventListener('click', clearSearch);

  header.querySelector('#mobile-search-toggle')?.addEventListener('click', () => {
    mobileSearchContainer?.classList.toggle('hidden');
    if (!mobileSearchContainer?.classList.contains('hidden')) mobileSearchInput?.focus();
  });

  header.querySelector('#mobile-menu-btn')?.addEventListener('click', onMenuToggle);

  return header;
}