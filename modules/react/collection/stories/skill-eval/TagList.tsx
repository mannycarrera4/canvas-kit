import * as React from 'react';

import {useListRenderItems} from '@workday/canvas-kit-react/collection';
import {createContainer} from '@workday/canvas-kit-react/common';
import {createStyles, handleCsProp} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

import {TagListItem} from './TagListItem';
import {useTagListModel} from './useTagListModel';

export interface TagListItemValue {
  /** Unique identifier for the tag. Used by the collection to register and remove the item. */
  id: string;
  /** Visible label text rendered inside the tag's `Pill`. */
  text: string;
}

export interface TagListProps {
  /**
   * Render prop invoked once per registered tag. Use it to render a `TagList.Item` for each
   * item passed to the `items` config.
   */
  children: (item: TagListItemValue) => React.ReactNode;
}

const tagListStyles = createStyles({
  display: 'flex',
  flexWrap: 'wrap',
  gap: system.gap.xs,
});

/**
 * A collection-backed list of removable tags. Unlike `ListBox`, `TagList` has no `listbox`
 * semantics, selection state, or roving tabindex — it only registers and removes items. Pass
 * dynamic `items` (each needs an `id` and `text`) and an `onRemove` callback to own the list's
 * membership; `TagList` itself never mutates your array.
 *
 * ```tsx
 * <TagList items={tags} onRemove={({id}) => setTags(prev => prev.filter(t => t.id !== id))}>
 *   {item => <TagList.Item>{item.text}</TagList.Item>}
 * </TagList>
 * ```
 */
export const TagList = createContainer('div')({
  displayName: 'TagList',
  modelHook: useTagListModel,
  subComponents: {
    /**
     * Renders a single tag as a removable `Pill`. Pressing Delete/Backspace while a tag's remove
     * button is focused removes that tag, as does clicking the `Pill`'s own remove icon.
     */
    Item: TagListItem,
  },
})<TagListProps>(({children, ...elemProps}, Element, model) => {
  return (
    <Element id={model.state.id} {...handleCsProp(elemProps, tagListStyles)}>
      {useListRenderItems(model, children)}
    </Element>
  );
});
