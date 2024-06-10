import React from 'react';

import {CodeBlockInternal} from './CodeBlock';

interface ExampleCodeBlockProps {
  code: {
    (): JSX.Element;
    __RAW__: string;
  };
  live?: boolean;
  scope?: object;
  showCode?: boolean;
}

export const ExampleCodeBlock = ({
  code,
  live = true,
  scope,
  showCode = false,
}: ExampleCodeBlockProps) => {
  console.log('RAW', code);
  return (
    <CodeBlockInternal
      rawCode={code}
      className="language-tsx"
      live={live}
      scope={scope}
      showCode={showCode}
      Component={code}
    >
      {code.__RAW__}
    </CodeBlockInternal>
  );
};
