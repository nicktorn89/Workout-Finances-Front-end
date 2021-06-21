import React, { memo } from 'react';
import moment from 'moment';

import { TableProps } from './types';

import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Done from '@material-ui/icons/Done';
import Edit from '@material-ui/icons/Edit';

import { MaterialTable, MaterialPaper, TableHeadCell, TableBodyCell } from './styled';
import { createData } from 'src/modules/Main/utils';

const Table: React.FC<TableProps> = ({ data, onCheckboxChange, onEdit }) => {
  const rows = data.map((row) => createData(row));

  const handleEdit = (e: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    onEdit(e.currentTarget.dataset.dbId as string);
  };

  return (
    <MaterialPaper>
      <MaterialTable>
        <TableHead>
          <TableRow>
            <TableHeadCell />
            <TableHeadCell>Изменить</TableHeadCell>
            <TableHeadCell>Дата</TableHeadCell>
            <TableHeadCell>Кол-во человек</TableHeadCell>
            <TableHeadCell>Прибыль</TableHeadCell>
            <TableHeadCell>Бесплатная</TableHeadCell>
            <TableHeadCell>Персональная</TableHeadCell>
            <TableHeadCell>Джампы</TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => {
            const rowMonth = moment(row.date).month() + 1 < 10
              ? `0${moment(row.date).month()}`
              : moment(row.date).month() + 1;

            const rowHour = moment(row.date).hour() < 10
              ? `0${moment(row.date).hour()}`
              : moment(row.date).hour() + 1;

            const rowMinute = moment(row.date).minute() < 10
              ? `0${moment(row.date).minute()}`
              : moment(row.date).minute();

            return (
              <TableRow key={index}>
                <TableBodyCell>
                  <Checkbox
                    name={`${index}`}
                    onClick={onCheckboxChange}
                  />
                </TableBodyCell>
                <TableBodyCell>
                  <Edit onClick={handleEdit} data-db-id={row.dataId} />
                </TableBodyCell>
                <TableBodyCell
                  component='th'
                  className='date-column'
                  scope='row'
                  align='left'
                >
                  {`${moment(row.date).date()}.${rowMonth}.${moment(row.date).year()} 
                ${rowHour}:${rowMinute}`}
                </TableBodyCell>
                <TableBodyCell
                  align='left'
                >
                  {row.peopleCount}
                </TableBodyCell>
                <TableBodyCell
                  align='left'
                >
                  {row.salary}
                </TableBodyCell>
              </TableRow>
            );
          })}
        </TableBody>
      </MaterialTable>
    </MaterialPaper>
  );
};

export default memo(Table);
