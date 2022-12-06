import { GrInfo, GrLike } from 'react-icons/gr';
import { FaPiggyBank } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';
import { IconType } from 'react-icons';

export const CATEGORY_LIST: {
  id: Category;
  name: string;
  hidden: boolean;
  icon: IconType;
}[] = [
  {
    id: 'SAVE',
    name: '절약',
    hidden: false,
    icon: GiReceiveMoney,
  },
  {
    id: 'INCOME',
    name: '부수입',
    hidden: false,
    icon: FaPiggyBank,
  },
  {
    id: 'RAFFLE',
    name: '추첨',
    hidden: false,
    icon: GrLike,
  },
  {
    id: 'TIP',
    name: '꿀팁',
    hidden: false,
    icon: GrInfo,
  },
  {
    id: 'UNUSED',
    name: '사용안함',
    hidden: true,
    icon: GrInfo,
  },
];
