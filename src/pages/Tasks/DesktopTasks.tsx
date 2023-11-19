import { Box } from "@mui/material";
import ManagerTasks from "./components/ManagerTasks";
import { useSearchParams } from "react-router-dom";
import ManagerChangeTaskForm from "./components/ManagerChangeTaskForm";
import { useEffect, useState } from "react";
import TasksService from "../../shared/services/tasksService";
import ITask from "../../shared/interfaces/ITask";
import RequestError from "../../shared/components/RequestError";

const DesktopTasks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [error, setError] = useState<unknown>("");

  const getTasks = async () => {
    await TasksService.getTasks()
      .then((resp) => setTasks(resp))
      .catch((error) => setError(error));
  };

  const addTask = async (values: ITask) => {
    await TasksService.addTask({
      description: values.description,
      executor: values.executor,
      duration: Number(values.duration),
      lat: Number(values.lat),
      long: Number(values.long),
      place_name: values.place_name,
      priority: values.priority,
      processing_area: Number(values.processing_area),
      type: values.type,
    });
    setTasks((prevValue) => [...prevValue, values]);
    // window.location.reload();
  };

  const editTask = async (values: ITask) => {
    const requestBody = {
      description: values.description,
      executor: values.executor,
      duration: Number(values.duration),
      lat: Number(values.lat),
      long: Number(values.long),
      place_name: values.place_name,
      priority: values.priority,
      processing_area: Number(values.processing_area),
      type: values.type,
    };
    await TasksService.updateById(requestBody, values.id);
    const newTasks = tasks.map((task) => {
      if (task.id === values.id) {
        return { ...task, requestBody };
      }
      return task;
    });
    setTasks(newTasks);
    // window.location.reload();
  };

  const deleteTask = async (taskId: number) => {
    await TasksService.deleteById(taskId);
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  useEffect(() => {
    getTasks();
  }, []);

  if (error) {
    console.error(error);
    return (
      <RequestError errorDescription={error as string} reload={getTasks} />
    );
  }

  return (
    tasks.length > 0 && (
      <Box>
        {searchParams.get("create") === "true" ||
        searchParams.get("editObjective") ? (
          <ManagerChangeTaskForm
            onSubmitForm={
              searchParams.get("editObjective") ? editTask : addTask
            }
            type={searchParams.get("editObjective") ? "edit" : "create"}
            task={tasks.find(
              (task) => task.id === Number(searchParams.get("editObjective"))
            )}
          />
        ) : (
          <ManagerTasks
            onDelete={deleteTask}
            onCreate={(value) => setSearchParams(value)}
            additionalTasks={tasks}
          />
        )}
      </Box>
    )
  );
};

export default DesktopTasks;
