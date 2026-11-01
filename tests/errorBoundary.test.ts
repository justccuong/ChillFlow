import { describe, it, expect } from 'vitest';
import { ErrorBoundary } from '../src/components/common/ErrorBoundary';

describe('ErrorBoundary Resilience Logic (ErrorBoundary.tsx)', () => {
  it('updates state to hasError: true via getDerivedStateFromError', () => {
    const error = new Error('Chunk load failed');
    const nextState = ErrorBoundary.getDerivedStateFromError(error);
    expect(nextState.hasError).toBe(true);
    expect(nextState.error).toBe(error);
  });

  it('initializes with hasError: false and null error', () => {
    const boundary = new ErrorBoundary({ children: null });
    expect(boundary.state.hasError).toBe(false);
    expect(boundary.state.error).toBeNull();
  });

  it('resets error state when handleReset is called', () => {
    let resetCalled = false;
    const boundary = new ErrorBoundary({
      children: null,
      onReset: () => {
        resetCalled = true;
      },
    });

    // Mock setState for isolated unit test
    boundary.state = { hasError: true, error: new Error('Simulated failure') };
    boundary.setState = function (updater: any) {
      const next = typeof updater === 'function' ? updater(this.state) : updater;
      this.state = { ...this.state, ...next };
    };

    boundary.handleReset();
    expect(boundary.state.hasError).toBe(false);
    expect(boundary.state.error).toBeNull();
    expect(resetCalled).toBe(true);
  });
});
