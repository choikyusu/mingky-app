import Calendar from 'react-calendar';
import styled from 'styled-components';

export const CalendarOption = (props: {
  value: Date;
  selectedDate: string;
  setStartDate: (value: React.SetStateAction<Date>) => void;
  setEndDate: (value: React.SetStateAction<Date>) => void;
  setIsOptionShow?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { selectedDate, value, setStartDate, setEndDate, setIsOptionShow } =
    props;

  return (
    <Wrapper>
      <Calendar
        className="calendar"
        onChange={(value: Date) => {
          if (setIsOptionShow) setIsOptionShow(false);
          if (selectedDate === 'start') setStartDate(value);
          else if (selectedDate === 'end') setEndDate(value);
        }}
        value={value}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 32px;
  z-index: 100;
`;
