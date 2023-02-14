import React from 'react';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {RadioGroup} from '@workday/canvas-kit-labs-react/radio';
import styled from '@emotion/styled';

export const Basic = () => {
  const [value, setValue] = React.useState<string | number>('deep-dish');

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.currentTarget;
    if (target instanceof HTMLInputElement) {
      setValue(target.value);
    }
  };

  const StyledFormField = styled(FormField)({
    width: '161px',
  });
  return (
    <StyledFormField label="Choose Your Pizza Crust" useFieldset={true}>
      <RadioGroup name="crust" value={value} onChange={handleChange}>
        <RadioGroup.Button>
          <RadioGroup.Input value="deep-dish" />
          <RadioGroup.Label>Deep Dish</RadioGroup.Label>
        </RadioGroup.Button>

        <RadioGroup.Button>
          <RadioGroup.Input value="thin" />
          <RadioGroup.Label>Thin</RadioGroup.Label>
        </RadioGroup.Button>

        <RadioGroup.Button>
          <RadioGroup.Input value="gluten-free" />
          <RadioGroup.Label>Gluten Free</RadioGroup.Label>
        </RadioGroup.Button>

        <RadioGroup.Button>
          <RadioGroup.Input value="cauliflower" />
          <RadioGroup.Label>Cauliflower</RadioGroup.Label>
        </RadioGroup.Button>

        <RadioGroup.Button>
          <RadioGroup.Input value="custom" />
          <RadioGroup.Label>
            My favorite pizza crust flavor is butter because it's the best thing to put on bread
          </RadioGroup.Label>
        </RadioGroup.Button>
      </RadioGroup>
    </StyledFormField>
  );
};
