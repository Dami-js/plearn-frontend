export interface Feed {
  title: string;
  image: string;
  author: Author;
  learningStyle: string;
}

export interface User {
  id: string;
  surname: string;
  firstname: string;
  othernames: string;
  email: string;
}

export interface Author extends User {
  title: string;
  coursesCreated: Array<Course>;
}

export interface Learner extends User {
  learningStyle: string;
}

export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  intro: string;
  description: string;
  learningStyle: string;
  createdBy: Author;
  createdAt: string;
  objectives: Array<string>;
  requirements: Array<string>;
  files: any;
}
