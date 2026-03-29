import { useMutation, useQuery } from "@tanstack/react-query";
import API from "./api";

export type GetAptitudeQuestionsLevel = "simple" | "hard" | "difficult";
export type SubmitCodingBodyLanguage = "javascript" | "python" | "java";

export function useGetAptitudeTopics(options = {}) {
  return useQuery({
    queryKey: ["aptitude-topics"],
    queryFn: async () => (await API.get("/aptitude/topics")).data,
    ...(options.query || {}),
  });
}

export function useGetAptitudeQuestions(params, options = {}) {
  return useQuery({
    queryKey: ["aptitude-questions", params.topic, params.level],
    queryFn: async () => (await API.get("/aptitude/questions", { params })).data,
    enabled: Boolean(params.topic && params.level),
    ...(options.query || {}),
  });
}

export function useSubmitAptitudeQuiz() {
  return useMutation({
    mutationFn: async ({ data }) => (await API.post("/aptitude/submit", data)).data,
  });
}

export function useGetCodingTopics(options = {}) {
  return useQuery({
    queryKey: ["coding-topics"],
    queryFn: async () => (await API.get("/coding/topics")).data,
    ...(options.query || {}),
  });
}

export function useGetDailyProblem(options = {}) {
  return useQuery({
    queryKey: ["coding-daily"],
    queryFn: async () => (await API.get("/coding/daily")).data,
    ...(options.query || {}),
  });
}

export function useSubmitCodingProblem() {
  return useMutation({
    mutationFn: async ({ data }) => (await API.post("/coding/submit", data)).data,
  });
}

export function useGetUserProfile(options = {}) {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => (await API.get("/user/profile")).data,
    ...(options.query || {}),
  });
}

export function useGetLeaderboard(options = {}) {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => (await API.get("/user/leaderboard")).data,
    ...(options.query || {}),
  });
}

export function useRedeemReward() {
  return useMutation({
    mutationFn: async ({ data }) => (await API.post("/user/redeem", data)).data,
  });
}
