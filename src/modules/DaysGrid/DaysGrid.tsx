import React, { useMemo } from 'react';
import { WorkoutDay } from 'src/components';
import { useWindowSize } from 'src/hooks/useWindowSize';
import moment from 'moment';

import { DaysGridProps } from './types';
import { DaysGridContainer } from './styled';
import { WorkoutDayInfo } from 'src/components/WorkoutDay/types';

export const DaysGrid: React.FC<DaysGridProps> = ({ workouts, editWorkout, deleteWorkout }) => {
  const { width } = useWindowSize();
  const workoutsPerDay = workouts.reduce(
    (acc, currentWorkout) => {
      const workoutDate = moment(currentWorkout.date).date();

      const currentWorkoutDate = acc[workoutDate];

      if (currentWorkoutDate) {
        currentWorkoutDate.totalPeopleCount += currentWorkout.peopleCount;
        currentWorkoutDate.totalEarningsForDay += currentWorkout.price;

        currentWorkoutDate.workouts.push(currentWorkout);
      } else {
        acc[workoutDate] = {
          dayNumber: workoutDate,
          totalPeopleCount: currentWorkout.peopleCount,
          totalEarningsForDay: currentWorkout.price,
          workouts: [currentWorkout],
        };
      }

      return acc;
    },
    {} as { [key: string]: undefined | WorkoutDayInfo },
  );

  const days = Object.entries(workoutsPerDay)
    .filter(([key, value]) => !!value)
    .map(([key, value]) => value)
    .sort((a, b) => a!.dayNumber - b!.dayNumber);

  const workoutCellSize = (width && width <= 768) ? 150 : 175;
  const marginsSize = 0.2;

  const columnsCount = width
    ? Math.floor((width - (width * marginsSize)) / workoutCellSize)
    : 6;

  const renderedDays = useMemo(
    () => (days as WorkoutDayInfo[])
      .map(({ dayNumber, totalPeopleCount, totalEarningsForDay, workouts }, index) => (
        <WorkoutDay
          columnsCount={columnsCount}
          dayNumber={dayNumber}
          totalPeopleCount={totalPeopleCount}
          totalEarningsForDay={totalEarningsForDay}
          editWorkout={editWorkout}
          deleteWorkout={deleteWorkout}
          workouts={workouts}
          key={`${dayNumber}-${totalPeopleCount}-${totalEarningsForDay}-${index}`}
        />
      )),
    [days, columnsCount, editWorkout, deleteWorkout, workouts],
  );

  return (
    <DaysGridContainer columnsCount={columnsCount} cellSize={workoutCellSize}>
      {renderedDays}
    </DaysGridContainer>
  );
};
