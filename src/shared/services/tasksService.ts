import httpClient from "../api/httpClient";
import ITask from "../interfaces/ITask";

async function getTasks(): Promise<ITask[]> {
  return await httpClient.get(`/tasks/get_all`);
}

// nonactive start_time, finish_time, is_available, executor (также не писать в json)

async function getTaskById(task_id: number): Promise<ITask[]> {
  return await httpClient.get(`/tasks/get_by_id/${task_id}`);
}

const TasksService = {
  getTasks,
  getTaskById
};

export default TasksService;
