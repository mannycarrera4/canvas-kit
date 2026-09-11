import * as React from 'react';

import {focusOnCurrentCursor} from '@workday/canvas-kit-react/collection';
import {createSubcomponent, slugify} from '@workday/canvas-kit-react/common';
import {Pill} from '@workday/canvas-kit-react/pill';
import {createStyles, handleCsProp} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

import {useTagListItem} from './useTagListItem';
import {useTagListModel} from './useTagListModel';

export interface TagListItemProps {
  /**
   * The visible label rendered inside the tag's `Pill`. Also used to build the remove button's
   * accessible name ("Remove {children}").
   */
  children: string;
}

const tagListItemStyles = createStyles({
  display: 'inline-flex',
  alignItems: 'center',
  gap: system.gap.xxs,
});

/**
 * `listItemRemove` (exported by `@workday/canvas-kit-react/collection`) computes "the next item to
 * focus" relative to `model.state.cursorId`. That's correct for roving-focus lists, where cursorId
 * always tracks the focused item, but this list uses native Tab order instead, so cursorId is only
 * reliably in sync with a click (see `useTagListItem`'s `onFocus` tracking, which only fires once a
 * button has actually been focused). To make click-driven removal correct regardless of prior
 * focus, this computes the sibling directly from the id being removed instead of the cursor.
 */
const getSiblingId = (id: string, items: {id: string}[]): string | undefined => {
  const index = items.findIndex(item => item.id === id);
  if (index === -1) {
    return undefined;
  }
  const nextIndex = index === items.length - 1 ? index - 1 : index + 1;
  return items[nextIndex]?.id;
};

/**
 * Renders a single tag as a removable `Pill`, registered with the parent `TagList`'s collection.
 *
 * `useListItemRemoveOnDeleteKey` normally redirects focus after a keyboard-triggered removal via
 * `data-focus-id`, an attribute set by collection's roving-focus hooks. This list intentionally
 * does not use roving focus (native Tab order is enough for a flat tag list), so
 * `Pill.IconButton` sets `data-focus-id` itself below. That keeps keyboard removal (Delete /
 * Backspace) and mouse removal (the Pill's own remove icon) landing on the same
 * `focusOnCurrentCursor` utility for the actual focus move.
 */
export const TagListItem = createSubcomponent('div')({
  displayName: 'TagList.Item',
  modelHook: useTagListModel,
  elemPropsHook: useTagListItem,
})<TagListItemProps>(({children, ...elemProps}, Element, model) => {
  const id = (elemProps['data-id'] as string) || '';

  const handleRemove = () => {
    const nextId = getSiblingId(id, model.state.items);
    model.events.remove({id, nextId});
    if (nextId) {
      // Defensive `catch`: `focusOnCurrentCursor` rejects if it can't find a matching
      // `data-focus-id` after a few animation frames. That shouldn't happen here since we set
      // `data-focus-id` below, but an uncaught rejection would otherwise surface as a console
      // error.
      focusOnCurrentCursor(model, nextId).catch(() => undefined);
    }
  };

  return (
    <Element {...handleCsProp(elemProps, tagListItemStyles)}>
      <Pill variant="removable">
        <Pill.Label>{children}</Pill.Label>
        <Pill.IconButton
          aria-label={`Remove ${children}`}
          data-focus-id={slugify(`${model.state.id}-${id}`)}
          onClick={handleRemove}
        />
      </Pill>
    </Element>
  );
});
