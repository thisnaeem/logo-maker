import { Tab } from '@headlessui/react';

interface TabSelectorProps {
  activeTab: 'text' | 'icon' | 'stacking' | 'background';
  setActiveTab: (tab: 'text' | 'icon' | 'stacking' | 'background') => void;
}

export function TabSelector({ activeTab, setActiveTab }: TabSelectorProps) {
  const tabs = [
    { id: 'text', label: 'Text' },
    { id: 'icon', label: 'Icon' },
    { id: 'stacking', label: 'Stacking' },
    { id: 'background', label: 'Background' },
  ];

  return (
    <Tab.Group selectedIndex={tabs.findIndex(tab => tab.id === activeTab)} onChange={(index) => setActiveTab(tabs[index].id as any)}>
      <Tab.List className="flex space-x-1  bg-gray-700/20 p-1">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            className={({ selected }) =>
              `w-full  py-2.5 text-sm font-medium leading-5
              ${selected
                ? 'bg-blue-500 text-white shadow'
                : 'text-gray-400 hover:bg-gray-700/30 hover:text-white'
              }`
            }
          >
            {tab.label}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
} 