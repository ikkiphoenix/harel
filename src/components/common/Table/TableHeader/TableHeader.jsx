/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { SetSortedData } from "../../../../store/actions/actionData";
import styles from "./../Table.module.css";
import stylesHeader from "./TableHeader.module.css";

const TableHeader = ({ columns }) => {
  const [accessorSort, setAccessorSort] = useState("");
  const [sortAsc, setSortAsc] = useState(false);
  const dispatch = useDispatch();

  const setSort = useCallback(
    (accessor, sortAsc) => {
      dispatch({ type: SetSortedData, isSortAsc: sortAsc, accessor });
    },
    [dispatch]
  );

  const handleClick = (event, accessor) => {
    const isSorted = accessorSort === accessor;
    setSortAsc(!isSorted ? true : !sortAsc);
    setAccessorSort(accessor);
    setSort(accessor, sortAsc);
  };

  return columns.map((c, index) => (
    <th
      className={styles.th}
      onClick={(e) => handleClick(e, c.accessor)}
      key={`c${index}`}
    >
      <div>
        {c.title}{" "}
        {accessorSort === c.accessor && (
          <FontAwesomeIcon
            icon={!sortAsc ? "sort-up" : "sort-down"}
            className={!sortAsc ? stylesHeader.iconAsc : stylesHeader.iconDesc}
          />
        )}
      </div>
    </th>
  ));
};

export default TableHeader;
