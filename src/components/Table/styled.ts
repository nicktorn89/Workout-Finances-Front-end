import { Table, Paper } from '@material-ui/core';
import styled from 'styled-components';
import { media } from 'src/theme/mixin';

// @ts-nocheck
export const MaterialTable: any = styled(Table)`
  width: 80%;
  .table-head-cell {
    font-size: 1.25rem;
  }

  .table-body-cell {
    font-size: 1rem;
  }

  ${media.phone`
    width: 90%;
    overflow-x: auto;
    display: block !important;
  `}

  ${media.desktop`display: table !important;`}
`;

export const MaterialPaper: any = styled(Paper)`
  margin: 2em auto 3rem;

  ${media.phone`
    width: 90%;
  `}

  ${media.desktop`width: 80%;`}
  ${media.tablet`width: 80%;`}
`;
