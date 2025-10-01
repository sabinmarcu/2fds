export type Validator<T extends string | number | boolean = string> = (
  (input: T) => string | undefined
);

export const validate = <T extends string | number | boolean>(
  validators: Validator<T>[],
  input: T,
) => (
    validators.map((validator) => validator(input))
      .filter(Boolean)
  );
