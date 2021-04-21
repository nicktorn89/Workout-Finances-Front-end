import React, { memo } from 'react';
import { ControlsProps } from './types';
import { ButtonsContainer, AddWorkout, RemoveWorkout } from './styled';

const Controls: React.FC<ControlsProps> = ({ removeWorkout, toggleModal }) =>
  <ButtonsContainer>
    <AddWorkout
      color='primary'
      variant='contained'
      onClick={toggleModal}
    >
      Добавить тренировку
    </AddWorkout>

    <RemoveWorkout
      color='secondary'
      variant='contained'
      onClick={removeWorkout}
    >
      Удалить тренировку
    </RemoveWorkout>
  </ButtonsContainer>;

export default memo(Controls);
