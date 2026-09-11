import {act, fireEvent, render, screen} from '@testing-library/react';

import {TagListBasic} from '../stories/examples/TagListBasic';

/**
 * `useListItemRemoveOnDeleteKey` (and this story's own click-to-remove handler) redirect focus
 * after a removal via `focusOnCurrentCursor`, which retries across a handful of animation frames
 * before resolving or rejecting. Without flushing those frames, a rejection (or a stray `.focus()`
 * call) can land after a test's assertions run, bleeding into whichever test happens to run next.
 * Awaiting a few real animation frames inside `act` lets each removal fully settle before the test
 * (and RTL's automatic unmount) moves on.
 */
const flushAnimationFrames = async (frames = 6) => {
  for (let i = 0; i < frames; i++) {
    await act(async () => {
      await new Promise(resolve => requestAnimationFrame(resolve));
    });
  }
};

describe('TagList Basic story', () => {
  it('should render a Pill for each initial tag', () => {
    render(<TagListBasic />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Accessibility')).toBeInTheDocument();
  });

  it('should remove a tag when its remove button is clicked', async () => {
    render(<TagListBasic />);

    // NOTE: `Pill.IconButton`'s `aria-labelledby` combines the `aria-label` we pass with the
    // sibling `Pill.Label`'s text, so the computed accessible name is "Remove TypeScript
    // TypeScript", not just "Remove TypeScript". Matching is intentionally loose here to reflect
    // that real, if slightly surprising, `Pill` behavior rather than mask it.
    fireEvent.click(screen.getByRole('button', {name: /Remove TypeScript/}));
    await flushAnimationFrames();

    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Accessibility')).toBeInTheDocument();
  });

  it('should remove a tag when Backspace is pressed while its remove button is focused', async () => {
    render(<TagListBasic />);

    const removeButton = screen.getByRole('button', {name: /Remove React/});
    act(() => {
      removeButton.focus();
    });
    fireEvent.keyDown(removeButton, {key: 'Backspace'});
    await flushAnimationFrames();

    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });

  it('should remove a tag when Delete is pressed while its remove button is focused', async () => {
    render(<TagListBasic />);

    const removeButton = screen.getByRole('button', {name: /Remove TypeScript/});
    act(() => {
      removeButton.focus();
    });
    fireEvent.keyDown(removeButton, {key: 'Delete'});
    await flushAnimationFrames();

    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
  });

  it('should announce the removed tag via the live region', async () => {
    render(<TagListBasic />);

    fireEvent.click(screen.getByRole('button', {name: /Remove Accessibility/}));
    await flushAnimationFrames();

    expect(screen.getByRole('status')).toHaveTextContent('Accessibility removed');
  });

  it('should add a new tag from the input and allow it to be removed', async () => {
    render(<TagListBasic />);

    fireEvent.change(screen.getByLabelText('Add a skill'), {target: {value: 'Testing'}});
    fireEvent.click(screen.getByRole('button', {name: 'Add'}));

    expect(screen.getByText('Testing')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: /Remove Testing/}));
    await flushAnimationFrames();

    expect(screen.queryByText('Testing')).not.toBeInTheDocument();
  });
});
