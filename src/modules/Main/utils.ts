import { WorkoutObject, MainStore } from 'src/store/modules/types';
import * as R from 'ramda';
import moment from 'moment';
import { TimeObject } from './types';

export const countWorkout = (peopleCount: number, personal?: boolean, free?: boolean, jumps?: boolean): number => {
  if (free) return 0;

  if (personal) return peopleCount * 90;

  if (jumps) return peopleCount * 50;

  return peopleCount * 30;
};

export const getIdFromIndexes = (indexes: number[], workouts: WorkoutObject[]): string[] => {
  const idArray: string[] = [];
  
  indexes.forEach((index) => {
    idArray.push(workouts[index]._id!);
  });

  return idArray;
};

export const getWorkoutsPriceSum = (workouts: WorkoutObject[]): number => {
  if (R.isEmpty(workouts)) return 0;

  const prices: number[] = workouts.map((k) => k.price);
  const sum = prices.reduce((sum, current): number => {
    return sum + current;
  });

  return sum;
};

export const divideMonth = (workouts: WorkoutObject[]): TimeObject => {
  const workoutsWithDate = workouts
    .slice()
    .map((work) => {
      const newWork = { ...work };
      newWork.date = moment(work.date).toDate();
      return newWork;
    })
    .sort((a, b) => moment(a.date).unix() - moment(b.date).unix());

  const timeObject: TimeObject = {
    2019: {
    },
  };

  workoutsWithDate.forEach((work) => {
    if (!timeObject[work.date.getFullYear()]) timeObject[work.date.getFullYear()] = {};
    const year = timeObject[work.date.getFullYear()];
    
    if (!year[work.date.getMonth()]) year[work.date.getMonth()] = { first: [], second: [] };
    const month = year[work.date.getMonth()];

    if (work.date.getDate() <= 15) {
      month.first.push(work);
    } else {
      month.second.push(work);
    }
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

type ChangedMonth = {
  currentPart: 'first' | 'second',
  currentMonth: number;
  currentYear: number;
};
