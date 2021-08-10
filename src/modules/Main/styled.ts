import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { media } from 'src/media';

// @ts-nocheck
export const MainHeader: any = styled(AppBar)`
  &&& {
    height: 50px;
  
    background-color: #322e2f;
    color: #fff;
  }
`;

export const HeaderTitle: any = styled(Typography)`
  &&& {
    color: inherit;
    font-size: 28px;
    margin-left: 2rem;
    margin-top: 1.2rem;

    font-family: 'Roboto', sans-serif;
  }
`;

export const SumTitle: any = styled(Typography)`
  &&& {
    font-size: 28px;
    margin-top: 1.2rem;
    display: flex;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
  
    ${media.phone`
      margin: 1.2rem auto 0;
      padding: 0 5px;
    `}
    ${media.tablet`
      margin: 1.2rem auto 0;
      padding: 0 5px;
    `}
    ${media.desktop`
      margin-left: 10%;
      margin-top: 1.2rem;
    `}
  }
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;

  overflow-x: hidden;

  background: linear-gradient(45deg, #12a4d9, transparent);
`;
