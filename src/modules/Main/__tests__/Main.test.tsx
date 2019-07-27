import React from 'react';
import { shallow } from 'enzyme';
import Main from '../Main';
import { shallowToJson } from 'enzyme-to-json';

describe('<Main />', () => {
  const MainComponent = shallow(<Main />);
  const MainComponentToJson = shallowToJson(MainComponent);

  it('renders Main component', () => {
    expect(MainComponent).toExist();
  });

  it('should be equal to snapshot', () => {
    expect(MainComponentToJson).toMatchSnapshot();
  });
});
