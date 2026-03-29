import { render, screen } from '@testing-library/react';
import { AppProvider } from './contexts/AppContext';
import App from './App';

test('renders application with title', () => {
  render(
      <AppProvider>
        <App />
      </AppProvider>
  );

  const welcomeText = screen.getByText(/Welcome in "Don't forget your Brain"/i);
  expect(welcomeText).toBeInTheDocument();
});

test('displays view switcher buttons', () => {
  render(
      <AppProvider>
        <App />
      </AppProvider>
  );

  expect(screen.getByText(/Voir les Tâches/i)).toBeInTheDocument();
  expect(screen.getByText(/Voir les Dossiers/i)).toBeInTheDocument();
  expect(screen.getByText(/Reset/i)).toBeInTheDocument();
});

test('displays footer with add button', () => {
  render(
      <AppProvider>
        <App />
      </AppProvider>
  );

  const addButton = screen.getByText(/Nouvelle Tâche/i);
  expect(addButton).toBeInTheDocument();
});
