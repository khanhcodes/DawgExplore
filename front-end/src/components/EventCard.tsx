import moment from "moment";
import * as React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import { withRouter, WithRouterProps } from "../HOC/react-router-dom";
import Map from "../media/Map";
import { Theme } from "../theme";
import { Event } from "../types";
import PlaceholderImage from "./PlaceholderImage";

const styles = (theme: typeof Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    float: "left",
    width: "240px",
    height: "352px",

    margin: "10px 10px",

    borderRadius: "12px",
    overflow: "hidden",

    boxShadow: "2px 4px 9px rgba(0, 0, 0, 0.25)",
    transition: "box-shadow 0.2s, width 0.2s, height 0.2s",

    "&:hover": {
      boxShadow: "0 1.5rem 4rem rgba(0, 0, 0, 0.2)",
      width: "250px",
      height: "360px"
    }
  },

  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    height: "140px",

    overflow: "hidden",
    borderRadius: "5px"
  },
  image: {
    width: "100%",
    objectFit: "cover"
  },

  content: {
    display: "flex",
    textAlign: "left",
    justifyContent: "space-between",
    flexDirection: "column",

    boxSizing: "border-box",
    width: "100%",
    height: "100",
    padding: "15px",

    flexGrow: 1
  },

  header: {
    fontSize: theme.typo.fontSize.md,
    fontWeight: theme.typo.boldness.semiBold,
    marginBottom: "5px",
    width: "100%",
    maxHeight: "70px",

    display: "flex",
    justifyContent: "space-between"
  },
  title: {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    textOverflow: "ellipsis"
  },
  date: {
    fontSize: theme.typo.fontSize.sm,
    marginLeft: "4px"
  },

  location: {
    fontSize: theme.typo.fontSize.sm,
    color: theme.typo.color.secondary.dark,
    marginBottom: "5px",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    textOverflow: "ellipsis"
  },
  icon: {
    alignSelf: "center",

    width: "14px",
    height: "14px",

    marginRight: "8px"
  },

  description: {
    fontSize: theme.typo.fontSize.sm,
    color: theme.typo.color.secondary.dark,
    marginBottom: "10px",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    textOverflow: "ellipsis"
  },
  exploreButton: {
    boxSizing: "border-box",
    width: "100%",
    padding: "8px",
    textAlign: "center",

    fontSize: theme.typo.fontSize.md,
    color: theme.palette.main,
    backgroundColor: "#FFE6E6",

    borderRadius: "0.4rem",

    transition: "background-color 0.2s",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "#FFE6E6"
    },

    "& span": {
      marginLeft: "1rem",
      transition: "margin-left 0.2s"
    },

    "&:hover span": {
      marginLeft: "1.5rem"
    }
  }
});

type Props = WithRouterProps &
  WithStylesProps<typeof styles> & {
    event: Event;
  };

type State = {
  stImageError: boolean;
};

class EventCard extends React.Component<Props, State> {
  state: State = {
    stImageError: false
  };

  parseDate = () => {
    const { date } = this.props.event;
    const tokens = date.split(" ");
    const plusYear =
      tokens[4] && tokens[4] === "2023"
        ? tokens[4]
        : tokens[1] === "January" || tokens[1] === "February" || tokens[1] === "March" || tokens[1] === "April"
        ? "2022"
        : "2021";
    const dateOnly = tokens[0] + " " + tokens[1] + " " + tokens[2] + " " + plusYear;

    const momentDate = moment(dateOnly, "dddd, MMMM DD YYYY").format("MM/DD/YY");
    return momentDate;
  };

  render() {
    const { classes, event, navigate } = this.props;
    const { stImageError } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.imageContainer}>
          {event.photo !== "nan" && !stImageError && (
            <img
              src={event.photo}
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
          {(!(event.photo !== "nan") || stImageError) && <PlaceholderImage />}
        </div>

        <div className={classes.content}>
          <div>
            <div className={classes.header}>
              <div className={classes.title}>{event.title}</div>
              <div className={classes.date}>{this.parseDate()}</div>
            </div>

            <div className={classes.location}>
              <Map className={classes.icon} />
              {event.location}
            </div>

            <div className={classes.description}>{event.description}</div>
          </div>

          <div
            className={classes.exploreButton}
            onClick={() => {
              navigate(`/event/${event.id}`);
            }}
          >
            Explore <span>&rarr;</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(EventCard));
