import {createElemPropsHook} from '@workday/canvas-kit-react/common';

import {useDisclosureModel} from './useDisclosureModel';

export const useDisclosureContent = createElemPropsHook(useDisclosureModel)(model => ({
  id: model.state.id,
  hidden: !model.state.visible,
}));
