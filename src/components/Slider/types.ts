export interface SliderProps {
  currentPart?: 'first' | 'second';
  currentMonth?: number;
  currentYear?: number;
  onClick?: (isIncrement: boolean) => () => void;
}
