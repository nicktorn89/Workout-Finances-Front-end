import { countWorkout, getIdFromIndexes, getWorkoutsPriceSum } from '../utils';
import { WorkoutObject } from 'src/store/modules/types';
const workoutsMock = [
  { 
    date: new Date,
    people: 0,
    price: 100,
    isPersonal: false,
    isJumps: false,
    isFree: false,
    _id: 'jsjs2345',
  },
  { 
    date: new Date,
    people: 0,
    price: 100,
    isPersonal: false,
    isJumps: false,
    isFree: false,
    _id: '23asx',
  },
  { 
    date: new Date,
    people: 0,
    price: 100,
    isPersonal: false,
    isJumps: false,
    isFree: false,
    _id: 'qwe213fdbd',
  },
  { 
    date: new Date,
    people: 0,
    price: 200,
    isPersonal: false,
    isJumps: false,
    isFree: false,
    _id: 'ir23123',
  },
];

test('should return 120, 30 rubles for each workout', () => {
  expect(countWorkout(4)).toBe(120);
});

test('should return 0 if workout is free', () => {
  expect(countWorkout(30, false, true)).toBe(0);
});

test('should return workout*90', () => {
  expect(countWorkout(20, true)).toBe(1800);
});

test('should return workout*50 for Jumps', () => {
  expect(countWorkout(20, false, false, true)).toBe(1000);
});

test('should return id jsjs2345 and ir23123 from array', () => {
  const indexes = [0, 3];

  expect(getIdFromIndexes(indexes, workoutsMock)).toContain('ir23123');
  expect(getIdFromIndexes(indexes, workoutsMock)).toContain('jsjs2345');
});

test('should return sum from all workouts equal to 500', () => {
  expect(getWorkoutsPriceSum(workoutsMock)).toEqual(500);
});

test('should return 399, since we change one workout to -1', () => {
  const newWorkouts = [...workoutsMock];
  newWorkouts[0].price = -1;

  expect(getWorkoutsPriceSum(newWorkouts)).toEqual(399);
});

test('should return 0 if array is empty', () => {
  const emptyWorkouts: WorkoutObject[] = [];

  expect(getWorkoutsPriceSum(emptyWorkouts)).toEqual(0);
});
