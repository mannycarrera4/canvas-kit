import React from 'react';

import {createEventMap, Model, ToModelConfig, useEventMap} from '@workday/canvas-kit-react/common';

type PillState = {
  maxWidth?: number | string;
  onClick?: () => void | undefined;
  onDelete?: () => void | undefined;
};

type PillEvents = {};

export type PillModel = Model<PillState, PillEvents>;

const pillEventMap = createEventMap<PillEvents>()({
  guards: {},
  callbacks: {},
});

export type PillModelConfig = {
  onClick?: () => void | undefined;
  onDelete?: () => void | undefined;
  maxWidth?: number | string;
} & Partial<ToModelConfig<PillState, PillEvents, typeof pillEventMap>>;

export const usePillModel = (config: PillModelConfig = {}): PillModel => {
  const state = {
    onClick: config.onClick,
    onDelete: config.onDelete,
    maxWidth: config.maxWidth || 200,
  };

  const events = useEventMap(pillEventMap, state, config, {});

  return {
    state,
    events,
  };
};
