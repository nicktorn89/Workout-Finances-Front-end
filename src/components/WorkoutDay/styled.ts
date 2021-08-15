import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { media } from 'src/media';

export const WorkoutDayDateBlock = styled.div`
  flex-basis: 50%;
  flex-shrink: 0;
  flex-grow: 0;
`;

export const WorkoutDayContainer = styled.div<{ isExpanded: boolean; columnsCount: number }>`
	height: 100%;
	width: 100%;

	border-radius: 15px;

	background: white;
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

	&:hover {
		box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
	}

	cursor: pointer;

	display: flex;
  flex-direction: column;

  transition: all 1s;
  transition-timing-function: ease-in;

  ${ifProp({ isExpanded: true }, css<{ columnsCount: number }>`
    grid-column-start: 1;
    grid-column-end: ${({ columnsCount }) => columnsCount + 1};

    ${WorkoutDayDateBlock} {
      ${media.phone`
        flex-basis: 35%; 
      `}

      ${media.tablet`
        flex-basis: 30%;
      `}
    }
  `)}
`;

export const WorkoutDayNumber = styled.h3`
  font-size: 32px;
  padding-left: 10px;
  padding-top: 10px;

  font-family: 'Roboto', sans-serif;
`;

export const WorkoutDayOfWeek = styled.p`
  font-size: 10px;
  margin-left: 10px;
  margin-top: 5px;

  font-family: 'Roboto', sans-serif;
`;

export const WorkoutTotalsBlock = styled.div`
  display: flex;
  flex-direction: column;

  flex-basis: 50%;
  flex-shrink: 0;
  flex-grow: 0;
`;

export const WorkoutTotalPeopleCount = styled.div`
  flex-basis: 30%;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  margin-right: 10px;
`;

export const WorkoutTotalPeopleCountLabel = styled.p`
  font-weight: bold;
  font-size: 12px;

  font-family: 'Roboto', sans-serif;
`;

export const WorkoutTotalPeopleCountValue = styled.p`
  font-size: 12px;
  margin-top: 5px;

  font-family: 'Roboto', sans-serif;
`;

export const WorkoutTotalEarnings = styled(WorkoutTotalPeopleCount)`
  margin-top: 10px;
`;

export const WorkoutTotalEarningsLabel = styled(WorkoutTotalPeopleCountLabel)``;

export const WorkoutTotalEarningsValue = styled(WorkoutTotalPeopleCountValue)``;
