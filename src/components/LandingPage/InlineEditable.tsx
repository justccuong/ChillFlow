import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Sparkles } from 'lucide-react';
import { FloatingAiToolbar } from './FloatingAiToolbar';

interface InlineEditableProps {
  value: string;
  onSave?: (newVal: string) => void;
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
  onSave = () => {},
  isEditMode,
  className = '',
  as: Component = 'span',
  multiline = false,
  placeholder = 'Nhấp để sửa...',
  category,
  useKineticText: _useKineticText = false, // Kinetic removed per user request
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

  const isBlock = ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'div'].includes(Component);
  const isCentered = className.includes('justify-center') || className.includes('text-center');
  const WrapperTag = isBlock ? 'div' : 'span';

  return (
    <WrapperTag
      className={`relative group/inline-edit ${isBlock ? 'block w-full' : 'inline-block max-w-full'} ${isCentered ? 'text-center mx-auto' : ''}`}
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

      {/* Editable Component with generous padding & refined focus ring */}
      <Component
        ref={elementRef as any}
        contentEditable
        suppressContentEditableWarning
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} outline-none transition-all ${
          isEditing
            ? 'ring-2 ring-indigo-500 rounded-lg px-2.5 py-1 bg-indigo-50/80 dark:bg-indigo-950/70 shadow-lg cursor-text'
            : 'outline-dashed outline-1 outline-indigo-500/40 hover:outline-2 hover:outline-indigo-500 rounded-lg px-2 py-0.5 bg-indigo-500/5 hover:bg-indigo-500/15 cursor-text'
        }`}
        data-placeholder={placeholder}
      >
        {currentText}
      </Component>

      {/* Hover visual cue when not actively editing */}
      {!isEditing && (
        <span className="opacity-0 group-hover/inline-edit:opacity-100 transition-opacity absolute -top-5.5 right-0 bg-indigo-600/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md pointer-events-none flex items-center gap-1 z-20 whitespace-nowrap backdrop-blur-sm">
          <Pencil className="w-2.5 h-2.5" />
          <span>Sửa chữ</span>
          <Sparkles className="w-2.5 h-2.5 text-amber-300" />
        </span>
      )}
    </WrapperTag>
  );
};
