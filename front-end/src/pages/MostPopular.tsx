import axios from "axios";
import React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import EventCard from "../components/EventCard";
import NavigationBar from "../components/NavigationBar";
import { dogPhoto } from "../data";
import { withRouter, WithRouterProps } from "../HOC/react-router-dom";
import { Theme } from "../theme";
import { Event } from "../types";

const IMAGE_HEIGHT = "320px";
const ICON_SIZE = "32px";
const { REACT_APP_BACKEND } = process.env;

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
  },

  eventCardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  }
});

type Props = WithRouterProps & WithStylesProps<typeof styles>;

type State = {
  stEvents: Event[];
};

class MostPopular extends React.Component<Props, State> {
  state: State = {
    stEvents: []
  };

  componentDidMount() {
    axios
      .get(`${REACT_APP_BACKEND}/events`)
      .then((res) => {
        const events: Event[] | undefined = res.data.events;
        if (!events) {
          return;
        }
        this.setState({ stEvents: events });
      })
      .catch((err) => console.error(err));
  }
  render() {
    const { classes } = this.props;

    const { stEvents } = this.state;

    return (
      <div className={classes.root}>
        <NavigationBar />
        <div className={classes.content}>
          <div className={classes.imageContainer}>
            <img src={dogPhoto} className={classes.image} />{" "}
          </div>
          <div className={classes.sectionsContainer}>
            <div className={classes.section}>
              <div className={classes.sectionTitle}>Most Popular</div>

              {stEvents.length !== 0 && (
                <div className={classes.eventCardsContainer}>
                  {stEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(MostPopular));
