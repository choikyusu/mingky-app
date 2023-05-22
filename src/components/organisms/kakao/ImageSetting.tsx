import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { uploadImageFile$ } from '../../../apis/user.api';

export const ImageSetting = ({
  isShowSetting,
  showSetting,
  changeImage,
}: {
  isShowSetting: boolean;
  showSetting: Dispatch<SetStateAction<boolean>>;
  changeImage: (imageUrl: string) => Promise<void>;
}) => {
  const selectFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const validFileType = ['image/bmp', 'image/png', 'image/jpg', 'image/jpeg'];

    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];
      if (validFileType.includes(file.type)) {
        const imageUrl = await uploadImageFile$(file);
        await changeImage(imageUrl);
      } else alert('이미지 파일만 가능합니다.');
    }
  };

  const onInitSettingClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    showSetting(false);
    changeImage('');
  };

  if (!isShowSetting) return null;
  return (
    <Styled.SettingBlock>
      <label htmlFor="fileInput">
        <p>사진 변경</p>
        <input
          id="fileInput"
          type="file"
          accept=".bmp, .png, .jpg, .jpeg"
          onChange={selectFile}
        />
      </label>
      <p onClick={onInitSettingClick}>기본 이미지로 변경</p>
    </Styled.SettingBlock>
  );
};

const Styled = {
  SettingBlock: styled.div`
    position: absolute;
    width: 130px;
    border: 1px solid #646464;
    background: #fff;
    text-align: start;
    z-index: 100;
    &.bgSetting {
      top: 20px;
    }
    &.profileSetting {
      top: 90px;
      left: 50px;
    }
    &.hideSetting {
      top: -9999px;
    }
    & p {
      color: #000;
      font-size: 12px;
      min-height: 19px;
      padding: 7px 5px;
      cursor: pointer;
      &:hover {
        background: #f0f0f0;
      }
    }
    & input {
      display: none;
    }
  `,
};
