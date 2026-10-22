

Read 
Completed with input: {
  "path": "/run/media/asd/save-data/ecomusnext/public/scss/custom.scss"
}

Search for `custom\.scss|@import.*custom|@use.*custom`

Search for `\.header-bottom\s*\{`

Add the style in `custom.scss`. It’s already loaded by the project, and it’s a good place for your custom overrides.

To color **just your EcoShop header’s** navigation row, add this at the bottom:

```scss
#header.storefront-global-header .header-bottom {
  background-color: sandybrown;
}
```

The selector targets the second row of your storefront header—the element with the `.header-bottom` class—without changing other demo headers.

Save the file and refresh the page. If you want a different shade later, you can replace `sandybrown` with a color name or a value like `#f4a460`.



*******************************************
*******************************************



basically dumped for quick deployment

*******************************************




The error means `public_html` is **not a Git checkout**—it has no `.git` directory. Since your server already has a `releases` folder, don’t run `git init` or clone over `public_html`. Clone `main` into a **new release directory** instead.

First, check the current deployment and whether GitHub access works. Run these on the VPS:

```bash
cd /home/ecoshopify.com

pm2 list
readlink -f public_html
ls -lah releases

git ls-remote git@github.com:falconofcode/ecoshopify-frontend.git refs/heads/main
```

If the last command prints a commit hash, the server can read the repository. Then clone the latest `main` into a new directory:

```bash
git clone --branch main --single-branch \
  git@github.com:falconofcode/ecoshopify-frontend.git \
  /home/ecoshopify.com/releases/release-main-20261022
```

Build that checkout:

```bash
cd /home/ecoshopify.com/releases/release-main-20261022
npm ci
npm run build
```

That prepares a new build; **it does not switch the live site to it**. Don’t run `git pull` inside `public_html`, or restart PM2 yet. The live process needs to be pointed at the new release using its PM2 configuration. Check `pm2 describe ecoshopify` and share its output along with the results of the checks above; then we can identify the right way to switch releases without overwriting the current site.






*******************************************




Your output shows two separate things:

1. **`public_html` isn’t a Git repository.** That’s expected if it was deployed by copying files. Don’t run `git init` there.
2. **The SSH key used by `root` can’t access GitHub.** That’s what `Permission denied (publickey)` means.

Also, `readlink -f public_html` was run while you were already inside `public_html`, so it checked for a *nested* `public_html` folder. Check from the website’s parent directory instead:

```bash
cd /home/ecoshopify.com
pwd
readlink -f public_html
ls -lah
ls -lah releases
pm2 describe ecoshopify
```

Then test GitHub access from there:

```bash
git ls-remote https://github.com/falconofcode/ecoshopify-frontend.git refs/heads/main
```

- If it prints a commit hash, the repository is readable over HTTPS. You can clone `main` into a **new release directory**; don’t clone over `public_html`.
- If it says the repository is private or asks for credentials, configure a **read-only GitHub deploy key** for the server. Don’t paste or share any private key. The current SSH command failed because the identity being used by `root` isn’t authorized for that repository.

Please share the output of those checks, especially `readlink -f public_html` and `pm2 describe ecoshopify`, before switching the live site. That will tell us where PM2 actually runs the app and how to deploy without disrupting it.






*******************************************









The VPS can read `main` over HTTPS, and PM2 is running the app from the old release at `/home/ecoshopify.com/releases/9d52dd0`. Deploy the new commit into its **own release folder**—don’t clone over `public_html` or modify the existing release.

The `git ls-remote` result you shared identifies the current `main` commit as `c917b96`. On the VPS, run:

```bash
cd /home/ecoshopify.com/releases

git clone --depth 1 --branch main \
  https://github.com/falconofcode/ecoshopify-frontend.git \
  c917b96

cd /home/ecoshopify.com/releases/c917b96
git rev-parse --short HEAD
npm ci
npm run build
```

Confirm the hash printed by `git rev-parse` starts with `c917b96` and that the build succeeds. **That prepares the release; it doesn’t make it live yet.**

To switch PM2 to it, run:

