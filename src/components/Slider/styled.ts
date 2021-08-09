import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

// @ts-nocheck

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
  }
`;
