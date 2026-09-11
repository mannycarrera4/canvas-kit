import {createElemPropsHook} from '@workday/canvas-kit-react/common';

import {useDisclosureModel} from './useDisclosureModel';

export const useDisclosureTarget = createElemPropsHook(useDisclosureModel)(model => ({
  type: 'button' as const,
  'aria-expanded': model.state.visible,
  'aria-controls': model.state.id,
  onClick() {
    if (model.state.visible) {
      model.events.hide();
    } else {
      model.events.show();
    }
  },
}));
