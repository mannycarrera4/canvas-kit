import React from 'react';

import {
  createComponent,
  styled,
  StyledType,
  useDefaultModel,
} from '@workday/canvas-kit-react/common';
import {OverflowTooltip} from '@workday/canvas-kit-react/tooltip';
import {Box} from '@workday/canvas-kit-react/layout';

import {usePillModel, PillModel, PillModelConfig} from './usePillModel';
import {PillTarget} from './Pill.Target';
import {PillContent} from './Pill.Content';
import {space} from '@workday/canvas-kit-react/tokens';

export const PillModelContext = React.createContext<PillModel>({} as any);

export interface PillProps extends PillModelConfig {
  model?: PillModel;
  children: React.ReactNode;
  emphasis?: 'low' | 'high';
  maxWidth?: number;
}

const StyledPillContainer = styled(Box.as('button'))<StyledType & PillProps>({
  height: space.m,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export const Pill = createComponent('button')({
  displayName: 'Pill',
  Component: (
    {children, emphasis = 'low', maxWidth = 200, model, ...config}: PillProps,
    ref,
    Element
  ) => {
    // const value = useDefaultModel(model, config, usePillModel);

    return (
      <OverflowTooltip>
        <StyledPillContainer
          backgroundColor={emphasis === 'low' ? 'transparent' : 'blackPepper100'}
          maxWidth={maxWidth}
          ref={ref}
          as={Element}
        >
          {children}
        </StyledPillContainer>
      </OverflowTooltip>
    );
  },
  subComponents: {
    Target: PillTarget,
    Content: PillContent,
  },
});
