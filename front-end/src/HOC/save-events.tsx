import * as React from "react";
import { Event } from "../types";

// Basic Types

type SavedEventsContext = {
  savedEvents: Event[];
  setSavedEvents: (newArray: Event[]) => void;
};

export type WithSavedEventsProps = {
  savedEventsContext: SavedEventsContext;
};

const WithSavedEventsContext = React.createContext<SavedEventsContext>({
  savedEvents: [],
  setSavedEvents: () => {
    return;
  }
});

type Props = {
  children: React.ReactNode;
  [key: string]: any /* eslint-disable-line @typescript-eslint/no-explicit-any */;
};

// 2 main components of a HOC-and-provider combo

export function SavedEventsProvider(props: Props): JSX.Element {
  const savedEventsHook = useSavedEvents();
  return <WithSavedEventsContext.Provider value={savedEventsHook}>{props.children}</WithSavedEventsContext.Provider>;
}

export function withSavedEvents<T extends WithSavedEventsProps = WithSavedEventsProps>(
  WrappedComponent: React.ComponentType<T>
): { (props: Omit<T, keyof WithSavedEventsProps>): JSX.Element; displayName: string } {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  const Component = (props: Omit<T, keyof WithSavedEventsProps>) => {
    return (
      <WithSavedEventsContext.Consumer>
        {(savedEventsContext) => (
          <WrappedComponent {...(props as T)} savedEventsContext={savedEventsContext}></WrappedComponent>
        )}
      </WithSavedEventsContext.Consumer>
    );
  };

  Component.displayName = `withSavedEvents(${displayName})`;

  return Component;
}

// Provider Helper Hook

function useSavedEvents(): SavedEventsContext {
  const [savedEvents, setSavedEvents] = React.useState<Event[]>([]);

  const setSavedEvents_Wrapper = (newArray: Event[]) => {
    setSavedEvents([...newArray]);
  };

  return {
    savedEvents,
    setSavedEvents: setSavedEvents_Wrapper
  };
}
