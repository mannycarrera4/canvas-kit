import {fireEvent, render, screen} from '@testing-library/react';

import {Basic} from '../stories/examples/Basic';

describe('Disclosure Basic story', () => {
  it('should render a collapsed disclosure button', () => {
    render(<Basic />);

    const target = screen.getByRole('button', {name: 'More Details'});

    expect(target).toHaveAttribute('aria-expanded', 'false');
    expect(target).toHaveAttribute('aria-controls');
    expect(screen.getByText(/Additional information/)).not.toBeVisible();
  });

  it('should show content when the target is clicked', () => {
    render(<Basic />);

    const target = screen.getByRole('button', {name: 'More Details'});
    fireEvent.click(target);

    expect(target).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Additional information/)).toBeVisible();
  });

  it('should hide content when the target is clicked again', () => {
    render(<Basic />);

    const target = screen.getByRole('button', {name: 'More Details'});
    fireEvent.click(target);
    fireEvent.click(target);

    expect(target).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText(/Additional information/)).not.toBeVisible();
  });

  it('should associate the target with the content via aria-controls', () => {
    render(<Basic />);

    const target = screen.getByRole('button', {name: 'More Details'});
    const contentId = target.getAttribute('aria-controls');
    const content = screen.getByText(/Additional information/);

    expect(contentId).toBeTruthy();
    expect(content).toHaveAttribute('id', contentId);
  });
});
