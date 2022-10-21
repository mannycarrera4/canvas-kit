import React from 'react';

import {ExtractProps, createContainer, createElemPropsHook} from '@workday/canvas-kit-react/common';
import {colors} from '@workday/canvas-kit-react/tokens';
import {HStack} from '@workday/canvas-kit-react/layout';
import {StatusIndicatorIcon} from './StatusIndicatorIcon';
import {StatusIndicatorLabel} from './StatusIndicatorLabel';
import {StatusIndicatorEmphasis, StatusIndicatorVariant, useStatusIndicatorModel} from './hooks';

export const getStatusIndicatorColors = (
  variant: StatusIndicatorVariant,
  emphasis: StatusIndicatorEmphasis
) => {
  let statusIndicatorTextAndIconColor = '';
  let statusIndicatorBackgroundColor = '';
  switch (variant) {
    case 'gray':
      {
        if (emphasis === 'high') {
          statusIndicatorTextAndIconColor = colors.frenchVanilla100;
          statusIndicatorBackgroundColor = colors.licorice300;
        } else {
          statusIndicatorTextAndIconColor = colors.licorice400;
          statusIndicatorBackgroundColor = colors.soap300;
        }
      }
      break;

    case 'orange':
      {
        if (emphasis === 'high') {
          statusIndicatorTextAndIconColor = colors.licorice500;
          statusIndicatorBackgroundColor = colors.cantaloupe400;
        } else {
          statusIndicatorTextAndIconColor = colors.toastedMarshmallow600;
          statusIndicatorBackgroundColor = colors.cantaloupe100;
        }
      }
      break;
    case 'blue':
      {
        if (emphasis === 'high') {
          statusIndicatorTextAndIconColor = colors.frenchVanilla100;
          statusIndicatorBackgroundColor = colors.blueberry400;
        } else {
          statusIndicatorTextAndIconColor = colors.blueberry500;
          statusIndicatorBackgroundColor = colors.blueberry100;
        }
      }
      break;
    case 'green':
      {
        if (emphasis === 'high') {
          statusIndicatorTextAndIconColor = colors.frenchVanilla100;
          statusIndicatorBackgroundColor = colors.greenApple600;
        } else {
          statusIndicatorTextAndIconColor = colors.greenApple600;
          statusIndicatorBackgroundColor = colors.greenApple100;
        }
      }
      break;
    case 'red':
      {
        if (emphasis === 'high') {
          statusIndicatorTextAndIconColor = colors.frenchVanilla100;
          statusIndicatorBackgroundColor = colors.cinnamon500;
        } else {
          statusIndicatorTextAndIconColor = colors.cinnamon600;
          statusIndicatorBackgroundColor = colors.cinnamon100;
        }
      }
      break;
    case 'transparent':
      {
        if (emphasis === 'high') {
          statusIndicatorTextAndIconColor = colors.frenchVanilla100;
          statusIndicatorBackgroundColor = colors.blackPepper600;
        } else {
          statusIndicatorTextAndIconColor = colors.frenchVanilla100;
          statusIndicatorBackgroundColor = colors.blackPepper600;
        }
      }
      break;
    default: {
      statusIndicatorTextAndIconColor = colors.frenchVanilla100;
      statusIndicatorBackgroundColor = colors.licorice300;
    }
  }
  return {
    statusIndicatorTextAndIconColor,
    statusIndicatorBackgroundColor,
  };
};

export interface StatusIndicatorProps extends Partial<ExtractProps<typeof HStack, never>> {
  /**
   * Children of the Status Indicator. Can contain a `<StatusIndicator.Label>` and or `<StatusIndicator.Icon>`
   */
  children: React.ReactNode;
}

export const useStatusIndicator = createElemPropsHook(useStatusIndicatorModel)(({state}) => {
  const colors = getStatusIndicatorColors(state.variant, state.emphasis);
  return {
    opacity: state.variant === 'transparent' ? '0.85' : undefined,
    color: colors.statusIndicatorTextAndIconColor,
    background: colors.statusIndicatorBackgroundColor,
  };
});

export const StatusIndicator = createContainer('div')({
  displayName: 'StatusIndicator',
  modelHook: useStatusIndicatorModel,
  elemPropsHook: useStatusIndicator,
  subComponents: {
    Icon: StatusIndicatorIcon,
    Label: StatusIndicatorLabel,
  },
})<StatusIndicatorProps>(({children, ...elemProps}, Element, model) => {
  return (
    <HStack
      spacing={4}
      as={Element}
      maxWidth={200}
      paddingX="xxxs"
      display="inline-flex"
      alignItems="center"
      height={20}
      borderRadius="s"
      {...elemProps}
    >
      {children}
    </HStack>
  );
});