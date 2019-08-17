import React, { ChangeEvent, MouseEvent as ReactMouseEvent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchWorkouts, createWorkout, removeWorkout, changePart } from 'src/store/modules/actions';

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
  };

  public componentDidMount = () => {
    this.props.fetchWorkouts && this.props.fetchWorkouts();
    this.props.workoutsArray && this.setState({ workouts: this.props.workoutsArray });
  }

  public componentDidUpdate = (prevProps: MainProps) => {
    prevProps.workoutsArray !== this.props.workoutsArray && this.setState({ workouts: this.props.workoutsArray });
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
    this.setState({ activeModal: !this.state.activeModal });
    this.setDefaultValues();
  }

  public createWorkout = () => {
    const { peopleCount, isPersonal, isFree, isJumps } = this.state;
    const workoutObject = {
      isPersonal,
      isFree,
      isJumps,
      peopleCount,
      date: moment().toDate(),
      price: countWorkout(peopleCount, isPersonal, isFree, isJumps),
    };

    this.props.createWorkout && this.props.createWorkout(workoutObject);

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
        peopleCount: 0,
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

  public handleEdit = () => {

  }

  public render = () => {
    const { activeModal, isPersonal, isFree, isJumps, workouts } = this.state;
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
            <SumNumber>{getWorkoutsPriceSum(workouts)} &#8381;</SumNumber>
          </SumTitle>
        }

        <WorkoutModal 
          isActive={activeModal}
          title='Создание записи о тренировке'
          values={{ isPersonal, isFree, isJumps }}
          onCancel={this.toggleModal}
          onOk={this.createWorkout}        
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
  changePart,
};

const mapStateToProps = ({ workouts, currentMonth, currentPart, currentYear }: RootStore) => ({
  currentPart,
  currentMonth,
  currentYear,
  workoutsArray: workouts,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
