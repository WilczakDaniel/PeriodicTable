'use client';

import { Element } from '@/data/elements';
import { useTranslations } from 'next-intl';

interface ElementDetailsProps {
  element: Element;
  onClose: () => void;
}

const ElementDetails = ({ element, onClose }: ElementDetailsProps) => {
  const t = useTranslations();
  const formatTemperature = (temp?: number) => {
    if (temp === undefined) return 'N/A';
    return `${temp.toFixed(1)}°C`;
  };

  const formatDensity = (density?: number) => {
    if (density === undefined) return 'N/A';
    return `${density.toFixed(3)} g/cm³`;
  };

  const formatElectronegativity = (electronegativity?: number) => {
    if (electronegativity === undefined) return 'N/A';
    return electronegativity.toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-fade-in">
      <div className="bg-gray-900 dark:bg-gray-950 rounded-lg sm:rounded-xl max-w-full sm:max-w-lg md:max-w-2xl w-full mx-2 sm:mx-4 p-4 sm:p-6 relative shadow-xl sm:shadow-2xl border border-gray-700 dark:border-gray-600 animate-slide-up max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl sm:text-3xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 z-10"
        >
          ×
        </button>
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 font-serif">
            {t(`elements.${element.symbol}`)}
          </h2>
          <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {element.symbol}
          </div>
          <div className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            {t('atomicNumber')}: {element.atomicNumber}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-1 sm:pb-2">
              {t('basicProperties')}
            </h3>
            <div className="flex justify-between items-center py-1 sm:py-2 text-sm sm:text-base">
              <span className="font-medium text-gray-700 dark:text-gray-300">{t('atomicMass')}:</span>
              <span className="text-gray-900 dark:text-gray-100 font-mono text-xs sm:text-sm">{element.atomicMass} u</span>
            </div>
            <div className="flex justify-between items-center py-1 sm:py-2 text-sm sm:text-base">
              <span className="font-medium text-gray-700 dark:text-gray-300">{t('category')}:</span>
              <span className="capitalize text-gray-900 dark:text-gray-100 text-xs sm:text-sm text-right">{t(`categories.${element.category}`)}</span>
            </div>
            <div className="flex justify-between items-center py-1 sm:py-2 text-sm sm:text-base">
              <span className="font-medium text-gray-700 dark:text-gray-300">{t('period')}:</span>
              <span className="text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{element.period}</span>
            </div>
            <div className="flex justify-between items-center py-1 sm:py-2 text-sm sm:text-base">
              <span className="font-medium text-gray-700 dark:text-gray-300">{t('group')}:</span>
              <span className="text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{element.group}</span>
            </div>

            <div className="flex justify-between items-center py-1 sm:py-2 text-sm sm:text-base">
              <span className="font-medium text-gray-700 dark:text-gray-300">{t('electronegativity')}:</span>
              <span className="text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{formatElectronegativity(element.electronegativity)}</span>
            </div>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-1 sm:pb-2">
              {t('physicalProperties')}
            </h3>
            <div className="flex justify-between items-center py-1 sm:py-2 text-sm sm:text-base">
              <span className="font-medium text-gray-700 dark:text-gray-300">{t('meltingPoint')}:</span>
              <span className="text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{formatTemperature(element.meltingPoint)}</span>
            </div>
            <div className="flex justify-between items-center py-1 sm:py-2 text-sm sm:text-base">
              <span className="font-medium text-gray-700 dark:text-gray-300">{t('boilingPoint')}:</span>
              <span className="text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{formatTemperature(element.boilingPoint)}</span>
            </div>
            <div className="flex justify-between items-center py-1 sm:py-2 text-sm sm:text-base">
              <span className="font-medium text-gray-700 dark:text-gray-300">{t('density')}:</span>
              <span className="text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{formatDensity(element.density)}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 sm:mt-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-1 sm:pb-2 mb-2 sm:mb-3">
            {t('electronConfiguration')}
          </h3>
          <div className="text-xs sm:text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 sm:p-3 md:p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-center break-all">
            {element.electronConfiguration}
          </div>
        </div>
        <div className="mt-4 sm:mt-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-1 sm:pb-2 mb-2 sm:mb-3">
            {t('elementInformation')}
          </h3>
          <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('elementDescription', {
              symbol: element.symbol,
              name: t(`elements.${element.symbol}`),
              category: t(`categories.${element.category}`).toLowerCase(),
              atomicNumber: element.atomicNumber,
              atomicMass: element.atomicMass,
              period: element.period,
              group: element.group
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementDetails;