import { Sun, Moon } from 'lucide-react';
import { useEffect } from 'react';

export function ThemeToggle({ theme, setTheme }) {
  useEffect(() => {
    // Apply theme to document body to influence CSS variables globally
    if (theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-3 rounded-full glass-panel hover:scale-110 transition-transform shadow-lg group border border-[var(--border-color)]"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
        <Sun 
          className={`absolute text-amber-500 transition-all duration-500 ${
            theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
          }`}
          size={24}
        />
        <Moon 
          className={`absolute text-indigo-400 transition-all duration-500 ${
            theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
          }`}
          size={24}
        />
      </div>
    </button>
  );
}
