import { Persons2Icon } from "~/assets/Icons";
import MultiPopoverDropdown from "~/components/MultiPopoverDropdown";
import { SCHOOLEAN_USERS_FILTERS } from "~/data/schooleanUsersData";

type FilterListProps = {
  filters: Record<string, string[]>;
  onFilterChange: (filters: Record<string, string[]>) => void;
};

const FilterList = ({ filters, onFilterChange }: FilterListProps) => {
  const handleFilterChange = (key: string, value: string[]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex items-center gap-4 w-full">
      {SCHOOLEAN_USERS_FILTERS.map((filter) => (
        <MultiPopoverDropdown
          key={filter.key}
          options={filter.options}
          onChange={(value) => handleFilterChange(filter.key, value)}
          value={filters[filter.key] ?? ["all"]}
          selectedLabel={filter.options[0].label}
          modalTitle={`Filter by ${filter.label}`}
          label={filter.label}
          leftIcon={
            filter.key === "role" && <Persons2Icon className="w-5 h-5" />
          }
        />
      ))}
    </div>
  );
};

export default FilterList;
