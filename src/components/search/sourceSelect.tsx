import { SelectElement } from "../ui/select";

const sources = [
  { value: "newsapi", label: "NewsAPI" },
  { value: "nytimes", label: "New York Times" },
  { value: "guardian", label: "The Guardian" },
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
