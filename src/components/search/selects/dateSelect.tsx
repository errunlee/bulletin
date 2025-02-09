import { DatePicker } from "@/components/ui/date-picker";

type Props = {
  handleDateChange: (value: Date | undefined) => void;
  date?: Date;
};

const DateSelect = ({ handleDateChange, date }: Props) => {
  return <DatePicker handleChange={handleDateChange} date={date} />;
};

export default DateSelect;
