import axios from "axios";
import { Todo } from "../todolist/types";

const API_BASE_URL = "http://localhost:3000/api/v1";

interface GetParams {
  orderType?: string;
  orderBy?: string;
  search?: string;
}

interface PostBody {
  title: string;
  description: string;
  image: string;
  status: string;
}

interface UpdateParams {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  status?: string;
}

export const fetchTodolist = async (data: GetParams): Promise<Todo[]> => {
  const url = `${API_BASE_URL}/to-do-list?orderType=${data?.orderType}&orderBy=${data?.orderBy}&search=${data?.search}`;
  return axios
    .get(url)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const saveTodolist = async (data: PostBody): Promise<void> => {
  const url = `${API_BASE_URL}/to-do-list`;
  return axios
    .post(url, data)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateTodolist = async (data: UpdateParams): Promise<void> => {
  const url = `${API_BASE_URL}/to-do-list/${data.id}`;
  return axios
    .put(url, data)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
