import {
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiAlignJustify,
} from 'react-icons/bi';
import styled from 'styled-components';

const ALIGN_OPTION_LIST = [
  { type: 'JUSTIFYLEFT', Icon: BiAlignLeft, tooltip: '왼쪽 정렬' },
  { type: 'JUSTIFYCENTER', Icon: BiAlignMiddle, tooltip: '가운데 정렬' },
  { type: 'JUSTIFYRIGHT', Icon: BiAlignRight, tooltip: '오른쪽 정렬' },
  { type: 'JUSTIFYFULL', Icon: BiAlignJustify, tooltip: '양끝 정렬' },
];

export const AlignemtOption = (props: {
  onClick: (type: string, value?: string) => void;
  selectedValue?: string | Category | number;
  setIsOptionShow?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { onClick, selectedValue, setIsOptionShow } = props;
  return (
    <Wrapper>
      {ALIGN_OPTION_LIST.map(alignOption => (
        <button
          type="button"
          title=""
          className="se-toolbar-option-icon-button"
          onClick={e => {
            e.stopPropagation();
            if (onClick) onClick(alignOption.type);
            if (setIsOptionShow) setIsOptionShow(false);
          }}
        >
          <alignOption.Icon className="icon" />
        </button>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 29px;
  z-index: 20;
  border: 1px solid #c9c9c9;
  background-color: #fff;
  left: -13px;
  white-space: normal;
  padding: 6px 0 7px;
  .se-toolbar-option-icon-button {
    display: block;
    position: relative;
    white-space: nowrap;
    padding: 5px 0 3px;
    width: 43px;
    height: 29px;
    &:hover {
      color: #00c73c;
    }

    .icon {
      width: 21px;
      height: 21px;
    }
  }
`;
