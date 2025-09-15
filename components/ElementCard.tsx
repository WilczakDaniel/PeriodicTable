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
      className={`element-card ${colorClass} h-6 sm:h-12 md:h-16 w-full relative cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-110 hover:z-10 active:scale-95 border border-gray-400 dark:border-gray-600 overflow-hidden rounded-sm touch-manipulation`}
      onClick={onClick}
    >
      <div className="absolute top-0 left-0.5 sm:top-0.5 sm:left-1 element-number text-[6px] sm:text-[9px] md:text-[10px] font-semibold leading-none">
        {element.atomicNumber}
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 element-symbol text-[8px] sm:text-base md:text-xl font-bold leading-none">
        {element.symbol}
      </div>
      <div className="absolute top-0 right-0.5 sm:top-0.5 sm:right-1 element-mass text-[5px] sm:text-[8px] md:text-[9px] leading-none hidden sm:block">
        {Number(element.atomicMass).toFixed(2)}
      </div>
      <div className="absolute bottom-0 left-0 right-0 sm:bottom-0.5 element-name text-[5px] sm:text-[8px] md:text-[9px] text-center leading-tight px-0.5 sm:px-1 hidden md:block truncate">
        {t(`elements.${element.symbol}`)}
      </div>
    </div>
  );
};

export default ElementCard;