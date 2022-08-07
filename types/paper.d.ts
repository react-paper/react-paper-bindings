/// <reference path="../node_modules/paper/dist/paper.d.ts" />

/**
 * Add custom paper.js types related to renderer
 *
 * @see http://paperjs.org/reference/paperscope/
 */
declare namespace paper {
  type Props = {
    [key: string]: any;
  };
  interface PaperScope {
    symbols?: { [key: string]: SymbolDefinition };
  }
  interface View {
    props: Props;
    type: string;
    project: Project;
  }
  interface Tool {
    props: Props;
    type: string;
  }
  interface Item {
    props: Props;
    type: string;
    translate(delta: [number, number]): void;
  }
}
