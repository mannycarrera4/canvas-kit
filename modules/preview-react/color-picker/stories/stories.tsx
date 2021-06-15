import {useState} from '@storybook/addons';
import {colors} from '@workday/canvas-kit-react-core';
import React from 'react';

import {ColorPicker} from '../lib/ColorPicker';
import {useColorPickerModel} from '../lib/useColorPickerModel';

export default {
  title: 'Preview/Color Picker/React',
  component: ColorPicker,
};

const rowColors = [
  colors.blueberry600,
  colors.grapeSoda600,
  colors.pomegranate600,
  colors.cinnamon600,
  colors.cantaloupe600,
  colors.sourLemon600,
  colors.greenApple600,
  colors.jewel600,
];

const defaultColorSet = [
  colors.blueberry600,
  colors.grapeSoda600,
  colors.pomegranate600,
  colors.cinnamon600,
  colors.cantaloupe600,
  colors.sourLemon600,
  colors.greenApple600,
  colors.jewel600,

  colors.blueberry500,
  colors.grapeSoda500,
  colors.pomegranate500,
  colors.cinnamon500,
  colors.cantaloupe500,
  colors.sourLemon500,
  colors.greenApple500,
  colors.jewel500,

  colors.blueberry400,
  colors.grapeSoda400,
  colors.pomegranate400,
  colors.cinnamon400,
  colors.cantaloupe400,
  colors.sourLemon400,
  colors.greenApple400,
  colors.jewel400,

  colors.blueberry300,
  colors.grapeSoda300,
  colors.pomegranate300,
  colors.cinnamon300,
  colors.cantaloupe300,
  colors.sourLemon300,
  colors.greenApple300,
  colors.jewel300,

  colors.blueberry200,
  colors.grapeSoda200,
  colors.pomegranate200,
  colors.cinnamon200,
  colors.cantaloupe200,
  colors.sourLemon200,
  colors.greenApple200,
  colors.jewel200,

  colors.blueberry100,
  colors.grapeSoda100,
  colors.pomegranate100,
  colors.cinnamon100,
  colors.cantaloupe100,
  colors.sourLemon100,
  colors.greenApple100,
  colors.jewel100,

  colors.blackPepper600,
  colors.blackPepper400,
  colors.blackPepper300,
  colors.blackPepper100,
  colors.frenchVanilla500,
  colors.frenchVanilla400,
  colors.frenchVanilla200,
  colors.frenchVanilla100,
];

export const Default = () => {
  /**
   * You can import useColorPickerModel to access internal state
   * Example: model.state.color
   *
   * Behavior by default is defined, no extra config is required
   */
  const model = useColorPickerModel();
  return (
    <div>
      <p>By default, the behavior is defined by the model .</p>
      <p>
        You can import <strong>useColorPickerModel</strong> to access internal state like this:{' '}
        <span style={{color: colors.blueberry400}}>model.state.color</span>
      </p>
      <ColorPicker model={model}>
        <ColorPicker.SwatchBook
          columnCount={8}
          style={{marginBottom: '20px'}}
          colors={defaultColorSet}
        >
          {colors => {
            return colors.map(color => <ColorPicker.SwatchButton key={color} color={color} />);
          }}
        </ColorPicker.SwatchBook>
      </ColorPicker>
      <div>
        Accessing internal state to view the current color:{' '}
        <div style={{display: 'flex', alignItems: 'center'}}>
          {/* <ColorPicker>
            <ColorPicker.Swatch showCheck={false} color={model.state.color} />
          </ColorPicker>
          {model.state.color} */}
        </div>
      </div>
    </div>
  );
};
