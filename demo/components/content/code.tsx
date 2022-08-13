import { CodeBlock, anOldHope } from 'react-code-blocks';

// https://github.com/rajinwonderland/react-code-blocks

type Props = {
  text: string;
  language: string;
  showLineNumbers?: boolean;
  wrapLongLines?: boolean;
};

export const Code = ({
  text,
  language,
  showLineNumbers = true,
  wrapLongLines = true,
}: Props) => {
  return (
    <div className="text-sm font-fira">
      <CodeBlock
        text={text}
        language={language}
        showLineNumbers={showLineNumbers}
        wrapLongLines={wrapLongLines}
        theme={anOldHope}
      />
    </div>
  );
};
