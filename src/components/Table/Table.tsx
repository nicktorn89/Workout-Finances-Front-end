import React, { memo } from 'react';
import moment from 'moment';

import { TableProps } from './types';

import { TableBody, TableHead, TableRow, Checkbox } from '@material-ui/core';
import Done from '@material-ui/icons/Done';
import Edit from '@material-ui/icons/Edit';
import { MaterialTable, MaterialPaper, TableHeadCell, TableBodyCell } from './styled';

let id = 0;

function createData(date: Date, peopleCount: number, salary: number,
  isFree: boolean, isPersonal: boolean, isJumps: boolean) {
  id += 1;
  return { id, date, peopleCount, salary, isFree, isPersonal, isJumps };
}

const Table: React.FC<TableProps> = ({ data, onCheckboxChange, onEdit }) => {
  const rows = data.map((row) => createData(row.date, row.peopleCount, row.price, row.isFree, row.isPersonal, row.isJumps));

  const handleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    onEdit(e);
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
              <TableRow key={row.id}>
                <TableBodyCell>
                  <Checkbox
                    name={`${index}`}
                    onClick={onCheckboxChange}
                  />
                </TableBodyCell>
                <TableBodyCell onClick={handleEdit}>
                  <Edit />
                </TableBodyCell>
                <TableBodyCell
                  component='th'
                  scope='row'
                >
                  {`${moment(row.date).date()}.${rowMonth}.${moment(row.date).year()} 
                ${rowHour}:${rowMinute}`}
                </TableBodyCell>
                <TableBodyCell
                  className='table-body-cell'
                  align='left'
                >
                  {row.peopleCount}
                </TableBodyCell>
                <TableBodyCell
                  align='left'
                >
                  {row.salary}
                </TableBodyCell>
                <TableBodyCell
                  align='left'
                >
                  {row.isFree && <Done />}
                </TableBodyCell>
                <TableBodyCell
                  align='left'
                >
                  {row.isPersonal && <Done />}
                </TableBodyCell>
                <TableBodyCell
                  align='left'
                >
                  {row.isJumps && <Done />}
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
