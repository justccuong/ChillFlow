import React, { useState, useRef, useEffect } from 'react';
import { Pencil } from 'lucide-react';

interface InlineEditableProps {
  value: string;
  onSave: (newVal: string) => void;
  isEditMode: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span' | 'div';
  multiline?: boolean;
  placeholder?: string;
}

export const InlineEditable: React.FC<InlineEditableProps> = ({
  value,
  onSave,
  isEditMode,
  className = '',
  as: Component = 'span',
  multiline = false,
  placeholder = 'Nhấp để sửa...',
}) => {
  const [currentText, setCurrentText] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setCurrentText(value);
  }, [value]);

  if (!isEditMode) {
    return <Component className={className}>{value}</Component>;
  }

  const handleBlur = () => {
    setIsEditing(false);
    if (elementRef.current) {
      const newText = elementRef.current.innerText.trim();
      if (newText && newText !== value) {
        onSave(newText);
        setCurrentText(newText);
      } else {
        elementRef.current.innerText = value;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      elementRef.current?.blur();
    } else if (e.key === 'Escape') {
      if (elementRef.current) {
        elementRef.current.innerText = value;
      }
      setIsEditing(false);
      elementRef.current?.blur();
    }
  };

  return (
    <span className="relative group/inline-edit inline-block">
      <Component
        ref={elementRef as any}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setIsEditing(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} outline-none transition-all ${
          isEditing
            ? 'ring-2 ring-indigo-500 rounded px-1 bg-indigo-50/50 dark:bg-indigo-950/40'
            : 'hover:outline hover:outline-dashed hover:outline-2 hover:outline-indigo-500/70 hover:rounded px-0.5 cursor-text'
        }`}
        data-placeholder={placeholder}
      >
        {currentText}
      </Component>
      {!isEditing && (
        <span className="opacity-0 group-hover/inline-edit:opacity-100 transition-opacity absolute -top-5 right-0 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow pointer-events-none flex items-center gap-1 z-20 whitespace-nowrap">
          <Pencil className="w-2.5 h-2.5" />
          <span>Sửa</span>
        </span>
      )}
    </span>
  );
};
