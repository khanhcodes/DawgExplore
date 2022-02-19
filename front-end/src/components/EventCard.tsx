import * as React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import { image } from "../data";
import { Theme } from "../theme";

const styles = (theme: typeof Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",

    width: "280px",
    height: "310px",

    margin: "10px 0px",

    borderRadius: "12px",
    overflow: "hidden",

    boxShadow: "2px 4px 9px rgba(0, 0, 0, 0.25)",
    transition: "box-shadow 0.2s, width 0.2s, height 0.2s",

    "&:hover": {
      boxShadow: "0 1.5rem 4rem rgba(0, 0, 0, 0.2)",
      width: "290px",
      height: "320px"
    }
  },

  image: {
    width: "100%",
    height: "160px",
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
    maxWidth: "85%",
    maxHeight: "70px",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    textOverflow: "ellipsis"
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
    padding: "10px",
    textAlign: "center",

    fontSize: theme.typo.fontSize.lg,
    color: "#3363ff",
    backgroundColor: "#e6ecff",

    borderRadius: "0.4rem",

    transition: "background-color 0.2s",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "#dce4ff"
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

type Props = WithStylesProps<typeof styles>;

class EventCard extends React.Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <img src={image} className={classes.image} />
        <div className={classes.content}>
          <div>
            <div className={classes.header}>Football Celebration</div>
            <div className={classes.location}>Sanford Stadium, UGA</div>
            <div className={classes.description}>
              The first step on the path toward becoming a yoga teacher or simply deepening the practice, Level One
              provides the tools to create inspiring vinyasa yoga classes grounded in proper alignment and the safety of
              exercise science.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EventCard);
