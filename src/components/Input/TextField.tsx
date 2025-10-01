import { nanoid } from 'nanoid';
import {
  useMemo,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import {
  textFieldStyle,
  textFieldLabelStyle,
  textFieldContainerStyle,
  textFieldInputStyle,
  textFieldErrorsContainer,
  textFieldError,
  textFieldErrorIcon,
} from './TextField.css';
import {
  validate,
  type Validator,
} from './TextField.validation';
import { requiredValidator } from './TextField.constants';

export namespace TextField {
  export type Props<T extends string | number | boolean> = (
    & InputHTMLAttributes<HTMLInputElement>
    & {
      value?: T,
      label?: string,
      slotLeft?: ReactNode,
      slotRight?: ReactNode,
      validators?: Validator<T>[]
    }
  );
}

export function TextField<T extends string | number | boolean>({
  label,
  className,
  slotLeft,
  slotRight,
  validators = [],
  value,
  required,
  ...props
}: TextField.Props<T>) {
  const id = useMemo(() => nanoid(), []);
  const withRequiredValidators = useMemo(
    () => (required
      ? [...validators, requiredValidator]
      : validators
    ),
    [validators]
  )
  const validateInput = useMemo(
    () => (withRequiredValidators.length > 0
      ? (input: T) => validate(withRequiredValidators as any, input)
      : () => []),
    [withRequiredValidators],
  );
  const errors = useMemo(
    () => validateInput(value as any),
    [validateInput, value],
  );
  const errorsId = useMemo(
    () => `${id}-errors`,
    [id],
  );

  return (
    <div className={[
      textFieldStyle,
      className,
    ].filter(Boolean).join(' ')}>
      <label htmlFor={id} className={textFieldLabelStyle}>{label}</label>
      <label className={textFieldContainerStyle}>
        {slotLeft || null}
        <input
          {...props}
          id={id}
          className={textFieldInputStyle}
          value={value}
          {...required
            ? {
              required: true,
              'aria-required': true,
            }
            : {}
          }
          {...errors.length > 0
            ? {
              'aria-invalid': true,
              'aria-errormessage': errorsId,
            }
            : {}
          }
        />
        {slotRight || null}
      </label>
      {errors.length > 0
        ? (
          <div id={errorsId} className={textFieldErrorsContainer}>
            {errors.map((error) => (
              <span key={error} className={textFieldError}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={textFieldErrorIcon}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.99998 1.73751C4.5413 1.73751 1.73748 4.54133 1.73748 8.00001C1.73748 11.4587 4.5413 14.2625 7.99998 14.2625C11.4587 14.2625 14.2625 11.4587 14.2625 8.00001C14.2625 4.54133 11.4587 1.73751 7.99998 1.73751ZM0.762482 8.00001C0.762482 4.00285 4.00282 0.762512 7.99998 0.762512C11.9971 0.762512 15.2375 4.00285 15.2375 8.00001C15.2375 11.9972 11.9971 15.2375 7.99998 15.2375C4.00282 15.2375 0.762482 11.9972 0.762482 8.00001Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.99998 3.76251C8.26922 3.76251 8.48748 3.98077 8.48748 4.25001V8.75001C8.48748 9.01925 8.26922 9.23751 7.99998 9.23751C7.73074 9.23751 7.51248 9.01925 7.51248 8.75001V4.25001C7.51248 3.98077 7.73074 3.76251 7.99998 3.76251Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.56248 11.1875C8.56248 11.4982 8.31064 11.75 7.99998 11.75C7.68932 11.75 7.43748 11.4982 7.43748 11.1875C7.43748 10.8769 7.68932 10.625 7.99998 10.625C8.31064 10.625 8.56248 10.8769 8.56248 11.1875Z" fill="currentColor"/>
                </svg>
                <span>{error}</span>
              </span>
            ))}
          </div>
        )
        : null
      }
    </div>
  );
}
