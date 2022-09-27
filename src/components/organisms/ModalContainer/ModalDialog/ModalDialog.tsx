import styled from 'styled-components';
import stores from '../../../../store/configureStore';
import { modalActions } from '../../../../store/modules/actions/modal.action';

export function ModalDialog(props: { children: React.ReactNode }) {
  return (
    <ModalWrapper>
      <div
        className="dialog-content"
        style={{
          width: 'auto',
          margin: '24px',
          height: '100%',
        }}
      >
        {props.children}
        <div className="button-group">
          <div className="button-wrapper">
            <button
              type="button"
              className="button close"
              onClick={() =>
                stores.dispatch(
                  modalActions.setDialogStatus({
                    id: '',
                    data: {},
                  }),
                )
              }
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

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
  height: 50%;
  .dialog-header {
    font-size: 1em;
    font-weight: 400;
    font-family: inter;
    margin-bottom: 12px;
    color: #000;
    display: flex;
    align-items: center;
  }
  .dialog-body {
    overflow: auto;
    height: calc(100% - 95px);
    text-align: center;
    white-space: pre-wrap;
    .reset-content {
      font-size: 0.7em;
      color: #000;
      text-align: left;
      white-space: normal;
      line-height: 24px;
      margin: 4px 0 8px 0;
      min-height: 40px;
    }
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    .button-wrapper {
      display: inline-block;
      .button {
        padding: 4px 8px;
        background: #0076ce;
        border: 1px solid #0076ce;
        border-radius: 8px;
        color: #fff;
        cursor: pointer;
        box-sizing: border-box;
        font-size: 0.7em;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 1px 1px rgb(0 0 0 / 25%);
        font-weight: 700;
        height: 24px;
        line-height: 24px;
      }
    }
  }
`;
