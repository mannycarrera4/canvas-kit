import React from 'react';

import {Disclosure} from '../skill-eval';

export const Basic = () => {
  return (
    <Disclosure>
      <Disclosure.Target>More Details</Disclosure.Target>
      <Disclosure.Content>
        Additional information that is hidden until the disclosure is expanded.
      </Disclosure.Content>
    </Disclosure>
  );
};
