/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Modal from "../components/Modal";
import { callPopup } from "../actions/popup.actions";
import { State } from "../interfaces/state.interface";
import { ActionCall } from "../interfaces/actions.interface";

const useStyles = makeStyles(theme => {
  return {
    root: {
      padding: theme.spacing(1)
    },
    divider: {
      marginTop: 24
    },
    heading: {
      display: "flex",
      justifyContent: "center"
    },
    topHead: {
      fontWeight: 600,
      color: "darkcyan"
    },
    button: {
      textAlign: "center",
      marginTop: "8%"
    }
  };
});

type Props = State & ActionCall;

const Header: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { open, callPopup } = props;

  const handleClickOpen = () => {
    if (callPopup) callPopup({}, !open, false);
  };

  return (
    <>
      <Grid style={{ display: "flex" }}>
        <Grid item md={5} sm={12} className={classes.divider}>
          <Divider />
        </Grid>
        <Grid item md={2} sm={12} className={classes.heading}>
          <Typography variant="h4" component="h2" style={{ fontWeight: 600 }}>
            Tasks&nbsp;
          </Typography>
          <Typography variant="h4" component="h2" className={classes.topHead}>
            Lists
          </Typography>
        </Grid>
        <Grid item md={5} sm={12} className={classes.divider}>
          <Divider />
        </Grid>
      </Grid>
      <Grid className={classes.button}>
        <Button variant="outlined" onClick={handleClickOpen}>
          <AddIcon />
        </Button>
        <Typography variant="h5" component="h2">
          Add List
        </Typography>
      </Grid>
      {open && <Modal />}
    </>
  );
};

const mapStateToProps = state => {
  return {
    open: state.popup.open
  };
};

const mapDispatchToProps = {
  callPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
