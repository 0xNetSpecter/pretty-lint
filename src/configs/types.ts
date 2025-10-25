interface BaseField<T> {
  type: "boolean" | "number" | "string" | "select";
  default: T;
  description?: string;
}

interface SelectField extends BaseField<string> {
  type: "select";
  options: string[];
}

type ConfigField =
  | BaseField<boolean>
  | BaseField<number>
  | BaseField<string>
  | SelectField;

export type ConfigSchema = Record<string, ConfigField>;
