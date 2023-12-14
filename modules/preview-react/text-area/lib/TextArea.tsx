import React from 'react';

import {createContainer, ExtractProps} from '@workday/canvas-kit-react/common';
import {
  FormField,
  useFormFieldModel,
  useFormFieldOrientation,
} from '@workday/canvas-kit-preview-react/form-field';
import {Flex} from '@workday/canvas-kit-react/layout';

import {TextAreaField} from './TextAreaField';
/**
 * @deprecated ⚠️ `TextAreaProps` in Preview has been deprecated and will be removed in a future major version. Please use [`FormField` in Preview](https://workday.github.io/canvas-kit/?path=/story/preview-inputs-form-field--custom) instead.
 */
export interface TextAreaProps extends ExtractProps<typeof FormField, never> {
  /**
   * Children of the Text Input. Should contain a `<TextArea.Field>`, a `<TextArea.Label>` and an optional `<TextArea.Hint>`
   */
  children: React.ReactNode;
}

/**
 * @deprecated ⚠️ `TextArea` in Preview has been deprecated and will be removed in a future major version. Please use [`FormField` in Preview](https://workday.github.io/canvas-kit/?path=/story/preview-inputs-form-field--custom) instead.
 */
export const TextArea = createContainer('div')({
  displayName: 'TextArea',
  modelHook: useFormFieldModel,
  subComponents: {
    Field: TextAreaField,
    Label: FormField.Label,
    Hint: FormField.Hint,
  },
})<TextAreaProps>(({children, orientation = 'vertical', ...elemProps}, Element) => {
  const layoutProps = useFormFieldOrientation(orientation);

  return (
    <Flex as={Element} {...layoutProps} {...elemProps}>
      {children}
    </Flex>
  );
});
