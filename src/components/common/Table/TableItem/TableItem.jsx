import React from "react";
import styles from "./../Table.module.css";
import cMoment from "../../../../utils/cMoment";
import TableRow from "../TableRow/TableRow";

const TableItem = React.memo(({ item, columns, onClick }) => {
  return (
    <TableRow onClick={(e) => onClick(e, item)}>
      {columns.map((c) => {
        let value = item[c.accessor];
        if (c.type === "date") value = cMoment.getMoment(value).format("L");
        return (
          <td className={styles.td} key={value}>
            {value}
          </td>
        );
      })}
    </TableRow>
  );
});

export default TableItem;
