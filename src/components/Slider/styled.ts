import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { createTheme } from '@material-ui/core/styles';

// @ts-nocheck

export const materialTheme = createTheme({
  overrides: {
    // @ts-ignore
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#322e2f',
      },
    },
    MuiPickersDay: {
      day: {
        color: '#322e2f',
      },
      daySelected: {
        backgroundColor: '#322e2f',
        color: '#fff',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#322e2f',
      },
    },
    MuiDialogActions: {
      color: '#322e2f',
    },
  },
});

export const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 65px;
`;

export const DateTitle: any = styled(Typography)`
  &&& {
    margin: 0 2rem;
    font-size: 18px;
    font-weight: 500;

    color: #322e2f;
    font-family: 'Roboto', sans-serif;

    cursor: pointer;
  }
`;
