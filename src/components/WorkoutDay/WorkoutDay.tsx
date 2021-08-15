import moment from 'moment';
import React, { useState, useRef, useCallback } from 'react';
import {
  WorkoutDayContainer, WorkoutDayNumber, WorkoutDayDateBlock,
  WorkoutTotalEarnings, WorkoutTotalsBlock, WorkoutTotalPeopleCount,
  WorkoutTotalPeopleCountLabel, WorkoutTotalPeopleCountValue,
  WorkoutTotalEarningsLabel, WorkoutTotalEarningsValue, WorkoutDayOfWeek,
} from './styled';
import { WorkoutDayProps } from './types';
import WorkoutsDayTable from './WorkoutsDayTable/index';

export const WorkoutDay: React.FC<WorkoutDayProps> = (
  {
    workouts, dayNumber, totalEarningsForDay,
    totalPeopleCount, columnsCount, editWorkout, deleteWorkout,
  },
) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const workoutDayRef = useRef(null);

  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  const workoutDayOfWeek = days[moment(workouts[0].date).toDate().getDay()];

  const handleClickExpand = () => {
    setIsExpanded(true);
  };

  const handleClickCollapse = useCallback(
    () => {
      setIsExpanded(false);
    },
    [],
  );

  return (
    <WorkoutDayContainer
      onClick={isExpanded ? handleClickCollapse : handleClickExpand}
      ref={workoutDayRef}
      isExpanded={isExpanded}
      columnsCount={columnsCount}
    >
      <WorkoutDayDateBlock>
        <WorkoutDayNumber>{dayNumber}</WorkoutDayNumber>

        <WorkoutDayOfWeek>{workoutDayOfWeek}</WorkoutDayOfWeek>
      </WorkoutDayDateBlock>

      {isExpanded
        ? (
          <WorkoutsDayTable
            workouts={workouts}
            editWorkout={editWorkout}
            deleteWorkout={deleteWorkout}
          />
        )
        : (
          <WorkoutTotalsBlock>
            <WorkoutTotalPeopleCount>
              <WorkoutTotalPeopleCountLabel>
                Кол-во человек
              </WorkoutTotalPeopleCountLabel>

              <WorkoutTotalPeopleCountValue>
                {totalPeopleCount}
              </WorkoutTotalPeopleCountValue>
            </WorkoutTotalPeopleCount >

            <WorkoutTotalEarnings>
              <WorkoutTotalEarningsLabel>
                Итого:
              </WorkoutTotalEarningsLabel>

              <WorkoutTotalEarningsValue>
                {totalEarningsForDay} &#8381;
              </WorkoutTotalEarningsValue>
            </WorkoutTotalEarnings>
          </WorkoutTotalsBlock >
        )}
    </WorkoutDayContainer >
  );
};
