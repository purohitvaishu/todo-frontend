/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  ADD_LIST_POPUP,
  ADD_LIST_SUCCESS,
  GET_LIST_SUCCESS
} from "../actions/popup.actions";

const initialState = {
  bucketname: "",
  title: "",
  description: "",
  completed: false,
  open: false,
  edit: false,
  id: null,
  list: []
};

const setValue = value => {
  const stack: Record<string, any> = [];

  value.map(element => {
    const found = stack.some(
      (el: Record<string, any>) => el.bucketname === element.bucketname
    );
    if (!found)
      return stack.push({
        bucketname: element.bucketname,
        data: [
          {
            id: element.id,
            title: element.title,
            description: element.description,
            completed: element.completed
          }
        ]
      });

    return stack.map(el =>
      el.bucketname === element.bucketname
        ? el.data.push({
            id: element.id,
            title: element.title,
            description: element.description,
            completed: element.completed
          })
        : el
    );
  });

  return stack;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST_POPUP:
      return {
        ...state,
        bucketname: action.data.params.bucketname || "",
        title: action.data.params.title || "",
        description: action.data.params.description || "",
        completed: action.data.params.completed || false,
        open: action.data.value || false,
        edit: action.data.edit || false,
        id: action.data.params.id || null
      };

    case ADD_LIST_SUCCESS: {
      const found = state.list.some(
        (el: Record<string, any>) => el.bucketname === action.data.bucketname
      );

      if (found)
        return {
          ...state,
          list: state.list.map((data: Record<string, any>) =>
            data.bucketname === action.data.bucketname
              ? data.data.push({
                  id: action.data.id,
                  title: action.data.title,
                  description: action.data.description,
                  completed: action.data.completed
                })
              : data
          )
        };

      return {
        ...state,
        list: [
          ...state.list,
          {
            bucketname: action.data.bucketname,
            data: [
              {
                id: action.data.id,
                title: action.data.title,
                description: action.data.description,
                completed: action.data.completed
              }
            ]
          }
        ]
      };
    }

    case GET_LIST_SUCCESS: {
      return {
        ...state,
        list: setValue(action.data)
      };
    }

    default:
      return state;
  }
};

export default reducer;
