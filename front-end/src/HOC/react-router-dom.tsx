import * as React from "react";
import { Location, NavigateFunction, useLocation, useNavigate } from "react-router-dom";

export type WithRouterProps = {
  location: Location;
  navigate: NavigateFunction;
};

// https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
export function withRouter<T extends WithRouterProps = WithRouterProps>(WrappedComponent: React.ComponentType<T>) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithRouter = (props: Omit<T, keyof WithRouterProps>) => {
    // Fetch the props you want to inject. This could be done with context instead.
    const location = useLocation();
    const navigate = useNavigate();

    // props comes afterwards so the can override the default ones.
    return <WrappedComponent {...(props as T)} location={location} navigate={navigate} />;
  };

  ComponentWithRouter.displayName = `withRouter(${displayName})`;

  return ComponentWithRouter;
}
