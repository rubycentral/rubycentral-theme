# Ruby Central theme for Ghost

### Setup

Clone this repo first, and set it up:

```bash
git clone git@github.com:rubycentral/rubycentral-theme.git
cd rubycentral-theme
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
# in /ghost-dev
ln -s [absolute path on your machine]/rubycentral-theme ./content/themes/rubycentral-theme
ghost restart
```

Now, you need to activate the symlinked theme.

1. From a fresh install, you'll need to create a fake account, like `me@example.com` and password `123abc123abc`. Go to [http://localhost:2368/ghost/#/setup](http://localhost:2368/ghost/#/setup).
1. Open your local Ghost theme settings, by default [localhost:2368/ghost/#/settings/design/change-theme](http://localhost:2368/ghost/#/settings/design/change-theme).
1. Click the "Advanced" button in the top right.
1. Push "Activate" for `rubycentral-theme`. If you don't see it, it's not symlinked properly.
1. Browse to [localhost:2368](http://localhost:2368) and you should now see the theme, but with no content. The example posts may not be styled properly, this is ok.

Finally, to seed your local Ghost install with directors, staff, and posts, you will need to import everything in `imports/`.

1. Open your local Ghost experimental settings at [localhost:2368/ghost/#/settings/labs](http://localhost:2368/ghost/#/settings/labs)
1. Go to [https://rubycentral.ghost.io/ghost/#/settings/labs] and click "Export your content". You should get a `.json` file locally.
1. On the same page, click "download redirects" and "download routes" also. We will upload these too.
1. Click "Open Importer", and then upload the `.json` file.
1. Click "Upload redirects YAML/JSON" and choose `redirects.yaml`.
1. Click "Upload routes YAML" and choose `routes.yaml`.
1. In `/rubycentral-theme`, start the live reload server and compile your JS/CSS assets, and watch for changes: `npm run dev`. If you do not do this, your text will look unstyled.
1. Wait a few moments and run `ghost restart`. You should now see images and content, including posts.

### Development

As you make changes, ideally your browser will automatically reload.
You might have to refresh by hand after each change.
If you can't see your changes, and you're sure that `npm run dev` is still going, you'll likely need to disable your browser's caching.
Go to the Network tab in your dev tools and toggle "Disable cache".

### Deployment

The theme will automatically check, zip, and upload to Ghost via GitHub Actions. If you want to try it yourself locally:

```bash
# Fix any CSS issues, compile your JS/CSS assets for production, and create a ZIP file
npm run zip

# Scan your theme for potential incompatibilties with gscan
npm run check
```
