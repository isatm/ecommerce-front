'use client';

import React, { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

interface Tab {
  name: string;
  href: string;
  content: ReactNode; 
}

interface TabNavigationProps {
  tabs: Tab[];
  basePath: string; 
}

export default function TabNavigation({ tabs }: TabNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabClick = (href: string) => {
    router.push(href);
  };

  const activeTab = tabs.find(tab => pathname.startsWith(tab.href)) || tabs[0];

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.href)}
              className={clsx(
                activeTab.href === tab.href
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none'
              )}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4">
      </div>
    </div>
  );
}