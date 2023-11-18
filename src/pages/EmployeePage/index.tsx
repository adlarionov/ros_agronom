import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import EmployeeChangeForm from "./components/EmployeeChangeForm";
import Employees from "./components/Employees";
import {
  ITableDataEmployees,
  tableDataEmployees,
} from "../../shared/components/Table/components/TableData";
import useSWR from "swr";
import httpClient from "../../shared/api/httpClient";

const workerGetAll = async () => await httpClient.get("/worker/get_all");

const EmployeePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [employeesList, setEmployeesList] =
    useState<ITableDataEmployees[]>(tableDataEmployees);

  const {data, error, mutate} = useSWR("/worker/get_all", workerGetAll);

  console.log(data);

  return (
    <>
      {searchParams.get("create") === "true" ||
      searchParams.get("editEmployee") ? (
        <EmployeeChangeForm
          onSubmitForm={(values) =>
            setEmployeesList((prevValue) => [...prevValue, values])
          }
          type={searchParams.get("editEmployee") ? "edit" : "create"}
          employee={employeesList.find(
            (employee) => employee.number === searchParams.get("editEmployee")
          )}
        />
      ) : (
        <Employees
          employeesList={employeesList}
          onCreate={(searchParam) => setSearchParams(searchParam)}
        />
      )}
    </>
  );
};

export default EmployeePage;
