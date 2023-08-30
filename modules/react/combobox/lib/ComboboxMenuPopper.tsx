import * as React from 'react';

import {createSubcomponent, ExtractProps} from '@workday/canvas-kit-react/common';
import {usePopupPopper, Popper} from '@workday/canvas-kit-react/popup';

import {useMenuModel} from '@workday/canvas-kit-react/menu';

export interface MenuPopperProps extends ExtractProps<typeof Popper> {}

export const useMenuPopper = usePopupPopper;

export const ComboboxMenuPopper = createSubcomponent('div')({
  displayName: 'Combobox.Menu.Popper',
  modelHook: useMenuModel,
  elemPropsHook: useMenuPopper,
})<MenuPopperProps>(({children, ...elemProps}) => {
  return (
    <Popper
      placement="bottom-start"
      popperOptions={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: () => [0, 4],
            },
          },
        ],
      }}
      {...elemProps}
    >
      {children}
    </Popper>
  );
});
