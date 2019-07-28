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
        defaultValue={''}
        min={1}
        max={Infinity}
        type='number'
        InputLabelProps={{
          shrink: true,
        }}
        margin='normal'
        onChange={onChangeValue}
      />

      <SwitchLabel>
        <Switch
          name='isPersonal'
          onChange={onChangeSwitch}
          color='primary'
          checked={values.isPersonal}
        />
        Персональная тренировка
      </SwitchLabel>
      <SwitchLabel>
        <Switch
          name='isFree'
          onChange={onChangeSwitch}
          checked={values.isFree}
        />
        Бесплатная тренировка
      </SwitchLabel>
      <SwitchLabel>
        <Switch
          name='isJumps'
          onChange={onChangeSwitch}
          color='primary'
          checked={values.isJumps}
        />
        Тренировка на джампах
      </SwitchLabel>
  </Modal>);

export default memo(WorkoutModal);
