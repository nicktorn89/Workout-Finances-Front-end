import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const ButtonsContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AddWorkout: any = styled(Button)`
  &&& {
    margin-right: 1rem;
    font-size: 1.2rem;

    background-color: #322e2f;
    color: #fff;
  }
`;
