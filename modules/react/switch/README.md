# Canvas Kit Switch

A pill shaped switch. This is an
[_controlled_](https://reactjs.org/docs/forms.html#controlled-components) `input` component.
Undocumented props are spread to the `input` element.

[> Workday Design Reference](https://design.workday.com/components/inputs/switch)

## Installation

```sh
yarn add @workday/canvas-kit-react
```

## Usage

#### Simple Example

**Note:** While a base switch component is provided in this package, it is **not accessible** when
used as is. It should be used in tandem with [`FormField`](../../form-field/react) to be made fully
accessible (see below).

```tsx
import * as React from 'react';
import {Switch} from '@workday/canvas-kit-react/switch';

<Switch disabled={false} checked={checked} onChange={this.handleCheck} />;
```

#### Accessible Example

```tsx
import * as React from 'react';
import {Switch} from '@workday/canvas-kit-react/switch';
import FormField from '@workday/canvas-kit-react/form-field';

<FormField label="My Field" inputId="my-switch-field">
  <Switch disabled={false} checked={checked} onChange={this.handleCheck} id="my-switch-field" />;
</FormField>;
```

If use inside a FormField doesn't work for your use case, you can use the `aria-labelledby`
attribute.

```tsx
import * as React from 'react';
import {Switch} from '@workday/canvas-kit-react/switch';
<label id="123">Label</label>
...
<Switch disabled={false} checked={checked} onChange={this.handleCheck} aria-labelledby="123" />;
```

## Static Properties

> None

## Component Props

### Required

> None

### Optional

#### `checked: boolean`

> Whether or not the switch is on (`true`) or off (`false`)

Default: `false`

---

#### `disabled: boolean`

> Whether or not the switch is disabled (not able to be switched on or off)

Default: `false`

---

#### `id: string`

> The HTML attribute `id` for the underlying input checkbox component.

---

#### `onChange: (e: React.ChangeEvent<HTMLInputElement>) => void`

> A callback that gets called everytime the switch checked state changes.

---

#### `ref: React.Ref<HTMLInputElement>`

> A ref to be forwarded to the underlying `<input type="checkbox" />` element. Use this to
> imperatively modify the input element.

Default: `undefined`

---

#### `value: string`

> The `value` attribute of the input checkbox.

---

#### `error: ErrorType`

> The type of error to display, if any.

| Type  | Description                     |
| ----- | ------------------------------- |
| Error | Red outline with error icon.    |
| Alert | Yellow outline with alert icon. |

Default: `undefined`
