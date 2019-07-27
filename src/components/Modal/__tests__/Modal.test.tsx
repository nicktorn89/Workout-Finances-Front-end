import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Modal from '../Modal';

describe('<Modal />', () => {
  const mockMouseEvent = (e: React.MouseEvent) => {};

  const ModalComponent = shallow(<Modal isActive={true} onCancel={mockMouseEvent} />);
  const HiddenModalComponent = shallow(<Modal isActive={false} onCancel={mockMouseEvent} />);
  const ModalComponentToJson = shallowToJson(ModalComponent);

  it('Should render', () => {
    expect(ModalComponent).toExist();
  });

  it('Should render ModalComponent', () => {
    expect(ModalComponent).toContainExactlyOneMatchingElement('.modal-window');
  });

  it('Shouldnt render ModalComponent when isActive = false', () => {
    expect(HiddenModalComponent.contains('.modal-window')).toBe(false);
  });
  
  it('Should be equal to snapshot', () => {
    expect(ModalComponentToJson).toMatchSnapshot();
  });
});
