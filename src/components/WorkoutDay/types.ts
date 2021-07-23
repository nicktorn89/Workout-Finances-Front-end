import { WorkoutObject } from 'src/store/modules/types';

export interface WorkoutDayInfo {
  dayNumber: number;
  totalPeopleCount: number;
  totalEarningsForDay: number;
  
  workouts: WorkoutObject[];
}

export interface WorkoutDayProps extends WorkoutDayInfo {
  columnsCount: number;

  editWorkout: (id: string) => void;
  deleteWorkout: (id: string) => void;
}
