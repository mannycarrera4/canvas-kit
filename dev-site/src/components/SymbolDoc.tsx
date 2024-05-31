import React from 'react';

import {docs} from '@workday/canvas-kit-docs';
import {PrimaryButton} from '@workday/canvas-kit-react/button';
import {Table} from '@workday/canvas-kit-react/table';

export const SymbolDoc = ({value}) => {
  console.log(value);
  console.log(docs);
  const doc = (docs && docs.find(d => value === d.name)) || undefined;
  console.log('doc', doc.type.props);

  return (
    <div>
      <h3>Props</h3>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header scope="col">Prop</Table.Header>
            <Table.Header scope="col">Type</Table.Header>
            <Table.Header scope="col">Description</Table.Header>
            <Table.Header scope="col">Default</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {doc &&
            doc.type.props.map((prop, index) => {
              console.log(prop);
              return (
                <Table.Row key={index}>
                  <Table.Cell>{prop.name}</Table.Cell>
                  <Table.Cell>{prop.type.kind}</Table.Cell>
                  <Table.Cell>{prop.description}</Table.Cell>
                  <Table.Cell>foo</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
};
