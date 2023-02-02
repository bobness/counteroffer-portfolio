import React from "react";
import { Fact } from "../types";

interface Props {
  data: Fact[];
}

const Facts = ({ data }: Props) => {
  return (
    <table
      id="facts"
      className="table table-striped table-bordered"
      style={{ textAlign: "left" }}
    >
      <tbody>
        {data.map((fact, i) => (
          <tr key={`tr #${i}`}>
            <td scope="row">
              <span>
                <label>
                  Include
                  <input type="checkbox" />
                </label>
              </span>
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
