/* eslint-disable no-bitwise */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import CardComponent from "../components/Card";
import ListModal from "../components/ListModal";
// import MockData from "../lib/mockData.json";
import { getTodo } from "../actions/popup.actions";

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

export interface BucketProps {
  title: string;
  description: string;
  completed: boolean;
}

type Props = {
  bucketname: string;
  data: BucketProps[];
};

const Bucket: React.FC = (props: any) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const { getTodo, list } = props;

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleListCard = (data: Props) => {
    setData(data);
    handleClickOpen();
  };

  useEffect(() => {
    if (!list.length) getTodo();
  }, [list, getTodo]);

  return (
    <Grid container style={{ display: "flex" }} spacing={4}>
      {list.length &&
        list.map(element => (
          <Grid item md={2} sm={12} className={classes.divider}>
            <Box
              style={{
                background: `#${((Math.random() * 0xffffff) << 0)
                  .toString(16)
                  .padStart(6, "0")}`,
                paddingBottom: 4
              }}
              onClick={() => handleListCard(element)}
            >
              <CardComponent data={element} />
            </Box>
          </Grid>
        ))}
      {open && <ListModal open={open} list={data} close={handleClickOpen} />}
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    list: state.popup.list
  };
};

const mapDispatchToProps = {
  getTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(Bucket);
