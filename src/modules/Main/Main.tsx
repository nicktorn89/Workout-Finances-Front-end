import React, { MouseEvent as ReactMouseEvent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchWorkouts, createWorkout, removeWorkout, editWorkout, changePart } from 'src/store/modules/actions';

import { countWorkout, getIdFromIndexes, getWorkoutsPriceSum, divideMonth } from './utils';

import { RootStore } from 'src/store/types';
import Controls from './Controls/index';
import { WorkoutModal } from './WorkoutModal/WorkoutModal';

import { MainState, MainProps } from './types';

import { Slider } from 'src/components';
import {
  MainHeader, HeaderTitle, MainContainer,
  SumNumber, SumTitle,
} from './styled';
import { DaysGrid } from '../DaysGrid/DaysGrid';
import { checkIsEqual } from 'src/checkIsEqual';

const formatTimeForDateTimePicker = (currentDate: Date = new Date()) => {
  const year = (currentDate.getFullYear()).toString();
  const month = ((currentDate.getMonth()) + 101).toString().slice(-2);
  const dateNumber = ((currentDate.getDate()) + 100).toString().slice(-2);

  const hours = ((currentDate.getHours()) + 100).toString().slice(-2);
  const mins = ((currentDate.getMinutes()) + 100).toString().slice(-2);

  return `${year}-${month}-${dateNumber}T${hours}:${mins}`;
};

class Main extends React.PureComponent<MainProps, MainState> {
  public readonly state: MainState = {
    activeModal: false,

    peopleCount: 0,
    trainPrice: 0,
    workoutDate: formatTimeForDateTimePicker(),

    shouldBeValidated: false,

    workouts: [],
    idsToRemove: [],
    operationType: 'create',
    editingWorkoutId: null,
  };

  public componentDidMount = () => {
    const { fetchWorkouts, workoutsArray: workouts } = this.props;

    fetchWorkouts && fetchWorkouts();

    workouts && this.setState({ workouts });
  }

  public componentDidUpdate = (prevProps: MainProps) => {
    if (!checkIsEqual(prevProps.workoutsArray, this.props.workoutsArray)) {
      this.setState({ workouts: this.props.workoutsArray });
    }
  }

  public toggleModal = () => {
    this.setState((state) => {
      return { activeModal: !state.activeModal };
    });

    this.setDefaultValues();
  }

  public toggleWithData = (id: string) => {
    const { workouts } = this.state;

    const { trainPrice, peopleCount, date } = workouts.filter(({ _id: workoutId }) => workoutId === id)[0];

    this.setState({
      trainPrice,
      peopleCount,
      workoutDate: formatTimeForDateTimePicker(new Date(date)),

      activeModal: !this.state.activeModal,
      editingWorkoutId: id,
      operationType: 'editing',
    });
  }

  public createWorkout = () => {
    const { createWorkout } = this.props;
    const { peopleCount, trainPrice, workoutDate } = this.state;

    this.setState({
      shouldBeValidated: true,
    });

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

      createWorkout && createWorkout(workoutObject);

      this.toggleModal();
    }

  }

  public editWorkout = () => {
    const { editWorkout } = this.props;
    const { peopleCount, editingWorkoutId, trainPrice, workoutDate } = this.state;

    this.setState({
      shouldBeValidated: true,
    });

    if (trainPrice <= 0 || peopleCount <= 0) {
      console.error('Data not valid, please change fields');
    } else {
      const workoutObject = {
        peopleCount,
        date: moment(workoutDate).toDate(),
        _id: editingWorkoutId as string,
        price: countWorkout(peopleCount, trainPrice),
        isFree: false,
        isPersonal: false,
        isJumps: false,
      };

      editWorkout && editWorkout(workoutObject);

      this.setState({ operationType: 'create' });

      this.toggleModal();
    }
  }

  public removeWorkout = () => {
    const { removeWorkout } = this.props;
    const { idsToRemove } = this.state;

    removeWorkout && removeWorkout({ idArray: idsToRemove });
    this.setState({ idsToRemove: [] });
  }

  public setDefaultValues = () => {
    this.setState(
      {
        peopleCount: 1,
        trainPrice: 0,
        editingWorkoutId: null,
        workoutDate: formatTimeForDateTimePicker(),
        shouldBeValidated: false,
      },
    );
  }

  public handleChangeWorkoutDate = (e: Event) => {
    const { value } = (e.target as HTMLInputElement);

    this.setState({ workoutDate: value });
  }

  public changePeopleCount = (e: Event) => {
    const { value } = (e.target as HTMLInputElement);

    this.setState({ peopleCount: Number(value) });
  }

  public handleChangeTrainPrice = (e: Event) => {
    const { value } = (e.target as HTMLInputElement);

    this.setState({ trainPrice: Number(value) });
  }

  public handleSliderChange = (isIncrement: boolean) => (): void => {
    this.props.changePart && this.props.changePart(isIncrement);
  }

  public handleEdit = (id: string) => {
    this.toggleWithData(id);
  }

  public handleDelete = (id: string) => {
    this.setState((prev) => ({
      ...prev,
      idsToRemove: [...prev.idsToRemove, id],
    }), () => {
      this.removeWorkout();
    });
  }

  public render = () => {
    const {
      activeModal, workouts, peopleCount,
      operationType, trainPrice, workoutDate,
      editingWorkoutId, shouldBeValidated,
    } = this.state;
    const { currentPart, currentMonth, currentYear } = this.props;

    workouts && divideMonth(workouts);

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
          onClick={this.handleSliderChange}
        />

        <DaysGrid
          workouts={workouts}
          editWorkout={this.handleEdit}
          deleteWorkout={this.handleDelete}
        />

        <Controls
          toggleModal={this.toggleModal}
        />

        {workouts &&
          <SumTitle>Общая заработная плата:
            <SumNumber as='span'>{getWorkoutsPriceSum(workouts)} &#8381;</SumNumber>
          </SumTitle>
        }

        <WorkoutModal
          isActive={activeModal}
          title='Запись тренировки'
          isEdit={Boolean(editingWorkoutId)}
          shouldBeValidated={shouldBeValidated}
          values={{ peopleCount, trainPrice, workoutDate }}
          onCancel={this.toggleModal}
          onOk={operationType === 'create' ? this.createWorkout : this.editWorkout}
          onChangePeopleCount={this.changePeopleCount}
          onChangeTrainPrice={this.handleChangeTrainPrice}
          handleChangeWorkoutDate={this.handleChangeWorkoutDate}
        />
      </MainContainer>
    );
  }
}
const mapDispatchToProps = {
  fetchWorkouts,
  createWorkout,
  removeWorkout,
  editWorkout,
  changePart,
};

const mapStateToProps = ({ workouts, currentMonth, currentPart, currentYear }: RootStore) => ({
  currentPart,
  currentMonth,
  currentYear,
  workoutsArray: workouts,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
