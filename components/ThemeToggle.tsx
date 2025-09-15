'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useTranslations } from 'next-intl';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations();

  if (!theme) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-0 right-0 m-5 p-3 rounded-lg bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border border-gray-300 dark:border-gray-600 hover:shadow-xl transition-all duration-300 group"
      aria-label={t('toggleTheme')}
    >
      {theme === 'light' ? (
        <svg
          className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;