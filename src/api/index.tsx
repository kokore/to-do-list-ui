import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

interface GetParams {
  orderType?: string;
  orderBy?: string;
  search?: string;
}

// interface HTTPTodo {
//   code: number;
//   message: string;
//   data: Todo[];
//   statusCode: number;
// }

export const fetchTodolist = async (data: GetParams) => {
  const url = `${API_BASE_URL}/to-do-list?orderType=${data?.orderType}&orderBy=${data?.orderBy}&search=${data?.search}`;
  return axios
    .get(url)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
