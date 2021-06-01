import axios, { AxiosRequestConfig } from "axios";
import { StudentDetails, TutorDetails } from "components/RegistrationForm";
import { NEXT_PUBLIC_API_URL } from "utils/constants";

export const fetchTodos = async (args) => {
  console.log(args);

  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

interface CreatePostVariables {
  title: string;
  body: string;
  userId: number;
}

export const createPost = async (variables: CreatePostVariables) => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const h = {
    "Content-type": "application/json; charset=UTF-8",
  };
  try {
    const response = await axios({
      method: "post",
      url,
      data: { ...variables },
      headers: { ...h },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const registerUser = async (values: StudentDetails | TutorDetails) => {
  const h = {
    "Content-type": "application/json; charset=UTF-8",
  };
  const url = values.isStudent
    ? `${NEXT_PUBLIC_API_URL}/users/register/student`
    : `${NEXT_PUBLIC_API_URL}/users/register/tutor`;
  try {
    const response = await axios({
      method: "POST",
      url,
      data: { ...values },
      headers: { ...h },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export interface QuestionnaireBody {
  answers: Array<string>;
  token: any;
}

export const determineLearningStyle = async (values: QuestionnaireBody) => {
  const h = {
    "Content-type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${values.token}`,
  };
  const url = `${NEXT_PUBLIC_API_URL}/users/learning-style`;
  try {
    const response = await axios({
      method: "POST",
      url,
      data: { answers: [...values.answers] },
      headers: { ...h },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const myProfile = async ({ queryKey }) => {
  const [_key, { token }] = queryKey;
  console.log(token);
  try {
    const response = await axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${NEXT_PUBLIC_API_URL}/users/profile`,
    });
    return response.data.data;
  } catch (error) {
    throw new Error(error);
  }
};
