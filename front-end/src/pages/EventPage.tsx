import axios from "axios";
import React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import { matchPath } from "react-router";
import NavigationBar from "../components/NavigationBar";
import PlaceholderImage from "../components/PlaceholderImage";
import { withRouter, WithRouterProps } from "../HOC/react-router-dom";
import Bookmark from "../media/Bookmark";
import Clock from "../media/Clock";
import EventIcon from "../media/EventIcon";
import Map from "../media/Map";
import { Theme } from "../theme";
import { Event } from "../types";

const { REACT_APP_BACKEND } = process.env;

const IMAGE_HEIGHT = "320px";
const BOOKMARK_WIDTH = "28px";
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
    width: "100%",
    height: IMAGE_HEIGHT,

    overflow: "hidden",
    backgroundColor: "red",
    borderRadius: "5px"
  },
  image: {
    width: "100%",
    objectFit: "cover"
  },

  eventContent: {
    boxSizing: "border-box",
    width: "100%",
    padding: "24px 30px",

    marginTop: "36px",
    marginBottom: "36px",

    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "5px"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",

    width: "100%"
  },
  title: {
    ...theme.typo.set.xl_bold,

    borderBox: "box-sizing",
    width: `calc(100% - ${BOOKMARK_WIDTH})`,
    paddingRight: "20px"
  },
  bookmark: {
    height: "53px",
    width: BOOKMARK_WIDTH
  },
  link: {
    color: "black"
  },
  description: {
    ...theme.typo.set.default,

    marginTop: "47px"
  },

  displayBasicInfo: {
    ...theme.typo.set.bold,

    display: "flex",
    alignItems: "center"
  },

  icon: {
    width: ICON_SIZE,

    marginRight: "8px"
  }
});

type Props = WithRouterProps & WithStylesProps<typeof styles>;

type State = {
  stEvent: Event | undefined;
  stImageError: boolean;
};

class EventPage extends React.Component<Props, State> {
  state: State = {
    stEvent: undefined,
    stImageError: false
  };

  componentDidMount() {
    const { navigate, location } = this.props;
    const eventId = matchPath("/event/:id", location.pathname)?.params.id;

    if (!eventId) {
      navigate("/");
      return;
    }

    axios
      .get(`${REACT_APP_BACKEND}/event/${eventId}`)
      .then((res) => {
        const event = res.data;
        if (typeof event === "object") {
          this.setState({
            stEvent: { ...event }
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { stEvent, stImageError } = this.state;

    return (
      <div className={classes.root}>
        <NavigationBar />

        <div className={classes.content}>
          <div className={classes.imageContainer}>
            {stEvent?.photo && stEvent.photo !== "nan" && !stImageError && (
              <img
                src={stEvent.photo}
                className={classes.image}
                onLoad={() => {
                  this.setState({
                    stImageError: false
                  });
                }}
                onError={() => {
                  this.setState({
                    stImageError: true
                  });
                }}
              />
            )}
            {(!(stEvent?.photo && stEvent.photo !== "nan") || stImageError) && <PlaceholderImage />}
          </div>

          <div className={classes.eventContent}>
            <div className={classes.header}>
              <div className={classes.title}>{stEvent?.title}</div>
              <Bookmark className={classes.bookmark} />
            </div>

            <div className={classes.displayBasicInfo}>
              <Clock className={classes.icon} />
              {stEvent?.date}
            </div>

            {stEvent?.location && stEvent.location !== "nan" && (
              <div className={classes.displayBasicInfo}>
                <Map className={classes.icon} />
                <a
                  className={classes.link}
                  target="_blank"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stEvent.location)}`}
                  rel="noreferrer"
                >{`${stEvent.location}`}</a>
              </div>
            )}

            {stEvent?.topic && stEvent.topic !== "nan" && (
              <div className={classes.displayBasicInfo}>
                <EventIcon className={classes.icon} /> {stEvent?.topic}
              </div>
            )}

            <div className={classes.description}>
              <b>Description:</b> {stEvent?.description}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(EventPage));
