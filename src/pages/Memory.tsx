// src/data/Memory.tsx
type SkillLevels = Record<string, Record<string, number>>;
type Listener = () => void;

const memory = {
  class1: '',
  class2: '',
  skillLevels: {} as SkillLevels,
};

const listeners: Set<Listener> = new Set();

export function setClass1(value: string) {
  memory.class1 = value;
  notify();
}

export function setClass2(value: string) {
  memory.class2 = value;
  notify();
}

export function getClass1(): string {
  return memory.class1;
}

export function getClass2(): string {
  return memory.class2;
}

export function setSkillLevel(className: string, skillId: string, level: number) {
  if (!memory.skillLevels[className]) {
    memory.skillLevels[className] = {};
  }
  memory.skillLevels[className][skillId] = level;
  notify();
}

export function getSkillLevel(className: string, skillId: string): number {
  return memory.skillLevels[className]?.[skillId] ?? 0;
}

export function getAllSkillLevels(): SkillLevels {
  return memory.skillLevels;
}

export function resetSkillLevels(className: string) {
  memory.skillLevels[className] = {}; // ล้างข้อมูลสกิลของคลาสนั้น
  notify();
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((fn) => fn());
}
