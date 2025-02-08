import { SelectElement } from "../ui/select";

const sources = [
  { value: "News API", label: "News API" },
  { value: "New York Times", label: "New York Times" },
  { value: "The Guardian", label: "The Guardian" },
];
type SourceProps = {
  handleSourceChange: (value: string) => void;
  source?: string;
};

const SourceSelect = ({ handleSourceChange, source }: SourceProps) => {
  return (
    <SelectElement
      handleChange={handleSourceChange}
      data={sources}
      label="Select a category"
      value={source}
      placeholder={!source ? "All Sources" : ""}
    />
  );
};

export default SourceSelect;
