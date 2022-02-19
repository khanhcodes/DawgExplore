import React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import Card from "../components/Card";
import NavigationBar from "../components/NavigationBar";
import { Theme } from "../theme";

const styles = (theme: typeof Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    position: "relative",
    "@media (min-width: 1080px)": {
      width: "1080px"
    }
  },
  pushContentDown: {
    height: theme.height.navigationBar
  },
  content: {
    display: "flex",
    flexDirection: "column",

    boxSizing: "border-box",
    width: "100%",
    padding: "6rem"
  },
  banner: {
    padding: "60px",
    textAlign: "center",
    background: theme.palette.main,
    fontSize: theme.typo.fontSize.xl,
    color: "white",

    marginBottom: "20px"
  },
  bannerText: {
    margin: 0
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});

type Props = WithStylesProps<typeof styles>;

class Home extends React.Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <NavigationBar />

        <div className={classes.pushContentDown} />

        <div className={classes.content}>
          <div className={classes.banner}>
            <h1 className={classes.bannerText}>DawgExplore</h1>
            <p className={classes.bannerText}>Explore events around campus!</p>
          </div>

          <div className={classes.cardsContainer}>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Card
                  key={index}
                  header="A starry night"
                  description="Look up at the night sky, and find yourself immersed in the amazing mountain range of Aspen."
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
