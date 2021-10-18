/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';

import {createComponent} from '@workday/canvas-kit-react/common';
import {Hyperlink, HyperlinkProps, space, type} from '@workday/canvas-kit-react';

import {ToastModel} from './useToastModel';

export interface ToastActionProps {
  model?: ToastModel;
  children: React.ReactNode;
  onActionClick: () => void;
}

interface ActionButtonProps extends HyperlinkProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const {color, ...subTextLargeStyles} = type.levels.subtext.large;

const actionButtonStyles = {
  ...subTextLargeStyles,
  display: 'block',
  backgroundColor: 'transparent', // To prevent Safari from rendering grey 'buttonface' as bgcolor
  border: 'none',
  marginTop: space.xxxs,
};

const ActionButton = (props: ActionButtonProps) => {
  return <Hyperlink as="button" css={actionButtonStyles} {...props} />;
};

export const ToastAction = createComponent('div')({
  displayName: 'Toast.Action',
  Component: ({children, model, onActionClick, ...elemProps}: ToastActionProps, ref, Element) => {
    return <ActionButton onClick={onActionClick}>{children}</ActionButton>;
  },
});