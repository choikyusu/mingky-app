type EventItem = {
  id: string;
  category: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  status: string;
  isUse: boolean;
};

type Category = 'SAVE' | 'INCOME' | 'RECOMMAND' | 'TIP';
