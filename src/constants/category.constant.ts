import { GrInfo, GrLike } from 'react-icons/gr';
import { FaPiggyBank } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';

export const statusList: StatusList = {
  type: 'STATUS',
  list: [
    {
      name: '완료',
      value: 'COMPLETE',
    },
    {
      name: '진행중',
      value: 'ONGOING',
    },
  ],
};

export const categoryList: CategoryList = {
  type: 'CATEGORY',
  list: [
    {
      id: 'SAVE',
      name: '절약',
      hidden: false,
    },
    {
      id: 'INCOME',
      name: '부수입',
      hidden: false,
    },
    {
      id: 'RAFFLE',
      name: '추첨',
      hidden: false,
    },
    {
      id: 'TIP',
      name: '꿀팁',
      hidden: false,
    },
    {
      id: 'UNUSED',
      name: '사용안함',
      hidden: true,
    },
  ],
};
