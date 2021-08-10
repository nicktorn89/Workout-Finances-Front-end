import React, { memo, useState } from 'react';
import { Modal } from 'src/components';
import { checkIsEqual } from 'src/checkIsEqual';

import { WorkoutModalProps } from './types';
import { WorkoutModalInput } from './styled';

export const WorkoutModal: React.FC<WorkoutModalProps> = memo(({
  isActive, onCancel, onOk, isEdit,
  onChangeTrainPrice, onChangePeopleCount,
  handleChangeWorkoutDate, title, values,
  shouldBeValidated,
}) => {
  const isPeopleCountValid = typeof values.peopleCount === 'number' && values.peopleCount > 0;
  const isTrainPriceValid = typeof values.trainPrice === 'number' && values.trainPrice > 0;

  return (
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
        error={shouldBeValidated && !isPeopleCountValid}
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
        error={shouldBeValidated && !isTrainPriceValid}
      />
    </Modal>
  );
}, checkIsEqual);
