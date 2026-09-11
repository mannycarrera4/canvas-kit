import * as React from 'react';

import {PrimaryButton} from '@workday/canvas-kit-react/button';
import {AccessibleHide, AriaLiveRegion} from '@workday/canvas-kit-react/common';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {TextInput} from '@workday/canvas-kit-react/text-input';
import {createStyles} from '@workday/canvas-kit-styling';
import {system} from '@workday/canvas-tokens-web';

import {TagList} from '../skill-eval';

const formStyles = createStyles({
  display: 'flex',
  alignItems: 'flex-end',
  gap: system.gap.sm,
  marginBlockEnd: system.gap.md,
});

const fieldStyles = createStyles({
  width: '100%',
});

let nextId = 0;

export const TagListBasic = () => {
  const [skills, setSkills] = React.useState([
    {id: 'react', text: 'React'},
    {id: 'typescript', text: 'TypeScript'},
    {id: 'accessibility', text: 'Accessibility'},
  ]);
  const [draft, setDraft] = React.useState('');
  const [announcement, setAnnouncement] = React.useState('');

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) {
      return;
    }
    setSkills(prev => [...prev, {id: `skill-${nextId++}`, text}]);
    setDraft('');
  };

  const handleRemove = (data: {id: string}) => {
    const removed = skills.find(skill => skill.id === data.id);
    setSkills(prev => prev.filter(skill => skill.id !== data.id));
    if (removed) {
      setAnnouncement(`${removed.text} removed`);
    }
  };

  return (
    <div>
      <form className={formStyles} onSubmit={handleAdd}>
        <FormField cs={fieldStyles}>
          <FormField.Label>Add a skill</FormField.Label>
          <FormField.Input
            as={TextInput}
            value={draft}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDraft(event.currentTarget.value)
            }
          />
        </FormField>
        <PrimaryButton type="submit">Add</PrimaryButton>
      </form>
      <TagList items={skills} onRemove={handleRemove}>
        {item => <TagList.Item>{item.text}</TagList.Item>}
      </TagList>
      <AriaLiveRegion as={AccessibleHide}>{announcement}</AriaLiveRegion>
    </div>
  );
};
