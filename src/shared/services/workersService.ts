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
  return await axios.post("/worker/delete_all");
}

async function deleteById(worker_id: number): Promise<void> {
  return await axios.post(`/worker/delete_by_id/${worker_id}`);
}

async function addWorker(body: IWorker): Promise<void> {
  return await axios.post(`/worker/add`, { body: body });
}

async function updateWorker(body: IWorker): Promise<{ status: string }> {
  return await axios.put(`/worker/update_by_id/${body.id}`, { body: body });
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
