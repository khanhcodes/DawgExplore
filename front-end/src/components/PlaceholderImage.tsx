import * as React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import LogoImage from "../media/Logo/logo.png";
import { Theme } from "../theme";

const styles = (theme: typeof Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    height: "100%",

    backgroundColor: theme.palette.secondary
  },
  image: {
    height: "90%",
    objectFit: "cover"
  }
});

type Props = WithStylesProps<typeof styles>;

class PlaceholderImage extends React.Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <img className={classes.image} src={LogoImage} />
      </div>
    );
  }
}

export default withStyles(styles)(PlaceholderImage);
