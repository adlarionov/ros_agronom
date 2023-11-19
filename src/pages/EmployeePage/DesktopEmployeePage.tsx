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
  const [refresh, setRefresh] = useState<boolean>(false);

  const { data, error, mutate } = useSWR(`/worker/get_all`, workerGetAll, {
    revalidateIfStale: true,
  });

  useEffect(() => {
    if (data) {
      setRefresh(false);
    }
  }, [data, refresh]);

  const addEmployee = async (values: IWorker) => {
    await WorkersService.addWorker({
      kpi: Number(values.kpi),
      long: Number(values.long),
      lat: Number(values.lat),
      name: values.name,
      speciality: values.speciality,
    });
    mutate();
    setRefresh(true);
    window.location.reload();
  };

  const editEmployee = async (values: IWorker) => {
    await WorkersService.updateWorker({
      id: Number(values.id),
      kpi: Number(values.kpi),
      lat: Number(values.lat),
      long: Number(values.long),
      name: values.name,
      speciality: values.speciality,
    });
    mutate();
    setRefresh(true);
    window.location.reload();
  };

  if (error) {
    console.error(error);
    return <RequestError errorDescription={error} reload={mutate} />;
  }

  return (
    data && (
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
            employee={data.find(
              (employee) =>
                employee.id.toString() === searchParams.get("editEmployee")
            )}
          />
        ) : (
          <Employees
            employeesList={data}
            onCreate={(searchParam) => setSearchParams(searchParam)}
          />
        )}
      </>
    )
  );
};

export default DesktopEmployeePage;
