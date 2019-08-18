import React, { memo } from 'react';
import { WorkoutModalProps } from './types';
import { PeopleNumberInput, SwitchLabel, PeopleNumberLabel } from './styled';
import Switch from '@material-ui/core/Switch';
import { Modal } from 'src/components';

const WorkoutModal: React.FC<WorkoutModalProps> = ({ 
  isActive, onCancel, onOk, onChangeValue, onChangeSwitch, title, values,
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
        value={values.peopleCount as number}
        onChange={onChangeValue}
      />

      <SwitchLabel>
        <Switch
          name='isPersonal'
          onChange={onChangeSwitch}
          color='primary'
          checked={values.isPersonal as boolean}
        />
        Персональная тренировка
      </SwitchLabel>
      <SwitchLabel>
        <Switch
          name='isFree'
          onChange={onChangeSwitch}
          checked={values.isFree as boolean}
        />
        Бесплатная тренировка
      </SwitchLabel>
      <SwitchLabel>
        <Switch
          name='isJumps'
          onChange={onChangeSwitch}
          color='primary'
          checked={values.isJumps as boolean}
        />
        Тренировка на джампах
      </SwitchLabel>
  </Modal>);

export default memo(WorkoutModal);
