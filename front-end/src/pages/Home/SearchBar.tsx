import React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import Calendar from "../../media/Calendar";
import EventIcon from "../../media/EventIcon";
import MagnifyGlass from "../../media/MagnifyGlass";
import Map from "../../media/Map";
import { Theme } from "../../theme";

const SEARCH_BAR_HEIGHT = "73px";
const SEARCH_BUTTON_HEIGHT = "46px";
const ICON_SIZE = "30px";
const MARGIN_LEFT_BETWEEN_TEXT_ICON = "8px";

const styles = (theme: typeof Theme) => ({
  divider: {
    height: "100%",
    borderLeft: "1px solid #C4C4C4"
  },

  searchBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    width: "80%",
    height: SEARCH_BAR_HEIGHT,

    backgroundColor: "white",
    borderRadius: "12px"
  },
  searchBar_explore: {
    display: "flex",
    alignItems: "center",

    boxSizing: "border-box",
    height: "100%",
    width: "calc(100% * 1 / 3)",
    padding: "0px 20px"
  },
  searchBar_input: {
    fontFamily: "Roboto" + " !important",
    fontWeight: 700 + " !important",
    fontSize: "24px" + " !important",
    lineHeight: "28px" + " !important",
    "&::placeholder": {
      color: "#E5E5E5"
    },

    width: `calc(100% - ${ICON_SIZE})`,

    outline: "none",
    border: "none",
    marginLeft: MARGIN_LEFT_BETWEEN_TEXT_ICON
  },
  searchBar_otherTile: {
    ...theme.typo.set.searchSecondary,
    color: "#C4C4C4",

    display: "flex",
    alignItems: "center",

    boxSizing: "border-box",
    height: "100%",
    padding: "0px 20px",

    transition: "border-radius 0.2s, box-shadow 0.2s",
    cursor: "pointer",

    "&:hover": {
      borderRadius: "5px",
      boxShadow: "2px 4px 9px rgba(0, 0, 0, 0.25)"
    }
  },
  searchBar_search: {
    display: "flex",
    alignItems: "center",

    boxSizing: "border-box",
    height: "100%",
    padding: "0px 20px",

    cursor: "auto"
  },
  searchBar_icon: {
    height: ICON_SIZE
  },
  searchBar_text: {
    marginLeft: MARGIN_LEFT_BETWEEN_TEXT_ICON
  },

  searchButton: {
    ...theme.typo.set.searchPrimary,
    color: "white",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    boxSizing: "border-box",
    height: SEARCH_BUTTON_HEIGHT,
    padding: "10px 26px",

    backgroundColor: theme.palette.main,
    borderRadius: "24px",
    cursor: "pointer"
  }
});

type Props = WithStylesProps<typeof styles> & {
  onSearch: (query: string) => void;
};

type State = {
  stQuery: string;
};

class SearchBar extends React.Component<Props, State> {
  state: State = {
    stQuery: ""
  };

  render() {
    const { classes, onSearch } = this.props;
    const { stQuery } = this.state;

    return (
      <div className={classes.searchBar}>
        <div className={classes.searchBar_explore}>
          <MagnifyGlass className={classes.searchBar_icon} />
          <input
            onChange={(event) => {
              this.setState({
                stQuery: event.target.value
              });
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onSearch(stQuery);
              }
            }}
            className={classes.searchBar_input}
            placeholder="Explore"
          />
        </div>

        <div className={classes.divider} />

        <div className={classes.searchBar_otherTile}>
          <Calendar className={classes.searchBar_icon} />
          <div className={classes.searchBar_text}>Calendar</div>
        </div>

        <div className={classes.divider} />

        <div className={classes.searchBar_otherTile}>
          <Map className={classes.searchBar_icon} />
          <div className={classes.searchBar_text}>Map</div>
        </div>

        <div className={classes.divider} />

        <div className={classes.searchBar_otherTile}>
          <EventIcon className={classes.searchBar_icon} />
          <div className={classes.searchBar_text}>Type</div>
        </div>

        <div className={classes.divider} />

        <div className={classes.searchBar_search}>
          <div
            className={classes.searchButton}
            onClick={() => {
              onSearch(stQuery);
            }}
          >
            Search
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SearchBar);
