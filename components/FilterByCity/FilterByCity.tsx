// components/FilterByCity.tsx

import { ReactNode, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import styles from "./FilterByCity.module.scss";
import { FilterByCityProps } from "./typings";

const FilterByCity: React.FC<FilterByCityProps> = ({
  cities,
  onFilterChange,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleCityChange = (
    event: SelectChangeEvent<string>,
    child: ReactNode
  ) => {
    const city = event.target.value as string;
    setSelectedCity(city);
    onFilterChange(city);
  };
  return (
    <FormControl className={styles.filterByCity}>
      <InputLabel id="city-filter-label">City</InputLabel>
      <Select
        labelId="city-filter-label"
        id="city-filter"
        displayEmpty
        value={selectedCity}
        onChange={handleCityChange}
        className={styles.filterByCitySelect}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {cities.map((city) => (
          <MenuItem key={city} value={city}>
            {city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterByCity;
