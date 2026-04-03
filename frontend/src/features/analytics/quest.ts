export type SocialProvider = "google" | "facebook" | "github";
export type ActivityType = "login" | "aptitude" | "coding" | "puzzle" | "words" | "habits";
export type AuthProvider = "email" | SocialProvider;

export type QuestUser = {
  id: string;
  name: string;
  email: string;
  password?: string;
  provider: AuthProvider;
  avatarSeed: string;
  createdAt: string;
};

export type BackendSessionUser = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string | null;
};

export type QuestActivity = {
  id: string;
  date: string;
  timestamp: string;
  type: ActivityType;
  points: number;
  meta?: Record<string, unknown>;
};

export type AptitudeAttempt = {
  id: string;
  topic: string;
  level: string;
  score: number;
  total: number;
  completedAt: string;
};

export type QuestProgress = {
  totalPoints: number;
  activityLog: QuestActivity[];
  codingPlatforms: Record<string, boolean>;
  aptitudeAttempts: AptitudeAttempt[];
  completedPuzzles: string[];
  completedWords: string[];
  habitsByDate: Record<string, Record<string, boolean>>;
};

type QuestStore = {
  users: QuestUser[];
  progressByUser: Record<string, QuestProgress>;
  currentUserId: string | null;
};

const STORAGE_KEY = "learning_quest_store_v1";
export const AUTH_EVENT = "learning-quest-auth-changed";
export const QUEST_EVENT = "learning-quest-progress-changed";

const DEFAULT_HABITS = ["Bathing", "Fresh", "Study", "Food", "Clothing", "Timings", "Games"];

function todayKey(date = new Date()) {
  return date.toISOString().split("T")[0];
}

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function emit(eventName: string) {
  window.dispatchEvent(new Event(eventName));
}

function emptyProgress(): QuestProgress {
  return {
    totalPoints: 0,
    activityLog: [],
    codingPlatforms: {},
    aptitudeAttempts: [],
    completedPuzzles: [],
    completedWords: [],
    habitsByDate: {},
  };
}

function readStore(): QuestStore {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { users: [], progressByUser: {}, currentUserId: null };
    }
    const parsed = JSON.parse(raw) as QuestStore;
    return {
      users: parsed.users || [],
      progressByUser: parsed.progressByUser || {},
      currentUserId: parsed.currentUserId || null,
    };
  } catch {
    return { users: [], progressByUser: {}, currentUserId: null };
  }
}

function writeStore(store: QuestStore) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  emit(AUTH_EVENT);
  emit(QUEST_EVENT);
}

function getProgress(store: QuestStore, userId: string) {
  if (!store.progressByUser[userId]) {
    store.progressByUser[userId] = emptyProgress();
  }
  return store.progressByUser[userId];
}

function uniqueSortedDates(items: string[]) {
  return [...new Set(items)].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
}

function activityDates(progress: QuestProgress) {
  return uniqueSortedDates(progress.activityLog.map((entry) => entry.date));
}

function calculateStreaks(progress: QuestProgress) {
  const dates = activityDates(progress);
  if (!dates.length) {
    return { current: 0, longest: 0, lastActiveDate: null as string | null };
  }

  let longest = 1;
  let run = 1;
  for (let i = 1; i < dates.length; i += 1) {
    const prev = new Date(dates[i - 1]);
    const current = new Date(dates[i]);
    const diff = Math.round((current.getTime() - prev.getTime()) / 86400000);
    if (diff === 1) {
      run += 1;
      longest = Math.max(longest, run);
    } else {
      run = 1;
    }
  }

  let current = 0;
  let cursor = new Date();
  const dateSet = new Set(dates);
  while (dateSet.has(todayKey(cursor))) {
    current += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return {
    current,
    longest,
    lastActiveDate: dates[dates.length - 1] || null,
  };
}

function daysActiveLastWeek(progress: QuestProgress) {
  const dates = new Set(activityDates(progress));
  const result: { date: string; count: number }[] = [];
  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = todayKey(date);
    const count = progress.activityLog.filter((entry) => entry.date === key).length;
    result.push({ date: key, count });
  }
  return result.map((item) => ({ ...item, active: dates.has(item.date) }));
}

function lineProgress(progress: QuestProgress) {
  let cumulative = 0;
  return daysActiveLastWeek(progress).map((item) => {
    cumulative += item.count;
    return {
      date: item.date.slice(5),
      progress: cumulative,
    };
  });
}

