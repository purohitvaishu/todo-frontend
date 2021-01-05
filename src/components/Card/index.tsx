/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Divider, CardHeader } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    paddingLeft: 26,
    color: "white",
    cursor: "pointer",
    minHeight: 260,
    paddingRight: 4,
    background: "transparent",
    boxShadow: "none"
  },
  title: {
    fontSize: 14,
    paddingBottom: 10,
    textAlign: "end",
    color: "white"
  },
  cardHeader: {
    paddingLeft: 0
  }
});

export interface Bucket {
  title: string;
  description: string;
  completed: boolean;
}

type Props = {
  data: {
    bucketname: string;
    data: Bucket[];
  };
};

const CardComponent: FunctionComponent<Props> = (props: Props) => {
  const classes = useStyles();
  const { data } = props;

  return (
    <Card className={classes.root}>
      <CardHeader title={data.bucketname} className={classes.cardHeader} />
      <Divider />
      <CardContent className="scroll">
        {data &&
          data.data &&
          data.data.map(values => (
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              style={
                values.completed
                  ? { textDecoration: "line-through" }
                  : { textDecoration: "none" }
              }
            >
              {values.title}
            </Typography>
          ))}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
