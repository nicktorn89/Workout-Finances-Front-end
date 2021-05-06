import React, { ChangeEvent, MouseEvent as ReactMouseEvent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchWorkouts, createWorkout, removeWorkout, editWorkout, changePart } from 'src/store/modules/actions';

import { countWorkout, getIdFromIndexes, getWorkoutsPriceSum, divideMonth } from './utils';

import { RootStore } from 'src/store/types';
import { MainState, MainProps } from './types';

import { WorkoutModal, Controls } from './UI';
import { Table, Slider } from 'src/components';
import {
  MainHeader, HeaderTitle, MainContainer,
  SumNumber, SumTitle,
} from './styled';

class Main extends React.PureComponent<MainProps, MainState> {
  public readonly state = {
    activeModal: false,
    isPersonal: false,
    isFree: false,
    isJumps: false,
    peopleCount: 0,
    workouts: [],
    indexesToRemove: [],
    operationType: 'create',
    editingWorkoutId: null,
  };

  public componentDidMount = () => {
    const { fetchWorkouts, workoutsArray: workouts } = this.props;

    fetchWorkouts && fetchWorkouts();

    workouts && this.setState({ workouts });
  }

  public componentDidUpdate = (prevProps: MainProps) => {
    if (prevProps.workoutsArray !== this.props.workoutsArray) {
      this.setState({ workouts: this.props.workoutsArray });
    }
  }

  public pickIndexesToRemove = (e: ReactMouseEvent<HTMLElement, MouseEvent>) => {
    let removableIndexes: number[] = [...this.state.indexesToRemove];
    const { checked: switchChecked, name: elementIndex } = (e.target as HTMLInputElement);

    if (switchChecked) {
      removableIndexes.push(+elementIndex);
    } else {
      removableIndexes = removableIndexes.filter((index) => index !== +elementIndex);
    }

    this.setState({ indexesToRemove: removableIndexes });
  }

  public toggleModal = () => {
    this.setState((state) => {
      return { activeModal: !state.activeModal };
    });

    this.setDefaultValues();
  }

  public toggleWithData = (id: string) => {
    const workoutForEdit = this.state.workouts.filter(({ _id: workoutId }) => workoutId === id)[0];

    this.setState({ 
      ...workoutForEdit as Object, 
      activeModal: !this.state.activeModal, 
      editingWorkoutId: id,
      operationType: 'editing',
    });
  }

  public createWorkout = () => {
    const { createWorkout } = this.props;
    const { peopleCount, isPersonal, isFree, isJumps } = this.state;
    const workoutObject = {
      isPersonal,
      isFree,
      isJumps,
      peopleCount,
      date: moment().toDate(),
      price: countWorkout(peopleCount, isPersonal, isFree, isJumps),
    };

    createWorkout && createWorkout(workoutObject);

    this.toggleModal();
  }
  
  public editWorkout = () => {
    const { editWorkout } = this.props;
    const { peopleCount, isPersonal, isFree, isJumps, editingWorkoutId } = this.state;
    const workoutObject = {
      isPersonal,
      isFree,
      isJumps,
      peopleCount,
      date: moment().toDate(),
      _id: editingWorkoutId,
      price: countWorkout(peopleCount, isPersonal, isFree, isJumps),
    };

    editWorkout && editWorkout(workoutObject);

    this.setState({ operationType: 'create' });

    this.toggleModal();
  }

  public removeWorkout = () => {
    const { removeWorkout } = this.props;
    const { indexesToRemove, workouts } = this.state;

    workouts && removeWorkout && removeWorkout({ idArray: getIdFromIndexes(indexesToRemove, workouts) });
    this.setState({ indexesToRemove: [] });
  }

  public setDefaultValues = () => {
    this.setState(
      {
        isFree: false,
        isJumps: false,
        isPersonal: false,
        peopleCount: 1,
      },
    );
  }

  public changePeopleCount = (e: Event) => {
    const { value } = (e.target as HTMLInputElement);
    this.setState({ peopleCount: Number(value) });
  }

  public handleSwitch = (e: ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
    const { name: switchName } = (e.target as HTMLInputElement);
    const switches = ['isPersonal', 'isFree', 'isJumps'].filter((switchInArray) => switchInArray !== switchName);

    this.setState({ [switchName]: isChecked, [`${switches[0]}`]: false, [`${switches[1]}`]: false });
  }

  public handleSliderChange = (isIncrement: boolean) => (): void => {
    this.props.changePart && this.props.changePart(isIncrement);
  }

  public handleEdit = (id: string) => {
    this.toggleWithData(id);
  }

  public render = () => {
    const { activeModal, isPersonal, isFree, isJumps, workouts, peopleCount, operationType } = this.state;
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

        <Table
          onCheckboxChange={this.pickIndexesToRemove}
          onEdit={this.handleEdit}
          data={workouts!} 
        />

        <Controls 
          removeWorkout={this.removeWorkout}
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
          values={{ isPersonal, isFree, isJumps, peopleCount }}
          onCancel={this.toggleModal}
          onOk={operationType === 'create' ? this.createWorkout : this.editWorkout}        
          onChangeValue={this.changePeopleCount}
          onChangeSwitch={this.handleSwitch}
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
