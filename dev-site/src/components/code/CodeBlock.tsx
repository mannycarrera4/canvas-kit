import React from 'react';
import Highlight, {defaultProps, Language, PrismTheme} from 'prism-react-renderer';

import {space, colors, commonColors, borderRadius, type} from '@workday/canvas-kit-react/tokens';
import {Box} from '@workday/canvas-kit-react/layout';
import {Tooltip} from '@workday/canvas-kit-react/tooltip';
import {extLinkIcon} from '@workday/canvas-system-icons-web';
import CodeBlock from '@theme/CodeBlock';

import {CodeBlockButton, CodeBlockButtonBar} from './CodeBlockButton';
import theme from './canvasPrismTheme';
// import {ContentOverflowBox} from '../ContentOverflowBox';
// import {useStatusRegion} from '../../StatusRegion';

export interface CodeBlockProps {
  className: string;
  live?: boolean;
  fileName?: string;
  scope?: object;
  showCode?: boolean;
  children: string;
  rawCode: {
    (): JSX.Element;
    __RAW__: string;
  };
  Component?: () => JSX.Element;
}

export interface CodeProps {
  code: string;
  language: Language;
  theme: PrismTheme;
  extraStyles?: object;
}

const editorStyles = {
  ...type.levels.subtext.medium,
  fontFamily: type.properties.fontFamilies.monospace,
  borderRadius: `0 0 ${borderRadius.m} ${borderRadius.m}`,
  background: colors.soap200,
  padding: space.s,
};

const Code = ({code, language, theme, extraStyles = {}}: CodeProps) => (
  <Highlight {...defaultProps} code={code} language={language} theme={theme}>
    {({className, style, tokens, getLineProps, getTokenProps}) => {
      return (
        <pre className={className} style={{...editorStyles}}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
        </pre>
      );
    }}
  </Highlight>
);

// From https://mdxjs.com/guides/live-code
export const CodeBlockInternal = ({
  className,
  live,
  fileName,
  showCode = false,
  children,
  Component,
  rawCode,
}: CodeBlockProps) => {
  const language = className?.replace(/(language-|lang-)/, '') as Language;

  const codeCode = children.trim();
  // console.log(codeCode.join(''));

  const [isCodeVisible, setIsCodeVisible] = React.useState(showCode);
  const [isCopied, setIsCopied] = React.useState(false);

  // const statusRegion = useStatusRegion();

  // Treat non-language code as inline code rather than a codeblock
  if (!className || (!className.includes('language-') && !className.includes('lang-'))) {
    return (children && <code>{children}</code>) || <span />;
  }

  const handleCodeToggleClick = () => {
    setIsCodeVisible(!isCodeVisible);
    setIsCopied(false);
  };

  const handleCodeCopyClick = () => {
    // TODO: Figure out more compatible to implement copy functionality
    // eslint-disable-next-line
    navigator.permissions.query({name: 'clipboard-write' as PermissionName}).then(result => {
      if (result.state == 'granted' || result.state == 'prompt') {
        navigator.clipboard.writeText(codeCode).then(
          function () {
            // Clipboard successfully set
            setIsCopied(true);

            // Politely announce the code copied action to screen readers
            // TODO: This announcement should be more descriptive ("[Component] [Example Name] code copied")
            // statusRegion.announcePolite(`Code copied`);

            setTimeout(() => {
              setIsCopied(false);
            }, 5000);
          },
          function () {
            // Clipboard write failed
          }
        );
      }
    });
  };

  if (fileName) {
    return <span>fileName</span>;
  }

  // Be VERY careful when modifying the rendered markup for this component. It
  // was very difficult to get this component to render at full width AND have
  // horizontal scrolling enabled for both the rendered component and its
  // corresponding code snippet AND have the Show/Hide Code and Copy buttons
  // positioned correctly as you scroll AND have all of that work with our
  // responsive layout.

  if (live) {
    return (
      <Box
        className="exclude-anchor-nav"
        border={`1px solid ${commonColors.divider}`}
        borderRadius="m"
        marginY="l"
      >
        {/*
          Be careful about moving this relative around. This was the only spot
          I could leave it and have the Show/Hide Code button be positioned
          correctly.
        */}
        <Box position="relative">
          {/*
            Reduce width of this box by 2px to compensate for 2px border of
            outer box
          */}
          <Box>
            {/*
              inline-block is required for this Box's padding to be displayed
              around the rendered component. minWidth of 100% is required for
              the full width of this Box to be available to the rendered
              component (for example, for inputs with grow set to true).
            */}
            <Box
              paddingTop="m"
              paddingBottom="xl"
              paddingX="m"
              display="inline-block"
              minWidth="100%"
            >
              {/* Render Component */}
              {Component ? <Component /> : null}
              <CodeBlockButtonBar>
                <CodeBlockButton onClick={handleCodeToggleClick}>
                  {isCodeVisible ? 'Hide Code' : 'Show Code'}
                </CodeBlockButton>
              </CodeBlockButtonBar>
            </Box>
          </Box>
        </Box>
        {isCodeVisible && (
          <Box position="relative">
            {/*
              Reduce width of this box by 2px to compensate for 2px border of
              outer box
            */}
            <Box>
              {/*
                inline-block is required for the gray background of the Code
                component to occupy the full width of the ContentOverflowBox
                container if Code is wider than the Box. minWidth of 100% is
                required to ensure the gray background occupies the full width
                if Code is narrower than the Box.
              */}
              <Box display="inline-block" minWidth="100%">
                <CodeBlock language="jsx">{`${codeCode}`}</CodeBlock>

                {/* foo bar */}
                {/* <DocusarusCodeBlock
                  language="jsx"
                  title="/src/components/HelloCodeTitle.js"
                  showLineNumbers
                >
                  {codeCode}
                </DocusarusCodeBlock> */}
                {/* <Code code={codeCode} language={language} theme={theme} /> */}
                <CodeBlockButtonBar>
                  <CodeBlockButton onClick={handleCodeCopyClick}>
                    {isCopied ? 'Copied!' : 'Copy Code'}
                  </CodeBlockButton>
                </CodeBlockButtonBar>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box
      border={`1px solid ${commonColors.divider}`}
      borderRadius="m"
      marginTop="m"
      marginBottom="xl"
      // Limit width of overflow box to 280px if it's contained within a table.
      // This accounts for code blocks which are shown within prop tables and
      // prevents them from making the table too wide.
      //
      // TODO: Get rid of 280px magic number and figure out a better way to do
      // this.
      css={{'table &': {maxWidth: 280}}}
    >
      {/*
        inline-block is required for the gray background of the Code
        component to occupy the full width of the ContentOverflowBox
        container if Code is wider than the Box. minWidth of 100% is
        required to ensure the gray background occupies the full width
        if Code is narrower than the Box.
      */}
      <Box display="inline-block" minWidth="100%">
        {/* <Code code={codeCode} language={language} theme={theme} /> */}
      </Box>
    </Box>
  );
};
