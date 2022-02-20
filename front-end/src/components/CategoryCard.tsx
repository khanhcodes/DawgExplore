import React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import { artCulture, proDev } from "../data";
import { withRouter, WithRouterProps } from "../HOC/react-router-dom";
import { Theme } from "../theme";

const styles = (theme: typeof Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    float: "left",
    width: "470px",
    height: "300px",

    position: "relative",

    borderRadius: "12px",
    overflow: "hidden",
    margin: "10px",

    boxShadow: "2px 4px 9px rgba(0, 0, 0, 0.25)",
    transition: "box-shadow 0.2s, width 0.2s, height 0.2s",

    "&:hover": {
      boxShadow: "0 1.5rem 4rem rgba(0, 0, 0, 0.2)",
      width: "480px",
      height: "310px"
    }
  },

  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    height: "100%",
    maxWidth: "50%",
    overflow: "hidden",
    borderRadius: "7px"
  },
  image: {
    objectFit: "cover",
    display: "block",
    justifyContent: "center",
    width: "100%"
  },

  content: {
    display: "flex",
    textAlign: "left",
    justifyContent: "space-between",
    flexDirection: "column",

    boxSizing: "border-box",
    width: "100%",
    height: "100",

    flexGrow: 1,

    "&:hover": {
      background: "#FFE6E6",
      cursor: "pointer"
    }
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

type Props = WithRouterProps & WithStylesProps<typeof styles>;

class CategoryCard extends React.Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.imageContainer}></div>

        <div className={classes.content}>
          <div>
            <img src={artCulture} className={classes.image} />
          </div>
        </div>
        <div className={classes.content}>
          <div>
            <img src={proDev} className={classes.image} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(CategoryCard));
