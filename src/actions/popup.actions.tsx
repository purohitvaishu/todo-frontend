import { CALL_API } from "./api.actions";

export const ADD_LIST_POPUP = "actions/popup/APP_LIST_POPUP";
export const EDIT_LIST_POPUP = "action/popup/EDIT_LIST_POPUP";
export const DELETE_LIST_POPUP = "action/popup/DELETE_LIST_POPUP";

export const GET_LIST_REQUEST = "actions/popup/GET_LIST_REQUEST";
export const GET_LIST_SUCCESS = "actions/popup/GET_LIST_SUCCESS";
export const GET_LIST_FAILED = "actions/popup/GET_LIST_FAILED";

export const ADD_LIST_REQUEST = "actions/popup/ADD_LIST_REQUEST";
export const ADD_LIST_SUCCESS = "actions/popup/ADD_LIST_SUCCESS";
export const ADD_LIST_FAILED = "actions/popup/ADD_LIST_FAILED";

export const EDIT_LIST_REQUEST = "actions/popup/EDIT_LIST_REQUEST";
export const EDIT_LIST_SUCCESS = "actions/popup/EDIT_LIST_SUCCESS";
export const EDIT_LIST_FAILED = "actions/popup/EDIT_LIST_FAILED";

export const DELETE_LIST_REQUEST = "actions/popup/DELETE_LIST_REQUEST";
export const DELETE_LIST_SUCCESS = "actions/popup/DELETE_LIST_SUCCESS";
export const DELETE_LIST_FAILED = "actions/popup/DELETE_LIST_FAILED";

export const DELETE_BUCKET_REQUEST = "actions/popup/DELETE_BUCKET_REQUEST";
export const DELETE_BUCKET_SUCCESS = "actions/popup/DELETE_BUCKET_SUCCESS";
export const DELETE_BUCKET_FAILED = "actions/popup/DELETE_BUCKET_FAILED";

export const createTodo: Record<string, any> = (
  params: Record<string, any>
) => ({
  type: CALL_API,
  types: [ADD_LIST_REQUEST, ADD_LIST_SUCCESS, ADD_LIST_FAILED],
  method: "post",
  endPoint: "api/todos/",
  body: {
    bucketname: params.bucketname,
    title: params.title,
    description: params.description,
    completed: params.completed
  }
});

export const editTodo: Record<string, any> = (
  params: Record<string, any>,
  id: number
) => ({
  type: CALL_API,
  types: [EDIT_LIST_REQUEST, EDIT_LIST_SUCCESS, EDIT_LIST_FAILED],
  method: "put",
  endPoint: `api/todos/${id}/`,
  body: {
    bucketname: params.bucketname,
    title: params.title,
    description: params.description,
    completed: params.completed
  }
});

export const getTodo = () => ({
  type: CALL_API,
  types: [GET_LIST_REQUEST, GET_LIST_SUCCESS, GET_LIST_FAILED],
  method: "get",
  endPoint: "api/todos/"
});

export const deleteTodo: Record<string, any> = (id: number) => ({
  type: CALL_API,
  types: [DELETE_LIST_REQUEST, DELETE_LIST_SUCCESS, DELETE_LIST_FAILED],
  method: "delete",
  endPoint: `api/todos/${id}/`
});

export const callPopup: Record<string, any> = (
  params: Record<string, any>,
  value: boolean,
  edit: boolean
) => ({
  type: ADD_LIST_POPUP,
  data: {
    params,
    value,
    edit
  }
});
