import React from 'react';

import {createComponent, ExtractProps, styled} from '@workday/canvas-kit-react/common';
import {BoxProps, Flex} from '@workday/canvas-kit-react/layout';
import {Text} from '@workday/canvas-kit-react/text';
import {Card} from '@workday/canvas-kit-react/card';
import {SystemIcon} from '@workday/canvas-kit-react/icon';
import {exclamationCircleIcon} from '@workday/canvas-system-icons-web';
import {StatusIndicator} from '@workday/canvas-kit-preview-react/status-indicator';
import {MdxJSToJSX} from '../MDXElements';
import {colors, type} from '@workday/canvas-kit-react/tokens';

export const InfoCardHeading = createComponent('div')({
  displayName: 'NoteCardHeading',
  Component: ({children, ...elemProps}: ExtractProps<typeof Card.Heading, never>, ref, Element) => {
    return (
      <Card.Heading
        marginBottom="zero"
        {...type.levels.body.small}
        fontWeight="bold"
        {...elemProps}
      >
        {children}
      </Card.Heading>
    );
  },
});

export interface CardBodyProps {
  children: string;
}

const StyledInfoCardBody = styled(Card.Body)({
  p: {
    margin: 0,
  },
});

export const InfoCardBody = createComponent('div')({
  displayName: 'NoteCardHeading',
  Component: ({children, ...elemProps}: CardBodyProps, ref, Element) => {
    return (
      <StyledInfoCardBody marginBottom="s" {...type.levels.body.small} {...elemProps}>
        <MdxJSToJSX>{children}</MdxJSToJSX>
      </StyledInfoCardBody>
    );
  },
});

export const InfoCardContainer = createComponent('div')({
  displayName: 'NoteCardHeading',
  Component: ({children, ...elemProps}: ExtractProps<typeof Flex, never>, ref, Element) => {
    return (
      <Flex flexDirection="column" {...elemProps}>
        {children}
      </Flex>
    );
  },
});

export const InformationHighlight = createComponent('div')({
  displayName: 'NoteCard',
  subComponents: {
    Container: InfoCardContainer,
    Heading: InfoCardHeading,
    Icon: SystemIcon,
    Message: InfoCardBody,
  },
  Component: ({children, ...elemProps}: ExtractProps<typeof Card, never>, ref, Element) => {
    return (
      <Card
        depth="none"
        borderRadius="m"
        backgroundColor="blueberry100"
        padding="s"
        as={Flex}
        border="none"
        borderInlineStart={`4px solid ${colors.blueberry400}`}
        gap="18px"
        {...elemProps}
      >
        {children}
      </Card>
    );
  },
});
