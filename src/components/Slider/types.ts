export interface SliderProps {
  currentPart: 'first' | 'second';
  currentMonth: number;
  currentYear: number;

  handleChangeRange: (date: Date) => void;
}
