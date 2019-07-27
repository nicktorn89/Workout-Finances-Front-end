import { default as ModalComponent } from '@material-ui/core/Modal';
import React, { memo } from 'react';
import { ModalProps } from './types';
import { 
  ModalContainer, ModalHeader, ModalContent,
  ModalFooter, OkButton, CancelButton,
} from './styled';

const Modal: React.FC<ModalProps> = ({ isActive, onCancel, onOk, children, title }) => {
  return (
    <ModalComponent
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
      className='modal-window'
      open={isActive}
    >
      <ModalContainer>
        <ModalHeader variant='h6' id='modal-title'>
          {title && title}
        </ModalHeader>
        <ModalContent>
          {children}
        </ModalContent>
        <ModalFooter>
          { onOk &&
            <OkButton 
              color='primary'
              variant='contained'
              className='modal-ok'
              onClick={onOk}
            >
              Ок
            </OkButton>
          }
          
          <CancelButton 
            color='secondary'
            variant='contained'
            className='modal-cancel'
            onClick={onCancel} 
          >
           Отмена
          </CancelButton>
        </ModalFooter>
      </ModalContainer>
    </ModalComponent>
  );
};

export default memo(Modal);
