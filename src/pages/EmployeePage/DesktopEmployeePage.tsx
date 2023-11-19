import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EmployeeChangeForm from "./components/EmployeeChangeForm";
import Employees from "./components/Employees";
import useSWR from "swr";
import WorkersService from "../../shared/services/workersService";
import RequestError from "../../shared/components/RequestError";
import IWorker from "../../shared/interfaces/IWorker";

const workerGetAll = async () => await WorkersService.getWorkers();

const DesktopEmployeePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [employeesList, setEmployeesList] = useState<IWorker[]>([]);

  const { data, error, mutate } = useSWR("/worker/get_all", workerGetAll);

  useEffect(() => {
    if (data) setEmployeesList(data);
  }, [data]);

  const addEmployee = async (values: IWorker) => {
    await WorkersService.addWorker(values);
    setEmployeesList((prevValue) => [...prevValue, values]);
  };

  const editEmployee = async (values: IWorker) => {
    await WorkersService.updateWorker(values);
  };

  console.log(employeesList);

  if (error) {
    console.error(error);
    return <RequestError errorDescription={error} reload={mutate} />;
  }

  return (
    <>
      {searchParams.get("create") === "true" ||
      searchParams.get("editEmployee") ? (
        <EmployeeChangeForm
          onSubmitForm={
            searchParams.get("editEmployee")
              ? (values) => editEmployee(values)
              : (values) => addEmployee(values)
          }
          type={searchParams.get("editEmployee") ? "edit" : "create"}
          employee={employeesList.find(
            (employee) =>
              employee.id.toString() === searchParams.get("editEmployee")
          )}
        />
      ) : (
        employeesList.length !== 0 && (
          <Employees
            employeesList={employeesList}
            onCreate={(searchParam) => setSearchParams(searchParam)}
          />
        )
      )}
    </>
  );
};

export default DesktopEmployeePage;
