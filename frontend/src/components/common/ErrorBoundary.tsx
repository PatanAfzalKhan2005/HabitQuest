import React from 'react';

type Props = { children: React.ReactNode };

type State = { hasError: boolean; message?: string };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, message: error?.message || String(error) };
  }

  componentDidCatch(error: any, info: any) {
    // Log to console for now — could post to monitoring
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 max-w-3xl mx-auto">
          <h2 className="text-lg font-bold text-foreground">Something went wrong</h2>
          <p className="text-sm text-muted-foreground mt-2">{this.state.message || 'An unexpected error occurred while loading this section.'}</p>
        </div>
      );
    }
    return this.props.children as JSX.Element;
  }
}

export default ErrorBoundary;
