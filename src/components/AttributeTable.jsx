import React from "react";
import { useState } from "react";

const AttributeTable = ({ attributes }) => {
  const [headersFormat, setHeadersFormat] = useState(""); // State for managing header formatting

  const headers = attributes.labels.map((label, index) => {
    const labelText = label.split("|")[0].trim();
    const paramCount = label.split("{param").length - 1;
    let formatting = "";
    let labelcopy = label;
    const regexPattern = /{param\d+.*?}/g;
    const matchedStrings = label.match(regexPattern);
    //console.log(matchedStrings);

    const repeatedHeaders = matchedStrings.map((matchedString, i) => {
      let formatting = "int";

      if (matchedString.includes("{param") && matchedString.includes("P}")) {
        formatting = "percent";
      } else {
        formatting = "";
      }

      const key = `${index}-${i}`;
      return (
        <th key={key} className={formatting}>
          {i + 1 > 1 ? `${labelText} (${i + 1})` : labelText}
        </th>
      );
    });

    return repeatedHeaders;
  });

  headers.unshift(<th key="level-header">Level</th>);

  const numRows = attributes.parameters.param1.length; // Assuming all paramX arrays have the same length
  const bodyRows = Array.from({ length: numRows }, (_, rowIndex) => {
    const cells = attributes.labels.map((label, colIndex) => {
      const paramNameMatches = label.match(/{param\d+/g); // Get all parameter references in the label
      if (paramNameMatches) {
        const values = paramNameMatches.map((paramNameMatch) => {
          const paramIndex = parseInt(paramNameMatch.match(/\d+/)[0], 10);
          const paramKey = `param${paramIndex}`;

          if (
            attributes.parameters[paramKey] &&
            attributes.parameters[paramKey][rowIndex] !== undefined
          ) {
            return attributes.parameters[paramKey][rowIndex];
          } else {
            return "-";
          }
        });

        const key = `${rowIndex}-${colIndex}`;
        return values.map((value, i) => {
          let headerClass = "";
          if (headers[colIndex + 1]) {
            if (headers[colIndex + 1][i]) {
              if (headers[colIndex + 1][i].props) {
                if (headers[colIndex + 1][i].props.className.toString()) {
                  headerClass = headers[colIndex + 1][i].props.className;
                  console.log(headers[colIndex + 1][i]);
                }
              }
            }
            const formattedValue =
              headerClass === "percent"
                ? `${(value * 100).toFixed(1)}%`
                : value % 1 === 0
                ? value.toFixed(0)
                : value.toFixed(1);

            return <td key={`${key}-${i}`}>{formattedValue}</td>;
          }
        });
      } else {
        const key = `${rowIndex}-${colIndex}`;
        return <td key={key}>{label}</td>;
      }
    });

    return (
      <tr key={rowIndex}>
        {[<td key={`${rowIndex}-level`}>{rowIndex + 1}</td>, ...cells]}
      </tr>
    );
  });

  return (
    <div className="att-tabl">
      <table>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{bodyRows}</tbody>
      </table>
    </div>
  );
};

export default AttributeTable;