function safeNameFromEmail(email: string) {
  return email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function seedUser(email: string, provider: QuestUser["provider"], name?: string): QuestUser {
  return {
    id: id("user"),
    email,
    name: name || safeNameFromEmail(email),
    provider,
    avatarSeed: email[0]?.toUpperCase() || "L",
    createdAt: new Date().toISOString(),
  };
}

function recordActivity(store: QuestStore, userId: string, type: ActivityType, points: number, meta?: Record<string, unknown>) {
  const progress = getProgress(store, userId);
  const entry: QuestActivity = {
    id: id("activity"),
    date: todayKey(),
    timestamp: new Date().toISOString(),
    type,
    points,
    meta,
  };
  progress.activityLog.unshift(entry);
  progress.totalPoints += points;
}

function ensureDailyLogin(store: QuestStore, userId: string) {
  const progress = getProgress(store, userId);
  const key = todayKey();
  const alreadyLogged = progress.activityLog.some((entry) => entry.type === "login" && entry.date === key);
  if (!alreadyLogged) {
    recordActivity(store, userId, "login", 15, { label: "Daily login" });
  }
}

function displayNameFromBackendUser(user: BackendSessionUser) {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return fullName || safeNameFromEmail(user.email);
}

export function syncBackendUserSession(user: BackendSessionUser, provider: AuthProvider = "email") {
  const store = readStore();
  const existing = store.users.find((entry) => entry.id === user.id || entry.email === user.email.toLowerCase());
  const previousId = existing?.id || null;
  const normalizedEmail = user.email.trim().toLowerCase();

  const syncedUser: QuestUser = {
    id: user.id,
    email: normalizedEmail,
    name: displayNameFromBackendUser(user),
    provider,
    avatarSeed: (user.firstName || normalizedEmail[0] || "L").slice(0, 1).toUpperCase(),
    createdAt: existing?.createdAt || new Date().toISOString(),
  };

  if (existing) {
    const index = store.users.findIndex((entry) => entry.id === existing.id);
    store.users[index] = { ...existing, ...syncedUser, password: existing.password };
  } else {
    store.users.push(syncedUser);
  }

  if (previousId && previousId !== user.id) {
    const previousProgress = store.progressByUser[previousId];
    if (previousProgress && !store.progressByUser[user.id]) {
      store.progressByUser[user.id] = previousProgress;
    }
    delete store.progressByUser[previousId];
  }

  store.currentUserId = user.id;
  ensureDailyLogin(store, user.id);
  writeStore(store);
  return syncedUser;
}

export function getCurrentUser() {
  const store = readStore();
  return store.users.find((user) => user.id === store.currentUserId) || null;
}

export function getCurrentProgress() {
  const store = readStore();
  if (!store.currentUserId) return null;
  return getProgress(store, store.currentUserId);
}

export function registerWithEmail(name: string, email: string, password: string) {
  const store = readStore();
  const normalizedEmail = email.trim().toLowerCase();
  if (store.users.some((user) => user.email === normalizedEmail)) {
    throw new Error("An account with this email already exists.");
  }

  const user = seedUser(normalizedEmail, "email", name);
  user.password = password;
  store.users.push(user);
  store.currentUserId = user.id;
  ensureDailyLogin(store, user.id);
  writeStore(store);
  return user;
}

export function loginWithEmail(email: string, password: string) {
  const store = readStore();
  const normalizedEmail = email.trim().toLowerCase();
  const user = store.users.find((entry) => entry.email === normalizedEmail && entry.provider === "email");
  if (!user || user.password !== password) {
    throw new Error("Invalid email or password.");
  }
  store.currentUserId = user.id;
  ensureDailyLogin(store, user.id);
  writeStore(store);
  return user;
}

export function loginWithSocial(provider: SocialProvider) {
  const store = readStore();
  const email = `${provider}@learningquest.app`;
  let user = store.users.find((entry) => entry.email === email);
  if (!user) {
    user = seedUser(email, provider, `${provider[0].toUpperCase()}${provider.slice(1)} Explorer`);
    store.users.push(user);
  }
  store.currentUserId = user.id;
  ensureDailyLogin(store, user.id);
  writeStore(store);
  return user;
}

export function logoutUser() {
  const store = readStore();
  store.currentUserId = null;
  writeStore(store);
}

export function syncDailyLogin() {
  const store = readStore();
  if (!store.currentUserId) return;
  ensureDailyLogin(store, store.currentUserId);
  writeStore(store);
}

export function markCodingPlatform(platform: string) {
  const store = readStore();
  if (!store.currentUserId) return;
  const progress = getProgress(store, store.currentUserId);
  if (!progress.codingPlatforms[platform]) {
    progress.codingPlatforms[platform] = true;
    recordActivity(store, store.currentUserId, "coding", 20, { platform });
    writeStore(store);
  }
}

export function markPuzzleComplete(puzzleId: string) {
  const store = readStore();
  if (!store.currentUserId) return;
  const progress = getProgress(store, store.currentUserId);
  const key = `${todayKey()}:${puzzleId}`;
  if (!progress.completedPuzzles.includes(key)) {
    progress.completedPuzzles.push(key);
    recordActivity(store, store.currentUserId, "puzzle", 30, { puzzleId });
    writeStore(store);
  }
}

export function markWordsComplete() {
  const store = readStore();
  if (!store.currentUserId) return;
  const progress = getProgress(store, store.currentUserId);
  const key = todayKey();
  if (!progress.completedWords.includes(key)) {
    progress.completedWords.push(key);
    recordActivity(store, store.currentUserId, "words", 18, { date: key });
    writeStore(store);
  }
}

export function saveHabits(habits: Record<string, boolean>) {
  const store = readStore();
  if (!store.currentUserId) return;
  const progress = getProgress(store, store.currentUserId);
  const key = todayKey();
  const hadCompleted = progress.habitsByDate[key] && Object.values(progress.habitsByDate[key]).every(Boolean);
  progress.habitsByDate[key] = habits;
  const nowCompleted = Object.values(habits).length > 0 && Object.values(habits).every(Boolean);
  if (nowCompleted && !hadCompleted) {
    recordActivity(store, store.currentUserId, "habits", 25, { completed: DEFAULT_HABITS.length });
  }
  writeStore(store);
}

export function markAptitudeComplete(attempt: Omit<AptitudeAttempt, "id" | "completedAt">) {
  const store = readStore();
  if (!store.currentUserId) return;
  const progress = getProgress(store, store.currentUserId);
  progress.aptitudeAttempts.unshift({
    ...attempt,
    id: id("attempt"),
    completedAt: new Date().toISOString(),
  });
  recordActivity(store, store.currentUserId, "aptitude", 10 + attempt.score * 5, {
    topic: attempt.topic,
    level: attempt.level,
    score: attempt.score,
    total: attempt.total,
  });
  writeStore(store);
}

export function getQuestSnapshot() {
  const user = getCurrentUser();
  if (!user) return null;

  const progress = getCurrentProgress() || emptyProgress();
  const streak = calculateStreaks(progress);
  const testsCompleted = progress.aptitudeAttempts.length;
  const codingActivity = Object.values(progress.codingPlatforms).filter(Boolean).length;
  const puzzlesSolved = progress.completedPuzzles.length;
  const habitsCompleted = Object.values(progress.habitsByDate[todayKey()] || {}).filter(Boolean).length;
  const wordsCompleted = progress.completedWords.includes(todayKey());
  const week = daysActiveLastWeek(progress);
  const testsByDay = week.map((item) => ({
    day: item.date.slice(5),
    tests: progress.activityLog.filter((entry) => entry.date === item.date && entry.type === "aptitude").length,
    coding: progress.activityLog.filter((entry) => entry.date === item.date && entry.type === "coding").length,
  }));
  const activityFeed = progress.activityLog.slice(0, 6);
  const missedDays = week.filter((entry) => !entry.active).length;
  const strongestScore = progress.aptitudeAttempts[0] ? Math.round((progress.aptitudeAttempts[0].score / progress.aptitudeAttempts[0].total) * 100) : 0;

  return {
    user,
    progress,
    stats: {
      totalPoints: progress.totalPoints,
      currentStreak: streak.current,
      longestStreak: streak.longest,
      lastActiveDate: streak.lastActiveDate,
      testsCompleted,
      codingActivity,
      puzzlesSolved,
      habitsCompleted,
      wordsCompleted,
      missedDays,
      strongestScore,
    },
    charts: {
      bars: testsByDay,
      line: lineProgress(progress),
      heatmap: progress.activityLog.map((entry) => ({ date: entry.date, count: 1, activityType: entry.type })),
    },
    activityFeed,
    defaults: {
      habits: DEFAULT_HABITS,
    },
  };
}
