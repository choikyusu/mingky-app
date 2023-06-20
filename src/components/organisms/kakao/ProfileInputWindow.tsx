import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';

interface ProfileInputWindowProps {
  currentValue: string;
  maxLength: number;
  setChangePopupType: Dispatch<SetStateAction<ChangePopupType>>;
  changeProfile(value: string): void;
  changePopupType: ChangePopupType;
}

export const ProfileInputWindow = ({
  currentValue,
  maxLength,
  setChangePopupType,
  changeProfile,
  changePopupType,
}: ProfileInputWindowProps) => {
  const [value, setValue] = useState(currentValue);
  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    setValue(value.substr(0, maxLength));
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await changeProfile(value);
    setChangePopupType('');
  };

  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  if (changePopupType === '') return null;
  return (
    <>
      <Styled.SettingBg />
      <Styled.InputBlock>
        <Styled.CancelIcon
          className="fas fa-times"
          onClick={() => setChangePopupType('')}
        />
        <div>
          <form onSubmit={onSubmit}>
            <input
              value={value}
              maxLength={maxLength}
              onChange={onValueChange}
            />
            <span>{`${value.length}/${maxLength}`}</span>
            <button type="submit">
              <i className="fas fa-check" />
            </button>
          </form>
        </div>
      </Styled.InputBlock>
    </>
  );
};

const Styled = {
  SettingBg: styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: #000;
    opacity: 0.5;
  `,
  InputBlock: styled.div`
    position: absolute;
    bottom: 0;
    background: #fff;
    border: 1px solid #969696;
    color: #000;
    width: 100%;
    height: 150px;
    z-index: 100;
    & div {
      width: 90%;
      border: 1px solid #3498db;
      margin: 50px auto;
      & input,
      span,
      button {
        padding: 5px;
      }
      & input {
        width: 75%;
        outline: none;
        border: none;
      }
      & span {
        display: inline-block;
        width: 15%;
        text-align: center;
      }
      & button {
        width: 10%;
        cursor: pointer;
        &:hover {
          background: #dcdcdc;
        }
      }
    }
  `,
  CancelIcon: styled.i`
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 15px;
    color: #000;
    z-index: 100;
    cursor: pointer;
  `,
};
