import {
  useListItemRegister,
  useListItemRemoveOnDeleteKey,
} from '@workday/canvas-kit-react/collection';
import {composeHooks, createElemPropsHook} from '@workday/canvas-kit-react/common';

import {useTagListModel} from './useTagListModel';

/**
 * `listItemRemove` (used by both `useListItemRemoveOnDeleteKey` and this list's own click-to-remove
 * handler) picks the "next" item to focus relative to `model.state.cursorId`, the way roving-focus
 * lists (e.g. `useListItemRovingFocus`) do. This list uses native Tab order instead of roving
 * focus, so nothing normally keeps `cursorId` in sync — it stays at its empty default, which makes
 * `listItemRemove` always resolve "next" to index `0` regardless of which tag is actually being
 * removed. When the removed tag *is* the first one, that "next" id is the very id being removed,
 * so the removal focus utilities go looking for a DOM node that's already gone.
 *
 * The fix is small: keep `cursorId` pointed at whichever tag's remove button currently has focus,
 * without adopting roving tabindex itself. `useListItemRovingFocus` was deliberately not used here
 * since it also manages `tabIndex`/arrow-key navigation, which a flat, Tab-navigable tag list
 * doesn't want.
 */
const useTagListItemCursor = createElemPropsHook(useTagListModel)((model, _ref, elemProps) => ({
  onFocus() {
    const id = elemProps?.['data-id'] as string | undefined;
    if (id) {
      model.events.goTo({id});
    }
  },
}));

/**
 * Composes item registration, delete-key removal, and cursor tracking (see
 * `useTagListItemCursor` above).
 *
 * `composeHooks` executes hooks right-to-left and merges props left-to-right, so
 * `useListItemRegister` (which produces `data-id` and registers the item with the collection)
 * must run first, per its own JSDoc, and is listed last here.
 */
export const useTagListItem = composeHooks(
  useListItemRemoveOnDeleteKey,
  useTagListItemCursor,
  useListItemRegister
);
