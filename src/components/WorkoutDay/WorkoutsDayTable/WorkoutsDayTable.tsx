import React, { useMemo, Fragment } from 'react';
import moment from 'moment';

import Edit from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { WorkoutDayTableProps } from './types';
import {
  WorkoutDate, WorkoutPeopleCount,
  WorkoutTotalPrice, TableContainer, WorkoutDateHeading,
  WorkoutPeopleCountHeading, WorkoutTotalPriceHeading,
  WorkoutEditHeading, WorkoutDeleteHeading, WorkoutEdit, WorkoutDelete,
} from './styled';

export const WorkoutsDayTable: React.FC<WorkoutDayTableProps> = ({ workouts, deleteWorkout, editWorkout }) => {
  const handleDeleteWorkout = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();

    deleteWorkout(id);
  };

  const handleEditWorkout = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();

    editWorkout(id);
  };

  const renderCells = useMemo(
    () => workouts.map((workout, index) => (
      <Fragment key={index + workout._id!}>
        <WorkoutDate>
          {moment(workout.date).format('D/MM/YYYY HH:mm')}
        </WorkoutDate>

        <WorkoutPeopleCount>
          {workout.peopleCount}
        </WorkoutPeopleCount>

        <WorkoutTotalPrice>
          {workout.price}
        </WorkoutTotalPrice>

        <WorkoutEdit onClick={handleEditWorkout(workout._id!)}>
          <Edit fontSize='inherit' />
        </WorkoutEdit>

        <WorkoutDelete onClick={handleDeleteWorkout(workout._id!)}>
          <DeleteForeverIcon fontSize='inherit' />
        </WorkoutDelete>
      </Fragment>
    )),
    [],
  );

  return (
    <TableContainer>
      <WorkoutDateHeading>Дата</WorkoutDateHeading>
      <WorkoutPeopleCountHeading>Кол-во человек</WorkoutPeopleCountHeading>
      <WorkoutTotalPriceHeading>Итого за тренировку</WorkoutTotalPriceHeading>
      <WorkoutEditHeading>Ред</WorkoutEditHeading>
      <WorkoutDeleteHeading>Удалить</WorkoutDeleteHeading>

      {renderCells}
    </TableContainer>
  );
};
