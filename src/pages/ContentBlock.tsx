import { useState } from 'react';
import SkillTree from './SkillTree';
import ImportExport from './ImportExport'; // ✅ เพิ่ม import
import { resetSkillLevels } from './Memory';

interface Props {
  class1: string;
  class2: string;
}

function SkillNotFoundPanel({ className }: { className: string }) {
  return (
    <div className="w-full bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 bg-opacity-60 border border-blue-500 text-center py-6 px-4 rounded-lg shadow-md mt-4 backdrop-blur-sm">
      <p className="text-lg font-bold text-blue-200 drop-shadow">ยังไม่มีข้อมูลสกิลของคลาส</p>
      <p className="text-xl font-semibold text-cyan-300 mt-1 drop-shadow">{className}</p>
    </div>
  );
}

export default function ContentBlock({ class1, class2 }: Props) {
  const [activeTab, setActiveTab] = useState<'class1' | 'class2' | 'importexport'>('class1');
  const [resetKeyClass1, setResetKeyClass1] = useState(0);
  const [resetKeyClass2, setResetKeyClass2] = useState(0);

  const handleReset = () => {
    if (activeTab === 'class1') {
      resetSkillLevels(class1);
      setResetKeyClass1(prev => prev + 1);
    }
    if (activeTab === 'class2') {
      resetSkillLevels(class2);
      setResetKeyClass2(prev => prev + 1);
    }
  };

  const renderSkillContent = (cls: string, resetKey: number) => {
    if (cls === 'Cleric') {
      return (
        <div className="w-fit space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-amber-200 mb-2 text-lg font-semibold">
              Skill Tree {cls}
            </p>
            <button
              onClick={handleReset}
              className="ml-4 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded shadow"
            >
              Reset Skill
            </button>
          </div>
          <SkillTree resetKey={resetKey} className={cls} />
        </div>
      );
    }

    return <SkillNotFoundPanel className={cls} />;
  };

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

        {class2 && (
          <button
            className={`px-4 py-2 text-sm font-bold ${
              activeTab === 'class2'
                ? 'border-b-2 border-yellow-300 text-yellow-300'
                : 'text-gray-300'
            }`}
            onClick={() => setActiveTab('class2')}
          >
            Skill {class2}
          </button>
        )}

        <button
          className={`px-4 py-2 text-sm font-bold ${
            activeTab === 'importexport'
              ? 'border-b-2 border-yellow-300 text-yellow-300'
              : 'text-gray-300'
          }`}
          onClick={() => setActiveTab('importexport')}
        >
          Import/Export
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        {activeTab === 'class1' && class1 && renderSkillContent(class1, resetKeyClass1)}
        {activeTab === 'class2' && class2 && renderSkillContent(class2, resetKeyClass2)}
        {activeTab === 'importexport' && <ImportExport />}
      </div>
    </div>
  );
}
