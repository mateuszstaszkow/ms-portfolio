import { render, screen } from '@testing-library/react';
import ContactForm from '../../components/contact-form';

it('renders contact form', () => {
  render(<ContactForm />);
  expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
});
