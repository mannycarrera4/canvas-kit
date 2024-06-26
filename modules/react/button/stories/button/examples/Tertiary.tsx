import React from 'react';

import {TertiaryButton} from '@workday/canvas-kit-react/button';
import {HStack} from '@workday/canvas-kit-react/layout';
import {
  plusIcon,
  relatedActionsVerticalIcon,
  caretDownIcon,
} from '@workday/canvas-system-icons-web';

export const Tertiary = () => (
  <HStack spacing="s" padding="s">
    <TertiaryButton>Tertiary</TertiaryButton>
    <TertiaryButton icon={plusIcon} iconPosition="start">
      Tertiary
    </TertiaryButton>
    <TertiaryButton icon={caretDownIcon} iconPosition="end">
      Tertiary
    </TertiaryButton>
    <TertiaryButton icon={relatedActionsVerticalIcon} />
  </HStack>
);
