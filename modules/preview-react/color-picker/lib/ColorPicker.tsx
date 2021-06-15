import {createComponent} from '@workday/canvas-kit-react/common';
import * as React from 'react';

import ColorInput from './parts/ColorInput';
import CustomColorForm from './parts/CustomColorForm';
import SubmitButton from './parts/SubmitButton';
import Swatch from './parts/Swatch';
import SwatchBook from './SwatchBook';
import SwatchButton from './parts/SwatchButton';
import SwatchRow from './parts/SwatchRow';
import {ColorPickerModel, ColorPickerModelConfig, useColorPickerModel} from './useColorPickerModel';

export interface ColorPickerProps extends ColorPickerModelConfig {
  children?: React.ReactNode;
  model?: ColorPickerModel;
}

export const ColorPickerContext = React.createContext({} as ColorPickerModel);

export const useColorPickerModelContext = () => React.useContext(ColorPickerContext);

export default createComponent()({
  displayName: 'ColorPicker',
  Component: ({children, model, ...config}: ColorPickerProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const value = model || useColorPickerModel(config);
    return <ColorPickerContext.Provider value={value}>{children}</ColorPickerContext.Provider>;
  },
  subComponents: {
    ColorInput,
    SubmitButton,
    CustomColorForm,
    SwatchBook,
    Swatch,
    SwatchButton,
    SwatchRow,
  },
});
