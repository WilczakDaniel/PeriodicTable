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
      'alkali metal': 'bg-teal-500 dark:bg-teal-600 border-teal-600 dark:border-teal-500',
      'alkaline earth metal': 'bg-red-400 dark:bg-red-500 border-red-500 dark:border-red-400',
      'transition metal': 'bg-blue-500 dark:bg-blue-600 border-blue-600 dark:border-blue-500',
      'post-transition metal': 'bg-green-500 dark:bg-green-600 border-green-600 dark:border-green-500',
      'metalloid': 'bg-yellow-500 dark:bg-yellow-600 border-yellow-600 dark:border-yellow-500',
      'nonmetal': 'bg-yellow-400 dark:bg-yellow-500 border-yellow-500 dark:border-yellow-400',
      'halogen': 'bg-red-300 dark:bg-red-400 border-red-400 dark:border-red-300',
      'noble gas': 'bg-purple-400 dark:bg-purple-500 border-purple-500 dark:border-purple-400',
      'lanthanide': 'bg-blue-400 dark:bg-blue-500 border-blue-500 dark:border-blue-400',
      'actinide': 'bg-orange-500 dark:bg-orange-600 border-orange-600 dark:border-orange-500',
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
      // Include Lu (71) and Lr (103) in the main table, exclude other lanthanides/actinides
      if ((element.category === 'lanthanide' && element.atomicNumber !== 71) ||
          (element.category === 'actinide' && element.atomicNumber !== 103)) {
        return;
      }
      if (periodIndex < 7 && groupIndex < 18) {
        layout[periodIndex][groupIndex] = element;
      }
    });

    return layout;
  };

  const lanthanides = elements.filter(el => el.category === 'lanthanide' && el.atomicNumber !== 71).sort((a, b) => a.atomicNumber - b.atomicNumber);
  const actinides = elements.filter(el => el.category === 'actinide' && el.atomicNumber !== 103).sort((a, b) => a.atomicNumber - b.atomicNumber);

  const tableLayout = createTableLayout();

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm p-0.5 sm:p-2 md:p-4 border-0 sm:border border-gray-200 dark:border-gray-700 shadow-none sm:shadow-lg sm:shadow-2xl min-w-[280px] sm:min-w-[640px] md:min-w-[900px] rounded-none sm:rounded-md sm:rounded-xl">
          <div className="flex mb-0.5 sm:mb-2">
            <div className="w-4 sm:w-8 md:w-10"></div>
            <div className="grid grid-cols-18 gap-0 flex-1">
              {Array.from({ length: 18 }, (_, i) => (
                <div key={i} className="text-center text-[9px] sm:text-sm md:text-base font-bold text-gray-700 dark:text-gray-300 py-0.5 sm:py-1">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        <div className="space-y-0">
          {tableLayout.map((period, periodIndex) => (
            <div key={periodIndex} className="flex items-center">
              <div className="flex items-center justify-center text-[10px] sm:text-sm md:text-base font-bold text-gray-700 dark:text-gray-300 w-4 sm:w-8 md:w-10 h-6 sm:h-12 md:h-16">
                {periodIndex + 1}
              </div>
              <div className="grid grid-cols-18 gap-0 flex-1">
                {period.map((element, groupIndex) => {
                  return (
                    <div key={`${periodIndex}-${groupIndex}`} className="col-span-1">
                      {element ? (
                        <ElementCard
                          element={element}
                          colorClass={getCategoryColor(element.category)}
                          onClick={() => setSelectedElement(element)}
                        />
                      ) : (
                        <div className="h-6 sm:h-12 md:h-16 w-full"></div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
          <div id="lanthanides" className="mt-8 sm:mt-10">
            <div className="flex items-center">
              <div className="flex items-center justify-center text-[10px] sm:text-sm md:text-base font-bold text-gray-700 dark:text-gray-300 w-4 sm:w-8 md:w-10 h-6 sm:h-12 md:h-16">
                *
              </div>
              <div className="grid grid-cols-18 gap-0 flex-1">
                {Array.from({ length: 18 }, (_, i) => {
                  const lanthanideIndex = i - 2; // Start from column 3 (index 2)
                  if (lanthanideIndex >= 0 && lanthanideIndex < lanthanides.length) {
                    const element = lanthanides[lanthanideIndex];
                    return (
                      <div key={`lanthanide-${i}`} className="col-span-1">
                        <ElementCard
                          element={element}
                          colorClass={getCategoryColor(element.category)}
                          onClick={() => setSelectedElement(element)}
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={`lanthanide-${i}`} className="col-span-1">
                      <div className="h-6 sm:h-12 md:h-16 w-full"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div id="actinides" className="mt-2">
            <div className="flex items-center">
              <div className="flex items-center justify-center text-[10px] sm:text-sm md:text-base font-bold text-gray-700 dark:text-gray-300 w-4 sm:w-8 md:w-10 h-6 sm:h-12 md:h-16">
                *
              </div>
              <div className="grid grid-cols-18 gap-0 flex-1">
                {Array.from({ length: 18 }, (_, i) => {
                  const actinideIndex = i - 2; // Start from column 3 (index 2)
                  if (actinideIndex >= 0 && actinideIndex < actinides.length) {
                    const element = actinides[actinideIndex];
                    return (
                      <div key={`actinide-${i}`} className="col-span-1">
                        <ElementCard
                          element={element}
                          colorClass={getCategoryColor(element.category)}
                          onClick={() => setSelectedElement(element)}
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={`actinide-${i}`} className="col-span-1">
                      <div className="h-6 sm:h-12 md:h-16 w-full"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedElement && (
        <ElementDetails
          element={selectedElement}
          onClose={() => setSelectedElement(null)}
        />
      )}
      <div className="mt-6 sm:mt-8 max-w-4xl mx-auto animate-slide-up px-2 sm:px-0">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center text-gray-800 dark:text-gray-200 font-serif">
          {t('elementCategories')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 sm:gap-3 text-xs sm:text-sm bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 sm:p-4 md:p-6 border border-gray-300 dark:border-gray-600 max-h-40 sm:max-h-none overflow-y-auto sm:overflow-visible">
          {Object.entries({
            'alkali metal': t('alkaliMetals'),
            'alkaline earth metal': t('alkalineEarthMetals'),
            'transition metal': t('transitionMetals'),
            'post-transition metal': t('postTransitionMetals'),
            'metalloid': t('metalloids'),
            'nonmetal': t('nonmetals'),
            'halogen': t('halogens'),
            'noble gas': t('nobleGases'),
            'lanthanide': t('lanthanides'),
            'actinide': t('actinides'),
          }).map(([category, label]) => (
            <div key={category} className="flex items-center gap-1 sm:gap-3">
              <div className={`w-3 h-3 sm:w-5 sm:h-5 rounded border ${getCategoryColor(category)} flex-shrink-0`}></div>
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium truncate">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeriodicTable;