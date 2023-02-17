import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import stores, { RootState } from '../../../store/configureStore';
import { modalActions } from '../../../store/modules/actions/modal.action';
import { ModalDialog } from './ModalDialog/ModalDialog';
import { Notice } from './ModalDialog/Notice/Notice';
import { Event } from './ModalDialog/Event/Event';
import { TermsAndConditions } from './ModalDialog/TermsAndConditions/TermsAndConditions';
import BlogLink from './ModalDialog/BlogLink/BlogLink';
import { useModalState } from './ModalProvider';
import useFetch from '../../../hooks/useFetch';
import { API } from '../../../constants/api.constant';

export interface ModalRef {
  handleClick: () => void;
}

export default function ModalContainer() {
  const newModalState = useModalState();
  const modalRef: React.MutableRefObject<any> = useRef({});

  return (
    <div>
      {newModalState.modalId !== '' && <ModalMask />}
      {newModalState.modalId === 'NOTICE' && (
        <ModalDialog handleClick={() => newModalState.setModalId('')}>
          <Notice />
        </ModalDialog>
      )}
      {newModalState.modalId === 'TERMS_AND_CONDITIONS' && (
        <ModalDialog handleClick={() => newModalState.setModalId('')}>
          <TermsAndConditions />
        </ModalDialog>
      )}
      {newModalState.modalId === 'EVENT' && (
        <ModalDialog handleClick={() => newModalState.setModalId('')}>
          {/* <Event modalStatus={newModalContainer.modalStatus} /> */}
        </ModalDialog>
      )}
      {newModalState.modalId === 'BLOG_LINK' && (
        <ModalDialog handleClick={() => modalRef.current.handleClick()}>
          <BlogLink ref={modalRef} />
        </ModalDialog>
      )}
    </div>
  );
}

const ModalMask = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;
