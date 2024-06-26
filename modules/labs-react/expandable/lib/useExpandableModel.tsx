import {createModelHook} from '@workday/canvas-kit-react/common';
import {useDisclosureModel} from '@workday/canvas-kit-react/disclosure';

export const useExpandableModel = createModelHook({
  defaultConfig: {
    ...useDisclosureModel.defaultConfig,
  },
})(config => {
  const disclosure = useDisclosureModel(config);
  const state = {
    ...disclosure.state,
  };
  const events = {
    ...disclosure.events,
  };
  return {state, events};
});
