import { forwardRef, InputHTMLAttributes, useId } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  onFocusElement?: (el: HTMLElement | null) => void;
}

export const OwlInput = forwardRef<HTMLInputElement, Props>(function OwlInput(
  { label, error, onFocusElement, onFocus, onBlur, className = "", ...rest },
  ref
) {
  const id = useId();
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        onFocus={(e) => {
          onFocusElement?.(e.currentTarget);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          onFocusElement?.(null);
          onBlur?.(e);
        }}
        className={
          "w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-[color:var(--ember)] focus:shadow-[0_0_0_1px_var(--ember),0_0_24px_color-mix(in_oklab,var(--ember)_35%,transparent)] " +
          className
        }
        {...rest}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
});
