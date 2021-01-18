/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback } from "react";
import styles from "./Table.module.css";
import TableItem from "./TableItem/TableItem";
import TableRow from "./TableRow/TableRow";
import TableHeader from "./TableHeader/TableHeader";
import { useDispatch, useSelector } from "react-redux";
import { SetData, SetReloadData } from "../../../store/actions/actionData";
import TableHeaderFilter from "./TableHeaderFilter/TableHeaderFilter";

const Table = React.memo(
  ({ columns = [], data = [], hasFilter = false, onClickItem, ...props }) => {
    const dispatch = useDispatch();
    const { displayData, reloadData } = useSelector((state) => state.data);

    const setReloadData = useCallback(() => {
      dispatch({ type: SetReloadData, value: false });
    }, [dispatch]);

    useEffect(() => {
      if (displayData.length === 0 || reloadData)
        dispatch({ type: SetData, value: data });
      setReloadData();
      return () => {
        data = [];
      };
    }, [data, reloadData]);

    return (
      <table className={styles.table}>
        <thead>
          <TableRow className={styles.rowHeader}>
            <TableHeader columns={columns} />
          </TableRow>
          <TableRow>
            {hasFilter && <TableHeaderFilter columns={columns} data={data} />}
          </TableRow>
        </thead>
        <tbody>
          {displayData.map((d, index) => (
            <TableItem
              item={d}
              columns={columns}
              key={`i${index}`}
              onClick={onClickItem}
            />
          ))}
        </tbody>
      </table>
    );
  }
);

export default Table;
