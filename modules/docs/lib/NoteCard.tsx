import React from 'react';

import {createComponent, styled, StyledType} from '@workday/canvas-kit-react/common';
import {BoxProps, Flex, FlexProps} from '@workday/canvas-kit-react/layout';
import {borderRadius, colors, space} from '@workday/canvas-kit-react/tokens';
import {Text} from '@workday/canvas-kit-react/text';
import {Card} from '@workday/canvas-kit-react/card';
import {SystemIcon} from '@workday/canvas-kit-react/icon';
import {exclamationCircleIcon} from '@workday/canvas-system-icons-web';

export interface NoteCardProps extends BoxProps {
  message?: string | undefined;
}

export const NoteCard = createComponent('div')({
  displayName: 'NoteCard',
  Component: ({children, message, ...elemProps}: NoteCardProps, ref, Element) => {
    return (
      <Card
        depth="none"
        borderRadius="m"
        backgroundColor="cantaloupe100"
        padding="s"
        borderColor="toastedMarshmallow200"
        marginY="m"
      >
        <Flex gap="xs">
          <SystemIcon
            icon={exclamationCircleIcon}
            color="toastedMarshmallow600"
            colorHover="toastedMarshmallow600"
          />
          <Card.Heading color="toastedMarshmallow600" marginBottom="xs">
            Note
          </Card.Heading>
        </Flex>
        <Card.Body>
          <Text lineHeight="24px">{message}</Text>
        </Card.Body>
      </Card>
    );
  },
});
