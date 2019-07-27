import React, { ChangeEvent, MouseEvent as ReactMouseEvent } from 'react';
import { connect } from 'react-redux';
import { fetchWorkouts, createWorkout, removeWorkout, changePart } from 'src/store/modules/actions';
import { MainState, MainProps } from './types';
import {
  MainHeader, HeaderTitle, MainContainer,
  AddWorkout, ButtonsContainer, PeopleNumberInput,
  PeopleNumberLabel, SwitchLabel, RemoveWorkout, SumNumber, SumTitle,
} from './styled';
import Switch from '@material-ui/core/Switch';
import moment from 'moment';

import Table from 'src/components/Table';
import Slider from 'src/components/Slider';
import Modal from 'src/components/Modal';
import { countWorkout, getIdFromIndexes, getWorkoutsPriceSum, divideMonth } from './utils';
import { RootStore } from 'src/store/types';

class Main extends React.Component<MainProps, MainState> {
  public readonly state = {
    activeModal: false,
    isPersonal: false,
    isFree: false,
    isJumps: false,
    peopleCount: 0,
    workouts: this.props.workoutsArray,
    indexesToRemove: [],
  };

  public componentDidMount = () => {
    const { fetchWorkouts } = this.props;
    fetchWorkouts && fetchWorkouts();
  }

  public componentDidUpdate = (prevProps: MainProps) => {
    if (prevProps.workoutsArray !== this.props.workoutsArray) {
      this.setState({ workouts: this.props.workoutsArray });
    }
  }

  public addIndexes = (e: ReactMouseEvent<HTMLElement, MouseEvent>) => {
    let newIndexes: number[] = [...this.state.indexesToRemove];
    const elementIndex = +(e.target as HTMLInputElement).name;

    if ((e.target as HTMLInputElement).checked) {
      newIndexes.push(elementIndex);
    } else {
      newIndexes = newIndexes.filter((index) => index !== elementIndex);
    }

    this.setState({ indexesToRemove: newIndexes });
  }

  public toggleModal = () => {
    const { activeModal } = this.state;

    this.setState({ activeModal: !activeModal });
    this.setDefaultValues();
  }

  public createWorkout = () => {
    const { peopleCount, isPersonal, isFree, isJumps } = this.state;
    const { createWorkout } = this.props;

    const workoutObject = {
      isPersonal,
      isFree,
      isJumps,
      date: moment().toDate(),
      people: peopleCount,
      price: countWorkout(peopleCount, isPersonal, isFree, isJumps),
    };

    createWorkout && createWorkout(workoutObject);

    this.toggleModal();
  }

  public removeWorkout = () => {
    const { removeWorkout } = this.props;
    const { indexesToRemove, workouts } = this.state;

    const idArray = getIdFromIndexes(indexesToRemove, workouts!);

    removeWorkout && removeWorkout({ idArray });
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

  public handleSwitch = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const { name } = (e.target as HTMLInputElement);
    const switches = ['isPersonal', 'isFree', 'isJumps'].filter((k) => k !== name);

    this.setState({ [name]: checked, [`${switches[0]}`]: false, [`${switches[1]}`]: false });
  }

  public handleSliderChange = (isIncrement: boolean) => (): void => {
    this.props.changePart && this.props.changePart(isIncrement);
  }

  public render = () => {
    const { activeModal, isPersonal, isFree, isJumps, workouts } = this.state;
    const { currentPart, currentMonth, currentYear, changePart } = this.props;
    divideMonth(workouts!);

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
          onCheckboxChange={this.addIndexes}
          data={workouts!} 
        />

        <ButtonsContainer>
          <AddWorkout
            color='primary'
            variant='contained'
            onClick={this.toggleModal}
          >
            Добавить тренировку
          </ AddWorkout>
          
          <RemoveWorkout
            color='secondary'
            variant='contained'
            onClick={this.removeWorkout}
          >
            Удалить тренировку
          </ RemoveWorkout>
        </ButtonsContainer>

        {workouts && 
          <SumTitle>Общая заработная плата: 
            <SumNumber>{getWorkoutsPriceSum(workouts)}₽</SumNumber>
          </SumTitle>
        }

        <Modal
          isActive={activeModal}
          title='Создание записи о тренировке'
          onCancel={this.toggleModal}
          onOk={this.createWorkout}
        >
          <PeopleNumberLabel>Кол-во человек</PeopleNumberLabel>
          <PeopleNumberInput
            id='people-number'
            defaultValue={''}
            min={1}
            max={Infinity}
            type='number'
            InputLabelProps={{
              shrink: true,
            }}
            margin='normal'
            onChange={this.changePeopleCount}
          />

          <SwitchLabel>
            <Switch
              name='isPersonal'
              onChange={this.handleSwitch}
              color='primary'
              checked={isPersonal}
            />
            Персональная тренировка
          </SwitchLabel>
          <SwitchLabel>
            <Switch
              name='isFree'
              onChange={this.handleSwitch}
              checked={isFree}
            />
            Бесплатная тренировка
          </SwitchLabel>
          <SwitchLabel>
            <Switch
              name='isJumps'
              onChange={this.handleSwitch}
              color='primary'
              checked={isJumps}
            />
            Тренировка на джампах
          </SwitchLabel>
        </Modal>
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
