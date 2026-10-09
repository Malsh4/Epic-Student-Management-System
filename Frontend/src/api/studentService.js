import api from "./api";

export const getStudents = () => api.get("/students").then((r) => r.data);
export const getStudent = (id) =>
  api.get(`/students/${id}`).then((r) => r.data);
export const createStudent = (student) =>
  api.post("/students", student).then((r) => r.data);
export const updateStudent = (id, student) =>
  api.put(`/students/${id}`, student).then((r) => r.data);
export const deleteStudent = (id) => api.delete(`/students/${id}`);