```bash
pm2 delete ecoshopify

pm2 start /opt/nvm/versions/node/v20.20.2/bin/npm \
  --name ecoshopify \
  --cwd /home/ecoshopify.com/releases/c917b96 \
  -- start

pm2 save
pm2 list
curl -I https://ecoshopify.com
```

There may be a brief interruption while PM2 restarts the app. Check that PM2 reports `online` and the site responds successfully.

**Rollback**, if the new release doesn’t work:

```bash
pm2 delete ecoshopify

pm2 start /opt/nvm/versions/node/v20.20.2/bin/npm \
  --name ecoshopify \
  --cwd /home/ecoshopify.com/releases/9d52dd0 \
  -- start

pm2 save
```

Keep the old `9d52dd0` release until you’ve confirmed the new site is working.







*******************************************

The vhost is already set up to proxy requests to a Next.js app on **port 5000**. The likely cause of the 503 is that Next.js is listening on a different port—or isn’t running—so LiteSpeed can’t reach its proxy target.

### 1. Check the app before changing the vhost

Run these on the VPS:

```bash
ss -ltnp | grep ':5000'
curl -I http://127.0.0.1:5000
pm2 logs ecoshopify --lines 50
```

- If `curl` returns a response, the app is reachable locally.
- If it says connection refused, make the app listen on port `5000`:

```bash
PORT=5000 pm2 restart ecoshopify --update-env
pm2 save
```

Then try the local `curl` again. If it still fails, check the PM2 logs and confirm its working directory is the release you built:

```bash
pm2 describe ecoshopify
```

### 2. Vhost configuration

Your proxy setup is basically right. Keep the proxy address at `127.0.0.1:5000` so it matches the app’s port. This is a cleaned-up version of the relevant configuration:

```conf
docRoot                   $VH_ROOT/public_html
vhDomain                  $VH_NAME
vhAliases                 www.$VH_NAME
adminEmails               admin@falcon.codes
enableGzip                1
enableIpGeo               1

index {
  useServer               0
  indexFiles              index.php, index.html
}

errorlog $VH_ROOT/logs/$VH_NAME.error_log {
  useServer               0
  logLevel                WARN
  rollingSize             10M
}

accesslog $VH_ROOT/logs/$VH_NAME.access_log {
  useServer               0
  logFormat               "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\""
  logHeaders              5
  rollingSize             10M
  keepDays                10
  compressArchive         1
}

extprocessor ecoshopify-app {
  type                    proxy
  address                 http://127.0.0.1:5000
  maxConns                100
  initTimeout             60
  retryTimeout            0
  persistConn             1
  pcKeepAliveTimeout      60
  respBuffer              0
  autoStart               0
  path                    /bin/true
  extUser                 ecosh2554
  extGroup                ecosh2554
}

phpIniOverride {
}

module cache {
  storagePath /usr/local/lsws/cachedata/$VH_NAME
}

rewrite {
  enable                  1
  autoLoadHtaccess        1
}

context /.well-known/acme-challenge {
  location                /usr/local/lsws/Example/html/.well-known/acme-challenge
  allowBrowse             1

  rewrite {
    enable                0
  }

  addDefaultCharset       off

  phpIniOverride {
  }
}

context / {
  type                    proxy
  handler                 ecoshopify-app
  addDefaultCharset       off
}

vhssl {
  keyFile                 /etc/letsencrypt/live/ecoshopify.com/privkey.pem
  certFile                /etc/letsencrypt/live/ecoshopify.com/fullchain.pem
  certChain               1
  sslProtocol             24
  enableECDHE             1
  renegProtection         1
  sslSessionCache         1
  enableSpdy              15
  enableStapling          1
  ocspRespMaxAge          86400
}
```

The `docRoot` can stay as-is: the `/` context proxies traffic to Next.js instead of serving the Next app from `public_html`. After editing the vhost, use CyberPanel’s LiteSpeed graceful restart. Then check `curl -I https://ecoshopify.com`.

**Important:** Don’t restart LiteSpeed as a substitute for fixing a failed local `curl`. First make sure `http://127.0.0.1:5000` responds; that’s the key check for this 503.