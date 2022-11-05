import React, { useRef } from "react";
import CircleType from "circletype";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
function Header() {
  const circleTitle = useRef();

  useEffect(() => {
    new CircleType(circleTitle.current).radius(1000);
  }, []);

  return (
    <div className="header">
      <h1 ref={circleTitle}>NetFlop</h1>
      <div>
        <NavLink to="/">
          <button>Accueil</button>
        </NavLink>
        <NavLink to="/loved">
          <button>Coups de coeurs</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
