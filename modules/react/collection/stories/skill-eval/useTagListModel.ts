import {useListModel} from '@workday/canvas-kit-react/collection';
import {createModelHook} from '@workday/canvas-kit-react/common';

/**
 * `useListModel` defaults `shouldVirtualize` to `true` whenever `items` are provided, which
 * assumes a scrollable, measurable container (as `ListBox` provides). A flat tag list has no such
 * container and is never long enough to need windowing, so this wraps `useListModel` and flips
 * that default off. Everything else — including the `onRemove`/`shouldRemove` callback and guard
 * that `createModelHook` wires up automatically for the model's `remove` event — is inherited
 * unchanged.
 */
export const useTagListModel = createModelHook({
  defaultConfig: {
    ...useListModel.defaultConfig,
    shouldVirtualize: false,
  },
  requiredConfig: useListModel.requiredConfig,
})(config => {
  return useListModel(config);
});
