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
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6 relative shadow-2xl border border-gray-200 dark:border-gray-700 animate-slide-up max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl transition-colors duration-200 z-10"
        >
          ×
        </button>
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 font-serif">
            {t(`elements.${element.symbol}`)}
          </h2>
          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {element.symbol}
          </div>
          <div className="text-lg text-gray-600 dark:text-gray-400">
            {t('atomicNumber')}: {element.atomicNumber}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2">
              {t('basicProperties')}
            </h3>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">{t('atomicMass')}:</span>
              <span className="text-gray-900 dark:text-gray-100 font-mono">{element.atomicMass} u</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">{t('category')}:</span>
              <span className="capitalize text-gray-900 dark:text-gray-100">{t(`categories.${element.category}`)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">{t('period')}:</span>
              <span className="text-gray-900 dark:text-gray-100">{element.period}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">{t('group')}:</span>
              <span className="text-gray-900 dark:text-gray-100">{element.group}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">{t('electronegativity')}:</span>
              <span className="text-gray-900 dark:text-gray-100">{formatElectronegativity(element.electronegativity)}</span>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2">
              {t('physicalProperties')}
            </h3>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">{t('meltingPoint')}:</span>
              <span className="text-gray-900 dark:text-gray-100">{formatTemperature(element.meltingPoint)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">{t('boilingPoint')}:</span>
              <span className="text-gray-900 dark:text-gray-100">{formatTemperature(element.boilingPoint)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">{t('density')}:</span>
              <span className="text-gray-900 dark:text-gray-100">{formatDensity(element.density)}</span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2 mb-3">
            {t('electronConfiguration')}
          </h3>
          <div className="text-sm font-mono bg-gray-100 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-center">
            {element.electronConfiguration}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2 mb-3">
            {t('elementInformation')}
          </h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
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