import React, { useState, useEffect } from 'react';
import { useRoute, useLocation, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetAptitudeQuestions, useSubmitAptitudeQuiz, GetAptitudeQuestionsLevel } from '@workspace/api-client-react';
import { useConfetti } from '@/hooks/use-confetti';
import { ChevronRight, CheckCircle2, XCircle, Trophy, ArrowLeft } from 'lucide-react';

export function AptitudeQuiz() {
  const [match, params] = useRoute('/aptitude/:topic/:level');
  const [, setLocation] = useLocation();
  const { triggerSuccess, triggerSmall } = useConfetti();

  const topicId = params?.topic || '';
  const levelStr = params?.level || 'simple';
  
  // Validate level param against Enum
  const level = (['simple', 'hard', 'difficult'].includes(levelStr) 
    ? levelStr 
    : 'simple') as GetAptitudeQuestionsLevel;

  const { data, isLoading } = useGetAptitudeQuestions({ topic: topicId, level }, {
    query: { retry: false }
  });

  const { mutateAsync: submitQuiz, isPending: isSubmitting } = useSubmitAptitudeQuiz();

  // Local State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  // Fallback data if missing API
  const questions = data?.questions || [
    { id: 'q1', question: 'What is 15% of 200?', options: ['20', '30', '40', '50'], correctAnswer: '30', explanation: '15/100 * 200 = 30', topic: topicId, level },
    { id: 'q2', question: 'If x + 5 = 12, what is x?', options: ['5', '6', '7', '8'], correctAnswer: '7', explanation: 'x = 12 - 5 = 7', topic: topicId, level },
  ];

  const currentQ = questions[currentIndex];
  const isLastQ = currentIndex === questions.length - 1;
  const hasAnsweredCurrent = !!answers[currentQ?.id];
  const selectedCurrent = answers[currentQ?.id];
  const isCorrect = selectedCurrent === currentQ?.correctAnswer;

  const handleSelect = (option: string) => {
    if (hasAnsweredCurrent) return;
    
    setAnswers(prev => ({ ...prev, [currentQ.id]: option }));
    setShowExplanation(true);
    
    if (option === currentQ.correctAnswer) {
      triggerSmall();
    }
  };

  const handleNext = () => {
    if (!isLastQ) {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    try {
      const payload = {
        topic: topicId,
        level,
        answers: Object.entries(answers).map(([questionId, selectedAnswer]) => ({
          questionId, selectedAnswer
        }))
      };
      
      const res = await submitQuiz({ data: payload });
      setResultData(res);
      setQuizFinished(true);
      if (res.score / res.total >= 0.8) triggerSuccess();
    } catch (err) {
      // Fallback if API fails
      const score = Object.keys(answers).filter(id => 
        answers[id] === questions.find(q => q.id === id)?.correctAnswer
      ).length;
      
      setResultData({
        score,
        total: questions.length,
        pointsEarned: score * 10 + 50,
        streakBonus: true,
        message: score > questions.length / 2 ? "Great job!" : "Keep practicing!"
      });
      setQuizFinished(true);
      if (score / questions.length >= 0.8) triggerSuccess();
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading quiz...</div>;
  if (!questions.length) return <div className="p-10 text-center">No questions found.</div>;

  if (quizFinished && resultData) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card border border-border p-10 rounded-3xl max-w-md w-full text-center shadow-2xl shadow-primary/10"
        >
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
            <Trophy size={40} />
          </div>
          <h2 className="text-3xl font-display font-bold mb-2">Quiz Complete!</h2>
          <p className="text-muted-foreground mb-8">{resultData.message}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-secondary">
              <p className="text-sm text-muted-foreground mb-1">Score</p>
              <p className="text-2xl font-bold text-foreground">{resultData.score}/{resultData.total}</p>
            </div>
            <div className="p-4 rounded-2xl bg-secondary">
              <p className="text-sm text-muted-foreground mb-1">Points Earned</p>
              <p className="text-2xl font-bold text-primary">+{resultData.pointsEarned}</p>
            </div>
          </div>

          {resultData.streakBonus && (
            <div className="mb-8 p-3 bg-accent/10 border border-accent/30 rounded-xl text-accent font-medium flex items-center justify-center gap-2">
              <Flame size={18} /> Streak Bonus Applied!
            </div>
          )}

          <div className="flex gap-4">
            <button 
              onClick={() => setLocation('/aptitude')}
              className="flex-1 py-3 rounded-xl bg-secondary text-foreground font-bold hover:bg-muted transition-colors cursor-pointer"
            >
              Back to Topics
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full p-6 md:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/aptitude" className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
          <ArrowLeft size={20} /> Exit Quiz
        </Link>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-secondary rounded-full text-xs font-bold capitalize">{topicId}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
            level === 'hard' ? 'bg-destructive/20 text-destructive' : 
            level === 'simple' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
          }`}>
            {level}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-10">
        <div className="flex justify-between text-sm font-bold text-muted-foreground mb-3">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(((currentIndex) / questions.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-card border border-border rounded-3xl p-8 mb-6 shadow-lg shadow-black/20">
            <h2 className="text-2xl md:text-3xl font-display font-medium leading-tight mb-8">
              {currentQ.question}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQ.options.map((opt, i) => {
                const isSelected = selectedCurrent === opt;
                const isOptionCorrect = opt === currentQ.correctAnswer;
                
                let btnStyle = "bg-secondary text-foreground hover:bg-muted border-transparent";
                let Icon = null;

                if (hasAnsweredCurrent) {
                  if (isOptionCorrect) {
                    btnStyle = "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(34,197,94,0.1)]";
                    Icon = CheckCircle2;
                  } else if (isSelected && !isOptionCorrect) {
                    btnStyle = "bg-destructive/20 border-destructive text-destructive";
                    Icon = XCircle;
                  } else {
                    btnStyle = "bg-secondary/50 text-muted-foreground opacity-50 border-transparent";
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt)}
                    disabled={hasAnsweredCurrent}
                    className={`
                      w-full p-4 rounded-2xl border-2 text-left font-medium text-lg flex items-center justify-between transition-all duration-200
                      ${btnStyle}
                      ${!hasAnsweredCurrent ? 'cursor-pointer hover:border-primary/50 hover:-translate-y-0.5' : 'cursor-default'}
                    `}
                  >
                    <span>{opt}</span>
                    {Icon && <Icon size={20} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation & Next */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                className="overflow-hidden"
              >
                <div className={`p-6 rounded-2xl border ${isCorrect ? 'bg-primary/5 border-primary/20' : 'bg-destructive/5 border-destructive/20'} flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between`}>
                  <div className="flex-1">
                    <p className={`font-bold mb-1 ${isCorrect ? 'text-primary' : 'text-destructive'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </p>
                    <p className="text-muted-foreground">{currentQ.explanation}</p>
                  </div>
                  <button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className={`
                      px-8 py-3 rounded-xl font-bold flex items-center gap-2 shrink-0 cursor-pointer
                      ${isCorrect ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-foreground text-background hover:bg-foreground/90'}
                    `}
                  >
                    {isSubmitting ? 'Finishing...' : (isLastQ ? 'Finish Quiz' : 'Next Question')}
                    {!isSubmitting && <ChevronRight size={20} />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Need this to avoid TS error above
import { Flame } from 'lucide-react';
