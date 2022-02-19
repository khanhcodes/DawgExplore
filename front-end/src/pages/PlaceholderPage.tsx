import React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import NavigationBar from "../components/NavigationBar";
import LogoImage from "../media/Logo/logo.png";
import { Theme } from "../theme";

const styles = (theme: typeof Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    position: "relative",
    width: "100%",
    "@media (min-width: 1080px)": {
      width: "1080px"
    }
  },

  content: {
    display: "flex",
    flexDirection: "column",

    boxSizing: "border-box",
    width: "100%"
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    height: `calc(100vh - ${theme.height.navigationBar}px)`
  },
  image: {
    width: "500px"
  }
});

type Props = WithStylesProps<typeof styles>;

class PlaceholderPage extends React.Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <NavigationBar />

        <div className={classes.content}>
          <div className={classes.center}>
            <img src={LogoImage} className={classes.image} />
            <h1>Coming Soon!!!</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PlaceholderPage);
