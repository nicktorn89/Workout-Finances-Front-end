import styled from 'styled-components';
import { media } from 'src/media';

export const TableContainer = styled.div`
  display: grid;

  grid-auto-rows: 25px;
  grid-gap: 8px;

  grid-template-columns: 2fr repeat(4, 1fr);

  height: 100%;
  overflow: auto;
  align-items: center;
`;

export const WorkoutDate = styled.p`
  padding: 0 0 0 2rem;
  font-size: 12px;

  height: 100%;

  display: flex;
  justify-content: center;

  font-family: 'Roboto', sans-serif;
`;

export const WorkoutPeopleCount = styled.p`
  font-size: 12px;
  height: 100%;

  display: flex;
  justify-content: center;

  font-family: 'Roboto', sans-serif;
`;

export const WorkoutTotalPrice = styled(WorkoutPeopleCount)`
`;

export const WorkoutDateHeading = styled.p`
  padding: 0 0 0 2rem;

  font-weight: bold;

  position: sticky;
  top: 0;
  background: white;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-family: 'Roboto', sans-serif;

  ${media.phone`
    font-size: 12px;
  `}

  ${media.tablet`
    font-size: 14px;
  `}
`;

export const WorkoutPeopleCountHeading = styled(WorkoutDateHeading)`
  padding: 0;
`;

export const WorkoutTotalPriceHeading = styled(WorkoutPeopleCountHeading)`
`;

export const WorkoutDelete = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  font-size: 18px;

  &:hover {
    color: blue;
  }
`;

export const WorkoutEdit = styled(WorkoutDelete)``;

export const WorkoutDeleteHeading = styled(WorkoutPeopleCountHeading)`
`;

export const WorkoutEditHeading = styled(WorkoutDeleteHeading)``;
