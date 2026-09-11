import * as React from 'react';

import {createModelHook, useUniqueId} from '@workday/canvas-kit-react/common';

export const useDisclosureModel = createModelHook({
  defaultConfig: {
    /**
     * Optional id used to associate `Disclosure.Target` (`aria-controls`) with
     * `Disclosure.Content`. A unique id is generated when one is not provided.
     */
    id: '',
    /**
     * If true, the disclosed content is visible on first render.
     * @default false
     */
    initialVisible: false,
  },
})(config => {
  const id = useUniqueId(config.id);
  const [visible, setVisible] = React.useState(config.initialVisible);

  return {
    state: {id, visible},
    events: {
      show() {
        setVisible(true);
      },
      hide() {
        setVisible(false);
      },
    },
  };
});
