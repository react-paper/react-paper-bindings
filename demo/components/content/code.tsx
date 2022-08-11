import { useAppContext } from 'components/context';
import { CodeBlock, anOldHope, hybrid } from 'react-code-blocks';

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
  const [state] = useAppContext();
  return (
    <div className="text-sm font-fira">
      <CodeBlock
        text={text}
        language={language}
        showLineNumbers={showLineNumbers}
        wrapLongLines={wrapLongLines}
        theme={state.theme === 'light' ? hybrid : anOldHope}
        //theme={tomorrowNight}
      />
    </div>
  );
};
