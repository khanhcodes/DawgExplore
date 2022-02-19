import axios from "axios";
import React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import EventCard from "../../components/EventCard";
import NavigationBar from "../../components/NavigationBar";
import ForwardButton from "../../media/ForwardButton";
import { Theme } from "../../theme";
import { Event } from "../../types";
import { getRandom } from "../../util";
import SearchBar from "./SearchBar";

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
    position: "relative",

    width: "100%",

    marginTop: "40px"
  },
  sectionTitle: {
    ...theme.typo.set.title,

    marginBottom: "12px"
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

type Props = WithStylesProps<typeof styles>;

type State = {
  stMostPopular: Event[];
  stUpcomingEvents: Event[];
};

class Home extends React.Component<Props, State> {
  state: State = {
    stMostPopular: [],
    stUpcomingEvents: []
  };

  componentDidMount() {
    axios
      .get(`${REACT_APP_BACKEND}/events`)
      .then((res) => {
        const events: Event[] | undefined = res.data.events;

        if (!events) {
          return;
        }

        const randomEvents = getRandom(events, 4);
        this.setState({
          stMostPopular: randomEvents
        });

        const sortedEvents = events.sort((a, b) => {
          const dateA = new Date(this.parseDate(a.date));
          const dateB = new Date(this.parseDate(b.date));
          if (dateA < dateB) {
            return 1;
          } else if (dateA > dateB) {
            return -1;
          } else {
            return 0;
          }
        });

        this.setState({
          stUpcomingEvents: [sortedEvents[0], sortedEvents[1], sortedEvents[2], sortedEvents[4]]
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  parseDate = (date: string): string => {
    const tokens = date.split(" ");

    const plusYear =
      tokens[4] && tokens[4] === "2023"
        ? "2023"
        : tokens[1] === "January" || tokens[1] === "February" || tokens[1] === "March" || tokens[1] === "April"
        ? "2022"
        : "2021";

    const dateOnly = tokens[1] + " " + tokens[2] + " " + plusYear;

    return dateOnly;
  };

  render() {
    const { classes } = this.props;
    const { stMostPopular, stUpcomingEvents } = this.state;

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

              {stMostPopular.length !== 0 && (
                <div className={classes.eventCardsContainer}>
                  {stMostPopular.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}

              <ForwardButton className={classes.forwardButton} />
            </div>

            {/* <div className={classes.section}>
              <div className={classes.sectionTitle}>Recommended For You</div>

              <div className={classes.eventCardsContainer}>
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <EventCard key={index} event={event} />
                  ))}
              </div>

              <ForwardButton className={classes.forwardButton} />
            </div> */}

            <div className={classes.section}>
              <div className={classes.sectionTitle}>Upcoming Events</div>

              <div className={classes.eventCardsContainer}>
                {stUpcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              <ForwardButton className={classes.forwardButton} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
