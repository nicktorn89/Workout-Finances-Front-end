import React, { memo } from 'react';
import { Modal } from 'src/components';
import { checkIsEqual } from 'src/checkIsEqual';

import { WorkoutModalProps } from './types';
import { WorkoutModalInput } from './styled';

export const WorkoutModal: React.FC<WorkoutModalProps> = memo(({
  isActive, onCancel, onOk, isEdit,
  onChangeTrainPrice, onChangePeopleCount,
  handleChangeWorkoutDate, title, values,
}) => (
    <Modal
      isActive={isActive}
      title={title}
      onCancel={onCancel}
      onOk={onOk}
    >
      <WorkoutModalInput
        id='workout-datetime'
        label='Дата тренировки'
        type='datetime-local'
        defaultValue={values.workoutDate}
        onChange={handleChangeWorkoutDate}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <WorkoutModalInput
        id='people-number'
        min={1}
        max={Infinity}
        type='number'
        label='Кол-во человек'
        InputLabelProps={{
          shrink: true,
        }}
        margin='normal'
        defaultValue={isEdit && values.peopleCount}
        onChange={onChangePeopleCount}
      />

      <WorkoutModalInput
        id='train-price'
        min={1}
        max={Infinity}
        type='number'
        label='Доход с человека'
        InputLabelProps={{
          shrink: true,
        }}
        margin='normal'
        defaultValue={isEdit && values.trainPrice}
        onChange={onChangeTrainPrice}
      />
    </Modal>
  ), checkIsEqual);
