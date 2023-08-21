import React from "react";

const AttributeTable = ({ attributes }) => {
  console.log(attributes);

  const headers = attributes.labels.map((label, index) => {
    const labelText = label.split("|")[0].trim();
    const paramCount = label.split("{param").length - 1;
    const repeatedHeaders = Array.from({ length: paramCount }, (_, i) => (
      <th key={index + i}>
        {i + 1 > 1 ? `${labelText} (${i + 1})` : labelText}
      </th>
    ));
    return repeatedHeaders;
  });

  headers.unshift(<th key="level-header">Level</th>);

  const rows = Object.keys(attributes.parameters).map((paramKey, index) => {
    return attributes.parameters[paramKey].map((value, valueIndex) => (
      <td key={valueIndex}>
        {Number(value) % 1 !== 0 ? value.toFixed(4) : value}
      </td>
    ));
  });

  const transposedRows = rows[0].map((_, rowIndex) => {
    const rowData = rows.map((row) => {
      const cellValue = row[rowIndex].props.children.toString().trim();
      const paramValues = cellValue
        .split("|")
        .map((paramValue) => paramValue.trim());

      if (paramValues.length > 1) {
        const formattedValues = paramValues.map((paramValue) => {
          const valueParts = paramValue.split("+");
          const formattedParts = valueParts.map((part) => {
            return Number(part.trim()) % 1 !== 0
              ? Number(part.trim()).toFixed(4)
              : part.trim();
          });
          return formattedParts.join(" + ");
        });
        return formattedValues.join(" | ");
      } else if (cellValue.includes("+")) {
        // If the cellValue has multiple values separated by '+'
        const valueParts = cellValue.split("+");
        const formattedParts = valueParts.map((part) => {
          return Number(part.trim()) % 1 !== 0
            ? Number(part.trim()).toFixed(4)
            : part.trim();
        });
        return formattedParts.join(" + ");
      } else {
        return Number(cellValue) % 1 !== 0
          ? Number(cellValue).toFixed(4)
          : cellValue;
      }
    });

    return (
      <tr key={rowIndex}>
        <td>{rowIndex + 1}</td> {/* Index (row number) */}
        {rowData.map((cellValue, colIndex) => (
          <td key={colIndex + 1}>{cellValue}</td>
        ))}
      </tr>
    );
  });

  return (
    <div className="att-tabl">
      <table>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{transposedRows}</tbody>
      </table>
    </div>
  );
};

export default AttributeTable;
