export function calculateAptitudePoints(score, total, streak) {
  let pointsEarned = score * 10;
  let streakBonus = false;

  if (score === total) {
    pointsEarned += 50;
  }

  if (streak > 0 && streak % 7 === 0) {
    pointsEarned += 100;
    streakBonus = true;
  }

  return { pointsEarned, streakBonus };
}

export function calculateCodingPoints(passed) {
  return passed ? 20 : 0;
}
