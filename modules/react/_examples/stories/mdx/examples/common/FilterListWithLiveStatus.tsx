import React, {useState} from 'react';
import {TextInput} from '@workday/canvas-kit-preview-react/text-input';
import {BodyText, Heading} from '@workday/canvas-kit-react/text';
import {AriaLiveRegion} from '@workday/canvas-kit-react/common';
import {Flex} from '@workday/canvas-kit-react/layout';
import {system, base} from '@workday/canvas-tokens-web';
import {createStyles, px2rem} from '@workday/canvas-kit-styling';

const fruits = [
  'Apples',
  'Oranges',
  'Bananas',
  'Lemons',
  'Limes',
  'Strawberries',
  'Raspberries',
  'Blackberries',
];

const liveRegionStyle = createStyles({
  border: `${px2rem(1)} solid ${base.cantaloupe400}`,
  backgroundColor: base.cantaloupe100,
  padding: system.space.x2,
});

const listStyles = {paddingLeft: '0px'};

const listItemStyles = createStyles({
  listStyle: 'none',
  paddingLeft: system.space.zero,
});

let filteredFruits = fruits;

export const FilterListWithLiveStatus = () => {
  const [filter, setFilter] = useState('');
  function handleFilter(e) {
    filteredFruits = fruits.filter(i => i.toUpperCase().indexOf(e.target.value.toUpperCase()) >= 0);
    setFilter(e.target.value);
  }

  return (
    <>
      <Flex gap="1rem">
        <Heading size="small">Fruits</Heading>
        <AriaLiveRegion>
          <BodyText size="small" cs={liveRegionStyle}>
            {`Showing ${filteredFruits.length} of ${fruits.length}`}
          </BodyText>
        </AriaLiveRegion>
      </Flex>
      <TextInput orientation="vertical">
        <TextInput.Label>Filter Items:</TextInput.Label>
        <TextInput.Field value={filter} onChange={handleFilter} />
      </TextInput>
      <ul style={listStyles}>
        {filteredFruits.map(i => (
          <BodyText size="small" as="li" cs={listItemStyles} key={i}>
            {i}
          </BodyText>
        ))}
      </ul>
    </>
  );
};
