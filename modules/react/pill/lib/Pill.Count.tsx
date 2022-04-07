import React from 'react';

import {createComponent, styled, StyledType} from '@workday/canvas-kit-react/common';
import {Box, BoxProps} from '@workday/canvas-kit-react/layout';
import {borderRadius, colors, space} from '@workday/canvas-kit-react/tokens';

export interface PillCountProps extends BoxProps {}
const StyledCountContainer = styled(Box.as('span'))<StyledType>({
  height: '23px',
  width: '23px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopLeftRadius: borderRadius.zero,
  borderTopRightRadius: borderRadius.m,
  borderBottomLeftRadius: borderRadius.zero,
  borderBottomRightRadius: borderRadius.m,
});
export const PillCount = createComponent('span')({
  displayName: 'Pill.Avatar',
  Component: ({children, ...elemProps}: PillCountProps, ref, Element) => {
    return (
      <StyledCountContainer backgroundColor={colors.soap500} ref={ref} {...elemProps}>
        {children}
      </StyledCountContainer>
    );
  },
});
