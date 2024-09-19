import React from 'react';

import {createSubcomponent, ExtractProps} from '@workday/canvas-kit-react/common';
import {createStencil, px2rem} from '@workday/canvas-kit-styling';
import {Text, textStencil} from '@workday/canvas-kit-react/text';
import {FlexProps, mergeStyles} from '@workday/canvas-kit-react/layout';
import {brand, system} from '@workday/canvas-tokens-web';

import {useFormFieldLabel, useFormFieldModel} from './hooks';

export interface FormFieldLabelProps
  extends FlexProps,
    Omit<ExtractProps<typeof Text, never>, 'display'> {
  /**
   * The text of the label.
   */
  children: React.ReactNode;
}

export const formFieldLabelStencil = createStencil({
  extends: textStencil,
  // @ts-ignore Still weird about CSS font variables
  base: {
    fontWeight: system.fontWeight.medium,
    color: system.color.text.default,
    paddingInlineStart: system.space.zero,
    display: 'flex',
    alignItems: 'center',
    minWidth: px2rem(180),
  },
  modifiers: {
    isRequired: {
      true: {
        // @ts-ignore Still weird about CSS font variables
        '&::after': {
          content: '"*"',
          fontSize: system.fontSize.body.large,
          fontWeight: system.fontWeight.normal,
          color: brand.error.base,
          textDecoration: 'unset',
          marginInlineStart: system.space.x1,
        },
      },
    },
    orientation: {
      horizontalStart: {
        justifyContent: 'flex-start',
        float: 'left',
        maxHeight: system.space.x10,
      },
      horizontalEnd: {
        maxHeight: system.space.x10,
        float: 'left',
        justifyContent: 'flex-end',
      },
      vertical: {
        width: '100%',
      },
    },
  },
  defaultModifiers: {
    typeLevel: 'subtext.large',
    isRequired: 'false',
  },
});

export const FormFieldLabel = createSubcomponent('label')({
  displayName: 'FormField.Label',
  modelHook: useFormFieldModel,
  elemPropsHook: useFormFieldLabel,
})<FormFieldLabelProps>(({children, typeLevel, variant, ...elemProps}, Element, model) => {
  console.log(model.state.orientation);
  return (
    <Element
      {...mergeStyles(
        elemProps,
        formFieldLabelStencil({
          typeLevel,
          variant,
          isRequired: model.state.isRequired as any,
          orientation:
            model.state.orientation === 'horizontal' ? 'horizontalStart' : model.state.orientation,
        })
      )}
    >
      {children}
    </Element>
  );
});
