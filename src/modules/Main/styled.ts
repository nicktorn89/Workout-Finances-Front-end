import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { media } from 'src/media';

// @ts-nocheck
export const MainHeader: any = styled(AppBar)`
  height: 50px;
`;

export const HeaderTitle: any = styled(Typography)`
  &&& {
    color: white;
    font-size: 28px;
    margin-left: 2rem;
    margin-top: 1.2rem;
  }
`;

export const SumTitle: any = styled(Typography)`
  &&& {
    font-size: 28px;
    margin-top: 1.2rem;
    display: flex;
  
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

export const SumNumber: any = styled(Typography)`
  &&& {
    font-size: 30px;
    margin-left: 1rem;
  }
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;

  overflow-x: hidden;
  overflow-y: auto;
`;
