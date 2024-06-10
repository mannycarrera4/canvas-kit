import useGlobalData, {usePluginData} from '@docusaurus/useGlobalData';
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
  const {fileContent} = usePluginData('whole-source-loader-docusaurus');
  // console.log('fileContent', fileContent.join('\n'));

  return (
    <CodeBlockInternal
      rawCode={code}
      className="language-tsx"
      live={live}
      scope={scope}
      showCode={showCode}
      Component={code}
    >
      {fileContent}
    </CodeBlockInternal>
  );
};
