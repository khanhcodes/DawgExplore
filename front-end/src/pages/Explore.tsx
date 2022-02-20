import React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import CategoryCard from "../components/CategoryCard";
import NavigationBar from "../components/NavigationBar";
import { withRouter, WithRouterProps } from "../HOC/react-router-dom";
import Background from "../media/Background";
import DogBackward from "../media/DogBackward/dog-backward.png";
import DogForward from "../media/DogForward/dog-forward.png";
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

  banner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    position: "relative",
    overflow: "hidden",

    height: "280px",

    borderRadius: "12px"
  },
  backgroundBanner: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,

    height: "100%"
  },
  dogForward: {
    position: "absolute",
    left: 14,

    height: "80px"
  },
  dogBackward: {
    position: "absolute",
    right: 14,

    height: "80px"
  },

  searchResultContainer: {
    display: "flex",
    flexWrap: "wrap",

    marginTop: "80px",
    marginBottom: "40px"
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
    position: "relative",

    width: "100%",

    marginTop: "40px"
  },
  sectionTitle: {
    ...theme.typo.set.title,

    marginBottom: "12px"
  },
  image: {
    width: "100%",
    objectFit: "cover"
  },
  eventCardsContainer: {
    display: "flex"
  },
  forwardButton: {
    position: "absolute",
    right: -30,
    top: "50%",
    cursor: "pointer"
  }
});
type Props = WithRouterProps & WithStylesProps<typeof styles>;

class Explore extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavigationBar />

        <div className={classes.content}>
          <div className={classes.banner}>
            <img src={DogForward} className={classes.dogForward} />
            <Background className={classes.backgroundBanner} />
            <img src={DogBackward} className={classes.dogBackward} />
          </div>
          <div className={classes.sectionsContainer}>
            <div className={classes.section}>
              <div className={classes.sectionTitle}>Explore</div>
              <CategoryCard />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Explore));
