import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./services/tmdbApi', () => ({
  getTrendingMovies: jest.fn().mockResolvedValue({ results: [] }),
  getMovieGenres: jest.fn().mockResolvedValue({ genres: [] }),
}));

test('renders the movie explorer home page', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /discover movies/i })
  ).toBeInTheDocument();
});
