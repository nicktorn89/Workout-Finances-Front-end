import IconButton from '@material-ui/core/IconButton';
import React, { memo } from 'react';
import { SliderProps } from './types';
import { SliderContainer, DateTitle } from './styled';
import ArrowLeftRounded  from '@material-ui/icons/ArrowLeftRounded';
import ArrowRightRounded  from '@material-ui/icons/ArrowRightRounded';
const moment = require('moment');
const localization = require('moment/locale/ru');

const Slider: React.FC<SliderProps> = ({ currentPart, currentMonth, currentYear, onClick }) => {
  // @ts-ignore
  const year = moment().locale('ru', localization).year(currentYear!).format('YYYY');
  // @ts-ignore
  const month = moment().locale('ru', localization).month(currentMonth!).format('MMMM');

  return(
    <SliderContainer>
      <IconButton 
        onClick={onClick && onClick(false)}
      >
        <ArrowLeftRounded />
      </IconButton>

      <DateTitle>
        {currentPart === 'first'
          ? `1 половина, ${month} ${year}` 
          : `2 половина, ${month} ${year}`}
      </DateTitle>

      <IconButton
        onClick={onClick && onClick(true)}
      >
        <ArrowRightRounded />
      </IconButton>
    </SliderContainer>
  );
};

export default memo(Slider);
