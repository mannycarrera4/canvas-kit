import React from 'react';

import {SecondaryButton, DeleteButton} from '@workday/canvas-kit-react/button';
import {CanvasProvider, ContentDirection} from '@workday/canvas-kit-react/common';
import {Popup} from '@workday/canvas-kit-react/popup';
import {Box, HStack} from '@workday/canvas-kit-react/layout';

export const RTL = () => {
  return (
    <CanvasProvider theme={{canvas: {direction: ContentDirection.RTL}}}>
      <Popup.Card width={400}>
        <Popup.CloseIcon aria-label="סגור" />
        <Popup.Heading>למחוק פריט</Popup.Heading>
        <Popup.Body>
          <Box as="p" marginTop="zero">
            האם ברצונך למחוק פריט זה
          </Box>
          <HStack spacing="s">
            <DeleteButton>לִמְחוֹק</DeleteButton>
            <SecondaryButton>לְבַטֵל</SecondaryButton>
          </HStack>
        </Popup.Body>
      </Popup.Card>
    </CanvasProvider>
  );
};
