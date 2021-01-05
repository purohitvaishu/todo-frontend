/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { withStyles, WithStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import { callPopup, createTodo, editTodo } from "../../actions/popup.actions";
import { State } from "../../interfaces/state.interface";
import { ActionCall } from "../../interfaces/actions.interface";

const useStyles = makeStyles(theme => {
  return {
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    },
    dialogcontent: {
      minWidth: "60vh"
    },
    textField: {
      width: "-webkit-fill-available",
      margin: "10px 0",
      "& .MuiOutlinedInput-input": {
        padding: "10.5px 14px",
        "&.focus": {
          borderColor: "darkcyan"
        }
      }
    },
    textFieldDrop: {
      width: "-webkit-fill-available !important",
      margin: "10px 0",
      "& .MuiTextField-root": {
        "& .MuiInputBase-root": {
          padding: 0,
          "&.focus": {
            borderColor: "darkcyan"
          }
        }
      }
    },
    button: {
      color: "white",
      background: "darkcyan",
      "&:hover": {
        opacity: 0.6,
        color: "white",
        background: "darkcyan"
      }
    }
  };
});

export interface DialogTitleProps {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

type Props = State & ActionCall;

const DialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  const classes = useStyles();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const CustomizedDialogs: React.FC<Props> = (props: Props) => {
  const {
    open,
    bucketname,
    title,
    description,
    completed,
    id,
    edit,
    list,
    callPopup,
    createTodo,
    editTodo
  } = props;
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    bucketname,
    title,
    description,
    completed
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCompleted = () => {
    setValues({ ...values, completed: !values.completed });
  };

  const handleClose = () => {
    if (callPopup) callPopup({}, false, false);
  };

  const handleCreate = () => {
    if (edit && editTodo) {
      editTodo(values, id || 0);
    } else if (createTodo) {
      createTodo(values);
    }
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open || false}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Add List
      </DialogTitle>
      <DialogContent dividers className={classes.dialogcontent}>
        <InputLabel htmlFor="outlined-adornment-bucket">Bucket Name</InputLabel>
        <Autocomplete
          value={values.bucketname}
          onChange={(event: any, newValue: string | any) => {
            setValues({ ...values, bucketname: newValue });
          }}
          id="controllable-states-demo"
          options={list && list.map(option => option.bucketname)}
          className={classes.textFieldDrop}
          renderInput={params => (
            <TextField
              {...params}
              onChange={event =>
                setValues({ ...values, bucketname: event.target.value })
              }
              variant="outlined"
            />
          )}
        />
        <br />
        <InputLabel htmlFor="outlined-adornment-title">Title</InputLabel>
        <OutlinedInput
          id="outlined-adornment-title"
          value={values.title}
          onChange={handleChange("title")}
          className={classes.textField}
        />
        <br />
        <InputLabel htmlFor="outlined-adornment-description">
          Description
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-description"
          value={values.description}
          onChange={handleChange("description")}
          className={classes.textField}
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.completed}
              onChange={handleCompleted}
              color="primary"
            />
          }
          label={
            <InputLabel htmlFor="outlined-adornment-completed">
              Completed
            </InputLabel>
          }
        />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleCreate}
          color="primary"
          className={classes.button}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = state => {
  return {
    bucketname: state.popup.bucketname,
    title: state.popup.title,
    description: state.popup.description,
    completed: state.popup.completed,
    open: state.popup.open,
    edit: state.popup.edit,
    id: state.popup.id,
    list: state.popup.list
  };
};

const mapDispatchToProps = {
  callPopup,
  createTodo,
  editTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedDialogs);
