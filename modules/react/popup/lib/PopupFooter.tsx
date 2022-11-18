import * as React from 'react';

import {createSubcomponent, ExtractProps} from '@workday/canvas-kit-react/common';

import {Flex} from '@workday/canvas-kit-react/layout';
import {usePopupModel} from './hooks';

export interface PopupFooterProps extends ExtractProps<typeof Flex> {}

export const PopupFooter = createSubcomponent('div')({
  displayName: 'Popup.Footer',
  modelHook: usePopupModel,
})<PopupFooterProps>(({...elemProps}) => {
  return <Flex padding="xxs" marginTop="xxs" gap="s" flexDirection="row" {...elemProps} />;
});
