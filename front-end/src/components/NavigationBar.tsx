import clsx from "clsx";
import * as React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import { withRouter, WithRouterProps } from "../HOC/react-router-dom";
import { Theme } from "../theme";

const styles = (theme: typeof Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    height: theme.height.navigationBar,

    position: "absolute",
    top: 0,
    zIndex: theme.zIndex.specific.navigationBar,

    backgroundColor: theme.palette.secondary
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    color: theme.typo.color.secondary.light,
    padding: "14px 16px",
    fontSize: theme.typo.fontSize.md,

    "&:hover": {
      backgroundColor: "#ddd",
      color: "black",
      cursor: "pointer"
    }
  },
  active: {
    backgroundColor: theme.palette.secondaryHighlight,
    color: "white",

    "&:hover": {
      backgroundColor: theme.palette.secondaryHighlight,
      color: "white"
    }
  }
});

type Props = WithRouterProps & WithStylesProps<typeof styles>;

class NavigationBar extends React.Component<Props> {
  render() {
    const { classes, location, navigate } = this.props;

    return (
      <div className={classes.root}>
        <div
          className={clsx(classes.item, {
            [classes.active]: location.pathname === "/"
          })}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </div>

        <div
          className={clsx(classes.item, {
            [classes.active]: location.pathname === "/explore"
          })}
        >
          Explore
        </div>

        <div
          className={clsx(classes.item, {
            [classes.active]: location.pathname === "/map"
          })}
        >
          Map
        </div>

        <div
          className={clsx(classes.item, {
            [classes.active]: location.pathname === "/my-tickets"
          })}
        >
          My Tickets
        </div>

        <div
          className={clsx(classes.item, {
            [classes.active]: location.pathname === "/saved-events"
          })}
        >
          Saved Events
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(NavigationBar));
