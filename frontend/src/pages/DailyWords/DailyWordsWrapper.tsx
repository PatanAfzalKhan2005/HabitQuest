import React from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import DailyWordsPage from '@/pages/DailyWords/DailyWords';

export default function DailyWordsWrapper() {
  return (
    <ErrorBoundary>
      <DailyWordsPage />
    </ErrorBoundary>
  );
}
