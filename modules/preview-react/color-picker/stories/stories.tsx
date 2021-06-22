import {useState} from '@storybook/addons';
import {colors} from '@workday/canvas-kit-react-core';
import {Popup, usePopupModel, useCloseOnOutsideClick} from '@workday/canvas-kit-react/popup';
import {IconButton} from '@workday/canvas-kit-react/button';
import {bgColorIcon} from '@workday/canvas-system-icons-web';
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
  const model = useColorPickerModel();
  return (
    <div>
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
        <h3>Current Color</h3>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <ColorPicker>
            <ColorPicker.Swatch showCheck={false} color={model.state.color} />
          </ColorPicker>
          {model.state.color}
        </div>
      </div>
    </div>
  );
};

export const WithPopup = () => {
  const model = usePopupModel();
  const colorPickerModel = useColorPickerModel();
  useCloseOnOutsideClick(model);

  const handleSwatchClick = event => {
    colorPickerModel.events.setColor({color: event.target.getAttribute('color')});
    // colorPickerModel.events.setColor(data.color);
    model.events.hide();
  };
  return (
    <div>
      <Popup model={model}>
        <Popup.Target
          icon={bgColorIcon}
          aria-label="choose background color"
          variant="squareFilled"
          as={IconButton}
        ></Popup.Target>
        <Popup.Popper placement="bottom">
          <Popup.Card padding="s">
            <Popup.Body>
              <ColorPicker model={colorPickerModel}>
                <ColorPicker.SwatchBook
                  columnCount={8}
                  style={{marginBottom: '20px'}}
                  colors={defaultColorSet}
                >
                  {colors => {
                    return colors.map(color => (
                      <ColorPicker.SwatchButton
                        key={color}
                        color={color}
                        onClick={handleSwatchClick}
                      />
                    ));
                  }}
                </ColorPicker.SwatchBook>
              </ColorPicker>
            </Popup.Body>
          </Popup.Card>
        </Popup.Popper>
      </Popup>
      <ColorPicker>
        <ColorPicker.Swatch showCheck={false} color={colorPickerModel.state.color} />
      </ColorPicker>
      {colorPickerModel.state.color}
    </div>
  );
};
