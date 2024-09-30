import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Quiz Management System', () => {
  render(<App />);
  const linkElement = screen.getByText(/Quiz Management System/i);
  expect(linkElement).toBeInTheDocument();
});
