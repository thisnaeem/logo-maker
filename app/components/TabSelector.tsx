import { Tab } from '@headlessui/react';

type TabType = 'text' | 'icon' | 'stacking' | 'background';

interface TabSelectorProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export function TabSelector({ activeTab, setActiveTab }: TabSelectorProps) {
  const tabs = [
    { id: 'text' as const, label: 'Text' },
    { id: 'icon' as const, label: 'Icon' },
    { id: 'stacking' as const, label: 'Stacking' },
    { id: 'background' as const, label: 'Background' },
  ] as const;

  return (
    <Tab.Group 
      selectedIndex={tabs.findIndex(tab => tab.id === activeTab)} 
      onChange={(index) => setActiveTab(tabs[index].id)}
    >
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