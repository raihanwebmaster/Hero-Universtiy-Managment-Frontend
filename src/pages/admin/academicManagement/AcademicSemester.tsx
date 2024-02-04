/** @format */

import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester, TQueryParam } from "../../../types";
import { useState } from "react";

export type TTableData = Pick<
  TAcademicSemester,
  "_id" | "name" | "year" | "startMonth" | "endMonth"
> & {
  [key: string]: string | number;
};

const AcademicSemester = () => {
  const [params, setParmas] = useState<TQueryParam[] | undefined>(undefined);
  const { data: semesterData, isFetching } = useGetAllSemestersQuery(params);
  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  const getUniqueValuesByProperty = (propertyName: string) => {
    const uniqueValues = Array.from(
      new Set(tableData?.map((item: TTableData) => item[propertyName]))
    );
    return uniqueValues.map((value) => ({
      text: value as string,
      value: value as string,
    }));
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: getUniqueValuesByProperty("name"),
    },
    {
      title: "Year",
      key: "year",
      dataIndex: "year",
      filters: getUniqueValuesByProperty("year"),
    },
    {
      title: "Start Month",
      key: "startMonth",
      dataIndex: "startMonth",
      filters: getUniqueValuesByProperty("startMonth"),
    },
    {
      title: "End Month",
      key: "endMonth",
      dataIndex: "endMonth",
      filters: getUniqueValuesByProperty("endMonth"),
    },
    {
      title: "Action",
      key: "x",
      render() {
        return <Button>Update</Button>;
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      filters.startMonth?.forEach((item) =>
        queryParams.push({ name: "startMonth", value: item })
      );
      filters.endMonth?.forEach((item) =>
        queryParams.push({ name: "endMonth", value: item })
      );

      setParmas(queryParams);
    }
  };
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AcademicSemester;
