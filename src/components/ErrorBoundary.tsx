/**
 * ErrorBoundary — catches render/lifecycle errors anywhere below it.
 * Without one, React unmounts the whole tree on an uncaught error, which looks
 * like a blank page. This shows the message instead (and logs the stack to the
 * console), so a crash is visible and diagnosable. Keep it in production too.
 */
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface State { error: Error | null }

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[PowerGlide] Uncaught render error:', error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <div role="alert" style={{ maxWidth: 720, margin: '10vh auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ fontSize: 28, margin: '0 0 12px' }}>Something went wrong.</h1>
        <p style={{ margin: '0 0 16px' }}>Please refresh the page. If it keeps happening, contact PowerGlide directly.</p>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#f3efe9', padding: 16, borderRadius: 10, fontSize: 13 }}>
          {error.name}: {error.message}
        </pre>
        <a href="/">Back to home</a>
      </div>
    );
  }
}
