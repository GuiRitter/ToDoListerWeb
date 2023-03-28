import React from "react";

export const buildCell = (key, content, attributes) => <td
	{...attributes}
	key={key}
>{content}</td>;

export const buildRow = (key, ...cellList) => <tr
	key={key}
>{cellList}</tr>;

export const buildTable = (...rowList) => <table><tbody>{rowList}</tbody></table>;
