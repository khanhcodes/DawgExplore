import clsx from "clsx";
import * as React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import { withRouter, WithRouterProps } from "../HOC/react-router-dom";
import Avatar from "../media/Avatar";
import LogoImage from "../media/Logo/logo.png";
import { Theme } from "../theme";

const styles = (theme: typeof Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    width: "100%",
    height: theme.height.navigationBar,

    position: "sticky",
    top: 0,
    zIndex: theme.zIndex.specific.navigationBar,

    backgroundColor: "white"
  },

  logoContainer: {
    ...theme.typo.set.title,
    textDecoration: "underline",

    display: "flex",
    alignItems: "center",

    height: "100%",

    cursor: "pointer"
  },
  logo: {
    height: "70%"
  },
  logoName: {
    marginLeft: "14px"
  },

  itemsContainer: {
    display: "flex",
    alignItems: "center",

    height: "100%"
  },
  item: {
    ...theme.typo.set.buttonText,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    boxSizing: "border-box",
    height: "100%",
    padding: "14px 16px",
    fontSize: theme.typo.fontSize.lg,

    transition: "background-color 0.2s, color 0.2s",

    "&:hover": {
      backgroundColor: theme.palette.main,
      color: "white",
      cursor: "pointer"
    }
  },
  active: {
    backgroundColor: theme.palette.main,
    color: "white"
  },

  avatar: {
    boxSizing: "border-box",
    height: "100%",
    padding: "6px"
  }
});

type Props = WithRouterProps & WithStylesProps<typeof styles>;

class NavigationBar extends React.Component<Props> {
  render() {
    const { classes, location, navigate } = this.props;

    return (
      <div className={classes.root}>
        <div
          className={classes.logoContainer}
          onClick={() => {
            navigate("/");
          }}
        >
          <img className={classes.logo} src={LogoImage} />

          <div className={classes.logoName}>
            Dawg<span style={{ color: "#c52b1f" }}>Explore</span>
          </div>
        </div>

        <div className={classes.itemsContainer}>
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
            onClick={() => {
              navigate("/explore");
            }}
          >
            Explore
          </div>

          <div
            className={clsx(classes.item, {
              [classes.active]: location.pathname === "/map"
            })}
            onClick={() => {
              navigate("/map");
            }}
          >
            Map
          </div>

          <div
            className={clsx(classes.item, {
              [classes.active]: location.pathname === "/my-tickets"
            })}
            onClick={() => {
              navigate("/my-tickets");
            }}
          >
            My Tickets
          </div>

          <div
            className={clsx(classes.item, {
              [classes.active]: location.pathname === "/saved-events"
            })}
            onClick={() => {
              navigate("/saved-events");
            }}
          >
            Saved Events
          </div>

          <Avatar className={classes.avatar} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(NavigationBar));
