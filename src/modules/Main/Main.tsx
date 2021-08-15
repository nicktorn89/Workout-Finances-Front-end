import React, { useEffect, useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
  fetchWorkouts, createWorkout as createWorkoutAction,
  removeWorkout as removeWorkoutAction,
  editWorkout as editWorkoutAction,
  changePart,
} from 'src/store/modules/actions';

import { countWorkout, getWorkoutsPriceSum } from './utils';

import Controls from './Controls/index';
import { WorkoutModal } from './WorkoutModal/WorkoutModal';


import { Slider } from 'src/components';
import {
  MainHeader, HeaderTitle, MainContainer, SumTitle, LoaderContainer,
} from './styled';
import { DaysGrid } from '../DaysGrid/DaysGrid';
import { checkIsEqual } from 'src/checkIsEqual';
import { CircularProgress } from '@material-ui/core';
import { MainStore } from 'src/store/modules/types';
import { ModalState } from './types';

const formatTimeForDateTimePicker = (currentDate: Date = new Date()) => {
  const year = (currentDate.getFullYear()).toString();
  const month = ((currentDate.getMonth()) + 101).toString().slice(-2);
  const dateNumber = ((currentDate.getDate()) + 100).toString().slice(-2);

  const hours = ((currentDate.getHours()) + 100).toString().slice(-2);
  const mins = ((currentDate.getMinutes()) + 100).toString().slice(-2);

  return `${year}-${month}-${dateNumber}T${hours}:${mins}`;
};

const Main: React.FC<{}> = memo(() => {
  const dispatch = useDispatch();

  const workouts = useSelector(({ workouts }: MainStore) => workouts, checkIsEqual);
  const isLoading = useSelector(({ isLoading }: MainStore) => isLoading);

  const currentMonth = useSelector(({ currentMonth }: MainStore) => currentMonth);
  const currentYear = useSelector(({ currentYear }: MainStore) => currentYear);
  const currentPart = useSelector(({ currentPart }: MainStore) => currentPart);

  const [idsToRemove, setIdsToRemove] = useState<string[]>([]);
  const [modalState, setModalState] = useState<ModalState>({
    activeModal: false,
    peopleCount: 0,
    trainPrice: 0,
    shouldBeValidated: false,

    workoutDate: formatTimeForDateTimePicker(),
    editingWorkoutId: null,
  });

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, []);

  const setDefaultValues = () => {
    setModalState((prev) => ({
      ...prev,
      peopleCount: 0,
      trainPrice: 0,
      editingWorkoutId: null,
      workoutDate: formatTimeForDateTimePicker(),

      shouldBeValidated: false,
    }));
  };

  const toggleModal = () => {
    setModalState((prev) => ({
      ...prev,
      activeModal: !prev.activeModal,
    }));

    setDefaultValues();
  };

  const toggleWithData = (id: string) => {
    const workout = workouts.find(({ _id: workoutId }) => workoutId === id);

    if (workout) {
      const { price, peopleCount, date } = workout;

      setModalState({
        peopleCount,
        trainPrice: Math.round(price / peopleCount),
        workoutDate: formatTimeForDateTimePicker(new Date(date)),

        activeModal: true,
        editingWorkoutId: id,

        shouldBeValidated: false,
      });
    }
  };

  const createWorkout = () => {
    const { peopleCount, trainPrice, workoutDate } = modalState;

    setModalState((prev) => ({
      ...prev,
      shouldBeValidated: true,
    }));

    if (trainPrice <= 0 || peopleCount <= 0) {
      console.error('Data not valid, please change fields');
    } else {
      const workoutObject = {
        peopleCount,
        date: moment(workoutDate).toDate(),
        price: countWorkout(peopleCount, trainPrice),
        isFree: false,
        isPersonal: false,
        isJumps: false,
      };

      dispatch(createWorkoutAction(workoutObject));

      toggleModal();
    }
  };

  const editWorkout = () => {
    const { peopleCount, editingWorkoutId, trainPrice, workoutDate } = modalState;

    setModalState((prev) => ({
      ...prev,
      shouldBeValidated: true,
    }));

    if (trainPrice <= 0 || peopleCount <= 0) {
      console.error('Data not valid, please change fields');
    } else {
      if (editingWorkoutId) {
        const workoutObject = {
          peopleCount,
          date: moment(workoutDate).toDate(),
          _id: editingWorkoutId,
          price: countWorkout(peopleCount, trainPrice),
          isFree: false,
          isPersonal: false,
          isJumps: false,
        };

        dispatch(editWorkoutAction(workoutObject));
      }

      toggleModal();
    }
  };

  const removeWorkout = () => {
    dispatch(removeWorkoutAction({ idArray: idsToRemove }));

    setIdsToRemove([]);
  };

  const handleChangeWorkoutDate = (e: Event) => {
    const { value } = (e.target as HTMLInputElement);

    setModalState((prev) => ({
      ...prev,
      workoutDate: value,
    }));
  };

  const changePeopleCount = (e: Event) => {
    const { value } = (e.target as HTMLInputElement);

    setModalState((prev) => ({
      ...prev,
      peopleCount: Number(value),
    }));
  };

  const handleChangeTrainPrice = (e: Event) => {
    const { value } = (e.target as HTMLInputElement);

    setModalState((prev) => ({
      ...prev,
      trainPrice: Number(value),
    }));
  };

  const handleEdit = (id: string) => {
    toggleWithData(id);
  };

  const handleDelete = (id: string) => {
    setIdsToRemove((prev) => [...prev, id]);

    removeWorkout();
  };

  const handleChangeRange = (date: Date) => {
    dispatch(changePart(date));
  };

  return (
    <MainContainer>
      <MainHeader>
        <HeaderTitle
          component='h2'
          variant='h2'
        >
          Workout Finances
        </HeaderTitle>
      </MainHeader>

      <Slider
        currentMonth={currentMonth}
        currentYear={currentYear}
        currentPart={currentPart}
        handleChangeRange={handleChangeRange}
      />

      {
        isLoading
          ? (
            <LoaderContainer>
              <CircularProgress color='secondary' />
            </LoaderContainer>
          )
          : (
            <DaysGrid
              workouts={workouts}
              editWorkout={handleEdit}
              deleteWorkout={handleDelete}
            />
          )
      }

      <Controls
        toggleModal={toggleModal}
      />

      {workouts &&
        <SumTitle>Всего: {getWorkoutsPriceSum(workouts)} &#8381;</SumTitle>
      }

      <WorkoutModal
        isActive={modalState.activeModal}
        title='Запись тренировки'
        isEdit={Boolean(modalState.editingWorkoutId)}
        shouldBeValidated={modalState.shouldBeValidated}
        values={{
          peopleCount: modalState.peopleCount,
          trainPrice: modalState.trainPrice,
          workoutDate: modalState.workoutDate,
        }}
        onCancel={toggleModal}
        onOk={modalState.editingWorkoutId ? editWorkout : createWorkout}
        onChangePeopleCount={changePeopleCount}
        onChangeTrainPrice={handleChangeTrainPrice}
        handleChangeWorkoutDate={handleChangeWorkoutDate}
      />
    </MainContainer>
  );
}, checkIsEqual);

export default Main;
