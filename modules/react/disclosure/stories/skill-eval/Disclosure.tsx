import * as React from 'react';

import {createContainer} from '@workday/canvas-kit-react/common';

import {DisclosureContent} from './DisclosureContent';
import {DisclosureTarget} from './DisclosureTarget';
import {useDisclosureModel} from './useDisclosureModel';

export interface DisclosureProps {}

export const Disclosure = createContainer()({
  displayName: 'Disclosure',
  modelHook: useDisclosureModel,
  subComponents: {
    /**
     * The button that shows and hides the disclosed content. Sets `aria-expanded` and
     * `aria-controls` so assistive technologies can associate the control with its content.
     */
    Target: DisclosureTarget,
    /**
     * The section of content whose visibility is controlled by `Disclosure.Target`. Hidden from
     * the accessibility tree while collapsed.
     */
    Content: DisclosureContent,
  },
})<DisclosureProps>(({children}) => <>{children}</>);
