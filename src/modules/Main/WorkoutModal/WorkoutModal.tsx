import React, { memo } from 'react';
import { Modal } from 'src/components';
import { checkIsEqual } from 'src/checkIsEqual';

import { WorkoutModalProps } from './types';
import { PeopleNumberInput, PeopleNumberLabel, TrainPriceInput, TrainPriceLabel } from './styled';

export const WorkoutModal: React.FC<WorkoutModalProps> = memo(({
  isActive, onCancel, onOk, onChangeTrainPrice, onChangePeopleCount, title, values,
}) => (
    <Modal
      isActive={isActive}
      title={title}
      onCancel={onCancel}
      onOk={onOk}
    >
      <PeopleNumberLabel>Кол-во человек</PeopleNumberLabel>

      <PeopleNumberInput
        id='people-number'
        min={1}
        max={Infinity}
        type='number'
        InputLabelProps={{
          shrink: true,
        }}
        margin='normal'
        value={values.peopleCount}
        onChange={onChangePeopleCount}
      />

      <TrainPriceLabel>Доход с человека</TrainPriceLabel>

      <TrainPriceInput
        id='train-price'
        min={1}
        max={Infinity}
        type='number'
        InputLabelProps={{
          shrink: true,
        }}
        margin='normal'
        value={values.trainPrice}
        onChange={onChangeTrainPrice}
      />
    </Modal>
  ), checkIsEqual);
