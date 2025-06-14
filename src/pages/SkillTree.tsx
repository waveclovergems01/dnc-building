import { useEffect, useState } from 'react';
import clericData from '../data/cleric_skill_tree.json';
import warriorData from '../data/warrior_skill_tree.json';
import swordmasterData from '../data/swordmaster_skill_tree.json';
import {
  getSkillLevel,
  setSkillLevel,
} from './Memory';

// โหลดไอคอนแบบแยกคลาส
function getSkillIcons(className: string) {
  switch (className) {
    case 'Cleric':
      return import.meta.glob('../assets/img/cleric/skill/*.webp', {
        eager: true,
        query: '?url',
        import: 'default',
      });
    case 'Warrior':
      return import.meta.glob('../assets/img/warrior/skill/*.png', {
        eager: true,
        query: '?url',
        import: 'default',
      });
    case 'Sword Master':
      return import.meta.glob('../assets/img/swordmaster/skill/*.png', {
        eager: true,
        query: '?url',
        import: 'default',
      });
    default:
      return {};
  }
}

// โหลดข้อมูลสกิลแบบแยกคลาส
function getSkillData(className: string): Skill[] {
  switch (className) {
    case 'Cleric':
      return clericData.Cleric.skills;
    case 'Warrior':
      return warriorData.Warrior.skills;
    case 'Sword Master':
      return swordmasterData['Sword Master'].skills;
    default:
      return [];
  }
}

interface Skill {
  id: string;
  name: string;
  icon: string;
  position: { row: number; col: number };
  level: { min: number; max: number };
  description: string;
  prerequisite: string | null;
  type: string;
  cooldown: number;
  mpCost: string;
}

interface Props {
  resetKey?: number;
  className: string;
}

export default function SkillTree({ resetKey, className }: Props) {
  const skills: Skill[] = getSkillData(className);
  const skillIcons = getSkillIcons(className);

  const initializeLevels = () =>
    Object.fromEntries(
      skills.map((s) => [s.id, getSkillLevel(className, s.id) || s.level.min])
    );

  const [levels, setLevels] = useState<{ [id: string]: number }>(initializeLevels);
  const [tooltipId, setTooltipId] = useState<string | null>(null);

  useEffect(() => {
    setLevels(initializeLevels());
  }, [resetKey, className]);

  const increaseLevel = (id: string, max: number) => {
    setLevels((prev) => {
      const newVal = Math.min(prev[id] + 1, max);
      const updated = { ...prev, [id]: newVal };
      setSkillLevel(className, id, newVal);
      return updated;
    });
  };

  const decreaseLevel = (id: string, min: number) => {
    setLevels((prev) => {
      const newVal = Math.max(prev[id] - 1, min);
      const updated = { ...prev, [id]: newVal };
      setSkillLevel(className, id, newVal);
      return updated;
    });
  };

  const getIconPath = (className: string, iconFile: string): string => {
    switch (className) {
      case 'Sword Master':
        return `../assets/img/swordmaster/skill/${iconFile}`;
      case 'Warrior':
        return `../assets/img/warrior/skill/${iconFile}`;
      case 'Cleric':
        return `../assets/img/cleric/skill/${iconFile}`;
      default:
        return '';
    }
  };

  const renderSkillBox = (skill: Skill) => {
    const iconKey = getIconPath(className, skill.icon);
    const iconPath = skillIcons[iconKey] as string;

    return (
      <div
        key={skill.id}
        className="relative w-[64px] h-[64px] border border-yellow-300 flex items-center justify-center"
        onMouseEnter={() => setTooltipId(skill.id)}
        onMouseLeave={() => setTooltipId(null)}
      >
        <img src={iconPath} alt={skill.name} className="w-full h-full object-contain" />
        <div className="absolute top-0 left-0 w-full text-xs text-center bg-black bg-opacity-70 text-white">
          {levels[skill.id]}/{skill.level.max}
        </div>
        <div className="absolute bottom-0 w-full flex justify-between px-1">
          <button
            onClick={() => decreaseLevel(skill.id, skill.level.min)}
            className="bg-black bg-opacity-60 text-white px-1 text-sm rounded"
          >
            –
          </button>
          <button
            onClick={() => increaseLevel(skill.id, skill.level.max)}
            className="bg-black bg-opacity-60 text-white px-1 text-sm rounded"
          >
            +
          </button>
        </div>

        {tooltipId === skill.id && (
          <div className="absolute left-16 top-0 w-[250px] bg-black bg-opacity-90 text-white text-xs p-2 border border-yellow-300 z-50 shadow-lg text-left">
            <div className="text-yellow-300 font-bold">{skill.name}</div>
            <div className="text-white">Skill Lv. : {levels[skill.id]}</div>
            <div className="text-white">ใช้ MP: {skill.mpCost}</div>
            <div className="text-white">ชนิด: {skill.type}</div>
            <div className="text-white mb-2">Cooldown: {skill.cooldown} วินาที</div>
            {skill.description && (
              <div className="border border-yellow-400 p-1 mb-2">
                <div className="text-yellow-200">{skill.description}</div>
              </div>
            )}
            <div className="text-[10px] text-gray-300 italic">*Hover เพื่อดูข้อมูล</div>
          </div>
        )}
      </div>
    );
  };

  const maxRow = Math.max(...skills.map((s) => s.position.row));
  const maxCol = Math.max(...skills.map((s) => s.position.col));

  const skillGrid = Array.from({ length: maxRow }, (_, r) => (
    <div key={`row-${r}`} className="flex justify-center mb-6">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: maxCol }, (_, c) => {
          const skill = skills.find(
            (s) => s.position.row === r + 1 && s.position.col === c + 1
          );
          return (
            <div key={`cell-${r}-${c}`} className="w-[64px] h-[64px]">
              {skill ? renderSkillBox(skill) : null}
            </div>
          );
        })}
      </div>
    </div>
  ));

  return <div className="p-4 bg-gray-800 text-white text-sm">{skillGrid}</div>;
}
