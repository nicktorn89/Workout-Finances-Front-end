import { WorkoutObject } from 'src/store/modules/types';

export interface WorkoutDayTableProps {
  workouts: WorkoutObject[];

  editWorkout: (id: string) => void;
  deleteWorkout: (id: string) => void;
}
