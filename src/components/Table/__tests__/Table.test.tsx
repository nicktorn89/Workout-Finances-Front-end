import React, { MouseEvent as ReactMouseEvent } from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Table from '../Table';

const addIndexes = (e: ReactMouseEvent<HTMLElement, MouseEvent>) => {
};

describe('<Slider />', () => {
  const emptyFunc = () => {};

  const TableComponent = shallow(<Table onEdit={emptyFunc} onCheckboxChange={addIndexes} data={[]} />);
  const TableComponentToJson = shallowToJson(TableComponent);
  
  it('Should be equal to snapshot', () => {
    expect(TableComponentToJson).toMatchSnapshot();
  });
});
