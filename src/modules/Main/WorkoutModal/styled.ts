import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const WorkoutModalInput: any = styled(TextField)`
  &&& {
    &:first-of-type {
      margin-top: 1rem;
    }

    width: 90%;
    padding: 0 1rem 0 0;

    label {
      font-size: 16px;
    }

    div {
      font-size: 1.5rem;

      input {
        text-align: center;
      }
    }

    color: #322e2f;
    font-family: 'Roboto', sans-serif;

    div::before {
      border-bottom: 1px solid #80808045;
    }
  }
`;
