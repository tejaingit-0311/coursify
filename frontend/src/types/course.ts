export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
  adminId?: string;
}

export interface CreateCourseData {
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
}