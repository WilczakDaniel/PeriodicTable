'use client';

import ElementCard from '@/components/ElementCard';
import ElementDetails from '@/components/ElementDetails';
import { Element, elements } from '@/data/elements';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const PeriodicTable = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const t = useTranslations();

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      'alkali metal': 'bg-red-300 dark:bg-red-800 border-red-500 dark:border-red-400',
      'alkaline earth metal': 'bg-red-300 dark:bg-red-800 border-red-500 dark:border-red-400',
      'transition metal': 'bg-blue-300 dark:bg-blue-800 border-blue-500 dark:border-blue-400',
      'post-transition metal': 'bg-yellow-300 dark:bg-yellow-800 border-yellow-500 dark:border-yellow-400',
      'metalloid': 'bg-yellow-300 dark:bg-yellow-800 border-yellow-500 dark:border-yellow-400',
      'nonmetal': 'bg-yellow-300 dark:bg-yellow-800 border-yellow-500 dark:border-yellow-400',
      'halogen': 'bg-yellow-300 dark:bg-yellow-800 border-yellow-500 dark:border-yellow-400',
      'noble gas': 'bg-yellow-300 dark:bg-yellow-800 border-yellow-500 dark:border-yellow-400',
      'lanthanide': 'bg-green-300 dark:bg-green-800 border-green-500 dark:border-green-400',
      'actinide': 'bg-green-300 dark:bg-green-800 border-green-500 dark:border-green-400',
    };
    return colors[category] || 'bg-gray-300 dark:bg-gray-700 border-gray-500 dark:border-gray-400';
  };

  const createTableLayout = () => {
    const layout: (Element | null)[][] = [];
    for (let period = 1; period <= 7; period++) {
      layout[period - 1] = new Array(18).fill(null);
    }

    elements.forEach(element => {
      const periodIndex = element.period - 1;
      const groupIndex = element.group - 1;
      if (element.category === 'lanthanide' || element.category === 'actinide') {
        return;
      }
      if (periodIndex < 7 && groupIndex < 18) {
        layout[periodIndex][groupIndex] = element;
      }
    });

    return layout;
  };

  const lanthanides = elements.filter(el => el.category === 'lanthanide').sort((a, b) => a.atomicNumber - b.atomicNumber);
  const actinides = elements.filter(el => el.category === 'actinide').sort((a, b) => a.atomicNumber - b.atomicNumber);

  const tableLayout = createTableLayout();

  return (
    <div className="w-full max-w-7xl mx-auto overflow-x-auto">
      <div className="bg-white dark:bg-gray-900 p-2 sm:p-4 border-2 border-gray-800 dark:border-gray-200 shadow-2xl min-w-[900px]">
        <div className="flex mb-2">
          <div className="w-8 sm:w-10"></div>
          <div className="grid grid-cols-18 gap-0 flex-1">
            {Array.from({ length: 18 }, (_, i) => (
              <div key={i} className="text-center text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 py-1">
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-0">
          {tableLayout.map((period, periodIndex) => (
            <div key={periodIndex} className="flex items-center">
              <div className="flex items-center justify-center text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 w-8 sm:w-10 h-12 sm:h-16">
                {periodIndex + 1}
              </div>
              <div className="grid grid-cols-18 gap-0 flex-1">
                {period.map((element, groupIndex) => (
                  <div key={`${periodIndex}-${groupIndex}`} className="col-span-1">
                    {element ? (
                      <ElementCard
                        element={element}
                        colorClass={getCategoryColor(element.category)}
                        onClick={() => setSelectedElement(element)}
                      />
                    ) : (
                      <div className="h-12 sm:h-16 w-full border border-gray-300 dark:border-gray-600"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center mt-2">
          <div className="flex items-center justify-center text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 w-8 sm:w-10 h-12 sm:h-16">
            *
          </div>
          <div className="flex gap-0 flex-1">
            {lanthanides.map((element) => (
              <div key={element.atomicNumber} className="w-12 sm:w-16">
                <ElementCard
                  element={element}
                  colorClass={getCategoryColor(element.category)}
                  onClick={() => setSelectedElement(element)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center mt-0">
          <div className="flex items-center justify-center text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 w-8 sm:w-10 h-12 sm:h-16">
            *
          </div>
          <div className="flex gap-0 flex-1">
            {actinides.map((element) => (
              <div key={element.atomicNumber} className="w-12 sm:w-16">
                <ElementCard
                  element={element}
                  colorClass={getCategoryColor(element.category)}
                  onClick={() => setSelectedElement(element)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedElement && (
        <ElementDetails
          element={selectedElement}
          onClose={() => setSelectedElement(null)}
        />
      )}
      <div className="mt-8 max-w-4xl mx-auto animate-slide-up">
        <h3 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200 font-serif">
          {t('elementCategories')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          {Object.entries({
            'alkali metal': t('alkaliMetals'),
            'alkaline earth metal': t('alkalineEarthMetals'),
            'transition metal': t('transitionMetals'),
            'post-transition metal': t('postTransitionMetals'),
            'metalloid': t('metalloids'),
            'nonmetal': t('nonmetals'),
            'halogen': t('halogens'),
            'noble gas': t('nobleGases'),
          }).map(([category, label]) => (
            <div key={category} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded border-2 ${getCategoryColor(category)}`}></div>
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeriodicTable;