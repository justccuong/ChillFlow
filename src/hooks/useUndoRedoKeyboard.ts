import { useEffect } from 'react';
import { useLandingPageStore } from '../store/useLandingPageStore';

export function useUndoRedoKeyboard() {
  const undo = useLandingPageStore((s) => s.undo);
  const redo = useLandingPageStore((s) => s.redo);
  const canUndo = useLandingPageStore((s) => s.history.length > 0);
  const canRedo = useLandingPageStore((s) => s.future.length > 0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if inside an input or textarea with active focus
      const target = e.target as HTMLElement | null;
      const isInput = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA';
      
      // Check for Ctrl+Z or Cmd+Z
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          // Ctrl+Shift+Z => Redo
          if (canRedo && !isInput) {
            e.preventDefault();
            redo();
          }
        } else {
          // Ctrl+Z => Undo
          if (canUndo && !isInput) {
            e.preventDefault();
            undo();
          }
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        // Ctrl+Y => Redo
        if (canRedo && !isInput) {
          e.preventDefault();
          redo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, canUndo, canRedo]);

  return { canUndo, canRedo, undo, redo };
}
