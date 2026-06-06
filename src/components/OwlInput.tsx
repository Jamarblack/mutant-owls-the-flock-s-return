import { forwardRef, InputHTMLAttributes, useId } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  onFocusElement?: (el: HTMLElement | null) => void;
}

export const OwlInput = forwardRef<HTMLInputElement, Props>(function OwlInput(
  {
    label,
    error,
    onFocusElement,
    onFocus,
    onBlur,
    disabled,
    required,
    className = "",
    id: idProp,
    ...rest
  },
  ref
) {
  const reactId = useId();
  const id = idProp ?? reactId;
  const errorId = `${id}-error`;
  const labelId = `${id}-label`;

  return (
    <div className="space-y-2">
      <label
        id={labelId}
        htmlFor={id}
        className={
          "block text-xs uppercase tracking-[0.3em] " +
          (disabled ? "text-muted-foreground/50" : "text-muted-foreground")
        }
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-[color:var(--ember)]">
            *
          </span>
        )}
      </label>
      <input
        ref={ref}
        id={id}
        disabled={disabled}
        required={required}
        aria-labelledby={labelId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        aria-disabled={disabled || undefined}
        onFocus={(e) => {
          // Only announce/perch on enabled inputs the user can actually edit
          if (!disabled) onFocusElement?.(e.currentTarget);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          onFocusElement?.(null);
          onBlur?.(e);
        }}
        className={
          "w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground/60 outline-none transition-all " +
          "focus-visible:border-[color:var(--ember)] focus-visible:shadow-[0_0_0_1px_var(--ember),0_0_24px_color-mix(in_oklab,var(--ember)_35%,transparent)] " +
          "disabled:cursor-not-allowed disabled:opacity-50 " +
          className
        }
        {...rest}
      />
      {error && (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
});
