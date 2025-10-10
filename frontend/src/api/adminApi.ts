import { LoginCredentials, SignupCredentials } from "../types/auth";
import { CreateCourseData } from "../types/course";
import axiosInstance from "../utils/axiosInstance";

export const adminSignup = (data: SignupCredentials) => axiosInstance.post("/admins/signup", data);
export const adminSignin = (params: LoginCredentials) => axiosInstance.post("/admins/signin", null, { params });
export const addCourse = (data: CreateCourseData) => axiosInstance.post("/admins/courses", data);
export const getAllAdminCourses = () => axiosInstance.get("/admins/courses");
export const updateCourse = (id: string, data: CreateCourseData) => axiosInstance.put(`/admins/courses/${id}`, data);
export const deleteCourse = (id: string) => axiosInstance.delete(`/admins/courses/${id}`);
export const adminSignout = () => axiosInstance.post(`/admins/signout`);