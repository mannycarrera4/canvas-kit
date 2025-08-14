import {createComponent} from '@workday/canvas-kit-react/common';
import {mergeStyles} from '@workday/canvas-kit-react/layout';
import {createStencil, CSProps} from '@workday/canvas-kit-styling';

export interface ButtonLabelProps extends CSProps {
  children: React.ReactNode;
}

const buttonLabelStencil = createStencil({
  base: {
    position: 'relative', // Fixes an IE issue with text within button moving on click
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
});

export const ButtonLabel = createComponent('span')({
  displayName: 'ButtonLabel',
  Component: ({children, ...elemProps}: ButtonLabelProps, ref, Element) => {
    return (
      <Element ref={ref} {...mergeStyles(elemProps, buttonLabelStencil())}>
        {children}
      </Element>
    );
  },
});
