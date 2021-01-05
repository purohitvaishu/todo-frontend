export interface State {
  bucketname?: string;
  title?: string;
  description?: string;
  completed?: boolean;
  open?: boolean;
  list?: Record<string, any>;
  edit?: boolean;
  id?: number;
}
