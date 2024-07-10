import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const MonthSelector = ({ onChange }) => {
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const getCurrentMonth = () => {
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based
    return months.find(month => month.value === currentMonth.toString().padStart(2, '0'));
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  useEffect(() => {
    if (onChange) {
      onChange(selectedMonth.value);
    }
  }, [selectedMonth, onChange]);

  const handleChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
    if (onChange) {
      onChange(selectedOption.value);
    }
  };

  return (
    <div className="form-control">
      <Select
        id="month"
        value={selectedMonth}
        onChange={handleChange}
        options={months}
        classNamePrefix="react-select"
        placeholder="Select a month"
      />
    </div>
  );
};

export default MonthSelector;
