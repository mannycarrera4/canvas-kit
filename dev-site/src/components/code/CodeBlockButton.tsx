import React from 'react';
import {TertiaryButton} from '@workday/canvas-kit-react/button';
import {ExtractProps, createComponent} from '@workday/canvas-kit-react/common';
import {Flex} from '@workday/canvas-kit-react/layout';

const styles = {
  position: 'absolute',
  right: 0,
  bottom: 0,
  '& > button': {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    '&:last-of-type': {
      borderTopRightRadius: 0,
    },
  },
} as const;

export const CodeBlockButton = createComponent('button')({
  displayName: 'CodeBlockButton',
  Component: (
    {children, ...elemProps}: ExtractProps<typeof TertiaryButton, never>,
    ref,
    Element
  ) => (
    <TertiaryButton size="small" ref={ref} as={Element} {...elemProps}>
      {children}
    </TertiaryButton>
  ),
});

export const CodeBlockButtonBar = ({children}: {children: JSX.Element | JSX.Element[]}) => (
  <Flex style={{...styles}}>{children}</Flex>
);
