export interface MainStore {
  workouts: WorkoutObject[];
  currentYear: number;
  currentMonth: number;
  currentPart: 'first' | 'second';
}

export interface WorkoutDTO {
  date: Date;
  peopleCount: number;
  price: number;
  isPersonal: boolean;
  isJumps: boolean;
  isFree: boolean;

  _id?: string;
}

export type WorkoutObject = {
  date: Date;
  peopleCount: number;
  trainPrice: number;

  price: number;
  isPersonal: boolean;
  isJumps: boolean;
  isFree: boolean;
  _id?: string;
};

export interface PeriodData {
  currentMonth: number;
  currentYear: number;
  currentPart: 'first' | 'second';
}
