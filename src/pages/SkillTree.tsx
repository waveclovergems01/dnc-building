import React, { useState } from 'react';
import auraIcon from '../assets/img/cleric/skill/Aura_of_Healing.webp';

export default function SkillTree() {
  const [levels, setLevels] = useState(Array(6).fill(1));
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

  const increaseLevel = (index: number) => {
    setLevels(prev => prev.map((lv, i) => (i === index && lv < 19 ? lv + 1 : lv)));
  };

  const decreaseLevel = (index: number) => {
    setLevels(prev => prev.map((lv, i) => (i === index && lv > 0 ? lv - 1 : lv)));
  };

  const renderSkillBox = (index: number) => (
    <div
      className="relative w-[64px] h-[64px] border border-yellow-300 flex items-center justify-center"
      onMouseEnter={() => setTooltipIndex(index)}
      onMouseLeave={() => setTooltipIndex(null)}
    >
      <img src={auraIcon} alt={`0${index + 1}`} className="w-full h-full object-contain" />
      <div className="absolute top-0 left-0 w-full text-xs text-center bg-black bg-opacity-70 text-white">
        {levels[index]}/19
      </div>
      <div className="absolute bottom-0 w-full flex justify-between px-1">
        <button onClick={() => decreaseLevel(index)} className="bg-black bg-opacity-60 text-white px-1 text-sm rounded">–</button>
        <button onClick={() => increaseLevel(index)} className="bg-black bg-opacity-60 text-white px-1 text-sm rounded">+</button>
      </div>
      {tooltipIndex === index && (
        <div className="absolute left-16 top-0 w-[250px] bg-black bg-opacity-90 text-white text-xs p-2 border border-yellow-300 z-50 shadow-lg text-left">
          <div className="text-yellow-300 font-bold">Fire Ball</div>
          <div className="text-white">Skill Lv. : {levels[index]}</div>
          <div className="text-white">ใช้ MP: 240 (3.5% ของ MP พื้นฐาน)</div>
          <div className="text-white">ชนิด: Debuff</div>
          <div className="text-white mb-2">Cooldown: 15 วินาที</div>
          <div className="text-red-400">เลเวลตัวละคร 42</div>
          <div className="text-red-400 mb-2">SP 1</div>
          <div className="border border-yellow-400 p-1 mb-2">
            <div>ธาตุ: ไฟ</div>
            <div className="text-yellow-200">Magic Attack 477% + 4822</div>
            <div className="text-yellow-200">โดนทั้งหมด 5 ครั้ง + Burn</div>
            <div className="text-yellow-200">Burn: Magic Attack 5% + 964</div>
          </div>
          <div className="text-[10px] text-gray-300 italic">*ใช้ลูกกลิ้งเมาส์เพื่อสลับระหว่าง PvE / PvP</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-4 gap-10 p-5 bg-gray-800 text-white text-center text-sm place-items-center">
      {renderSkillBox(0)}
      {renderSkillBox(1)}
      {renderSkillBox(2)}
      {renderSkillBox(3)}
      {renderSkillBox(4)}
      <div className="col-span-3 grid grid-cols-subgrid gap-10 place-items-center">
        <div className="col-start-2">
          {renderSkillBox(5)}
        </div>
      </div>
    </div>
  );
}
