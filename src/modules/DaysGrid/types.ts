import { WorkoutObject } from 'src/store/modules/types';

export interface DaysGridProps {
  workouts: WorkoutObject[];
  editWorkout: (id: string) => void;
  deleteWorkout: (id: string) => void;
}
