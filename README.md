<h1 align="center">Notes</h1>

<h3 align="center">
  <a src="http://notes-frontend.vercel.app/">Demo</a>
</h3>

<img width="1000px" align="center" src="https://i.imgur.com/lA5ar2z.png" />

<h1>TOC</h1>

- [Tech Used](#tech-used)
  - [Frameworks](#frameworks)
  - [Deployed to](#deployed-to)
  - [Major Dependencies](#major-dependencies)
- [Purpose](#purpose)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Challenges](#challenges)
  - [Theming](#theming)
  - [Search](#search)
- [Docker Deployment](#docker-deployment)

# Tech Used

## Frameworks

- [NextJS](https://nextjs.org/)
- [Strapi](https://strapi.io/)

## Deployed to

- [Vercel](https://vercel.com/)
- [Heroku](https://www.heroku.com/)

## Major Dependencies

- [Material UI](https://material-ui.com/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Firebase](https://firebase.google.com/)
- [Sentry.io](https://sentry.io/welcome/)

# Purpose

I wanted to develop a full stack application to demonstrate working with dynamic backend data, deployment methods, and tooling.

## Backend

I chose Heroku for backend deployment for the demo as a way to quickly implement it and update on changes. The included `docker-compose.yml` file serves as a more production ready deployment method. See [Docker Deployment](#docker-deployment)

## Frontend

Vercel was used for the front-end as it fits perfectly with NextJS. Cloudflare was used as a CDN in front of Vercel and as the DNS provider.

# Challenges

Dealing with a hybrid SSR framework had it's own challenges especially with a robust component library.

```javascript
export const isBrowser = () =>
  ![typeof window, typeof document].includes("undefined");
```

Used to check if the global `window` or `document` objects are available.

## Theming

To setup dark mode a function was used that returns the Material UI theme.

<details>
  <summary>theme.js</summary>

```javascript
/**
 * Generates a Material UI theme given two colors and a pallete type.
 * @param {string} mainPrimaryColor Hex formatted color used as the primary color
 * @param {string} mainSecondaryColor Hex formatted color used as the secondary color
 * @param {string} palletType "dark" | "light"
 */

import { createMuiTheme } from "@material-ui/core";

function myTheme(mainPrimaryColor, mainSecondaryColor, palletType) {
  const theme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
    overrides: {
      MuiCard: {
        root: {
          margin: 4,
        },
      },
    },
  });

  return theme;
}

export default myTheme;
```

</details>

## Search

Fuse.js was used to implement search but the challenge here was rendering the results.

<details>
  <summary>Search</summary>

I ended up using a ternary to check for search input and render the results of the search or data returned from the query if not searching.

```javascript
const { data, error, loading } = useQuery(GET_NOTES, {
  client: authClient,
});
const debouncedSearchInput = useDebounce(searchInput, 500);

const searchResults = debouncedSearchInput
  ? results.map((result) => result.item)
  : data.notes;
```

</details>

# Docker Deployment

See [docker-compose.yml](https://github.com/insuusvenerati/notes-backend/blob/master/docker-compose.yml)

I used Strapi, MongoDB and Traefik for the backend. Bitnami's Mongo image was used because it is battle tested production ready.

Traefik was used as a proxy that doubles as an SSL provider via Letsencrypt. Additionally, configuration is provided to allow traefik to connect to the docker daemon over TCP instead of the default unix socket. This allowed me to use tls and verify api requests to docker using a generated CA and certificate. See [Protect the Docker daemon socket](https://docs.docker.com/engine/security/https/)
