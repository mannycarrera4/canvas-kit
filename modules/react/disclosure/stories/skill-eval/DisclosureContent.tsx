import * as React from 'react';

import {createSubcomponent} from '@workday/canvas-kit-react/common';
import {createStyles, handleCsProp} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

import {useDisclosureContent} from './useDisclosureContent';
import {useDisclosureModel} from './useDisclosureModel';

export interface DisclosureContentProps {}

const disclosureContentStyles = createStyles({
  ...system.type.body.md,
  padding: system.padding.sm,
  color: system.color.fg.default,
});

export const DisclosureContent = createSubcomponent('div')({
  modelHook: useDisclosureModel,
  elemPropsHook: useDisclosureContent,
})<DisclosureContentProps>(({children, ...elemProps}, Element) => (
  <Element {...handleCsProp(elemProps, disclosureContentStyles)}>{children}</Element>
));
