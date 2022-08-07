import { RiKakaoTalkFill } from 'react-icons/ri';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { toast } from 'react-toastify';
import stores from '../../../../store/configureStore';
import { loginInfoActions } from '../../../../store/modules/actions/loginInfo.action';
import { modalActions } from '../../../../store/modules/actions/modal.action';

export const memberOptionList = [
  {
    id: 1,
    title: '추천코드',
    subTitle: '32493970',
    linkType: () => RiKakaoTalkFill,
    doClick: () => toast('추천코드가 복사되었습니다.'),
  },
  {
    id: 2,
    title: '적립/사용 내역',
    subTitle: '지급기준 1년 이내 미사용 시 자동 소멸',
    linkType: () => MdKeyboardArrowRight,
  },
  {
    id: 3,
    title: 'PUSH알림',
    subTitle: '이벤트 및 혜택 정보',
    linkType: () => {
      return stores.getState().loginInfo.settingInfo.push
        ? BsToggleOn
        : BsToggleOff;
    },
    doClick: () => {
      stores.dispatch(
        loginInfoActions.setPush({
          push: !stores.getState().loginInfo.settingInfo.push,
        }),
      );
    },
  },
  {
    id: 4,
    title: '상단고정메뉴',
    subTitle: '',
    linkType: () => {
      return stores.getState().loginInfo.settingInfo.topFix
        ? BsToggleOn
        : BsToggleOff;
    },
    doClick: () => {
      stores.dispatch(
        loginInfoActions.setTopFix({
          topFix: !stores.getState().loginInfo.settingInfo.topFix,
        }),
      );
    },
  },
  {
    id: 5,
    title: '공지사항',
    subTitle: '',
    linkType: () => MdKeyboardArrowRight,
    doClick: () => {
      stores.dispatch(
        modalActions.setDialogStatus({
          id: 'NOTICE',
          data: {},
        }),
      );
    },
  },
  {
    id: 6,
    title: '이용문의',
    subTitle: '이벤트 수정, 정보 공유 등',
    linkType: () => MdKeyboardArrowRight,
  },
  {
    id: 7,
    title: '제휴(광고)문의',
    subTitle: '',
    linkType: () => MdKeyboardArrowRight,
  },
  {
    id: 8,
    title: '이용약관',
    subTitle: '',
    linkType: () => MdKeyboardArrowRight,
    doClick: () => {
      stores.dispatch(
        modalActions.setDialogStatus({
          id: 'TERMS_AND_CONDITIONS',
          data: {},
        }),
      );
    },
  },
  {
    id: 9,
    title: '버전 정보',
    subTitle: '',
    linkType: () => MdKeyboardArrowRight,
  },
  {
    id: 10,
    title: '로그아웃',
    subTitle: '',
    linkType: () => MdKeyboardArrowRight,
  },
  {
    id: 11,
    title: '탈퇴하기',
    subTitle: '',
    linkType: () => MdKeyboardArrowRight,
  },
];
