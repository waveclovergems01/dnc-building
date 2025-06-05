import React from 'react';
import { type Stats } from '../type/ClassModel';

interface Props {
  stats?: Stats;
}

const charStatLabels: Record<string, string> = {
  hp: 'HP',
  mp: 'MP',
  mpRecovery: 'MP Recovery',
  str: 'STR',
  agi: 'AGI',
  int: 'INT',
  vit: 'VIT',
  pdef: 'Physical DEF',
  mdef: 'Magic DEF',
  cri: 'Critical',
  stun: 'Stun',
  paralyze: 'Paralyze',
  finalDmg: 'Final DMG',
  criResist: 'Critical Resist',
  stunResist: 'Stun Resist',
  paralyzeResist: 'Paralyze Resist',
  movementSpeed: 'Move Speed',
};

const elementalLabels: Record<string, string> = {
  fireAtk: 'Fire ATK',
  iceAtk: 'Ice ATK',
  lightAtk: 'Light ATK',
  darkAtk: 'Dark ATK',
  fireDef: 'Fire DEF',
  iceDef: 'Ice DEF',
  lightDef: 'Light DEF',
  darkDef: 'Dark DEF',
};

const renderRow = (label: string, value: string | number | undefined) => (
  <div key={label} className="flex justify-center text-xs font-mono">
    <div className={`w-[120px] text-right pl-1 ${getLabelColor(label)} text-sm`}>{label}</div>
    <div className="w-[10px] text-center text-white">:</div>
    <div className="w-[120px] text-left pl-1 text-white">{value ?? '-'}</div>
  </div>
);

const renderSection = (
  title: string,
  rows: React.ReactNode[]
) => (
  <div className="mb-5">
    <div className="text-sm font-bold text-amber-200 border-b border-t border-amber-400 mb-2 text-center pb-1">
      {title}
    </div>
    <div className="space-y-0">{rows}</div>
  </div>
);

const getLabelColor = (label: string): string => {
  if (label.includes('HP')) return 'text-green-400';
  if (label.includes('MP')) return 'text-blue-400';
  if (label.includes('Fire')) return 'text-red-400';
  if (label.includes('Ice')) return 'text-cyan-300';
  if (label.includes('Light')) return 'text-yellow-300';
  if (label.includes('Dark')) return 'text-purple-400';
  return 'text-white'; // default
};

export default function LeftSideBlock({ stats }: Props) {
  const renderCharStats = stats?.charStats ?? Object.keys(charStatLabels).reduce((acc, key) => {
    acc[key] = undefined;
    return acc;
  }, {} as Record<string, number | undefined>);

  const renderBasicStats = stats?.basicStats
    ? [
        renderRow('PATK', `${stats.basicStats.atkMin} ~ ${stats.basicStats.atkMax}`),
        renderRow('MATK', `${stats.basicStats.matkMin} ~ ${stats.basicStats.matkMax}`),
      ]
    : [renderRow('PATK', '- ~ -'), renderRow('MATK', '- ~ -')];

  const renderElementalStats = stats?.elementalStats ?? Object.keys(elementalLabels).reduce((acc, key) => {
    acc[key] = undefined;
    return acc;
  }, {} as Record<string, number | undefined>);

  return (
    <div className="p-2 text-white overflow-y-auto h-full">
      {renderSection(
        'Char Stats',
        Object.entries(renderCharStats).map(([key, value]) =>
          renderRow(charStatLabels[key] || key, value)
        )
      )}
      {renderSection('Basic Stats', renderBasicStats)}
      {renderSection(
        'Elemental Stats',
        Object.entries(renderElementalStats).map(([key, value]) =>
          renderRow(elementalLabels[key] || key, value)
        )
      )}
    </div>
  );
}
