import React from "react";
import { Fact } from "../types";

interface Props {
  data: Fact[];
}

const Facts = ({ data }: Props) => {
  console.log("*** data: ", data);
  return (
    <table
      id="facts"
      className="table table-striped table-bordered"
      style={{ textAlign: "left" }}
    >
      <tbody>
        {data.map((fact, i) => (
          <tr key={`tr #${i}`}>
            <td style={{ fontWeight: "bold", width: "100px" }}>
              {/* <span>
                <label>
                  Include
                  <input type="checkbox" />
                </label>
              </span> */}
              {fact.key}
            </td>
            <td>{fact.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Facts;
