import 'moment/locale/ru';
import IconButton from '@material-ui/core/IconButton';
import React, { memo, useState } from 'react';
import { SliderProps } from './types';
import { SliderContainer, DateTitle, materialTheme } from './styled';
import ArrowLeftRounded from '@material-ui/icons/ArrowLeftRounded';
import ArrowRightRounded from '@material-ui/icons/ArrowRightRounded';
import MomentUtils from '@date-io/moment';

import {
  DatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { ThemeProvider } from '@material-ui/styles';

import moment from 'moment';
const localization = require('moment/locale/ru');

moment.locale('ru');

const Slider: React.FC<SliderProps> = ({ currentPart, currentMonth, currentYear, handleChangeRange }) => {
  // @ts-ignore
  const year = moment().locale('ru', localization).year(currentYear!).format('YYYY');
  // @ts-ignore
  const month = moment().locale('ru', localization).month(currentMonth!).format('MMMM');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleOpenDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const handleCloseDatePicker = () => {
    setIsDatePickerOpen(false);
  };

  const handleDateChange = (date: MaterialUiPickersDate) => {
    if (date) {
      handleChangeRange(date.toDate());
    }
  };

  const EmptyTextField = () => null;

  const handleClickDecrement = () => {
    const currentMoment = moment(new Date(`${currentMonth + 1}/${currentPart === 'first' ? '01' : '16'}/${currentYear}`));

    const newCurrentPart = currentPart === 'first' ? 'second' : 'first';
    const newCurrentMonth = currentPart === 'first'
      ? currentMoment.subtract(1, 'month').month()
      : currentMoment.month();
    const newCurrentYear = currentMonth === 0 && currentPart === 'first' ? currentYear - 1 : currentYear;

    // tslint:disable-next-line: max-line-length
    const decrementedDate = new Date(`${newCurrentMonth + 1}/${newCurrentPart === 'first' ? '01' : '16'}/${newCurrentYear}`);

    handleChangeRange(decrementedDate);
  };

  const handleClickIncrement = () => {
    const currentMoment = moment(new Date(`${currentMonth + 1}/${currentPart === 'first' ? '01' : '16'}/${currentYear}`));

    const newCurrentPart = currentPart === 'first' ? 'second' : 'first';
    const newCurrentMonth = currentPart === 'second'
      ? currentMoment.add(1, 'month').month()
      : currentMoment.month();
    const newCurrentYear = currentMonth === 11 && currentPart === 'second' ? currentYear + 1 : currentYear;

    // tslint:disable-next-line: max-line-length
    const incrementedDate = new Date(`${newCurrentMonth + 1}/${newCurrentPart === 'first' ? '01' : '16'}/${newCurrentYear}`);

    handleChangeRange(incrementedDate);
  };

  return (
    <SliderContainer>
      <IconButton
        onClick={handleClickDecrement}
      >
        <ArrowLeftRounded />
      </IconButton>

      <DateTitle onClick={handleOpenDatePicker}>
        {currentPart === 'first'
          ? `1 половина, ${month} ${year}`
          : `2 половина, ${month} ${year}`}
      </DateTitle>

      <ThemeProvider theme={materialTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            open={isDatePickerOpen}
            onOpen={handleOpenDatePicker}
            onClose={handleCloseDatePicker}
            okLabel='Ок'
            cancelLabel='Отмена'
            value={new Date(`${currentMonth + 1}/${currentPart === 'first' ? '01' : '16'}/${currentYear}`)}
            onChange={handleDateChange}
            TextFieldComponent={EmptyTextField}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>

      <IconButton
        onClick={handleClickIncrement}
      >
        <ArrowRightRounded />
      </IconButton>
    </SliderContainer >
  );
};

export default memo(Slider);
