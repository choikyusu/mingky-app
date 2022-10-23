type EventItem = {
  id: string;
  category: Category;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  status: string;
  done: boolean;
  bold: boolean;
  hidden: boolean;
  check: boolean;
};

type Category = 'SAVE' | 'INCOME' | 'RAFFLE' | 'TIP' | 'UNUSED';
