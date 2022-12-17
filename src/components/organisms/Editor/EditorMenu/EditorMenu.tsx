import axios from 'axios';
import { forwardRef } from 'react';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { getYYYYMMDD } from '../../../../utils/date.util';
import {
  categoryList,
  statusList,
} from '../../../../constants/category.constant';

import { ToolbarItem } from './ToolbarItem/ToolbarItem';
import { SeparatorBar } from './ToolbarItem/SeparatorBar/SeparatorBar';
import { ListOption } from './ToolbarItem/ToolbarButton/ButtonOption/ListOption';
import { CalendarOption } from './ToolbarItem/ToolbarButton/ButtonOption/CalendarOption';
import { ColorPickerOption } from './ToolbarItem/ToolbarButton/ButtonOption/ColorPickerOption';
import { FONT_SIZE_LIST } from '../../../../constants/editor.constant';
import { useEditor } from './useEditorMenu';
import {
  BsListOl,
  BsListUl,
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline,
} from 'react-icons/bs';
import { BiAlignLeft, BiColorFill, BiFontColor } from 'react-icons/bi';
import { AiOutlinePicture } from 'react-icons/ai';
import { AlignemtOption } from './ToolbarItem/ToolbarButton/ButtonOption/AlignmentOption';

export const EditorMenu = forwardRef(
  (props: {
    selectedDate: string;
    startDate: Date;
    endDate: Date;
    category: Category | '';
    status: string;
    editorMenuRef: React.MutableRefObject<any>;
    publish: () => void;
    backHome: () => void;
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    setStartDate: React.Dispatch<React.SetStateAction<Date>>;
    setEndDate: React.Dispatch<React.SetStateAction<Date>>;
    setCategory: React.Dispatch<React.SetStateAction<'' | Category>>;
  }) => {
    const {
      editorMenuRef,
      publish,
      backHome,
      setSelectedDate,
      setStatus,
      setStartDate,
      setEndDate,
      setCategory,
      selectedDate,
      startDate,
      endDate,
      category,
      status,
    } = props;

    const newEditorMenu = useEditor(props);

    return (
      <Wrapper>
        <div className="header">
          <div>타이틀</div>
          <div className="header-menu">
            <div className="header-button-container">
              <button
                className="publish-button"
                type="button"
                onClick={e => {
                  publish();
                }}
              >
                발행
              </button>
              <button
                className="publish-button"
                type="button"
                onClick={() => {
                  backHome();
                }}
              >
                뒤로
              </button>
            </div>
          </div>
        </div>
        <div className="section-layer-toolbar">
          <ul className="section-toolbar">
            <ToolbarItem
              name={category === '' ? '카테고리' : category}
              type="LabelButton"
            >
              <ListOption
                optionList={categoryList}
                onClick={newEditorMenu.clickMenuItem}
                selectedValue={category}
              />
            </ToolbarItem>
            <ToolbarItem
              name={status === '' ? '상태' : status}
              type="LabelButton"
            >
              <ListOption
                optionList={statusList}
                onClick={newEditorMenu.clickMenuItem}
                selectedValue={status}
              />
            </ToolbarItem>
            <SeparatorBar />
            <ToolbarItem
              name={String(newEditorMenu.fontSize)}
              type="LabelButton"
            >
              <ListOption
                optionList={FONT_SIZE_LIST}
                selectedValue={newEditorMenu.fontSize}
                onClick={newEditorMenu.clickMenuItem}
              />
            </ToolbarItem>
            <SeparatorBar />
            <ToolbarItem
              name="BOLD"
              Icon={BsTypeBold}
              type="NormalButton"
              buttonRef={newEditorMenu.boldRef}
              onClick={newEditorMenu.clickMenuItem}
            />
            <ToolbarItem
              name="ITALIC"
              Icon={BsTypeItalic}
              type="NormalButton"
              buttonRef={newEditorMenu.italicRef}
              onClick={newEditorMenu.clickMenuItem}
            />
            <ToolbarItem
              name="UNDERLINE"
              Icon={BsTypeUnderline}
              type="NormalButton"
              buttonRef={newEditorMenu.underlineRef}
              onClick={newEditorMenu.clickMenuItem}
            />
            <ToolbarItem
              name="STRIKETHROUGH"
              Icon={BsTypeStrikethrough}
              type="NormalButton"
              buttonRef={newEditorMenu.strikeRef}
              onClick={newEditorMenu.clickMenuItem}
            />
            <ToolbarItem
              name="FONTCOLOR"
              type="NormalButton"
              Icon={BiFontColor}
            >
              <ColorPickerOption
                name="FORECOLOR"
                bgColor={newEditorMenu.fontColor}
                onClick={newEditorMenu.clickMenuItem}
              />
            </ToolbarItem>
            <ToolbarItem
              name="BACKGROUND_COLOR"
              type="NormalButton"
              Icon={BiColorFill}
            >
              <ColorPickerOption
                name="HILITECOLOR"
                bgColor={newEditorMenu.bgColor}
                onClick={newEditorMenu.clickMenuItem}
              />
            </ToolbarItem>
            <SeparatorBar />
            <ToolbarItem
              name="ALIGN"
              Icon={newEditorMenu.getAlignIcon()}
              type="NormalButton"
            >
              <AlignemtOption onClick={newEditorMenu.clickMenuItem} />
            </ToolbarItem>
            <ToolbarItem
              name="INSERTORDEREDLIST"
              Icon={BsListOl}
              type="NormalButton"
              buttonRef={newEditorMenu.orderListRef}
              onClick={newEditorMenu.clickMenuItem}
            />
            <ToolbarItem
              name="INSERTUNORDEREDLIST"
              Icon={BsListUl}
              type="NormalButton"
              buttonRef={newEditorMenu.unorderListRef}
              onClick={newEditorMenu.clickMenuItem}
            />
            <SeparatorBar />
            <ToolbarItem
              name="PICTURE"
              Icon={AiOutlinePicture}
              type="NormalButton"
              onClick={newEditorMenu.clickMenuItem}
            />
            <SeparatorBar />
            <ToolbarItem
              name={getYYYYMMDD(startDate)}
              type="LabelButton"
              onClick={() => {
                newEditorMenu.clickMenuItem('start');
              }}
            >
              <CalendarOption
                value={newEditorMenu.value}
                selectedDate={selectedDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </ToolbarItem>
            ~
            <ToolbarItem
              name={getYYYYMMDD(endDate)}
              type="LabelButton"
              onClick={() => newEditorMenu.clickMenuItem('end')}
            >
              <CalendarOption
                value={newEditorMenu.value}
                selectedDate={selectedDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </ToolbarItem>
          </ul>
        </div>

        <input
          ref={newEditorMenu.imgSelector}
          id="img-selector"
          type="file"
          accept="image/*"
          onChange={e => {
            const { files } = e.target;
            if (files) {
              const frm = new FormData();
              frm.append('photo', files[0]);

              axios
                .post('/api/upload', frm, {
                  headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then(response => {
                  document.execCommand(
                    'insertImage',
                    false,
                    `${response.data.filename}`,
                  );
                  e.target.value = '';
                  console.log(response);
                })
                .catch(error => {
                  e.target.value = '';
                });
            }
          }}
        />
      </Wrapper>
    );
  },
);

const Wrapper = styled.div`
  .header {
    height: 44px;
    position: relative;
    display: flex;
    flex: 1;
    .header-menu {
      right: 0;
      position: absolute;
      .publish-button {
        background-color: #00c73c;
        border: 1px solid rgba(0, 0, 0, 0.12);
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
        color: #fff;
        height: 30px;
        line-height: 28px;
        margin-left: 6px;
        padding-left: 13px;
        padding-right: 15px;
      }
    }
  }

  .section-toolbar {
    &:before {
      border-top: 1px solid #e5e5e5;
      content: '';
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 20;
    }
    &:after {
      border-top: 1px solid #e5e5e5;
      content: '';
      left: 0;
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 20;
    }
  }

  ul {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }

  button {
    padding: 0;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    font: inherit;
    border-radius: 0;
    outline: 0;
    box-sizing: border-box;
  }

  .section-toolbar {
    display: flex;
    height: 33px;
    padding-left: 7px;
    background-color: #fff;
    align-items: center;

    .section-toolbar-item-separator-bar {
      padding-left: 7px;
      padding-right: 14px;

      .separator-bar {
        &:before {
          content: '';
          display: inline-block;
          width: 1px;
          height: 15px;
          background-color: #e5e5e5;
        }
      }
    }
  }

  #editor-menu {
    display: flex;
  }

  #img-selector {
    display: none;
  }
  button.active {
    background-color: purple;
    color: #fff;
  }
`;
