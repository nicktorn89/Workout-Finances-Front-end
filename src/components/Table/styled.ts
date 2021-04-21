import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import { media } from 'src/theme/mixin';

// @ts-nocheck
export const TableHeadCell: any = styled(TableCell)`
  &&& {
    font-size: 1.1rem;
    font-weight: bold;
  }
`;

export const TableBodyCell: any = styled(TableCell)`
  &&& {
    font-size: 1rem;
  }
`;

export const MaterialTable: any = styled(Table)`
  &&& {
    .date-column {
      text-align: center;
      line-height: 1.5;
    }

    width: 80%;
  
    ${media.phone`
      width: 90%;
      overflow-x: auto;
      display: block;
    `}
  
    ${media.desktop`
      display: table;
    `}
  }
`;

export const MaterialPaper: any = styled(Paper)`
  margin: 2em auto 3rem;

  ${media.phone`
    width: 90%;
  `}

  ${media.desktop`
    width: 80%;
  `}
  
  ${media.tablet`
    width: 80%;
  `}
`;
