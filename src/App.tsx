import React, { useReducer } from "react";

import { fileToDataUrl, loadImage } from "$/helpers/image";
import { ErrorDisplay } from "$/views/ErrorDisplay";
import { Eyedropper } from "$/views/Eyedropper";
import { SelectFile } from "$/views/SelectFile";

import "./App.scss";
import styles from "./App.module.scss";

interface AppState {
  image?: HTMLImageElement;
  error?: string;
  isLoading: boolean;
}

interface AppActionReset {
  type: "reset";
}

interface AppActionLoading {
  type: "loading";
}

interface AppActionLoaded {
  type: "loaded";
  image: HTMLImageElement;
}

interface AppActionError {
  type: "error";
  error: any;
}

type AppAction =
  | AppActionReset
  | AppActionLoading
  | AppActionLoaded
  | AppActionError;

const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "reset":
      return {
        isLoading: false,
      };
    case "error":
      return {
        error: `${action.error}`,
        isLoading: false,
      };
    case "loaded":
      return {
        image: action.image,
        isLoading: false,
      };
    case "loading":
      return {
        isLoading: true,
      };
  }

  return state;
};

export const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, { isLoading: false });

  if (!state.image && !state.error) {
    return (
      <SelectFile
        onChange={async (file) => {
          if (file) {
            try {
              const url = await fileToDataUrl(file);
              const image = await loadImage(url);
              dispatch({ type: "loaded", image });
            } catch (e) {
              dispatch({ type: "error", error: e });
            }
          }
        }}
      />
    );
  }

  return (
    <div className={styles.main}>
      <div>
        <button onClick={() => dispatch({ type: "reset" })}>Go back</button>
      </div>
      {!!state.error && <ErrorDisplay error={state.error} />}
      {!!state.image && <Eyedropper image={state.image} />}
    </div>
  );
};
