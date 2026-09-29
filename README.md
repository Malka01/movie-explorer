# Movie Explorer

Movie Explorer is a responsive React application for discovering movies with
The Movie Database (TMDb) API. It includes trending movies, search, filters,
movie details, favorites, and a local demo login flow.

## Features

- Browse weekly trending movies.
- Search movies with paginated "Load More" results.
- Filter results by genre, release year, and minimum rating.
- View movie details, overview, genres, cast, ratings, and YouTube trailers.
- Add and remove favorites with browser `localStorage` persistence.
- Use a protected Favorites route after signing in.
- Toggle between light and dark Material UI themes.
- Use the responsive layout on mobile, tablet, and desktop screens.
- Run unit and component tests with Jest and React Testing Library.

## Technology

- React 19 and Create React App
- React Router 6
- Material UI 9
- Axios
- React Context API
- TMDb REST API
- Jest and React Testing Library
- GitLab CI for automated test and production-build checks

## Requirements

- Node.js 18 or newer
- npm 9 or newer
- A TMDb API key from [the TMDb developer portal](https://www.themoviedb.org/settings/api)

## Local Setup

1. Clone the repository and enter the project directory:

	```bash
	git clone <your-gitlab-repository-url>
	cd movie-explorer
	```

2. Install dependencies:

	```bash
	npm ci
	```

3. Create a local environment file:

	```bash
	cp .env.example .env
	```

	On Windows PowerShell, use `Copy-Item .env.example .env` instead.

4. Set your TMDb key in `.env`:

	```env
	REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
	```

5. Start the development server:

	```bash
	npm start
	```

	The app opens at `http://localhost:3000`.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm start` | Start the development server. |
| `npm test -- --watchAll=false` | Run the test suite once. |
| `npm run build` | Create an optimized production build. |

## API Usage

All TMDb requests are centralized in `src/services/tmdbApi.js`. Axios uses
`https://api.themoviedb.org/3` as its base URL and sends the API key from
`REACT_APP_TMDB_API_KEY` with every request.

The application uses these endpoints:

| Function | Endpoint | Used for |
| --- | --- | --- |
| `getTrendingMovies` | `GET /trending/movie/week` | Home page trending list |
| `searchMovies` | `GET /search/movie` | Search and pagination |
| `getMovieDetails` | `GET /movie/:id` | Movie overview and metadata |
| `getMovieCredits` | `GET /movie/:id/credits` | Cast list |
| `getMovieVideos` | `GET /movie/:id/videos` | YouTube trailers |
| `getMovieGenres` | `GET /genre/movie/list` | Filter options |

Movie poster and backdrop images are loaded from TMDb's image host using the
paths returned by the API. Do not commit `.env`; it is ignored by Git.

## Authentication and Storage

The login screen is a client-side demo login. Any non-empty username and
password are accepted; no credentials are sent to a server. The current user,
favorites, and last search query are stored in `localStorage` under these keys:

- `movieUser`
- `favorites`
- `lastSearch`

This flow is suitable for a frontend demonstration, not production security.
A production application should replace it with server-side authentication.

## Project Structure

```text
src/
├── components/       Reusable navigation, cards, filters, and grid UI
├── context/           Authentication and movie state providers
├── pages/             Home, login, favorites, and movie details screens
├── services/          Centralized TMDb Axios client and API functions
├── tests/             Jest and React Testing Library tests
└── theme/             Material UI light and dark theme definitions
```

Components keep presentation concerns local, while the context providers own
shared movie and authentication state. Short comments mark important behavior
such as API loading, localStorage recovery, favorite toggling, and protected
navigation.

## GitLab CI

The included `.gitlab-ci.yml` runs dependency installation, the test suite, and
the production build for every branch or merge request. Add
`REACT_APP_TMDB_API_KEY` as a masked GitLab CI/CD variable if a CI job needs to
make live TMDb requests.

## Attribution

Movie data and images are provided by [TMDb](https://www.themoviedb.org/).
This project is for demonstration purposes and is not affiliated with TMDb.