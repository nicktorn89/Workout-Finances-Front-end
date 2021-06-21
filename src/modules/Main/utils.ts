import { WorkoutObject, MainStore } from 'src/store/modules/types';
import * as R from 'ramda';
import moment from 'moment';
import { TimeObject, ChangedMonth } from './types';

export const countWorkout = (peopleCount: number, trainPrice: number): number => Math.round(peopleCount * trainPrice);

export const createData = ({ date, peopleCount, price: salary, _id }: WorkoutObject) => {
  let id = 0;

  id += 1;

  return { id, date, peopleCount, salary, dataId: _id };
};

export const getIdFromIndexes = (indexes: number[], workouts: WorkoutObject[]): string[] => 
  [...indexes].map((index) => workouts[index]._id as string);

export const getWorkoutsPriceSum = (workouts: WorkoutObject[]): number => 
  R.isEmpty([...workouts]) 
    ? 0
    : [...workouts]
      .map((workout) => workout.price)
      .reduce((sum, current): number => sum + current);

export const divideMonth = (workouts: WorkoutObject[]): TimeObject => {
  const workoutDates = [...workouts]
    .map((workout) => moment(workout.date).toDate())
    .sort((a, b) => moment(a).unix() - moment(b).unix());

  const timeObject: TimeObject = {
    2019: {
    },
  };

  workoutDates.forEach((date, index) => {
    if (!timeObject[date.getFullYear()]) timeObject[date.getFullYear()] = {};
    const year = timeObject[date.getFullYear()];
    
    if (!year[date.getMonth()]) year[date.getMonth()] = { first: [], second: [] };
    const month = year[date.getMonth()];

    date.getDate() < 16
      ? month.first.push({ ...workouts[index], ...date })
      : month.second.push({ ...workouts[index], ...date });
  });

  return timeObject;
};

export const changeMonthPart = ({ workoutsByTime, currentPart, currentMonth, currentYear }: MainStore,
                                isIncrement: boolean): ChangedMonth => {
  const finalObject = {
    currentPart,
    currentMonth,
    currentYear,
  };

  const yearsArray = R.keys(workoutsByTime);
  const monthArray = R.keys(workoutsByTime && workoutsByTime[currentYear]);
  const yearIndex = R.indexOf(`${currentYear}`, yearsArray);
  const monthIndex = R.indexOf(`${currentMonth}`, monthArray);

  if (isIncrement) {
    if (currentPart === 'first' && !R.isEmpty(workoutsByTime && workoutsByTime[currentYear][currentMonth].second)) {
      finalObject.currentPart = 'second';
      return finalObject;
    }

    if (monthArray[monthIndex + 1]) {
      finalObject.currentMonth = +monthArray[monthIndex + 1];

      !R.isEmpty(workoutsByTime && workoutsByTime[finalObject.currentYear][finalObject.currentMonth].first) 
        ? finalObject.currentPart = 'first'
        : finalObject.currentPart = 'second';
        
      return finalObject;
    }

    if (yearsArray[yearIndex + 1]) {
      const newMonthArray = R.keys(workoutsByTime && workoutsByTime[+yearsArray[yearIndex + 1]]);
      finalObject.currentYear = +yearsArray[yearIndex + 1];
      finalObject.currentMonth = +newMonthArray[0];

      !R.isEmpty(workoutsByTime && workoutsByTime[finalObject.currentYear][finalObject.currentMonth].first) 
        ? finalObject.currentPart = 'first'
        : finalObject.currentPart = 'second';
      return finalObject;
    }
  } else {
    if (currentPart === 'second' && !R.isEmpty(workoutsByTime && workoutsByTime[currentYear][currentMonth].first)) {
      finalObject.currentPart = 'first';
      return finalObject;
    }

    if (monthArray[monthIndex + 1]) {
      finalObject.currentMonth = +monthArray[monthIndex + 1];

      R.isEmpty(workoutsByTime && workoutsByTime[finalObject.currentYear][finalObject.currentMonth].second) 
        ? finalObject.currentPart = 'first'
        : finalObject.currentPart = 'second';

      return finalObject;
    }

    if (yearsArray[yearIndex - 1]) {
      const newMonthArray = R.keys(workoutsByTime && workoutsByTime[+yearsArray[yearIndex - 1]]);
      finalObject.currentYear = +yearsArray[yearIndex - 1];
      finalObject.currentMonth = +newMonthArray[newMonthArray.length - 1];

      R.isEmpty(workoutsByTime && workoutsByTime[finalObject.currentYear][finalObject.currentMonth].second) 
        ? finalObject.currentPart = 'first'
        : finalObject.currentPart = 'second';

      return finalObject;
    }
  }

  return finalObject;
};
