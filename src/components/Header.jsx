import React from "react";

function Header() {
  return (
    <div className="navbar bg-stone-500">
     <div className="flex-1">
      <a href="/" className="btn btn-ghost text-stone-200 text-xl">ER surin</a>
     </div>
       <div className="flex-none flex gap-2">
          <button className="btn">ตารางเวร</button>
          <button className="btn">รายชื่อ</button>
       </div>
    </div>
  );
}

export default Header;
