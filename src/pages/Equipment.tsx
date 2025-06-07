import { useState } from 'react';

const tabs = ['General', 'Costume', 'Seal', 'Mount', 'Pets'];

type SealType = 'Stats' | 'Skill' | 'SpecialSkill' | 'Any';

const sealSlots: { id: string; row: number; col: number; type: SealType }[] = [
  { id: 's1', row: 1, col: 2, type: 'Stats' },
  { id: 's2', row: 1, col: 4, type: 'Stats' },
  { id: 's3', row: 2, col: 1, type: 'Stats' },
  { id: 's6', row: 2, col: 5, type: 'Stats' },
  { id: 's8', row: 4, col: 1, type: 'Stats' },
  { id: 's11', row: 4, col: 5, type: 'Stats' },
  { id: 's12', row: 5, col: 2, type: 'Stats' },
  { id: 's13', row: 5, col: 4, type: 'Stats' },
  { id: 's4', row: 2, col: 2, type: 'Skill' },
  { id: 's5', row: 2, col: 4, type: 'Skill' },
  { id: 's9', row: 4, col: 2, type: 'Skill' },
  { id: 's10', row: 4, col: 4, type: 'Skill' },
  { id: 's7', row: 3, col: 3, type: 'SpecialSkill' },
  { id: 's14', row: 6, col: 2, type: 'Any' },
  { id: 's15', row: 6, col: 3, type: 'Any' },
  { id: 's16', row: 6, col: 4, type: 'Any' },
];

const equipmentSlots = [
  { id: 'helmet', name: 'Helmet', row: 1, col: 5 },
  { id: 'armor', name: 'Armor', row: 2, col: 5 },
  { id: 'pants', name: 'Pants', row: 3, col: 5 },
  { id: 'gloves', name: 'Gloves', row: 4, col: 5 },
  { id: 'boots', name: 'Boots', row: 5, col: 5 },
  { id: 'weapon', name: 'Main Weapon', row: 6, col: 5 },
  { id: 'subweapon', name: 'Sub Weapon', row: 7, col: 5 },
    { id: 'necklace', name: 'Necklace', row: 8, col: 1 },
    { id: 'earring', name: 'Earring', row: 8, col: 2 },
    { id: 'ring1', name: 'Ring 1', row: 8, col: 3 },
    { id: 'ring2', name: 'Ring 2', row: 8, col: 4 },
];

export default function Equipment() {
  const [activeTab, setActiveTab] = useState('General');

  const renderSealGrid = () => {
    const maxRow = 6;
    const maxCol = 5;

    return (
      <div className="w-1/4 bg-gray-800 border border-amber-400 p-2 rounded">
        <p className="text-center text-yellow-300 font-bold mb-1 text-sm">Seal</p>
        <div className="space-y-[8px]">
          {Array.from({ length: maxRow }, (_, r) => {
            const isRow6 = r === 5;
            return (
              <div
                key={`row-${r}`}
                className={`flex justify-center ${isRow6 ? 'gap-4' : 'gap-2'}`}
              >
                {Array.from({ length: maxCol }, (_, c) => {
                  const slot = sealSlots.find(
                    (s) => s.row === r + 1 && s.col === c + 1
                  );
                  return (
                    <div
                      key={`cell-${r}-${c}`}
                      className="w-10 h-10 flex items-center justify-center"
                    >
                      {slot ? (
                        <div
                          className={`w-10 h-10 border rounded text-[9px] text-white flex flex-col items-center justify-center leading-none
                            ${
                              slot.type === 'Stats'
                                ? 'bg-blue-700 border-blue-400'
                                : slot.type === 'Skill'
                                ? 'bg-green-700 border-green-400'
                                : slot.type === 'SpecialSkill'
                                ? 'bg-red-700 border-red-400'
                                : 'bg-yellow-700 border-yellow-400'
                            }`}
                        >
                          <div>{slot.id}</div>
                          <div className="text-[7px] text-gray-200">
                            {slot.type}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderLeftPanel = () => {
    if (activeTab === 'Seal') return renderSealGrid();

    const titleMap: Record<string, string> = {
      General: 'General',
      Costume: 'Costume',
      Mount: 'Mount',
      Pets: 'Pet',
    };

    if (activeTab === 'Mount' || activeTab === 'Pets') {
      return (
        <div className="w-1/4 bg-gray-800 border border-amber-400 p-2 rounded">
          <p className="text-center text-yellow-300 font-bold mb-1 text-sm">
            {titleMap[activeTab]}
          </p>
          <div className="flex items-center justify-between bg-black bg-opacity-30 px-2 py-1 border border-gray-600 rounded">
            <span className="text-xs text-white">Mount Pet</span>
            <div className="w-10 h-10 bg-gray-600 border border-white rounded" />
          </div>
        </div>
      );
    }

    const maxRow = Math.max(...equipmentSlots.map((s) => s.row));
    const maxCol = 5;

    return (
      <div className="w-1/4 bg-gray-800 border border-amber-400 p-2 rounded">
        <p className="text-center text-yellow-300 font-bold mb-1 text-sm">
          {titleMap[activeTab]}
        </p>
        <div className="grid grid-cols-5 gap-[6px]">
          {Array.from({ length: maxRow }, (_, r) =>
            Array.from({ length: maxCol }, (_, c) => {
              const slot = equipmentSlots.find(
                (s) => s.row === r + 1 && s.col === c + 1
              );
              return (
                <div
                  key={`equip-${r}-${c}`}
                  className="w-full h-full flex items-center justify-center"
                >
                  {slot ? (
                    <div className="flex flex-col items-center justify-center bg-black bg-opacity-30 px-1 py-1 border border-gray-600 rounded text-xs text-white">
                      <div>{slot.name}</div>
                      <div className="w-10 h-10 mt-1 bg-gray-600 border border-white rounded" />
                    </div>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full h-full bg-gray-900 text-white p-3 gap-2">
      {renderLeftPanel()}
      <div className="w-[10%] bg-gray-800 border border-amber-400 p-2 rounded flex flex-col space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-left px-2 py-[6px] rounded text-sm font-bold ${
              activeTab === tab
                ? 'bg-yellow-300 text-black'
                : 'bg-gray-600 text-white'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
