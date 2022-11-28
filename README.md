# Ruby Central theme for Ghost

### Setup

Clone this repo first, and set it up:

```bash
npm install
```

Then, set up a local Ghost install for development, and symlink in the theme:

```bash
cd ..
mkdir ghost-dev
cd ghost-dev
npm install -g ghost-cli
ghost install local
```

Next, symlink from the theme checkout to your local Ghost themes folder:

``` bash
# /content/themes
ln -s ~/src/rubycentral/rubycentral-theme ./content/themes/rubycentral-theme
ghost restart
```

Now, you need to activate the symlinked theme.

1. Open your local Ghost theme settings, by default [localhost:2368/ghost/#/settings/design/change-theme](http://localhost:2368/ghost/#/settings/design/change-theme).
1. Click the "Advanced" button in the top right.
1. Push "Activate" for `rubycentral-theme`.
1. Browse to [localhost:2368](http://localhost:2368) and you should now see the theme, but with no content.

Finally, to seed your local Ghost install with directors, staff, and posts, you will need to import everything in `imports/`.

1. Open your local Ghost experimental settings at [localhost:2368/ghost/#/settings/labs](http://localhost:2368/ghost/#/settings/labs)
1. Click "Open Importer", and then upload both `ruby-central.json` and `images.zip`.
    - _Optional:_ Also upload `ruby-together-posts.json` to add the full backlog of blog posts.
1. Click "Upload redirects YAML/JSON" and choose `redirects.yaml`.
1. Click "Upload routes YAML" and choose `routes.yaml`.
1. Wait a few moments, then reload. You should now see images and content, including posts.

### Development

```bash
# Start the live reload server and compile your JS/CSS assets, and watch for changes
npm run dev
```

Make changes, ideally your browser will automatically reload. You might have to refresh by hand after each change. If you can't see your changes, and you're sure that `npm run dev` is still going, you'll likely need to disable your browser's caching. Go to the Network tab in your dev tools and toggle "Disable cache".

### Deployment

The theme will automatically check, zip, and upload to Ghost via GitHub Actions. If you want to try it yourself locally:

```bash
# Fix any CSS issues, compile your JS/CSS assets for production, and create a ZIP file
npm run zip

# Scan your theme for potential incompatibilties with gscan
npm run check
```
