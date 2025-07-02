export interface Chakra {
  id: string;
  name: string;
  nameJa: string;
  color: string;
  frequency: string;
  position: string;
  keywords: string[];
  description: string;
  yoga: string[];
  food: string[];
  daily: string[];
  gradient: string;
}

export interface SessionRecord {
  id: string;
  chakraId: string;
  date: string;
  duration: number;
  feeling: 'great' | 'good' | 'okay';
}

export type Screen = 'home' | 'detail' | 'session' | 'record';
export type DetailTab = 'sound' | 'yoga' | 'food' | 'daily';