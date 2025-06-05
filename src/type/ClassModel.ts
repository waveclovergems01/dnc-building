export interface CharStats {
  hp: number;
  mp: number;
  mpRecovery: number;
  str: number;
  agi: number;
  int: number;
  vit: number;
  pdef: number;
  mdef: number;
  cri: number;
  stun: number;
  palayze: number;
  finalDmg: number;
  criResist: number;
  stunResist: number;
  paralyzeResist?: number;
  movementSpeed: number;
}

export interface BasicStats {
  atkMax: number;
  atkMin: number;
  matkMax: number;
  matkMin: number;
}

export interface ElementalStats {
  fireAtk: number;
  iceAtk: number;
  lightAtk: number;
  darkAtk: number;
  fireDef: number;
  iceDef: number;
  lightDef: number;
  darkDef: number;
}

export interface Stats {
  charStats: CharStats;
  basicStats: BasicStats;
  elementalStats: ElementalStats;
}

export interface SubJob {
  jobId: number;
  jobName: string;
}

export interface ClassJob {
  jobId: number;
  jobName: string;
  stats?: Stats;
  subJobs: SubJob[];
}
