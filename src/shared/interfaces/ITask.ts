export default interface ITask {
  id: number;
  place_name: string;
  type: string;
  lat: number;
  long: number;
  duration: number;
  priority: string;
  processing_area: number;
  start_time: string;
  finish_time: string;
  is_available: boolean;
  executor: string;
}

export interface ITaskStatus {
  planned: number;
  finished: number;
  not_finished: number;
}

export interface ITaskType {
  departure_to_the_point: number;
  training: number;
  delivery: number;
}
