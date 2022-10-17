type EventItem = {
  id: string;
  category: Category;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  status: string;
  isUse: boolean;
};

type Category = 'SAVE' | 'INCOME' | 'RECOMMAND' | 'TIP';
