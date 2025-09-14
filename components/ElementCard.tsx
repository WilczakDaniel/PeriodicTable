'use client';

import { Element } from '@/data/elements';
import { useTranslations } from 'next-intl';

interface ElementCardProps {
  element: Element;
  colorClass: string;
  onClick: () => void;
}

const ElementCard = ({ element, colorClass, onClick }: ElementCardProps) => {
  const t = useTranslations();
  return (
    <div
      className={`element-card ${colorClass} h-12 sm:h-16 w-full relative cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border border-gray-800 dark:border-gray-200 overflow-hidden`}
      onClick={onClick}
    >
      <div className="absolute top-0.5 left-1 element-number text-xs font-bold text-gray-800 dark:text-gray-200 leading-none">
        {element.atomicNumber}
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 element-symbol text-sm sm:text-lg font-bold text-gray-800 dark:text-gray-200 leading-none">
        {element.symbol}
      </div>
      <div className="absolute top-0.5 right-1 element-mass text-xs text-gray-800 dark:text-gray-200 leading-none">
        {element.atomicMass}
      </div>
      <div className="absolute bottom-0 left-0 right-0 element-name text-xs text-gray-800 dark:text-gray-200 text-center leading-tight px-1 hidden sm:block truncate">
        {t(`elements.${element.symbol}`)}
      </div>
    </div>
  );
};

export default ElementCard;