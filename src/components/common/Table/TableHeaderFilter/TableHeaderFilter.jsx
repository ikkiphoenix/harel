/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useMemo,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetFilterData } from "../../../../store/actions/actionData";
import useDebounce from "../../../../utils/useDebounce";
import Input from "../../Input/Input";
import Select from "../../Select/Select";
import styles from "./../Table.module.css";

const TableHeaderFilter = ({ columns, data }) => {
  const dispatch = useDispatch();
  const { listFilter } = useSelector((state) => state.data);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);
  const minInput = useRef();
  const maxInput = useRef();
  const debouncedMinTerm = useDebounce(min, 300);
  const debouncedMaxTerm = useDebounce(max, 300);

  const selectOptions = useMemo(
    () => [
      { value: "today", text: "Today" },
      { value: "-7", text: "Since week ago" },
      { value: "-365", text: "Since year ago" },
      { value: "more", text: "More than year ago" },
    ],
    []
  );

  const setFilter = useCallback(
    (paramsFilter) => {
      dispatch({ type: SetFilterData, paramsFilter });
    },
    [dispatch]
  );

  const handleString = (e) => {
    const { name, value } = e.target;
    setFilter({ name, value, type: "string" });
  };

  useEffect(() => {
    if (debouncedMinTerm) {
      const { dataset } = minInput.current || {};
      setFilter({
        name: dataset.accessor,
        value: [debouncedMinTerm, max],
        type: "number",
      });
    }
  }, [debouncedMinTerm]);

  useEffect(() => {
    if (debouncedMaxTerm) {
      const { dataset } = maxInput.current || {};
      setFilter({
        name: dataset.accessor,
        value: [min, debouncedMaxTerm],
        type: "number",
      });
    }
  }, [debouncedMaxTerm]);

  const handleNumber = (e) => {
    const { name, value } = e.target;
    if (value < 0) {
      setMin(min);
      return;
    }

    if (name === "min") {
      if (value > max - 1) e.target.value = min;
      else setMin(value);
    } else if (name === "max") {
      if (value < min + 1) e.target.value = max;
      else setMax(value);
    }
  };

  const handleDate = (e) => {
    const { value, name } = e.target;
    setFilter({ name, value, type: "date" });
  };

  const setFilterInput = ({ type, accessor }, data, index) => {
    const totalData = data.length;
    const element = listFilter.find(
      (lf) => lf.type === type && lf.libelle === accessor
    );
    const defaultValue = (!!element && element.value) || "";
    if (type === "string")
      return (
        <Input
          placeholder="Tape something..."
          name={accessor}
          onChange={handleString}
          key={`f${index}`}
          defaultValue={defaultValue}
        />
      );
    else if (type === "number") {
      const minNumberAccessor =
        (!!element && element.value[0]) || data[0][accessor];
      const maxNumberAccessor =
        (!!element && element.value[1]) || data[totalData - 1][accessor];
      return (
        <div>
          <Input
            name="min"
            type="number"
            data-accessor={accessor}
            onChange={handleNumber}
            defaultValue={minNumberAccessor}
            ref={minInput}
          />
          <Input
            name="max"
            type="number"
            data-accessor={accessor}
            defaultValue={maxNumberAccessor}
            onChange={handleNumber}
            ref={maxInput}
          />
        </div>
      );
    } else if (type === "date")
      return (
        <Select
          name={accessor}
          onChange={handleDate}
          placeholder="Select date"
          options={selectOptions}
          defaultValue={defaultValue}
        />
      );
  };

  return columns.map((c, index) => (
    <th className={styles.th} key={`cf${index}`}>
      {setFilterInput(c, data, index)}
    </th>
  ));
};

export default TableHeaderFilter;
