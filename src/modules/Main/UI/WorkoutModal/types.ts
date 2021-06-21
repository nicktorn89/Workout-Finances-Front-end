import { ChangeEvent } from 'react';

export interface WorkoutModalProps {
  isActive: boolean;
  title: string; 
  values: {
    trainPrice: number;
    peopleCount: number;
  };
  
  onCancel: (e: React.MouseEvent) => void;
  onOk?: (e: React.MouseEvent) => void;
  onChangePeopleCount: (e: Event) => void;
  onChangeTrainPrice: (e: Event) => void;
}
