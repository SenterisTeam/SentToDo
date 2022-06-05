export type ValidationProblemDetails = {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  errors: { [field: string]: string[] };
};