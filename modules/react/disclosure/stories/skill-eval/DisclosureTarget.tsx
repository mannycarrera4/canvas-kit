import * as React from 'react';

import {createSubcomponent} from '@workday/canvas-kit-react/common';
import {SystemIcon} from '@workday/canvas-kit-react/icon';
import {createStyles, handleCsProp} from '@workday/canvas-kit-styling';
import {chevronDownIcon, chevronRightIcon} from '@workday/canvas-system-icons-web';
import {system} from '@workday/canvas-tokens-web';

import {useDisclosureModel} from './useDisclosureModel';
import {useDisclosureTarget} from './useDisclosureTarget';

export interface DisclosureTargetProps {}

const disclosureTargetStyles = createStyles({
  ...system.type.body.md,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: system.gap.xs,
  inlineSize: '100%',
  margin: 0,
  padding: system.padding.xs,
  color: system.color.fg.default,
  backgroundColor: system.color.surface.transparent,
  border: 'none',
  borderRadius: system.shape.sm,
  textAlign: 'start',
  cursor: 'pointer',
  '&:hover, &.hover': {
    backgroundColor: system.color.surface.overlay.hover.default,
  },
  '&:focus-visible, &.focus': {
    outline: `2px solid var(${system.color.brand.focus.primary})`,
    outlineOffset: '2px',
  },
});

export const DisclosureTarget = createSubcomponent('button')({
  modelHook: useDisclosureModel,
  elemPropsHook: useDisclosureTarget,
})<DisclosureTargetProps>(({children, ...elemProps}, Element, model) => (
  <Element {...handleCsProp(elemProps, disclosureTargetStyles)}>
    <SystemIcon
      icon={model.state.visible ? chevronDownIcon : chevronRightIcon}
      size="sm"
      color={system.color.fg.default}
      shouldMirrorInRTL={!model.state.visible}
      aria-hidden={true}
    />
    {children}
  </Element>
));
