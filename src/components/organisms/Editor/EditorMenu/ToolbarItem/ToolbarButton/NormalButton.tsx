import { IconType } from 'react-icons';
import { AiOutlinePicture } from 'react-icons/ai';
import { BiAlignLeft, BiColorFill, BiFontColor } from 'react-icons/bi';
import {
  BsListOl,
  BsListUl,
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline,
} from 'react-icons/bs';
import styled from 'styled-components';

export const NormalButton = (props: {
  name: string;
  buttonRef?: React.MutableRefObject<HTMLButtonElement | null>;
  onClick: () => void;
}) => {
  const { name, buttonRef, onClick } = props;
  let Icon: IconType | null = null;

  switch (name) {
    case 'BOLD':
      Icon = BsTypeBold;
      break;
    case 'ITALIC':
      Icon = BsTypeItalic;
      break;
    case 'UNDERLINE':
      Icon = BsTypeUnderline;
      break;
    case 'STRIKE':
      Icon = BsTypeStrikethrough;
      break;
    case 'FONTCOLOR':
      Icon = BiFontColor;
      break;
    case 'BACKGROUND_COLOR':
      Icon = BiColorFill;
      break;
    case 'ALIGN_LEFT':
      Icon = BiAlignLeft;
      break;
    case 'UL':
      Icon = BsListUl;
      break;
    case 'OL':
      Icon = BsListOl;
      break;
    case 'PICTURE':
      Icon = AiOutlinePicture;
      break;

    default: {
      Icon = BsTypeBold;
    }
  }

  return (
    <Container className="section-toolbar-item" onClick={e => onClick()}>
      <button
        className="section-toolbar-item-button"
        type="button"
        ref={buttonRef}
      >
        <Icon className="section-toolbar-icon" />
      </button>
    </Container>
  );
};

const Container = styled.li`
  &.section-toolbar-item {
    display: flex;
    align-items: center;
    position: relative;
    flex: 0 0 auto;
    height: 100%;
    padding-right: 7px;
    height: 33px;

    .section-toolbar-item-button {
      &.active {
        color: #3cc83c;
      }
      padding: 0;
      background-color: transparent;
      border: 0;
      cursor: pointer;
      font: inherit;
      border-radius: 0;
      outline: 0;
      box-sizing: border-box;
      .section-toolbar-icon {
        color: inherit;
        width: 21px;
        height: 21px;
        display: inline-block;
        &:hover {
          color: #3cc83c;
        }
      }
    }
  }
`;
