import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import { Typography, Button, TextField } from '@material-ui/core';
import { media } from 'src/theme/mixin';

// @ts-nocheck
export const MainHeader: any = styled(AppBar)`
  height: 50px;
`;

export const HeaderTitle: any = styled(Typography)`
  color: white !important;
  font-size: 28px !important;
  margin-left: 2rem !important;
  margin-top: 1.2rem !important;
`;

export const SumTitle: any = styled(Typography)`
  font-size: 28px !important;
  margin-top: 1.2rem !important;
  display: flex !important;

  ${media.phone`
    margin: 1.2rem auto 0 !important;
    padding: 0 5px;
  `}
  ${media.tablet`
    margin: 1.2rem auto 0 !important;
    padding: 0 5px;
  `}
  ${media.desktop`
    margin-left: 10% !important;
    margin-top: 1.2rem !important;
  `}
`;

export const SumNumber: any = styled(Typography)`
  font-size: 30px !important;
  margin-left: 1rem !important;
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AddWorkout: any = styled(Button)`
  margin-right: 1rem !important;
  font-size: 1.2rem !important;
`;

export const RemoveWorkout: any = styled(Button)`
  font-size: 1.2rem !important;
`;

export const PeopleNumberInput: any = styled(TextField)`
  width: 70%;
  padding: 0 1rem 0 0;
  div {
    font-size: 1.5rem !important;

    input {
      text-align: center;
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
