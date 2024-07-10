import React, { useState } from 'react';
import Select from 'react-select';

const YearSelector = ({ startYear = 1900, endYear = new Date().getFullYear(), onChange }) => {
  const [selectedYear, setSelectedYear] = useState({ value: endYear, label: endYear });

  const handleChange = (selectedOption) => {
    setSelectedYear(selectedOption);
    if (onChange) {
      onChange(selectedOption.value);
    }
  };

  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({ value: year, label: year });
  }

  return (
    <div >
      <Select
        id="year"
        value={selectedYear}
        onChange={handleChange}
        options={years}
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default YearSelector;
