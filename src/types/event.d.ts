type EventItem = {
  id: string;
  category: Category;
  name: string;
  nameText: string;
  startDate: Date;
  endDate: Date;
  description: string;
  summary: string;
  status: string;
  done: boolean;
  bold: boolean;
  hidden: boolean;
  check: boolean;
};

type Category = 'SAVE' | 'INCOME' | 'RAFFLE' | 'TIP' | 'UNUSED';
