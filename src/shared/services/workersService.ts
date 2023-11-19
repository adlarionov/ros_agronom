import axios from "axios";
import httpClient from "../api/httpClient";
import IWorker from "../interfaces/IWorker";

async function getWorkers(): Promise<IWorker[]> {
  return await httpClient.get(`/worker/get_all`);
}

async function getWorkersById(worker_id: number): Promise<IWorker> {
  return await httpClient.get(`/worker/get_by_id/${worker_id}`);
}

/**
 * Do not touch this endpoint
 */
async function deleteAllWorkers(): Promise<void> {
  return await axios.delete("http://94.139.254.148/worker/delete_all");
}

async function deleteById(worker_id: number): Promise<void> {
  return await axios.delete(
    `http://94.139.254.148/worker/delete_by_id/${worker_id}`
  );
}

interface IAddWorker {
  name: string;
  speciality: string[];
  lat: number;
  long: number;
  kpi: number;
}

async function addWorker(body: IAddWorker): Promise<{ status: string }> {
  const response = await fetch(`http://94.139.254.148/worker/add`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  console.log(response);
  return response.json();
}

async function updateWorker(body: IWorker): Promise<{ status: string }> {
  const response = await fetch(
    `http://94.139.254.148/worker/update_by_id/${body.id}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  return response.json();
}

const WorkersService = {
  getWorkers,
  getWorkersById,
  deleteAllWorkers,
  deleteById,
  addWorker,
  updateWorker,
};

export default WorkersService;
