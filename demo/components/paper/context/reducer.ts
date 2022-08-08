import update, { Spec } from "immutability-helper";
import { Item, ItemData } from "../items";
import { ToolName } from "../tools";
import { Image } from "../image";

export type Selection = string | undefined;

export type State = {
  loading?: boolean;
  scope?: paper.PaperScope;
  image?: Image;
  history: Image[];
  historyIndex: number;
  routeIndex: number;
  selection: Selection;
  tool: ToolName;
  zoom: number;
};

export type Action =
  | { type: "setLoading"; loading?: boolean }
  | { type: "setScope"; scope?: paper.PaperScope }
  | { type: "setImage"; image?: Image }
  | { type: "setTool"; tool: ToolName }
  | { type: "setSelection"; selection: Selection }
  | { type: "setZoom"; zoom: number }
  | { type: "addItem"; item: Item }
  | { type: "updateItem"; item: ItemData; index: number }
  | { type: "removeItem"; index: number }
  | { type: "undo" }
  | { type: "redo" }
  | { type: "reset" };

export type Reducer = React.Reducer<State, Action>;
export type Dispatch = React.Dispatch<Action>;
export type Value = [State, Dispatch];

export const initialState: State = {
  loading: true,
  scope: undefined,
  image: undefined,
  history: [],
  historyIndex: 0,
  routeIndex: 0,
  selection: undefined,
  tool: ToolName.Move,
  zoom: 1,
};

const updateHistory = (state: State, spec: Spec<Item[]>) => {
  const current = state.history[state.historyIndex];
  const image = update<Image>(current, {
    routes: { [state.routeIndex]: { items: spec } },
  });
  const historyIndex = state.historyIndex + 1;
  const history = [...state.history.slice(0, historyIndex), image];
  return update(state, { $merge: { history, historyIndex } });
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setLoading": {
      return update(state, {
        loading: {
          $set: action.loading,
        },
      });
    }
    case "setScope": {
      return update(state, {
        scope: {
          $set: action.scope,
        },
      });
    }
    case "setImage": {
      const image = action.image;
      return update(state, {
        $merge: {
          image,
          history: image ? [image] : [],
          historyIndex: 0,
          selection: undefined,
          loading: false,
        },
      });
    }
    case "setTool": {
      return update(state, {
        tool: {
          $set: action.tool,
        },
      });
    }
    case "setSelection": {
      return update(state, {
        selection: {
          $set: action.selection,
        },
      });
    }
    case "setZoom": {
      return update(state, {
        zoom: {
          $set: action.zoom,
        },
      });
    }
    case "addItem": {
      return updateHistory(state, {
        $push: [action.item],
      });
    }
    case "updateItem": {
      return updateHistory(state, {
        [action.index]: { $merge: action.item },
      });
    }
    case "removeItem": {
      return updateHistory(state, {
        $splice: [[action.index, 1]],
      });
    }
    case "undo": {
      if (state.historyIndex <= 0) {
        return state;
      }
      return update(state, {
        $merge: {
          historyIndex: state.historyIndex - 1,
          selection: undefined,
        },
      });
    }
    case "redo": {
      if (state.historyIndex >= state.history.length - 1) {
        return state;
      }
      return update(state, {
        $merge: {
          historyIndex: state.historyIndex + 1,
          selection: undefined,
        },
      });
    }
    case "reset": {
      return update(state, {
        $merge: {
          history: [],
          historyIndex: 0,
          selection: undefined,
        },
      });
    }
    default: {
      return state;
    }
  }
};
