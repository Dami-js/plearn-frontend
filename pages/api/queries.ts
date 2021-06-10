import axios, { AxiosRequestConfig } from "axios";
import { StudentDetails, TutorDetails } from "components/RegistrationForm";
import FormData from "form-data";
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

export const createCourse = async (values) => {
  const url = `${NEXT_PUBLIC_API_URL}/feeds`;
  const data = new FormData();

  data.append("title", values.title);
  data.append("course", values.course);
  data.append("learningStyle", values.learningStyle);
  data.append("level", values.level);
  data.append("courseCode", values.courseCode);
  data.append("unit", values.courseUnit);
  data.append("content", values.content);
  data.append("createdBy", values.createdBy);
  data.append("thumbnail", values.thumbnail, values.thumbnail.name);
  data.append("material", values.material, values.material.name);

  try {
    const response = await axios({
      method: "POST",
      url,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

export interface GetFeedsQuery {
  q?: string;
  learningStyle?: string;
  page?: number;
}

export const getFeeds = async ({ queryKey }) => {
  const [_key, { q, page = 1, learningStyle }]: [string, GetFeedsQuery] =
    queryKey;
  const url = q
    ? `${NEXT_PUBLIC_API_URL}/feeds?q=${q}&page=${page}`
    : learningStyle
    ? `${NEXT_PUBLIC_API_URL}/feeds?learningStyle=${learningStyle}&page=${page}`
    : `${NEXT_PUBLIC_API_URL}/feeds?&page=${page}`;

  try {
    const response = await axios({
      method: "GET",
      headers: {},
      url,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFeed = async ({ queryKey }) => {
  const [_key, { title }]: [string, { title: string }] = queryKey;
  const url = `${NEXT_PUBLIC_API_URL}/feeds/${title}`;

  try {
    const response = await axios({
      method: "GET",
      headers: {},
      url,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
