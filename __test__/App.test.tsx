import React from 'react';
import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import App from '../src/App';
import SearchTop from '../src/components/SearchTop';

// Mock the SearchTop component
vi.mock('../src/components/SearchTop', () => {
  return {
    default: vi.fn(() => <div>Mocked SearchTop</div>)
  };
});

describe('App Component', () => {
  it('should render the layout and SearchTop component', () => {
    render(<App />);

    // Check if the mocked SearchTop component is rendered
    expect(screen.getByText('Mocked SearchTop')).toBeInTheDocument();
  });
});
