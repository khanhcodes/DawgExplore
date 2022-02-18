import * as React from "react";
export default class NavigationBar extends React.Component<{}> {
  render() {
    return (
      <div className="topnav">
        <a className="active" href="#">
          Home
        </a>
        <a href="#">Explore</a>
        <a href="#">Map</a>
        <a href="#">My Tickets</a>
        <a href="#">Saved Events</a>
      </div>
    );
  }
}
