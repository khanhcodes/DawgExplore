import * as React from "react";
let img =
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2250&amp;q=80";
export default class EventCards extends React.Component<{}> {
  render() {
    return (
      <div className="grid">
        <div className="grid__item">
          <div className="card">
            <img src={img} />
            <div className="card__content">
              <h1 className="card__header">A starry night</h1>
              <p className="card__text">
                Look up at the night sky, and find yourself <strong>immersed</strong> in the amazing mountain range of
                Aspen.{" "}
              </p>
              <button className="card__btn">
                Explore <span>&rarr;</span>
              </button>
            </div>
          </div>
          <div className="card">
            <img src={img} />
            <div className="card__content">
              <h1 className="card__header">A starry night</h1>
              <p className="card__text">
                Look up at the night sky, and find yourself <strong>immersed</strong> in the amazing mountain range of
                Aspen.{" "}
              </p>
              <button className="card__btn">
                Explore <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
