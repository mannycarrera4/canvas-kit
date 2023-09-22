import React from 'react';
import {
  createSubcomponent,
  ExtractProps,
  createContainer,
  Themeable,
} from '@workday/canvas-kit-react/common';
import {Combobox} from '@workday/canvas-kit-react/combobox';

import {InputGroup, TextInput} from '@workday/canvas-kit-react/text-input';
import {SystemIcon} from '@workday/canvas-kit-react/icon';
import {caretDownSmallIcon} from '@workday/canvas-system-icons-web';
import {useSelectModel, useSelectItem, useSelectCard} from './hooks';
import {useSelectInput} from './hooks/useSelectInput';
import {CanvasSystemIcon} from '@workday/design-assets-types';

export interface SelectInputProps extends ExtractProps<typeof TextInput> {
  /**
   * The Icon to render at the start of the `input`. Use this prop if your options
   * include icons that you would like to render in the `input` when selected.
   * ** Note:An option must be selected in order to render and icon.**
   */
  inputStartIcon?: CanvasSystemIcon;
}
export const SelectInput = createSubcomponent(TextInput)({
  modelHook: useSelectModel,
  elemPropsHook: useSelectInput,
})<SelectInputProps>(
  ({placeholder = 'Choose an option', inputStartIcon, ...elemProps}, Element, model) => {
    return (
      <InputGroup>
        {inputStartIcon && model.state.selectedIds.length > 0 && (
          <InputGroup.InnerStart pointerEvents="none">
            <SystemIcon icon={inputStartIcon} />
          </InputGroup.InnerStart>
        )}
        <InputGroup.Input
          as={Element}
          placeholder={placeholder}
          style={{caretColor: 'transparent', cursor: 'default'}}
          {...elemProps}
        ></InputGroup.Input>
        <InputGroup.InnerEnd position="absolute" pointerEvents="none">
          <SystemIcon icon={caretDownSmallIcon} />
        </InputGroup.InnerEnd>
      </InputGroup>
    );
  }
);

export const SelectItem = createSubcomponent('li')({
  modelHook: useSelectModel,
  elemPropsHook: useSelectItem,
  subComponents: {
    Icon: Combobox.Menu.Item.Icon,
  },
})<ExtractProps<typeof Combobox.Menu.Item>>(({children, ...elemProps}, Element, _model) => {
  return (
    <Combobox.Menu.Item as={Element} {...elemProps}>
      {children}
    </Combobox.Menu.Item>
  );
});

export const SelectCard = createSubcomponent('div')({
  modelHook: useSelectModel,
  elemPropsHook: useSelectCard,
})<ExtractProps<typeof Combobox.Menu.Card>>(({children, ...elemProps}, Element) => {
  return (
    <Combobox.Menu.Card as={Element} {...elemProps}>
      {children}
    </Combobox.Menu.Card>
  );
});

export interface SelectProps extends Themeable, ExtractProps<typeof Combobox> {}
/**
 * Use `Select` to allow users to choose an option from a list or type characters to select a matching option.
 *
 * ```tsx
 * <Select items={options}>
 *  <Select.Input onChange={e => handleChange(e)} id="contact-select" />
 *  <Select.Popper>
 *    <Select.Card maxHeight="200px">
 *      <Select.List>
 *        {item => {
 *          return (
 *            <Select.Item aria-disabled={item.disabled ? item.disabled : undefined}>
 *              {item.id}
 *            </Select.Item>
 *          );
 *         }}
 *      </Select.List>
 *     </Select.Card>
 *    </Select.Popper>
 *  </Select>
 * ```
 */
export const Select = createContainer()({
  displayName: 'Select',
  modelHook: useSelectModel,
  subComponents: {
    /**
     * `Select.Input` renders a {@link ComboboxMenu Combobox.Input} that handles keyboard navigation and interaction defined by [WAI](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/).
     * This component can either be [controlled or un controlled](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).
     * **Note: An `id` must be provided that matches the `inputId` attribute on the `FormField` component from Main in order for the `label` element to be associated with the `input` element.**
     *
     * ```tsx
     * <Select items={options}>
     *   <Select.Input id="matching-formfield-inputId" onChange={(event) => handleChange(event)}>
     *   ...
     * </Select>
     * ```
     */
    Input: SelectInput,
    /**
     * `Select.Popper` renders a {@link ComboboxPopper Combobox.Menu.Popper}. You have access to all `Popper` props.
     * ```tsx
     * <Select item={options}>
     *  <Select.Input id="matching-formfield-inputId" onChange={(event) => handleChange(event)}>
     *  <Select.Popper>
     *    ...
     *  </Select.Popper>
     * </Select>
     * ```
     */
    Popper: Combobox.Menu.Popper,
    /**
     * `Select.Card` renders a {@link ComboboxCard Combobox.Card}. You have access to all `Card` props.
     * **Note: The Card will be the width of the `Select.Input`**.
     * ```tsx
     * <Select item={options}>
     *  <Select.Input id="matching-formfield-inputId" onChange={(event) => handleChange(event)}>
     *  <Select.Popper>
     *    <Select.Card>
     *      ...
     *    </Select.Card>
     *  </Select.Popper>
     * </Select>
     * ```
     */
    Card: SelectCard,
    /**
     * `Select.List` renders a {@link ComboboxMenuList Combobox.Menu.List}. You have access to all `ListBox` props.
     * ```tsx
     * <Select item={options}>
     *  <Select.Input id="matching-formfield-inputId" onChange={(event) => handleChange(event)}>
     *  <Select.Popper>
     *    <Select.Card>
     *      <Select.List>
     *        {(item) => <Select.Item>{item}</Select.Item>}
     *      </Select.List
     *    </Select.Card>
     *  </Select.Popper>
     * </Select>
     * ```
     */
    List: Combobox.Menu.List,
    /**
     * `Select.Item` renders a {@link ComboboxMenuItem Combobox.Menu.Item} with aria role of `option`. You can optionally render a `Icon`.
     * ```tsx
     * <Select item={options}>
     *  <Select.Input id="matching-formfield-inputId" onChange={(event) => handleChange(event)}>
     *  <Select.Popper>
     *    <Select.Card>
     *      <Select.List>
     *        {(item) => <Select.Item><Select.Item.Icon icon={icon} />{item}</Select.Item>}
     *      </Select.List
     *    </Select.Card>
     *  </Select.Popper>
     * </Select>
     * ```
     */
    Item: SelectItem,
  },
})<SelectProps>(({children, ...elemProps}, _, model) => {
  return (
    <Combobox model={model} {...elemProps}>
      {children}
    </Combobox>
  );
});
