import React from 'react';

import {
  composeHooks,
  createElemPropsHook,
  createSubcomponent,
  ExtractProps,
  useForkRef,
  useIsRTL,
} from '@workday/canvas-kit-react/common';
import {TextInput} from '@workday/canvas-kit-react/text-input';
import {usePopupTarget} from '@workday/canvas-kit-react/popup';

import {
  useListActiveDescendant,
  keyboardEventToCursorEvents,
} from '@workday/canvas-kit-react/collection';

import {
  useComboboxModel,
  useComboboxInputOpenWithArrowKeys,
  useMoveCursorToIndex,
  useSetPopupWidth,
} from './hooks';

export const useListKeyboardHandler = createElemPropsHook(useComboboxModel)(model => {
  const isRTL = useIsRTL();

  return {
    onKeyDown(event: React.KeyboardEvent) {
      if (model.state.visibility === 'visible') {
        const handled = keyboardEventToCursorEvents(event, model, isRTL);
        if (handled) {
          event.preventDefault();
        }
      }
    },
  };
});

/**
 * Adds all attributes necessary to start with a {@link ComboboxInput Combobox.Input}. It opens the
 * menu with arrow keys, uses {@link useListActiveDescendant}, and handles keyboard arrows to
 * navigate items of the menu. You may also compose this hook to add more specific behaviors for
 * your {@link ComboboxInput Combobox.Input}.
 */
export const useComboboxInput = composeHooks(
  createElemPropsHook(useComboboxModel)((model, ref) => {
    const elementRef = useForkRef(ref, model.state.inputRef);

    React.useEffect(() => {
      if (model.state.cursorId && model.state.visibility === 'visible') {
        const item = model.navigation.getItem(model.state.cursorId, model);
        if (model.state.isVirtualized && item) {
          model.state.UNSTABLE_virtual.scrollToIndex(item.index);
        } else {
          const listboxId = model.state.inputRef.current?.getAttribute('aria-controls');
          if (listboxId) {
            const menuItem = document.querySelector(
              `[id="${listboxId}"] [data-id="${model.state.cursorId}"]`
            );
            if (menuItem) {
              requestAnimationFrame(() => {
                menuItem.scrollIntoView({block: 'nearest'});
              });
            }
          }
        }
      }

      // we only want to run this effect if the cursor changes and not any other time
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [model.state.cursorId]);

    return {
      onKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter' && !event.metaKey && model.state.visibility === 'visible') {
          const element = document.querySelector(`[data-id="${model.state.cursorId}"]`);
          if (element && element?.getAttribute('aria-disabled') !== 'true') {
            model.events.select({id: model.state.cursorId});
            if (model.state.mode === 'single') {
              model.events.hide(event);
            }
          }

          // We don't want to submit forms while the combobox is open
          event.preventDefault();
        }
      },
      onBlur(event: React.FocusEvent) {
        if (model.state.nonInteractiveIds.length > 0) {
          return;
        } else {
          model.events.hide(event);
        }
      },
      onChange: model.onChange,
      onClick(event: React.MouseEvent) {
        if (model.state.visibility === 'hidden') {
          model.events.setWidth(event.currentTarget.clientWidth);
        }
      },
      value: model.state.value,
      role: 'combobox',
      'aria-haspopup': true,
      'aria-expanded': model.state.visibility === 'visible',
      'aria-autocomplete': 'list',
      'aria-controls': `${model.state.id}-list`,
      id: model.state.id,
      ref: elementRef,
    } as const;
  }),
  useSetPopupWidth,
  useMoveCursorToIndex,
  useComboboxInputOpenWithArrowKeys,
  useListActiveDescendant,
  useListKeyboardHandler,
  usePopupTarget
);

export const ComboboxInput = createSubcomponent(TextInput)({
  modelHook: useComboboxModel,
  elemPropsHook: useComboboxInput,
})<ExtractProps<typeof TextInput, never>>(({children, ...elemProps}, Element) => {
  return <Element {...elemProps}>{children}</Element>;
});
