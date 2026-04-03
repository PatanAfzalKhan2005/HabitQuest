// Additional aptitude questions imported from user-provided bank
// IDs prefixed with `u-` to avoid collisions
export const userQuestions = [
  // NUMBERS - SIMPLE
  { id: "u-num-s-1", topic: "numbers", level: "simple", question: "10 + 20 = ?", options: ["20","30","40","50"], correctAnswer: "30", explanation: "Add → 10 + 20 = 30" },
  { id: "u-num-s-2", topic: "numbers", level: "simple", question: "100 ÷ 10 = ?", options: ["5","10","20","50"], correctAnswer: "10", explanation: "100/10 = 10" },
  { id: "u-num-s-3", topic: "numbers", level: "simple", question: "Which is an even number?", options: ["3","5","8","9"], correctAnswer: "8", explanation: "Even → divisible by 2" },
  { id: "u-num-s-4", topic: "numbers", level: "simple", question: "7 × 5 = ?", options: ["30","35","40","45"], correctAnswer: "35", explanation: "7 × 5 = 35" },
  { id: "u-num-s-5", topic: "numbers", level: "simple", question: "Which is an odd number?", options: ["2","4","6","7"], correctAnswer: "7", explanation: "Odd numbers are not divisible by 2" },
  { id: "u-num-s-6", topic: "numbers", level: "simple", question: "50 − 20 = ?", options: ["10","20","30","40"], correctAnswer: "30", explanation: "50 − 20 = 30" },
  { id: "u-num-s-7", topic: "numbers", level: "simple", question: "Smallest number among 3,1,2,5?", options: ["3","1","2","5"], correctAnswer: "1", explanation: "1 is the smallest" },
  { id: "u-num-s-8", topic: "numbers", level: "simple", question: "9² = ?", options: ["18","27","81","72"], correctAnswer: "81", explanation: "9² = 81" },
  { id: "u-num-s-9", topic: "numbers", level: "simple", question: "1000 ÷ 100 = ?", options: ["1","5","10","100"], correctAnswer: "10", explanation: "1000/100 = 10" },
  { id: "u-num-s-10", topic: "numbers", level: "simple", question: "Which is a prime number?", options: ["4","6","7","8"], correctAnswer: "7", explanation: "7 is prime" },
  { id: "u-num-s-11", topic: "numbers", level: "simple", question: "6 + 4 × 2 = ? (BODMAS)", options: ["20","14","10","12"], correctAnswer: "14", explanation: "Multiplication first: 4×2=8; 6+8=14" },
  { id: "u-num-s-12", topic: "numbers", level: "simple", question: "15% of 100 = ?", options: ["10","15","20","25"], correctAnswer: "15", explanation: "15% of 100 = 15" },

  // NUMBERS - HARD
  { id: "u-num-h-1", topic: "numbers", level: "hard", question: "LCM of 4,6?", options: ["10","12","18","24"], correctAnswer: "12", explanation: "Multiples... first common is 12" },
  { id: "u-num-h-2", topic: "numbers", level: "hard", question: "HCF of 12,18?", options: ["2","3","6","9"], correctAnswer: "6", explanation: "Highest common factor is 6" },
  { id: "u-num-h-3", topic: "numbers", level: "hard", question: "2³ × 2² = ?", options: ["8","16","32","64"], correctAnswer: "32", explanation: "2³×2² = 2⁵ = 32" },
  { id: "u-num-h-4", topic: "numbers", level: "hard", question: "√144 = ?", options: ["10","11","12","13"], correctAnswer: "12", explanation: "√144 = 12" },
  { id: "u-num-h-5", topic: "numbers", level: "hard", question: "1/2 + 1/3 = ?", options: ["2/5","5/6","3/5","4/5"], correctAnswer: "5/6", explanation: "Common denom 6: 3/6+2/6=5/6" },
  { id: "u-num-h-6", topic: "numbers", level: "hard", question: "0.5 × 0.2 = ?", options: ["0.1","0.2","0.3","0.4"], correctAnswer: "0.1", explanation: "0.5×0.2=0.1" },
  { id: "u-num-h-7", topic: "numbers", level: "hard", question: "25% of 80 = ?", options: ["10","15","20","25"], correctAnswer: "20", explanation: "0.25×80 = 20" },
  { id: "u-num-h-8", topic: "numbers", level: "hard", question: "Cube of 3?", options: ["6","9","27","81"], correctAnswer: "27", explanation: "3³ = 27" },
  { id: "u-num-h-9", topic: "numbers", level: "hard", question: "Which is multiple of 3?", options: ["14","16","18","20"], correctAnswer: "18", explanation: "18 divisible by 3" },
  { id: "u-num-h-10", topic: "numbers", level: "hard", question: "100 ÷ 25 = ?", options: ["2","3","4","5"], correctAnswer: "4", explanation: "100/25=4" },
  { id: "u-num-h-11", topic: "numbers", level: "hard", question: "2/5 of 50?", options: ["10","20","30","40"], correctAnswer: "20", explanation: "0.4×50=20" },
  { id: "u-num-h-12", topic: "numbers", level: "hard", question: "7² − 3² = ?", options: ["40","30","20","10"], correctAnswer: "40", explanation: "49−9=40" },

  // NUMBERS - DIFFICULT
  { id: "u-num-d-1", topic: "numbers", level: "difficult", question: "LCM of 12,15,20?", options: ["30","60","120","240"], correctAnswer: "60", explanation: "LCM is 60" },
  { id: "u-num-d-2", topic: "numbers", level: "difficult", question: "HCF of 24,36,60?", options: ["6","12","18","24"], correctAnswer: "12", explanation: "HCF is 12" },
  { id: "u-num-d-3", topic: "numbers", level: "difficult", question: "(3² + 4²) = ?", options: ["25","49","16","20"], correctAnswer: "25", explanation: "9+16=25" },
  { id: "u-num-d-4", topic: "numbers", level: "difficult", question: "√(169 + 25) = ?", options: ["12","13","14","15"], correctAnswer: "14", explanation: "169+25=194; sqrt≈13.93→14" },
  { id: "u-num-d-5", topic: "numbers", level: "difficult", question: "1.2 × 3.5 = ?", options: ["4.2","3.2","5.2","6.2"], correctAnswer: "4.2", explanation: "1.2×3.5=4.2" },
  { id: "u-num-d-6", topic: "numbers", level: "difficult", question: "5³ = ?", options: ["25","100","125","150"], correctAnswer: "125", explanation: "5³ = 125" },
  { id: "u-num-d-7", topic: "numbers", level: "difficult", question: "2⁴ × 2³ = ?", options: ["64","128","256","512"], correctAnswer: "128", explanation: "2⁷ = 128" },
  { id: "u-num-d-8", topic: "numbers", level: "difficult", question: "√256 = ?", options: ["12","14","16","18"], correctAnswer: "16", explanation: "√256 = 16" },
  { id: "u-num-d-9", topic: "numbers", level: "difficult", question: "3/4 of 200?", options: ["100","120","150","180"], correctAnswer: "150", explanation: "0.75×200=150" },
  { id: "u-num-d-10", topic: "numbers", level: "difficult", question: "0.25 × 400 = ?", options: ["50","75","100","125"], correctAnswer: "100", explanation: "0.25×400=100" },
  { id: "u-num-d-11", topic: "numbers", level: "difficult", question: "15² = ?", options: ["200","210","225","250"], correctAnswer: "225", explanation: "15² = 225" },
  { id: "u-num-d-12", topic: "numbers", level: "difficult", question: "(8 × 9) − (6 × 5) = ?", options: ["42","48","36","30"], correctAnswer: "42", explanation: "72−30=42" },

  // PERCENTAGE - SIMPLE (sample)
  { id: "u-pct-s-1", topic: "percentage", level: "simple", question: "10% of 100 = ?", options: ["5","10","15","20"], correctAnswer: "10", explanation: "10% of 100 = 10" },
  { id: "u-pct-s-2", topic: "percentage", level: "simple", question: "50% of 200 = ?", options: ["50","100","150","200"], correctAnswer: "100", explanation: "50% of 200 = 100" },
  { id: "u-pct-s-3", topic: "percentage", level: "simple", question: "25% of 40 = ?", options: ["5","10","15","20"], correctAnswer: "10", explanation: "25% of 40 = 10" },
  { id: "u-pct-s-4", topic: "percentage", level: "simple", question: "100% means?", options: ["Half","Full","Zero","Double"], correctAnswer: "Full", explanation: "100% means whole / full" },
  { id: "u-pct-s-5", topic: "percentage", level: "simple", question: "20% of 50 = ?", options: ["5","10","15","20"], correctAnswer: "10", explanation: "20% of 50 = 10" },
  { id: "u-pct-s-6", topic: "percentage", level: "simple", question: "5% of 200 = ?", options: ["5","10","15","20"], correctAnswer: "10", explanation: "5% of 200 = 10" },
  { id: "u-pct-s-7", topic: "percentage", level: "simple", question: "75% of 100 = ?", options: ["50","75","80","90"], correctAnswer: "75", explanation: "75% of 100 = 75" },
  { id: "u-pct-s-8", topic: "percentage", level: "simple", question: "30% of 100 = ?", options: ["20","30","40","50"], correctAnswer: "30", explanation: "30% of 100 = 30" },
  { id: "u-pct-s-9", topic: "percentage", level: "simple", question: "1% of 100 = ?", options: ["1","2","5","10"], correctAnswer: "1", explanation: "1% of 100 = 1" },
  { id: "u-pct-s-10", topic: "percentage", level: "simple", question: "200 × 10% = ?", options: ["10","20","30","40"], correctAnswer: "20", explanation: "10% of 200 = 20" },
  { id: "u-pct-s-11", topic: "percentage", level: "simple", question: "60% of 50 = ?", options: ["20","25","30","35"], correctAnswer: "30", explanation: "60% of 50 = 30" },
  { id: "u-pct-s-12", topic: "percentage", level: "simple", question: "90% of 100 = ?", options: ["80","85","90","95"], correctAnswer: "90", explanation: "90% of 100 = 90" },

  // PROFIT & LOSS - SIMPLE (sample of provided list)
  { id: "u-pl-s-1", topic: "profit-and-loss", level: "simple", question: "CP=100, SP=120 → Profit?", options: ["10","20","30","40"], correctAnswer: "20", explanation: "Profit = SP-CP = 20" },
  { id: "u-pl-s-2", topic: "profit-and-loss", level: "simple", question: "CP=200, SP=150 → Loss?", options: ["40","50","60","70"], correctAnswer: "50", explanation: "Loss = 200-150 = 50" },
  { id: "u-pl-s-3", topic: "profit-and-loss", level: "simple", question: "Profit = SP − CP — True or False?", options: ["True","False","",""], correctAnswer: "True", explanation: "Profit = SP-CP" },
  { id: "u-pl-s-4", topic: "profit-and-loss", level: "simple", question: "CP=50, SP=50 → ?", options: ["Profit","Loss","No profit no loss",""], correctAnswer: "No profit no loss", explanation: "SP=CP → no profit no loss" },

  // AVERAGE - SIMPLE (sample)
  { id: "u-avg-s-1", topic: "average", level: "simple", question: "Average of 2,4,6?", options: ["3","4","5","6"], correctAnswer: "4", explanation: "(2+4+6)/3 = 4" },
  { id: "u-avg-s-2", topic: "average", level: "simple", question: "Avg of 10,20?", options: ["10","15","20","25"], correctAnswer: "15", explanation: "(10+20)/2 = 15" },
  { id: "u-avg-s-3", topic: "average", level: "simple", question: "Avg of 5 numbers is 10 → sum?", options: ["40","50","60","70"], correctAnswer: "50", explanation: "Average × count = sum → 10×5=50" },

  // RATIO & PROPORTION - SIMPLE (sample)
  { id: "u-rp-s-1", topic: "ratio-and-proportion", level: "simple", question: "2:4 = ?", options: ["1:2","2:1","4:1","3:2"], correctAnswer: "1:2", explanation: "Simplify 2:4 → 1:2" },
  { id: "u-rp-s-2", topic: "ratio-and-proportion", level: "simple", question: "3:6 = ?", options: ["1:2","2:3","3:2","4:3"], correctAnswer: "1:2", explanation: "3:6 simplifies to 1:2" },

  // MIXTURE & ALLIGATION - SIMPLE (sample)
  { id: "u-mix-s-1", topic: "mixture-and-alligation", level: "simple", question: "Mix 1L milk + 1L water → ratio?", options: ["1:1","2:1","1:2","3:1"], correctAnswer: "1:1", explanation: "Equal parts → 1:1" },

  // TIME & WORK - SIMPLE (sample)
  { id: "u-tw-s-1", topic: "time-and-work", level: "simple", question: "A can complete a work in 2 days. How much work in 1 day?", options: ["1","1/2","2","1/3"], correctAnswer: "1/2", explanation: "1/2 of the work per day" },

  // TIME SPEED DISTANCE - SIMPLE (sample)
  { id: "u-tsd-s-1", topic: "time-speed-distance", level: "simple", question: "Speed = 10 km/h, Time = 2 h → Distance?", options: ["10","15","20","25"], correctAnswer: "20", explanation: "Distance = Speed × Time = 10×2 = 20" },

  // PIPES & CISTERNS - DIFFICULT (one sample from end)
  { id: "u-pc-d-1", topic: "pipes-and-cisterns", level: "difficult", question: "A fills tank in 3h, B in 6h → together?", options: ["1 h","2 h","3 h","4 h"], correctAnswer: "2 h", explanation: "1/3+1/6=1/2 → 2 hours" },
];

export function getUserQuestions() {
  return userQuestions;
}
