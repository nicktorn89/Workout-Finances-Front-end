import { WorkoutObject, WorkoutDTO } from 'src/store/modules/types';
import { QueryObject } from 'src/api/utils/types';
export interface ModalState {
  activeModal: boolean;

  peopleCount: number;
  trainPrice: number;
  workoutDate: string;

  shouldBeValidated: boolean;
  editingWorkoutId: null | string;
}
