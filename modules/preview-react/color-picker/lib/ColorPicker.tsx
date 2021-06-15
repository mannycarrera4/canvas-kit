import * as React from 'react';
import {createComponent} from '@workday/canvas-kit-react/common';

import ColorInput from './ColorInput';
import CustomColorForm from './CustomColorForm';
import SubmitButton from './SubmitButton';
import Swatch from './Swatch';
import SwatchBook from './SwatchBook';
import SwatchButton from './SwatchButton';
import SwatchRow from './SwatchRow';
import {ColorPickerModel, ColorPickerModelConfig, useColorPickerModel} from './useColorPickerModel';

export interface ColorPickerProps extends ColorPickerModelConfig {
  children?: React.ReactNode;
  model?: ColorPickerModel;
}

export const ColorPickerContext = React.createContext({} as ColorPickerModel);

export const useColorPickerModelContext = () => React.useContext(ColorPickerContext);

export const ColorPicker = createComponent()({
  displayName: 'ColorPicker',
  Component: ({children, model, ...config}: ColorPickerProps) => {
    // useDefaultModel
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const value = model || useColorPickerModel(config);
    return <ColorPickerContext.Provider value={value}>{children}</ColorPickerContext.Provider>;
  },
  subComponents: {
    Input: ColorInput,
    SubmitButton: SubmitButton,
    Form: CustomColorForm,
    SwatchBook: SwatchBook,
    Swatch: Swatch,
    SwatchButton: SwatchButton,
    SwatchRow: SwatchRow,
  },
});
