export interface ActionCall {
  callPopup?(params: Record<string, any>, open: boolean, edit: boolean): void;
  createTodo?(params: Record<string, any>): void;
  getTodo?(): void;
  editTodo?(params: Record<string, any>, id: number): void;
  deleteTodo?(id: number): void;
}
