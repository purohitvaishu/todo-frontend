/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Button, Box, Checkbox, Tooltip, Grid } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import ProgressBar from "../ProgressBar";
import { State } from "../../interfaces/state.interface";
import { ActionCall } from "../../interfaces/actions.interface";
import { callPopup, deleteTodo } from "../../actions/popup.actions";

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
    button: {
      color: "white",
      background: "darkcyan",
      "&:hover": {
        opacity: 0.6,
        color: "white",
        background: "darkcyan"
      }
    },
    item: {
      "&:hover": {
        background: "lightgrey",
        color: "red"
      }
    }
  };
});

export interface DialogTitleProps {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

export interface Bucket {
  title: string;
  description: string;
  completed: boolean;
}

export interface Props extends State, ActionCall {
  childern: React.ReactNode;
  close: () => void;
  open: boolean;
}

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

const ListModal: FunctionComponent<Props> = (props: Props) => {
  const { open, list, callPopup, close, deleteTodo } = props;
  const classes = useStyles();
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    if (list && list.data.length && !total) {
      setTotal(list.data.length);
      let i = 0;
      // eslint-disable-next-line no-plusplus
      list.data.map(element => element.completed && i++);
      setCompleted(i);
    }
  }, [list, total]);

  const handleEdit = (element: Record<string, any>, name: string) => {
    const value = {
      title: element.title,
      description: element.description,
      completed: element.completed,
      bucketname: name,
      id: element.id
    };
    close();
    if (callPopup) callPopup(value, true, true);
  };

  const handleDelete = (id: number) => {
    close();
    if (deleteTodo) deleteTodo(id);
  };

  return (
    <Dialog
      onClose={close}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={close}>
        <Box style={{ display: "flex" }}>
          <ProgressBar value={(completed / total) * 100} />
          <Box style={{ display: "inline" }}>
            <Typography
              variant="h6"
              component="h2"
              style={{ fontWeight: "bold" }}
            >
              {list && list.bucketname}
            </Typography>
            <Typography
              style={{ fontSize: 14, color: "gray", fontWeight: "bold" }}
            >
              {completed} of {total} Tasks
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent dividers className={classes.dialogcontent}>
        {list &&
          list.data.map((element, index) => (
            <Box
              style={{ display: "flex", marginBottom: 10 }}
              key={`${element.title}`}
            >
              <Grid item md={2} sm={12}>
                <Checkbox
                  disabled
                  checked={element.completed}
                  style={{ paddingTop: 0, paddingBottom: 20 }}
                  inputProps={{ "aria-label": "disabled checked checkbox" }}
                />
              </Grid>
              <Grid item md={8} sm={12}>
                <Tooltip title="Edit Item" aria-label="edit" placement="right">
                  <Box
                    className={classes.item}
                    onClick={() => handleEdit(element, list.bucketname)}
                  >
                    <Typography>{element.title}</Typography>
                    <Typography style={{ fontSize: 14, color: "grey" }}>
                      {element.description.substring(0, 50)}...
                    </Typography>
                  </Box>
                </Tooltip>
              </Grid>
              <Grid item md={2} sm={12}>
                <Button
                  variant="outlined"
                  onClick={() => handleDelete(element.id)}
                >
                  Delete
                </Button>
              </Grid>
            </Box>
          ))}
      </DialogContent>
      <DialogActions>
        <Tooltip title="Add Item" aria-label="add">
          <Button
            autoFocus
            color="primary"
            className={classes.button}
            onClick={() => {
              close();
              if (callPopup)
                callPopup(
                  list ? { bucketname: list.bucketname } : {},
                  true,
                  false
                );
            }}
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = {
  callPopup,
  deleteTodo
};

export default connect(null, mapDispatchToProps)(ListModal);
