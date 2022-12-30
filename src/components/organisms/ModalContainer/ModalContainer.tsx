import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import stores, { RootState } from '../../../store/configureStore';
import { modalActions } from '../../../store/modules/actions/modal.action';
import { ModalDialog } from './ModalDialog/ModalDialog';
import { Notice } from './ModalDialog/Notice/Notice';
import { Event } from './ModalDialog/Event/Event';
import { TermsAndConditions } from './ModalDialog/TermsAndConditions/TermsAndConditions';
import { BlogLink } from './ModalDialog/BlogLink/BlogLink';

export type ModalStatus = {
  id: string;
  data?: {
    [x: string]: any;
  };
};

function useModalContainer() {
  const dispatch = useDispatch();
  const modalStatus = useSelector((state: RootState) => state.modal.dialog);

  const handleChangeModalStatus = useCallback(
    (params: {
      id: string;
      data?: {
        [x: string]: any;
      };
    }) => {
      dispatch(
        modalActions.setDialogStatus({
          id: params.id,
          data: params.data || undefined,
        }),
      );
    },
    [],
  );

  return {
    modalStatus,
    handleChangeModalStatus,
  };
}

export default function ModalContainer() {
  const newModalContainer = useModalContainer();

  return (
    <div>
      {newModalContainer.modalStatus.id !== '' && <ModalMask />}
      {newModalContainer.modalStatus.id === 'NOTICE' && (
        <ModalDialog>
          <Notice />
        </ModalDialog>
      )}
      {newModalContainer.modalStatus.id === 'TERMS_AND_CONDITIONS' && (
        <ModalDialog>
          <TermsAndConditions />
        </ModalDialog>
      )}
      {newModalContainer.modalStatus.id === 'EVENT' && (
        <ModalDialog>
          <Event modalStatus={newModalContainer.modalStatus} />
        </ModalDialog>
      )}
      {newModalContainer.modalStatus.id === 'BLOG_LINK' && (
        <ModalDialog modalStatus={newModalContainer.modalStatus}>
          <BlogLink />
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
