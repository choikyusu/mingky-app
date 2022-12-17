type LabelButtonOption = FontColor | CategoryList | StatusList | FontSizeList;
type MenuItem = FontColor | CategoryList | StatusList | FontSizeList;

type FontColor = {
  type: 'FONT_COLOR';
  list: {
    value: string;
    fontColor: string;
  }[];
};

type CategoryList = {
  type: 'CATEGORY';
  list: {
    id: Category;
    name: string;
    hidden: boolean;
    icon: IconType;
  }[];
};

type StatusList = {
  type: 'STATUS';
  list: {
    name: string;
    value: string;
  }[];
};

type FontSizeList = {
  type: 'FONT_SIZE';
  list: {
    value: string;
    fontSize: string;
  }[];
};
