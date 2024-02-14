import React from 'react';
import {GridProps, mergeStyles} from '@workday/canvas-kit-react/layout';
import {createComponent} from '@workday/canvas-kit-react/common';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';
import {base, system} from '@workday/canvas-tokens-web';

const headerStyles = createStyles({
  display: 'grid',
  alignItems: 'center',
  backgroundColor: base.frenchVanilla100,
  borderBottom: `${px2rem(1)} solid ${base.soap400}`,
  justifyContent: 'start',
  minHeight: '3.5rem',
  padding: `${system.space.x2} ${system.space.x4}`,
  wordBreak: 'break-word',
  fontWeight: system.fontWeight.medium,
  boxSizing: 'border-box',
});

export const TableHeader = createComponent('th')({
  displayName: 'Table.Header',
  Component: ({children, ...elemProps}: GridProps, ref, Element) => {
    return (
      <Element ref={ref} {...mergeStyles(elemProps, headerStyles)}>
        {children}
      </Element>
    );
  },
});
