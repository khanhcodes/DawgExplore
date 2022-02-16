import React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import { Theme } from "../theme";

const styles = (theme: typeof Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  welcome: {
    color: theme.palette.main,
    padding: (props: Props) => props.padding
  }
});

type Props = WithStylesProps<typeof styles> & {
  padding: number;
};

class Home extends React.Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h1 className={classes.welcome}>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <h3>Hello Kaitlyn</h3>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
