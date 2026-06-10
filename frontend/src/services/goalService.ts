import axios from "axios";

const API = "http://localhost:5000/api/goals";

export const createGoal = async (goal: any) => {
  const response = await axios.post(API, goal);
  return response.data;
};

export const getGoals = async (userId: number) => {
  const response = await axios.get(`${API}/${userId}`);
  return response.data;
};