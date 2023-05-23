import React from 'react';

import {createComponent} from '@workday/canvas-kit-react/common';
import {BoxProps, Flex} from '@workday/canvas-kit-react/layout';
import {Text} from '@workday/canvas-kit-react/text';
import {Card} from '@workday/canvas-kit-react/card';
import {SystemIcon} from '@workday/canvas-kit-react/icon';
import {exclamationCircleIcon} from '@workday/canvas-system-icons-web';
import {StatusIndicator} from '@workday/canvas-kit-preview-react/status-indicator';

export interface NoteCardProps extends BoxProps {
  message?: string | undefined;
}

export const NoteCard = createComponent('div')({
  displayName: 'NoteCard',
  Component: ({children, message, ...elemProps}: NoteCardProps, ref, Element) => {
    const splitMessage = message?.split(' ');

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
          <Text lineHeight="24px">
            {splitMessage?.map(word => {
              if (word.includes('`')) {
                const trimmedWord = word.replace(/[`]/g, '');
                return (
                  <>
                    <StatusIndicator emphasis="high">{trimmedWord}</StatusIndicator>{' '}
                  </>
                );
              }
              return word + ' ';
            })}
          </Text>
        </Card.Body>
      </Card>
    );
  },
});
