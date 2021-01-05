/* eslint-disable @typescript-eslint/camelcase */
export const initialState = {
  bucketname: "",
  title: "",
  description: "",
  completed: false,
  open: false,
  edit: false,
  id: null,
  list: []
};

export const getList = [
  {
    bucketname: "Trip to Paris",
    completed: true,
    description: "Check passport for migrations",
    id: 2,
    title: "Passport Check"
  }
];

export const popupList = {
  edit: true,
  params: {
    bucketname: "The Godfather",
    completed: false,
    description: "Submit to doctor",
    id: 5,
    title: "File"
  },
  value: true
};

export const addList = {
  bucketname: "Grocery",
  completed: false,
  description: "For every morning 1ltr",
  id: 6,
  title: "Milk"
};
