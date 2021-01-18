import { parseStringFromObject } from "../../utils/parse";
import { sortAsc, sortDesc } from "../../utils/sort";
import {
  SetData,
  SetFilterData,
  SetGlobalFilterData,
  SetReloadData,
  SetSortedData,
} from "../actions/actionData";
import cMoment from "./../../utils/cMoment";

const initialState = {
  originalData: [],
  displayData: [],
  listFilter: [],
  reloadData: false,
};

const dataReducers = (state = initialState, action) => {
  const { type, value, isSortAsc, accessor, paramsFilter } = action;
  switch (type) {
    case SetData:
      return {
        ...state,
        originalData: value,
        displayData: value,
      };
    case SetSortedData:
      const displayData = state.displayData.sort((a, b) =>
        isSortAsc ? sortAsc(a, b, accessor) : sortDesc(a, b, accessor)
      );
      return {
        ...state,
        displayData,
      };
    case SetFilterData:
      const { name, value: valueFilter, type } = paramsFilter;
      const newListFilter = state.listFilter
        .filter((lf) => lf.libelle !== name)
        .concat(
          valueFilter
            ? {
                libelle: name,
                value: valueFilter,
                type,
              }
            : []
        );
      let filteredData = [...state.originalData];
      if (newListFilter.length > 0) {
        newListFilter.map(
          (lf) =>
            (filteredData = filteredData.filter((d) => {
              const valueLibelle = d[lf.libelle];
              if (lf.type === "string")
                return valueLibelle
                  .toLowerCase()
                  .includes(lf.value.toLowerCase());
              if (lf.type === "number")
                return (
                  valueLibelle >= parseInt(lf.value[0]) &&
                  valueLibelle <= parseInt(lf.value[1])
                );
              if (lf.type === "date") {
                if (lf.value === "today")
                  return cMoment.getMoment().isSame(valueLibelle);
                else if (lf.value === "more")
                  return cMoment.substractDays(365).isAfter(valueLibelle);
                else return cMoment.addDays(lf.value).isBefore(valueLibelle);
              }
              return false;
            }))
        );
      }
      return {
        ...state,
        displayData: filteredData,
        listFilter: newListFilter,
      };
    case SetGlobalFilterData:
      const globalFilteredData = state.originalData.filter((d) =>
        parseStringFromObject(d).toLowerCase().includes(value.toLowerCase())
      );
      const displayGlobalData = value ? globalFilteredData : state.originalData;
      return { ...state, displayData: displayGlobalData };
    case SetReloadData:
      return {
        ...state,
        reloadData: true,
      };
    default:
      return state;
  }
};

export default dataReducers;
