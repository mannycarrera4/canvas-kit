import React from 'react';

import {
  createElemPropsHook,
  createSubcomponent,
  composeHooks,
  ExtractProps,
  createContainer,
  createModelHook,
} from '@workday/canvas-kit-react/common';
import {Combobox, useComboboxModel, useComboboxInput} from '@workday/canvas-kit-react/combobox';
import {InputGroup, TextInput} from '@workday/canvas-kit-react/text-input';
import {SystemIcon} from '../../icon';
import {caretDownSmallIcon} from '@workday/canvas-system-icons-web';
import {ComboboxProps} from '../../combobox/lib/Combobox';
import {useListModel} from '../../collection/lib/useListModel';
import {useListRenderItems} from '@workday/canvas-kit-react/collection';
import {useMenuModel} from '../../menu';

const useSelectInput = composeHooks(
  createElemPropsHook(useComboboxModel)(model => {
    const keySofar = React.useRef('');
    const timer = React.useRef<ReturnType<typeof setTimeout>>();

    React.useLayoutEffect(() => {
      if (
        model.state.visibility !== 'visible' &&
        !model.state.selectedIds.length &&
        model.state.items.length === 0
      ) {
        console.log('NO ITEMS SELECTED');

        model.events.goTo({id: model.state.items[0].id});
        model.events.select({id: model.state.items[0].id});
      }
      // if (model.state.visibility !== 'visible') {
      //   keySofar.current = '';
      // }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [model.state.visibility]);

    const startClearKeysSoFarTimer = () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        keySofar.current = '';
      }, 500);
    };

    const getIndexByStartString = (
      startIndex: number,
      startString: string,
      endIndex: number = model.state.items.length,
      ignoreDisabled: boolean = true
    ): number => {
      for (let i = startIndex; i < endIndex; i++) {
        const label = model.state.items[i].id.toLowerCase();
        if (label.indexOf(startString.toLowerCase()) === 0) {
          if (!ignoreDisabled || ignoreDisabled) {
            return i;
          }
        }
      }

      return -1;
    };

    const handleKeyboardTypeAhead = (key: string, numOptions: number) => {
      const cursorFocusedIndex = model.state.items.findIndex(
        item => item.id.toLowerCase() === model.state.selectedIds[0]
      );
      console.log('cursorId', model.state.cursorId);
      let start = keySofar.current.length === 0 ? cursorFocusedIndex : cursorFocusedIndex;

      start = start === numOptions ? 0 : start;

      keySofar.current += key;
      startClearKeysSoFarTimer();

      let matchIndex;
      matchIndex = getIndexByStartString(start, keySofar.current);

      //   // If a match isn't found between start and end, wrap the search
      //   // around and search again from the beginning (0) to start
      if (matchIndex === -1) {
        matchIndex = getIndexByStartString(0, keySofar.current, start);
      }

      // A match was found...
      if (matchIndex > -1) {
        if (model.state.visibility === 'hidden') {
          // If the menu is closed, fire the change event
          // model.events.select({id: model.state.items[matchIndex].id});
          model.events.goTo({id: model.state.items[matchIndex].id});
        } else {
          // Otherwise the menu is visible (or at least partially visible);
          // focus the matched option

          model.events.goTo({id: model.state.items[matchIndex].id});
          model.events.select({id: model.state.items[matchIndex].id});
        }
      }
    };

    return {
      onClick(event: React.MouseEvent) {
        if (model.state.selectedIds.length > 0) {
          const foundIndex = model.state.items.findIndex(
            item => item.id === model.state.selectedIds[0]
          );

          model.events.goTo({id: model.state.items[foundIndex].id});
          model.events.select({id: model.state.items[foundIndex].id});
        }
      },
      onChange(event: React.SyntheticEvent<HTMLInputElement>) {
        event.preventDefault();
      },

      onKeyDown(event: React.KeyboardEvent) {
        event.preventDefault();
        console.log(event);

        if (event.key === 'Enter' && model.state.visibility === 'hidden') {
          model.events.show();
        }
        if (event.key.length === 1 && event.key.match(/\S/)) {
          handleKeyboardTypeAhead(event.key, model.state.items.length);
        }
        // model.events.go;
        if (model.state.visibility === 'visible') {
          // console.log('item', model.state.selectedIds);
          // model.event.goTo()
        }
      },
      style: {caretColor: 'transparent', cursor: 'default'},
    };
  }),
  useComboboxInput
);

// check for value property and handle onChange

export const SelectInput = createSubcomponent(TextInput)({
  modelHook: useComboboxModel,
  elemPropsHook: useSelectInput,
})<ExtractProps<typeof TextInput>>(
  ({placeholder = 'Choose and Option', ...props}, Element, model) => {
    return (
      <InputGroup>
        <InputGroup.Input as={Element} {...props}></InputGroup.Input>
        <InputGroup.InnerEnd>
          <SystemIcon icon={caretDownSmallIcon} />
        </InputGroup.InnerEnd>
      </InputGroup>
    );
  }
);

export const SelectBase = createContainer()({
  displayName: 'Select2',
  modelHook: useComboboxModel,
  subComponents: {
    Input: SelectInput,
    Popup: Combobox.Menu.Popper,
    Card: Combobox.Menu.Card,
    List: Combobox.Menu.List,
    Item: Combobox.Menu.Item,
  },
})<ComboboxProps>(({children}, _, model) => {
  return <Combobox model={model}>{useListRenderItems(model, children)}</Combobox>;
});

// export const useSelectModel = createModelHook({
//   defaultConfig: useComboboxModel.defaultConfig,
//   requiredConfig: useComboboxModel.requiredConfig,
// })(config => {
//   const model = useMenuModel();

//   console.log(model);

//   return model;
// });
