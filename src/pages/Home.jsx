import React, { useEffect, useState } from "react";
import YearSelector from "../components/YearSelector";
import MonthSelector from "../components/MonthSelector";
import DateTable from "../components/DateTable";
import MemberSelector from "../components/MemberSelector";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseconfig";

const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [editHoliday, setEditHoliday] = useState(false);
  const [selectedMember, setSelectedMember] = useState();
  const [members,setMembers] = useState([]);
  const [dates,setDates] = useState(null);
  const [shiftId, setShiftId] = useState(null);

  const handleSave = async () => {
    if (dates.length === 0) {
      alert("Please create a table first");
      return;
    }
    if(shiftId == null){
      addShift();
    }else{
      updateShift();
    }
  }

  const fetchShift = async () => {
    const data = await getDocs(collection(db, "shifts"));
    if (!data.empty) {
      const shifts = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const shift = shifts.find((shift) => shift.month === selectedMonth && shift.year === selectedYear);
      if (shift) {
        setShiftId(shift.id);
        const transformedDates = shift.data.map((item) => {
          return {
            day: item.day.toDate(),
            holiday: item.holiday,
            morning: item.morning,
            evening: item.evening,
            extra: item.extra,
            night: item.night,
          };
        });
        setDates(transformedDates);
      }else{
        setShiftId(null);
        setDates(null);
      }
    }else {
      setShiftId(null);
      setDates(null);
    }
  }

  const addShift = async () => {
    try {
      await addDoc(collection(db, "shifts"), { month: selectedMonth, year: selectedYear, data: dates });
      alert("saving successfully");
    } catch (error) {
      console.error("Error adding shift: ", error);
    }
  }

  const updateShift = async () => {
    try {
      await updateDoc(doc(db, "shifts", shiftId), { data: dates });
      alert("saving successfully");
    } catch (error) {
      console.error("Error updating shift: ", error);
    }
  }

  useEffect(() => {
        setShiftId(null);
        fetchShift();
  },[selectedMonth,selectedYear]);


  return (
    <>
      <div className="w-full flex justify-start items-center">
        <div className="flex justify-center items-center gap-2 p-5">
          <h1>เลือกเดือน</h1>
          <MonthSelector onChange={setSelectedMonth} />
          <YearSelector onChange={setSelectedYear} />
        </div>
        <div className="flex justify-center items-center gap-2 p-5">
          <h1>เลือกรายชื่อ</h1>
          <MemberSelector onChange={setSelectedMember} parentMembers={setMembers} />
        </div>
        <div className="flex gap-2">
          <button
            className={`btn ${editHoliday ? "btn-error" : "btn-neutral"}`}
            onClick={() => setEditHoliday(!editHoliday)}
          >
            แก้ไขวันหยุด
          </button>
          <button className="btn btn-primary" onClick={handleSave}>save</button>
        </div>
      </div>
      <DateTable
        month={selectedMonth}
        year={selectedYear}
        editHoliday={editHoliday}
        selectedMember={selectedMember}
        members={members}
        onChange={setDates}
        value={dates}
      />
    </>
  );
};

export default Home;
