import React, { MouseEvent as ReactMouseEvent } from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Table from '../Table';
import empty from 'ramda/es/empty';

const addIndexes = (e: ReactMouseEvent<HTMLElement, MouseEvent>) => {
};

describe('<Slider />', () => {
  const TableComponent = shallow(<Table onEdit={empty} onCheckboxChange={addIndexes} data={[]} />);
  const TableComponentToJson = shallowToJson(TableComponent);
  
  it('Should be equal to snapshot', () => {
    expect(TableComponentToJson).toMatchSnapshot();
  });
});
