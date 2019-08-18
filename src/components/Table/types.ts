import { WorkoutObject } from 'src/store/modules/types';

export interface TableProps {
  data: WorkoutObject[];
  onEdit: (id: string) => void;
  onCheckboxChange: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
