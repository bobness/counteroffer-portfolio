import React, { Children, useMemo, useState } from "react";

interface Props {
  items: string[];
  children: JSX.Element[];
}

const Navigation = ({ items, children }: Props) => {
  const [currentPage, setCurrentPage] = useState<string>(items[0]);

  return (
    <>
      <div style={{ textAlign: "center", margin: "1em" }} id="navLinks">
        <ul className="nav nav-pills" style={{ display: "inline-block" }}>
          {items.map((item) => (
            <li
              className={currentPage === item ? "active" : ""}
              key={`navigation.li for ${item}`}
            >
              <a
                onClick={() => setCurrentPage(item)}
                style={{ cursor: "pointer" }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {children.find((c) => c.key === currentPage)}
    </>
  );
};

export default Navigation;
