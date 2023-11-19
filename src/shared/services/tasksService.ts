import httpClient from "../api/httpClient";
import ITask, { IAddTask } from "../interfaces/ITask";

async function getTasks(): Promise<ITask[]> {
  const response = await fetch(`http://94.139.254.148/tasks/get_all`, {
    method: "GET",
  });
  return response.json();
}

// nonactive start_time, finish_time, is_available, executor (также не писать в json)

async function getTaskById(task_id: number): Promise<ITask[]> {
  return await httpClient.get(`/tasks/get_by_id/${task_id}`);
}

async function deleteById(task_id: number): Promise<{ status: string }> {
  const response = await fetch(
    `http://94.139.254.148/tasks/delete_by_id/${task_id}`,
    {
      method: "DELETE",
    }
  );

  return response.json();
}

async function updateById(
  values: IAddTask,
  taskId: number
): Promise<{ status: string }> {
  const response = await fetch(
    `http://94.139.254.148/tasks/update_by_id/${taskId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );

  return response.json();
}

async function addTask(values: IAddTask): Promise<{ status: string }> {
  const response = await fetch(`http://94.139.254.148/tasks/add`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return response.json();
}

const TasksService = {
  getTasks,
  getTaskById,
  deleteById,
  updateById,
  addTask,
};

export default TasksService;
