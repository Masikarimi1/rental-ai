// /gebral-Estate/ui/src/components/layout/PersonaSelector.jsx
import React from 'react';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { UserCircleIcon, BuildingOfficeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { usePersona } from '@hooks/usePersona';

const personas = [
  { 
    id: 'manager', 
    name: 'Amina', 
    role: 'Property Manager',
    icon: UserCircleIcon,
    description: 'Optimize rent pricing and reduce vacancies'
  },
  { 
    id: 'investor', 
    name: 'Robert', 
    role: 'Portfolio Investor',
    icon: CurrencyDollarIcon,
    description: 'Focus on acquisition opportunities'
  },
  { 
    id: 'developer', 
    name: 'Faisal', 
    role: 'Developer CFO',
    icon: BuildingOfficeIcon,
    description: 'Scenario analysis and investment forecasting'
  },
];

const PersonaSelector = () => {
  const { currentPersona, setPersona } = usePersona();

  return (
    <Listbox value={currentPersona} onChange={setPersona}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white/5 rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75">
          <div className="flex items-center">
            {currentPersona.icon && (
              <currentPersona.icon className="w-5 h-5 mr-2 text-primary-light" aria-hidden="true" />
            )}
            <div>
              <span className="block truncate text-sm font-medium">{currentPersona.name}</span>
              <span className="block truncate text-xs text-gray-light">{currentPersona.role}</span>
            </div>
          </div>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronUpDownIcon className="w-5 h-5 text-gray-light" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-[#4823ee] rounded-md shadow-lg max-h-60 focus:outline-none z-10">
            {personas.map((persona) => (
              <Listbox.Option
                key={persona.id}
                className={({ active }) =>
                  `${active ? 'bg-[#2a2f4c] text-white' : 'text-gray-light'}
                  cursor-pointer select-none relative py-2 pl-10 pr-4`
                }
                value={persona}
              >
                {({ selected, active }) => (
                  <>
                    <div className="flex items-center">
                      {persona.icon && (
                        <persona.icon className="w-5 h-5 mr-2 text-primary-light" aria-hidden="true" />
                      )}
                      <div>
                        <span className={`block truncate text-sm ${selected ? 'font-medium' : 'font-normal'}`}>
                          {persona.name}
                        </span>
                        <span className="block truncate text-xs text-gray-light">
                          {persona.role}
                        </span>
                      </div>
                    </div>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default PersonaSelector;