import React, { memo } from 'react';
import { checkIsEqual } from 'src/checkIsEqual';

import { ControlsProps } from './types';
import { ButtonsContainer, AddWorkout, RemoveWorkout } from './styled';

const Controls: React.FC<ControlsProps> = ({ toggleModal }) =>
  <ButtonsContainer>
    <AddWorkout
      color='primary'
      variant='contained'
      onClick={toggleModal}
    >
      Добавить тренировку
    </AddWorkout>
  </ButtonsContainer>;

export default memo(Controls, checkIsEqual);
