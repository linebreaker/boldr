# `boldr-tools`

Contains Webpack configuration, development server, and essential CLI commands.


#### Commands
> Usage: btools + command

| Command      | Description |
|:-------------|:---------------------------------------------|
| dev          | Start development server                     |
| build        | Build production appliction                  |
| build:client | Build client part of production appliction   |
| build:server | Build server part of production appliction   |
| start:ssr    | Start production render server               |
| clean        | Clean up all generated files                 |


#### Defined
The following are inlined at build time via Webpack:    

- `__SERVER__`
- `process.env.TARGET`
- `process.env.GRAPHQL_ENDPOINT`
- `process.env.API_URL`
- `process.env.API_PREFIX`
