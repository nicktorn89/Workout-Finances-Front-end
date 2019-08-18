import styled from 'styled-components';
import { TextField } from '@material-ui/core';

export const PeopleNumberInput: any = styled(TextField)`
  &&& {
    width: 70%;
    padding: 0 1rem 0 0;

    div {
      font-size: 1.5rem;

      input {
        text-align: center;
      }
    }

    div::before {
      border-bottom: 1px solid #80808045;
    }
  }
`;

export const PeopleNumberLabel = styled.label`
  width: 30%;
  text-align: center;
  font-size: 1.4rem;
  font-family: 'Lato', sans-serif;
  margin-top: 10px;
`;

export const SwitchLabel = styled.label`
  width: 100%;
  font-size: 1.4rem;
  font-family: 'Lato', sans-serif;
`;
