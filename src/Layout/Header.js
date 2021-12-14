import React from "react";

function Header() {
  return (
    <header className="bg-dark"  >
      <div className="container text-white" style={{fontFamily: "Space Grotesk"}}>
        <h4 className="pt-4 text-center pb-0 mb-0">Flash Learning</h4>
        <p className="pb-4 text-center font-weight-light">Master your knowledge deck by deck</p>
      </div>
    </header>
  );
}

export default Header;