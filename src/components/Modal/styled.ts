import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';
import { media } from 'src/theme/mixin';

// @ts-nocheck
export const ModalContainer = styled.div`
  width: 40rem;
  height: 30rem;
  padding: 1rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 1;
  border-radius: 5px;

  ${media.phone`width: 95%`}
  ${media.tablet`width: 95%`}
  ${media.desktop`width: 40rem`}
`;

export const ModalHeader: any = styled(Typography)`
  font-size: 16px !important;
  height: 10%;
  border-bottom: 1px solid grey;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-wrap: wrap !important;
  justify-content: center;
  align-items: center;
  height: 70%;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 20%;
`;

export const OkButton: any = styled(Button)`
  margin-right: 1rem !important;
  font-size: 1.2rem !important;
`;

export const CancelButton: any = styled(Button)`
  font-size: 1.2rem !important;
`;
