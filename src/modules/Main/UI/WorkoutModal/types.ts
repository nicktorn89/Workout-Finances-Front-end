import { ChangeEvent } from 'react';

export interface WorkoutModalProps {
  isActive: boolean;
  onCancel: (e: React.MouseEvent) => void;
  onOk?: (e: React.MouseEvent) => void;
  onChangeValue: Function;
  onChangeSwitch: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  title: string; 
  values: {
    [key: string]: boolean;
  };
}
