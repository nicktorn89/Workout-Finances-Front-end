import styled from 'styled-components';
import { media } from 'src/media';

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

	grid-template-columns: repeat(${({ columnsCount = 0 }) => columnsCount}, ${({ cellSize }) => cellSize}px);
`;

export const DayContainer = styled.div``;
