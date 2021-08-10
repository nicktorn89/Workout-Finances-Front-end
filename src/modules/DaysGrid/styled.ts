import styled from 'styled-components';

interface DaysGridContainerProps {
  columnsCount?: number;
  cellSize: number;
}

export const DaysGridContainer = styled.div<DaysGridContainerProps>`
	display: grid;

	width: 80%;
	margin: 0 auto;

	grid-auto-rows: ${({ cellSize }) => cellSize}px;
	grid-gap: 10px;
  justify-content: center;

	grid-template-columns: repeat(${({ columnsCount = 0 }) => columnsCount}, ${({ cellSize }) => cellSize}px);
`;

export const DayContainer = styled.div``;

export const EmptyWorkoutsMessage = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-size: 18px;

  justify-content: center;
  display: flex;
  width: 100%;
`;
