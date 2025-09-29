import type {
  ButtonHTMLAttributes,
  PropsWithChildren,
} from 'react';
import {
  buttonStyles,
  type ButtonStylesProps,
} from './Button.css.ts';

export namespace Button {
  export type Props = PropsWithChildren<
    & ButtonStylesProps
    & ButtonHTMLAttributes<HTMLButtonElement>
    & {}
  >;
}

function Button({
  children,
  className,
  variant,
  ...props
}: Button.Props) {
  return (
    <button
      {...props}
      className={[buttonStyles({ variant }), className].filter(Boolean).join(' ')}
    >
      {children}
    </button>
  );
}

export default Button;
