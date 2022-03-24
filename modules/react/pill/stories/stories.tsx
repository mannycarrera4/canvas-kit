import React from 'react';

import {Pill} from '@workday/canvas-kit-react/pill';
import {SecondaryButton} from '@workday/canvas-kit-react/button';

export default {
  title: 'Components/Indicators/Pill/React',
  component: Pill,
};

export const Default = () => (
  <Pill>
    {/* <Pill.Target>Toggle</Pill.Target> */}
    Molly Griswald
    {/* <Pill.Content>Content</Pill.Content> */}
  </Pill>
);
