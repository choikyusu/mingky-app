import { GiConsoleController } from 'react-icons/gi';
import styled from 'styled-components';

export const ListOption = (props: {
  optionList?: LabelButtonOption;
  onClick: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value?: string | number,
  ) => void;
  selectedValue?: string | Category | number;
  setIsOptionShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { optionList, onClick, selectedValue, setIsOptionShow } = props;

  if (!optionList) return null;

  function getList() {
    switch (optionList?.type) {
      case 'FONT_COLOR':
        return optionList.list.map(option => {
          return {
            name: option.fontColor,
            value: option.value,
          };
        });
      case 'CATEGORY':
        return optionList.list.map(option => {
          return {
            name: option.name,
            value: option.id,
          };
        });
      case 'STATUS':
        return optionList.list.map(option => {
          return {
            name: option.name,
            value: option.value,
          };
        });
      case 'FONT_SIZE':
        return optionList.list.map(option => {
          return {
            name: option.fontSize,
            value: option.value,
          };
        });
      default: {
        return [];
      }
    }
  }

  return (
    <OptionList>
      {getList().map(item => (
        <button
          type="button"
          title=""
          className={`section-toolbar-option-text-button ${
            selectedValue === item.value ? 'section-is-selected' : ''
          }`}
          onClick={e => {
            e.stopPropagation();
            setIsOptionShow(false);
            onClick(e, item.value);
          }}
        >
          <span
            className="se-toolbar-option-label"
            data-value={item.value}
            aria-hidden="true"
          >
            {item.name}
          </span>
        </button>
      ))}
    </OptionList>
  );
};

const OptionList = styled.div`
  display: block;
  position: absolute;
  z-index: 99;
  border: 1px solid #c9c9c9;
  background-color: #fff;
  box-shadow: 1px 1px 2px 0 rgb(0 0 0 / 10%);
  white-space: normal;
  left: -7px;
  padding: 7px;
  top: 32px;
  min-width: 100px;

  .section-toolbar-option-text-button {
    padding: 8px 46px 8px 16px;
    position: relative;
    width: 100%;
    font-size: 12px;
    text-align: left;

    &:hover {
      color: #00c73c;
    }

    &.section-is-selected {
      color: #00c73c;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 12px;
        bottom: 7px;
        margin: auto;
        width: 12px;
        height: 7px;
        border-style: solid;
        border-width: 0 0 2px 2px;
        border-color: #00c73c;
        box-sizing: border-box;
        transform: rotate(-45deg);
      }
    }
  }
`;
