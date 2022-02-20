import axios from "axios";
import React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import EventCard from "../components/EventCard";
import NavigationBar from "../components/NavigationBar";
import { dogPhoto } from "../data";
import { withRouter, WithRouterProps } from "../HOC/react-router-dom";
import { Theme } from "../theme";
import { Event } from "../types";
import { getRandom } from "../util";

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
  stMostPopular: Event[];
  stUpcomingEvents: Event[];

  stCurrentQuery: string;
  stSearchResult: Event[];
};

class Upcoming extends React.Component<Props, State> {
  state: State = {
    stMostPopular: [],
    stUpcomingEvents: [],

    stCurrentQuery: "",
    stSearchResult: []
  };

  componentDidMount() {
    axios
      .get(`${REACT_APP_BACKEND}/events`)
      .then((res) => {
        const events: Event[] | undefined = res.data.events;

        if (!events) {
          return;
        }

        const events_without_exam = events.filter((event) => !event.title.toLowerCase().includes("exam"));

        const randomEvents = getRandom(events_without_exam, 4);
        this.setState({
          stMostPopular: randomEvents
        });

        const sortedEvents = events_without_exam.sort((a, b) => {
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
          stUpcomingEvents: [
            sortedEvents[0],
            sortedEvents[1],
            sortedEvents[2],
            sortedEvents[4],
            sortedEvents[5],
            sortedEvents[6],
            sortedEvents[7],
            sortedEvents[8],
            sortedEvents[9],
            sortedEvents[10],
            sortedEvents[11],
            sortedEvents[12],
            sortedEvents[13],
            sortedEvents[14],
            sortedEvents[15],
            sortedEvents[16],
            sortedEvents[17],
            sortedEvents[18],
            sortedEvents[19],
            sortedEvents[20],
            sortedEvents[21],
            sortedEvents[22],
            sortedEvents[23],
            sortedEvents[24],
            sortedEvents[25],
            sortedEvents[26],
            sortedEvents[27],
            sortedEvents[28],
            sortedEvents[29],
            sortedEvents[30],
            sortedEvents[31],
            sortedEvents[32],
            sortedEvents[33],
            sortedEvents[34],
            sortedEvents[35],
            sortedEvents[36],
            sortedEvents[37],
            sortedEvents[38],
            sortedEvents[39],
            sortedEvents[40],
            sortedEvents[41],
            sortedEvents[42],
            sortedEvents[43],
            sortedEvents[44],
            sortedEvents[45]
          ]
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

  search = (query: string) => {
    if (query === "") {
      this.setState({
        stCurrentQuery: "",
        stSearchResult: []
      });
      return;
    }

    axios
      .get(`${REACT_APP_BACKEND}/searchevents/inclusive/${query}`)
      .then((res) => {
        const events: Event[] | undefined = res.data.events;

        if (!events) {
          return;
        }

        const events_without_exam = events.filter((event) => !event.title.toLowerCase().includes("exam"));

        this.setState({
          stCurrentQuery: query,
          stSearchResult: events_without_exam
        });
      })
      .catch((err) => console.error(err));
  };
  render() {
    const { classes } = this.props;

    const { stUpcomingEvents } = this.state;

    return (
      <div className={classes.root}>
        <NavigationBar />
        <div className={classes.content}>
          <div className={classes.imageContainer}>
            <img src={dogPhoto} className={classes.image} />{" "}
          </div>
          <div className={classes.sectionsContainer}>
            <div className={classes.section}>
              <div className={classes.sectionTitle}>Upcoming Events</div>
              <div className={classes.eventCardsContainer}>
                {stUpcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Upcoming));
