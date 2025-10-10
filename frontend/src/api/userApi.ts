import { LoginCredentials, SignupCredentials } from "../types/auth";
import axiosInstance from '../utils/axiosInstance';

export const userSignup = (data: SignupCredentials) => axiosInstance.post("/users/signup", data);
export const userSignin = (params: LoginCredentials) => axiosInstance.post("/users/signin", null, { params });
export const getAllCourses = () => axiosInstance.get("/users/courses");
export const purchaseCourse = (id: string) => axiosInstance.post(`/users/courses/${id}`);
export const getPurchasedCourses = () => axiosInstance.get("/users/courses/purchasedCourses");
export const userSignout = () => axiosInstance.post("/users/signout");