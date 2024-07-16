import React, { useState } from "react";

interface Props {
  items: string[];
  onThemeChange?: (newTheme: string) => void;
  children: JSX.Element[];
}

const Navigation = ({ items, children, onThemeChange }: Props) => {
  const [currentTheme, setCurrentTheme] = useState<string>(items[0]);

  // TODO: use a left navigation list rather than horizonal buttons
  // TODO: and integrate it into the opportunity dashboard

  return (
    <>
      <div style={{ textAlign: "center", margin: "1em" }} id="navLinks">
        <ul className="nav nav-pills" style={{ display: "inline-block" }}>
          {items.map((item) => (
            <li
              className={currentTheme === item ? "active" : ""}
              key={`navigation.li for ${item}`}
            >
              <button
                onClick={() => {
                  setCurrentTheme(item);
                  if (onThemeChange) {
                    onThemeChange(item);
                  }
                }}
                style={{
                  cursor: "pointer",
                  backgroundColor: currentTheme === item ? "#999" : "#ddd",
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {children.find((c) => c.key === currentTheme)}
    </>
  );
};

export default Navigation;
