import { WorkoutObject } from 'src/store/modules/types';
import { MouseEvent as ReactMouseEvent } from 'react';

export interface TableProps {
  data: WorkoutObject[];
  onCheckboxChange: (e: ReactMouseEvent<HTMLElement, MouseEvent>) => void;
}
