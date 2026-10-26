import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Sparkles } from 'lucide-react';
import { FloatingAiToolbar } from './FloatingAiToolbar';
import { KineticText } from '../magicui';

interface InlineEditableProps {
  value: string;
  onSave: (newVal: string) => void;
  isEditMode: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span' | 'div';
  multiline?: boolean;
  placeholder?: string;
  category?: string;
  useKineticText?: boolean;
}

export const InlineEditable: React.FC<InlineEditableProps> = ({
  value,
  onSave,
  isEditMode,
  className = '',
  as: Component = 'span',
  multiline = false,
  placeholder = 'Nhấp để sửa...',
  category,
  useKineticText = false,
}) => {
  const [currentText, setCurrentText] = useState(value);
  const [originalText, setOriginalText] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  // Synchronize when value changes externally while NOT actively editing
  useEffect(() => {
    if (!isEditing) {
      setCurrentText(value);
      setOriginalText(value);
    }
  }, [value, isEditing]);

  if (!isEditMode) {
    if (useKineticText) {
      return (
        <KineticText
          text={value}
          as={Component}
          className={className}
          baseWeight={800}
          hoverWeight={950}
        />
      );
    }
    return <Component className={className}>{value}</Component>;
  }

  const handleFocus = (e: React.FocusEvent) => {
    e.stopPropagation();
    if (!isEditing) {
      setOriginalText(currentText);
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    // Small delay to allow any pending click actions
    setTimeout(() => {
      setIsEditing(false);
      if (elementRef.current) {
        const newText = elementRef.current.innerText.trim();
        if (newText && newText !== value) {
          onSave(newText);
          setCurrentText(newText);
        } else {
          elementRef.current.innerText = value;
          setCurrentText(value);
        }
      }
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      elementRef.current?.blur();
    } else if (e.key === 'Escape') {
      if (elementRef.current) {
        elementRef.current.innerText = originalText;
      }
      setCurrentText(originalText);
      setIsEditing(false);
      elementRef.current?.blur();
    }
  };

  const handleApplyAiText = (newText: string) => {
    setCurrentText(newText);
    if (elementRef.current) {
      elementRef.current.innerText = newText;
      // Trigger subtle pulse animation on the DOM node
      elementRef.current.classList.add('animate-shimmer');
      setTimeout(() => {
        elementRef.current?.classList.remove('animate-shimmer');
      }, 1000);
    }
    onSave(newText);
  };

  const handleRestoreOriginal = () => {
    setCurrentText(originalText);
    if (elementRef.current) {
      elementRef.current.innerText = originalText;
    }
    onSave(originalText);
  };

  return (
    <span
      className={`relative group/inline-edit inline-block max-w-full ${className.includes('justify-center') || className.includes('text-center') ? 'text-center w-full' : ''}`}
      onClick={(e) => {
        // Prevent clicking parent button/link when in Visual CMS mode
        e.stopPropagation();
      }}
    >
      {/* Floating Mini-Toolbar with AI Rewrite */}
      {isEditing && (
        <FloatingAiToolbar
          currentText={currentText}
          originalText={originalText}
          onApplyText={handleApplyAiText}
          onRestoreOriginal={handleRestoreOriginal}
          onClose={() => {
            setIsEditing(false);
            elementRef.current?.blur();
          }}
          category={category}
        />
      )}

      {/* Editable Component */}
      <Component
        ref={elementRef as any}
        contentEditable
        suppressContentEditableWarning
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} outline-none transition-all ${
          isEditing
            ? 'ring-2 ring-indigo-500 rounded px-1.5 py-0.5 bg-indigo-50/70 dark:bg-indigo-950/60 shadow-lg cursor-text'
            : 'outline-dashed outline-1 outline-indigo-500/50 hover:outline-2 hover:outline-indigo-400 rounded px-1 py-0.5 bg-indigo-500/5 hover:bg-indigo-500/10 cursor-text'
        }`}
        data-placeholder={placeholder}
      >
        {currentText}
      </Component>

      {/* Hover visual cue when not actively editing */}
      {!isEditing && (
        <span className="opacity-0 group-hover/inline-edit:opacity-100 transition-opacity absolute -top-5 right-0 bg-indigo-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow pointer-events-none flex items-center gap-1 z-20 whitespace-nowrap backdrop-blur-sm">
          <Pencil className="w-2.5 h-2.5" />
          <span>Sửa chữ</span>
          <Sparkles className="w-2.5 h-2.5 text-amber-300" />
        </span>
      )}
    </span>
  );
};
