import * as React from "react";
import { Location, useLocation } from "react-router-dom";

export type WithLocationProps = {
  location: Location;
};

// https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
export function withLocation<T extends WithLocationProps = WithLocationProps>(
  WrappedComponent: React.ComponentType<T>
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithLocation = (props: Omit<T, keyof WithLocationProps>) => {
    // Fetch the props you want to inject. This could be done with context instead.
    const location = useLocation();

    // props comes afterwards so the can override the default ones.
    return <WrappedComponent {...(props as T)} location={location} />;
  };

  ComponentWithLocation.displayName = `withLocation(${displayName})`;

  return ComponentWithLocation;
}
