function toDayString(date) {
  return new Date(date).toISOString().split("T")[0];
}

export function calculateNextStreak(previousDate, currentStreak, nextDate = new Date()) {
  if (!previousDate) {
    return 1;
  }

  const previous = new Date(toDayString(previousDate));
  const current = new Date(toDayString(nextDate));
  const diffInDays = Math.floor((current - previous) / (1000 * 60 * 60 * 24));

  if (diffInDays <= 0) {
    return currentStreak || 1;
  }

  if (diffInDays === 1) {
    return (currentStreak || 0) + 1;
  }

  return 1;
}

export function mergeHeatmapEntry(activityLog, activityType, activityDate) {
  const nextLog = [...activityLog];
  const index = nextLog.findIndex(
    (entry) => entry.activityType === activityType && entry.activityDate === activityDate,
  );

  if (index === -1) {
    nextLog.push({ activityType, activityDate, count: 1 });
    return nextLog;
  }

  nextLog[index] = {
    ...nextLog[index],
    count: nextLog[index].count + 1,
  };

  return nextLog;
}
