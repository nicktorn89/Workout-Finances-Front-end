import { ChangeEvent } from 'react';

export interface WorkoutModalProps {
  isActive: boolean;
  title: string; 
  isEdit: boolean;

  shouldBeValidated: boolean;
  values: {
    trainPrice: number;
    peopleCount: number;
    workoutDate: string;
  };
  
  onCancel: (e: React.MouseEvent) => void;
  onOk?: (e: React.MouseEvent) => void;
  onChangePeopleCount: (e: Event) => void;
  onChangeTrainPrice: (e: Event) => void;

  handleChangeWorkoutDate: (e: Event) => void;
}
