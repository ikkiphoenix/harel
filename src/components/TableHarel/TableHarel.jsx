import React, { useMemo } from "react";
import { withRouter } from "react-router-dom";
import useRequest from "../../request/useRequest";
import Table from "../common/Table/Table";

const TableHarel = React.memo(({ history, ...props }) => {
  const [data, loading] = useRequest({ url: "users" });

  const columns = useMemo(
    () => [
      { title: "ID", accessor: "id", type: "number" },
      { title: "Name", accessor: "firstName", type: "string" },
      { title: "Last Name", accessor: "lastName", type: "string" },
      { title: "Date", accessor: "date", type: "date" },
      { title: "Phone", accessor: "phone", type: "string" },
    ],
    []
  );

  const handleClick = (e, item) => {
    const { id } = item;
    history.push(`/edit/${id}`);
  };

  return (
    !loading &&
    data && (
      <Table
        columns={columns}
        data={data}
        hasFilter
        onClickItem={handleClick}
      />
    )
  );
});

export default withRouter(TableHarel);
