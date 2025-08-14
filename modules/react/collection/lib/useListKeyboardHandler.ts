import React from 'react';
import {createElemPropsHook} from '@workday/canvas-kit-react/common';
import {useIsRTL} from '@workday/canvas-kit-react/theming';

import {useCursorListModel} from './useCursorListModel';
import {keyboardEventToCursorEvents} from './keyUtils';

/**
 * This elemProps hook is used to attach keyboard events to handle keyboard navigation
 *
 * ```ts
 * const useMyItem = composeHooks(
 *   useListKeyboardHandler, // adds keyboard support support
 *   useListItemRegister
 * );
```
 */
export const useListKeyboardHandler = createElemPropsHook(useCursorListModel)(model => {
  const isRTL = useIsRTL();

  return {
    onKeyDown(event: React.KeyboardEvent) {
      const handled = keyboardEventToCursorEvents(event, model, isRTL);
      if (handled) {
        event.preventDefault();
      }
    },
  };
});
