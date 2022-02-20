import React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import EventCard from "../components/EventCard";
import NavigationBar from "../components/NavigationBar";
import { withRouter, WithRouterProps } from "../HOC/react-router-dom";
import { withSavedEvents, WithSavedEventsProps } from "../HOC/save-events";
import { Theme } from "../theme";
import { Event } from "../types";

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

  title: {
    ...theme.typo.set.title,

    margin: "24px 0px"
  },

  eventsContainer: {
    display: "flex",
    flexWrap: "wrap",

    marginBottom: "24px"
  }
});

type Props = WithSavedEventsProps & WithRouterProps & WithStylesProps<typeof styles>;

type State = {
  stMostPopular: Event[];
  stUpcomingEvents: Event[];
};

class SavedEventsPage extends React.Component<Props, State> {
  render() {
    const { classes, savedEventsContext } = this.props;

    return (
      <div className={classes.root}>
        <NavigationBar />

        <div className={classes.content}>
          {savedEventsContext.savedEvents.length === 0 && (
            <div className={classes.title}>Bookmark Your Wonderful Events!</div>
          )}

          {savedEventsContext.savedEvents.length !== 0 && <div className={classes.title}>Your Bookmarked Events</div>}

          <div className={classes.eventsContainer}>
            {savedEventsContext.savedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(withSavedEvents(SavedEventsPage)));
