import React from 'react';

import {PrimaryButton} from '@workday/canvas-kit-react/button';
import {Flex} from '@workday/canvas-kit-react/layout';
import {
  plusIcon,
  relatedActionsVerticalIcon,
  caretDownIcon,
} from '@workday/canvas-system-icons-web';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

const parentContainerStyles = createStyles({
  gap: system.space.x4,
  padding: system.space.x4,
});

export const Primary = () => (
  <Flex cs={parentContainerStyles}>
    <PrimaryButton>Primary</PrimaryButton>
    <PrimaryButton icon={plusIcon} iconPosition="start">
      Primary
    </PrimaryButton>
    <PrimaryButton icon={caretDownIcon} iconPosition="end">
      Primary
    </PrimaryButton>
    <PrimaryButton icon={relatedActionsVerticalIcon} />
  </Flex>
);

// import React, {useState} from 'react';

// export default function MyComponent() {
//   const [bool, setBool] = useState(false);
//   return (
//     <div>
//       <p>MyComponent rendered !</p>
//       <p>bool={bool ? 'true' : 'false'}</p>
//       <p>
//         <button onClick={() => setBool(b => !b)}>toggle bool</button>
//         <PrimaryButton>Hello World</PrimaryButton>
//       </p>
//     </div>
//   );
// }
