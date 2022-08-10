import { CodeBlock, nord } from 'react-code-blocks';

// https://github.com/rajinwonderland/react-code-blocks

type Props = {
  text: string;
  language: string;
  showLineNumbers?: boolean;
  wrapLongLines?: boolean;
  theme?: any;
};

export const Code = ({
  text,
  language,
  showLineNumbers = true,
  wrapLongLines = true,
  theme = nord,
}: Props) => (
  <div className="text-sm">
    <CodeBlock
      text={text}
      language={language}
      showLineNumbers={showLineNumbers}
      wrapLongLines={wrapLongLines}
      theme={theme}
    />
  </div>
);
