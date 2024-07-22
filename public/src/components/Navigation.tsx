import React, { useState } from "react";

interface Props {
  items: string[];
  onThemeChange?: (newTheme: string) => void;
  currentThemeInput?: string;
}

const Navigation = ({ items, currentThemeInput, onThemeChange }: Props) => {
  const [currentTheme, setCurrentTheme] = useState<string>(
    currentThemeInput ?? items[0]
  );

  // TODO: use a left navigation list rather than horizonal buttons

  // TODO: integrate it into the opportunity dashboard

  return (
    <>
      <div>
        <ul>
          {items.map((item) => (
            <li
              className={currentTheme === item ? "active" : ""}
              key={`navigation.li for ${item}`}
            >
              <a
                onClick={() => {
                  setCurrentTheme(item);
                  if (onThemeChange) {
                    onThemeChange(item);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navigation;
