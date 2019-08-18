import { ChangeEvent } from 'react';

export interface WorkoutModalProps {
  isActive: boolean;
  title: string; 
  values: ModalValues;
  
  onChangeSwitch: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  onCancel: (e: React.MouseEvent) => void;
  onOk?: (e: React.MouseEvent) => void;
  onChangeValue: Function;
}

type ModalValues = {
  [key: string]: boolean | number;
};
