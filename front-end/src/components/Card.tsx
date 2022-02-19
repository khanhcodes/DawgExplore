import React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import { image } from "../data";
import { Theme } from "../theme";

const styles = (theme: typeof Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",

    width: "400px",

    margin: "40px 0px",

    borderRadius: "0.4rem",
    overflow: "hidden",

    boxShadow: "0 3rem 6rem rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.2s",

    "&:hover": {
      boxShadow: "0 4rem 8rem rgba(0, 0, 0, 0.2)"
    }
  },

  image: {
    width: "100%",
    objectFit: "cover"
  },

  content: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",

    boxSizing: "border-box",
    width: "100%",
    padding: "20px",

    flexGrow: 1
  },
  header: {
    fontSize: theme.typo.fontSize.xl,
    fontWeight: theme.typo.boldness.medium,
    marginBottom: "20px"
  },
  description: {
    fontSize: theme.typo.fontSize.md,
    letterSpacing: "0.1rem",
    lineHeight: 1.7,
    color: theme.typo.color.secondary.dark,
    marginBottom: "20px"
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

type Props = WithStylesProps<typeof styles> & {
  header: string;
  description: string;
};

class Card extends React.Component<Props> {
  render() {
    const { classes, header, description } = this.props;

    return (
      <div className={classes.root}>
        <img src={image} className={classes.image} />

        <div className={classes.content}>
          <div>
            <div className={classes.header}>{header}</div>
            <div className={classes.description}>{description}</div>
          </div>

          <div className={classes.exploreButton}>
            Explore <span>&rarr;</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Card);
