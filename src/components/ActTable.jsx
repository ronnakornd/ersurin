import React, { useState, useEffect } from "react";

// Function to generate dates for a given month and year
const generateDates = (month, year) => {
  const dates = [];
  const date = new Date(year, month - 1, 1); // JavaScript months are 0-based

  while (date.getMonth() === month - 1) {
    dates.push({
      day: new Date(date),
      holiday: date.getDay() === 0 || date.getDay() === 6 ? true : false,
      resus1: null,
      resus2: null,
      er1: null,
      er2: null,
      observe: null,
      ems: null,
      teaching: null,
      refer: null,
    });
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

// Array to map weekdays to Thai names
const weekdaysInThai = [
  "อาทิตย์", // Sunday
  "จันทร์", // Monday
  "อังคาร", // Tuesday
  "พุธ", // Wednesday
  "พฤหัสบดี", // Thursday
  "ศุกร์", // Friday
  "เสาร์", // Saturday
];

const dayColor = [
  "bg-red-300", // Sunday
  "bg-yellow-300", // Monday
  "bg-pink-300", // Tuesday
  "bg-green-300", // Wednesday
  "bg-orange-300", // Thursday
  "bg-blue-300", // Friday
  "bg-purple-300", // Saturday
];

const ActTable = ({
  month,
  year,
  editHoliday,
  selectedMember,
  onChange,
  value,
}) => {
  const [dates, setDates] = useState(generateDates(month, year));
  const toggleHoliday = (index) => {
    if (editHoliday) {
      dates[index].holiday = !dates[index].holiday;
      setDates([...dates]);
    }
  };
  const selectShift = (index, shift) => {
    let currentDates = dates;
    if (currentDates[index][shift] == selectedMember) {
      currentDates[index][shift] = null;
      setDates([...currentDates]);
      return;
    }
    currentDates[index][shift] = selectedMember;
    console.log(currentDates);
    onChange([...currentDates]);
    setDates([...currentDates]);
  };

  useEffect(() => {
    if (value != null) {
      setDates(value);
    } else {
      setDates(generateDates(month, year));
      onChange(generateDates(month, year));
    }
  }, [month, year, value]);

  return (
    <div className="container p-5">
      <h2 className="text-2xl font-bold mb-4">
        ตารางเวรในเวลา {month}/{year}
      </h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 border-black text-left w-2/12">
              วันที่
            </th>
            <th className="border border-black border-l-0">วันหยุด</th>
            <th className="border px-4 py-2 border-black border-l-0 ">
              Resus1
            </th>
            <th className="border px-4 py-2 border-black border-l-0 ">
              Resus2
            </th>
            <th className="border px-4 py-2 border-black border-l-0 ">ER1</th>
            <th className="border px-4 py-2 border-black border-l-0 ">ER2</th>
            <th className="border px-4 py-2 border-black border-l-0 ">
              Observe
            </th>
            <th className="border px-4 py-2 border-black border-l-0 ">
              EMS/RRT
            </th>
            <th className="border px-4 py-2 border-black border-l-0 ">
              Teaching
            </th>
            <th className="border px-4 py-2 border-black border-l-0 ">
              Refer/AOC
            </th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date, index) => (
            <tr key={index}>
              <td
                className={`border px-3 py-2 border-black  ${
                  dayColor[date.day.getDay()]
                }`}
              >
                {weekdaysInThai[date.day.getDay()]}{" "}
                {date.day.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </td>
              <td
                className={`border border-black border-l-0 hover:bg-slate-600 ${
                  date.holiday ? "bg-red-400" : ""
                }`}
                onClick={() => toggleHoliday(index)}
              ></td>
              <td
                className={`border px-4 py-2 border-black border-l-0   ${
                  date.holiday ? "bg-slate-400" : ""
                }`}
                onClick={() => selectShift(index, "resus1")}
                style={{
                  backgroundColor: date.resus1 ? date.resus1.color : "",
                }}
              >
                {date.resus1 ? date.resus1.label : ""}
              </td>
              <td
                className={`border px-4 py-2 border-black border-l-0 ${
                  date.holiday ? "bg-slate-400" : ""
                }`}
                style={{
                  backgroundColor: date.resus2 ? date.resus2.color : "",
                }}
                onClick={() => selectShift(index, "resus2")}
              >
                {date.resus2 ? date.resus2.label : ""}
              </td>
              <td
                className={`border px-4 py-2 border-black border-l-0 ${
                  date.holiday ? "bg-slate-400" : ""
                }`}
                onClick={() => selectShift(index, "er1")}
                style={{ backgroundColor: date.er1 ? date.er1.color : "" }}
              >
                {date.er1 ? date.er1.label : ""}
              </td>
              <td
                className={`border px-4 py-2 border-black border-l-0 ${
                  date.holiday ? "bg-slate-400" : ""
                }`}
                onClick={() => selectShift(index, "er2")}
                style={{ backgroundColor: date.er2 ? date.er2.color : "" }}
              >
                {date.er2 ? date.er2.label : ""}
              </td>
              <td
                className={`border px-4 py-2 border-black border-l-0 ${
                  date.holiday ? "bg-slate-400" : ""
                }`}
                onClick={() => selectShift(index, "observe")}
                style={{
                  backgroundColor: date.observe ? date.observe.color : "",
                }}
              >
                {date.observe ? date.observe.label : ""}
              </td>
              <td
                className={`border px-4 py-2 border-black border-l-0 ${
                  date.holiday ? "bg-slate-400" : ""
                }`}
                onClick={() => selectShift(index, "ems")}
                style={{ backgroundColor: date.ems ? date.ems.color : "" }}
              >
                {date.ems ? date.ems.label : ""}
              </td>
              <td
                className={`border px-4 py-2 border-black border-l-0 ${
                  date.holiday ? "bg-slate-400" : ""
                }`}
                onClick={() => selectShift(index, "teaching")}
                style={{
                  backgroundColor: date.teaching ? date.teaching.color : "",
                }}
              >
                {date.teaching ? date.teaching.label : ""}
              </td>
              <td
                className={`border px-4 py-2 border-black border-l-0 ${
                  date.holiday ? "bg-slate-400" : ""
                }`}
                onClick={() => selectShift(index, "refer")}
                style={{ backgroundColor: date.refer ? date.refer.color : "" }}
              >
                {date.refer ? date.refer.label : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActTable;
