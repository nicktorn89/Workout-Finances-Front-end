import { WorkoutObject } from 'src/store/modules/types';

export interface TableProps {
  data: WorkoutObject[];
  onEdit: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onCheckboxChange: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
