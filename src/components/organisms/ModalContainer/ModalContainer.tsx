import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import stores, { RootState } from '../../../store/configureStore';
import { modalActions } from '../../../store/modules/actions/modal.action';

export type ModalStatus = {
  id: string;
  data?: {
    [x: string]: any;
  };
};

function useModalContainer() {
  const modalStatus = useSelector((state: RootState) => state.modal.dialog);

  const handleChangeModalStatus = useCallback(
    (params: {
      id: string;
      data?: {
        [x: string]: any;
      };
    }) => {
      stores.dispatch(
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

  const modal = newModalContainer.modalStatus.id === 'CHANGE_NICK_NAME' && (
    <div>
      <ModalMask />
      <ModalWrapper>
        <div
          className="dialog-content"
          style={{ width: '408px', minHeight: '204px', padding: '24px' }}
        >
          <header className="dialog-header">Delete</header>
          <div className="dialog-body">
            <div className="delete-app-body">
              <div className="reset-content">
                Are you sure to delete this app?
              </div>
              <div className="button-group">
                <div className="button-wrapper">
                  <button type="button" className="button delete red-btn">
                    DELETE
                  </button>
                </div>
                <div className="button-wrapper">
                  <button type="button" className="button close">
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );

  return (
    <>
      {modal}
      {modal}
    </>
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

const ModalWrapper = styled.div`
  min-width: 394px;
  background: #fff;
  box-sizing: border-box;
  border-radius: 8px;
  z-index: 9998;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 5px 16px rgb(0 0 0 / 25%);
  min-height: 204px;

  .dialog-header {
    font-size: 24px;
    font-weight: 400;
    font-family: inter;
    margin-bottom: 12px;
    color: #000;
    display: flex;
    align-items: center;
  }
  .dialog-body {
    height: calc(100% - 40px);

    .delete-app-body {
      font-size: 14px;
      text-align: center;
      white-space: pre-wrap;
      .reset-content {
        font-size: 16px;
        color: #000;
        font-family: 'roboto';
        text-align: left;
        white-space: normal;
        line-height: 24px;
        margin: 12px 0 24px 0;
        min-height: 40px;
      }
      .button-group {
        display: flex;
        justify-content: flex-end;
        .button-wrapper {
          display: inline-block;
          margin: 0 0 0 8px;
          .button {
            padding: 16px 32px;
            background: #0076ce;
            border: 1px solid #0076ce;
            border-radius: 8px;
            color: #fff;
            cursor: pointer;
            box-sizing: border-box;
            font-size: 16px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0px 1px 1px rgb(0 0 0 / 25%);
            text-transform: uppercase;
            font-family: 'inter';
            font-weight: 700;
            height: 56px;
            line-height: 24px;
          }
        }
      }
    }
  }
`;
