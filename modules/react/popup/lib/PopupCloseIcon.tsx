import React from 'react';

import {xIcon} from '@workday/canvas-system-icons-web';
import {
  styled,
  createComponent,
  StyledType,
  useModelContext,
  ExtractProps,
} from '@workday/canvas-kit-react/common';
import {TertiaryButton} from '@workday/canvas-kit-react/button';

import {usePopupCloseButton, PopupModel, PopupModelContext} from './hooks';

const closeIconSpacing = 11;
const closeIconSpacingSmall = 9;

export interface PopupCloseIconProps extends ExtractProps<typeof TertiaryButton, never> {
  /**
   * Optionally pass a model directly to this component. Default is to implicitly use the same
   * model as the container component which uses React context. Only use this for advanced use-cases
   */
  model?: PopupModel;
}

const StyledCloseIcon = styled(TertiaryButton)<StyledType & PopupCloseIconProps>(
  {
    position: 'absolute',
  },
  ({size}) => ({
    right: size === 'small' ? closeIconSpacingSmall : closeIconSpacing,
    top: size === 'small' ? closeIconSpacingSmall : closeIconSpacing,
    margin: `-${size === 'small' ? closeIconSpacingSmall : closeIconSpacing}px`,
  })
);

export const PopupCloseIcon = createComponent('button')({
  displayName: 'Popup.CloseIcon',
  Component: (
    {size = 'medium', children, model, ...elemProps}: PopupCloseIconProps,
    ref,
    Element
  ) => {
    const localModel = useModelContext(PopupModelContext, model);
    const props = usePopupCloseButton(localModel, elemProps, ref);
    return <StyledCloseIcon as={Element} size={size} icon={xIcon} {...props} />;
  },
});
