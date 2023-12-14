import React from 'react';
import {FormField} from '@workday/canvas-kit-preview-react/form-field';
import {Flex} from '@workday/canvas-kit-react/layout';
import {TextInput} from '@workday/canvas-kit-react/text-input';
import {RadioGroup} from '@workday/canvas-kit-preview-react/radio';
import {Checkbox} from '@workday/canvas-kit-react/checkbox';
import {Select} from '@workday/canvas-kit-react/select';
import {TextArea} from '@workday/canvas-kit-react/text-area';
import {Switch} from '@workday/canvas-kit-react/switch';

export const AllFields = () => {
  return (
    <Flex
      cs={{
        flexDirection: 'column',
        gap: '20px',
        padding: '36px',
        borderRadius: '4px',
      }}
    >
      <FormField>
        <FormField.Label>First Name</FormField.Label>
        <FormField.Input width="100%" as={TextInput} />
      </FormField>

      <FormField isRequired={true} error="alert">
        <FormField.Label>Email</FormField.Label>
        <FormField.Container cs={{width: '100%'}}>
          <FormField.Input width="100%" as={TextInput} />
          <FormField.Hint>Hint text for your input</FormField.Hint>
        </FormField.Container>
      </FormField>
      <FormField>
        <FormField.Label>Text Area Label</FormField.Label>
        <FormField.Input width="100%" as={TextArea} />
      </FormField>
      <FormField error="error" width="100%">
        <FormField.Label>Choose a Crust</FormField.Label>
        <Select items={['Pizza', 'Cheeseburger', 'Fries']}>
          <FormField.Input width="100%" as={Select.Input} />
          <Select.Popper>
            <Select.Card>
              <Select.List>{item => <Select.Item>{item}</Select.Item>}</Select.List>
            </Select.Card>
          </Select.Popper>
        </Select>
      </FormField>
      <FormField as="fieldset" isRequired={true} error={'error'}>
        <FormField.Label as="legend">Radio Group Legend</FormField.Label>
        <FormField.Input as={RadioGroup}>
          <RadioGroup.RadioButton value="deep-dish">Deep dish</RadioGroup.RadioButton>
          <RadioGroup.RadioButton value="thin">Thin</RadioGroup.RadioButton>
          <RadioGroup.RadioButton value="gluten-free">Gluten free</RadioGroup.RadioButton>
          <RadioGroup.RadioButton value="cauliflower">Cauliflower</RadioGroup.RadioButton>
          <RadioGroup.RadioButton value="butter">
            Butter - the best thing to put on bread
          </RadioGroup.RadioButton>
        </FormField.Input>
        <FormField.Hint>Error Message</FormField.Hint>
      </FormField>
      <FormField as="fieldset">
        <FormField.Label as="legend">Checkbox Legend</FormField.Label>
        <FormField.Input as={Checkbox} label="Checkbox Label" />
        <FormField.Input as={Checkbox} label="Thin Crust" />
        <FormField.Input as={Checkbox} label="Extra Cheese" />
      </FormField>

      <FormField orientation="horizontal">
        <FormField.Label>Switch Label</FormField.Label>
        <FormField.Input as={Switch} />
      </FormField>
    </Flex>
  );
};
