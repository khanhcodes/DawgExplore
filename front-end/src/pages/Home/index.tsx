import React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import EventCard from "../../components/EventCard";
import NavigationBar from "../../components/NavigationBar";
import { Theme } from "../../theme";
import SearchBar from "./SearchBar";

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

    height: "280px",

    background: theme.palette.main,
    borderRadius: "12px"
  },

  sectionsContainer: {
    display: "flex",
    flexDirection: "column",

    boxSizing: "border-box",
    width: "100%",
    padding: "40px 25px"
  },
  section: {
    display: "flex",
    flexDirection: "column",

    width: "100%",

    marginTop: "40px"
  },
  sectionTitle: {
    ...theme.typo.set.title,

    marginBottom: "12px"
  }
});

type Props = WithStylesProps<typeof styles>;

class Home extends React.Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <NavigationBar />

        <div className={classes.content}>
          <div className={classes.banner}>
            <SearchBar />
          </div>

          <div className={classes.sectionsContainer}>
            <div className={classes.section}>
              <div className={classes.sectionTitle}>Most Popular</div>
              <EventCard />
            </div>

            <div className={classes.section}>
              <div className={classes.sectionTitle}>Recommended For You</div>
              <EventCard />
            </div>

            <div className={classes.section}>
              <div className={classes.sectionTitle}>Upcoming Events</div>
              <EventCard />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
