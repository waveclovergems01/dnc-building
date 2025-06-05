// ContentBlock.tsx
import React, { useState } from 'react';
import SkillTree from './SkillTree';

interface Props {
  class1: string;
  class2: string;
}

export default function ContentBlock({ class1, class2 }: Props) {
  const [activeTab, setActiveTab] = useState<'class1' | 'class2'>('class1');

  return (
    <div className="w-full h-full text-white">
      {/* Tabs */}
      <div className="flex border-b border-amber-200">
        <button
          className={`px-4 py-2 text-sm font-bold ${
            activeTab === 'class1'
              ? 'border-b-2 border-yellow-300 text-yellow-300'
              : 'text-gray-300'
          }`}
          onClick={() => setActiveTab('class1')}
        >
          Skill {class1 || 'Class1'}
        </button>
        <button
          className={`px-4 py-2 text-sm font-bold ${
            activeTab === 'class2'
              ? 'border-b-2 border-yellow-300 text-yellow-300'
              : 'text-gray-300'
          }`}
          onClick={() => setActiveTab('class2')}
        >
          Skill {class2 || 'Class2'}
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        {activeTab === 'class1' && (
        <div className='w-1/3'>
            <p className="text-amber-200 mb-2">Skill Tree {class1}:</p>
            <SkillTree />
        </div>
        )}
        {activeTab === 'class2' && (
          <div>
            <p className="text-amber-200">Skill {class2}:</p>
            <ul className="list-disc pl-5">
              <li>Skill A</li>
              <li>Skill B</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
