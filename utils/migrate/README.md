# Ruby Central Ghost Migrator

The purpose of this package is to copy data from a staging Ghost environment to a production Ghost environment.

## Setup

1. The migration script reads the `slugs` key from `./config/settings.json` to round up a list of posts to port over to production. Make sure that array is up to date for your needs.
1. Create a `.env` file using the `.env.example` file as a guide. You will need to follow [Ghost's integration instructions](https://ghost.org/docs/admin-api/) to retrieve your API keys.

## How to run a migration

In this directory, run the command `npm run migrate`. Then verify that the production site has the pages you expect.
