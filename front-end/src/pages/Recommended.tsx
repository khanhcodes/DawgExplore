import React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import NavigationBar from "../components/NavigationBar";
import { dogPhoto } from "../data";
import { withRouter, WithRouterProps } from "../HOC/react-router-dom";
import { Theme } from "../theme";

const IMAGE_HEIGHT = "320px";
const ICON_SIZE = "32px";

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

  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    height: IMAGE_HEIGHT,

    overflow: "hidden",
    borderRadius: "5px"
  },
  image: {
    width: "100%",
    objectFit: "cover",
    display: "block",
    marginTop: "40px"
  },

  icon: {
    width: ICON_SIZE,

    marginRight: "8px"
  },

  sectionTitle: {
    ...theme.typo.set.title,

    marginBottom: "12px"
  },
  sectionsContainer: {
    display: "flex",
    flexDirection: "column",

    boxSizing: "border-box",
    width: "100%"
  },
  section: {
    display: "flex",
    flexDirection: "column",

    width: "100%",

    marginTop: "40px"
  }
});

type Props = WithRouterProps & WithStylesProps<typeof styles>;

class Recommended extends React.Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <NavigationBar />
        <div className={classes.content}>
          <div className={classes.imageContainer}>
            <img src={dogPhoto} className={classes.image} />{" "}
          </div>
          <div className={classes.sectionsContainer}>
            <div className={classes.section}>
              <div className={classes.sectionTitle}>Recommended</div>
              <h1>Recommended</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Recommended));
