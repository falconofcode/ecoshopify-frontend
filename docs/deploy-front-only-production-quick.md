# Deploy the frontend to production

This guide publishes the latest code from the GitHub `main` branch to the EcoShopify VPS. The production app runs from a versioned release directory under `/home/ecoshopify.com/releases`, and PM2 starts Next.js from that directory. Keep the current release until the new one has been checked so you can roll back if needed.

## 1. Connect to the VPS

From your local computer's terminal, connect first:

```bash
ssh falcons
```

After you are logged into the server, check the current deployment:

```bash
cd /home/ecoshopify.com
pwd
pm2 describe ecoshopify
curl -I http://127.0.0.1:5000
```

PM2's `exec cwd` shows which release is currently live. The local `curl` checks that the Next.js app is responding on port `5000`, which is the port LiteSpeed proxies to.

Check that the server can read the latest `main` branch:

```bash
git ls-remote https://github.com/falconofcode/ecoshopify-frontend.git refs/heads/main
```

This prints the current commit hash for `main`. If the command reports an access error, stop here and resolve GitHub access before deploying.

## 2. Choose a new release directory name

Every production deployment needs its **own new directory**. Do not reuse the old release directory and do not clone over `/home/ecoshopify.com/public_html`.

For example, this guide uses:

```text
release-20261025-1
```

When deploying again, change that example to a new, unused name, such as `release-20261028-1`. The name is just a folder label; it does not change the Git branch or website URL.

Use the **same name in all three places** below:

1. The destination path after the repository URL in `git clone`.
2. The path in the `cd` command.
3. The path after `--cwd` in the PM2 start command.

If you choose a different release name, update all three occurrences before running the commands.

## 3. Clone and build the release

Replace `release-20261025-1` below with your chosen new directory name:

```bash
cd /home/ecoshopify.com/releases

git clone --depth 1 --branch main \
  https://github.com/falconofcode/ecoshopify-frontend.git \
  release-20261025-1

cd /home/ecoshopify.com/releases/release-20261025-1

git rev-parse --short HEAD
npm ci
npm run build
```

Confirm that the displayed commit is the latest `main` commit you checked in step 1 and that `npm run build` succeeds. If the release directory already exists, choose a different name; never delete or overwrite the live release to make room.

## 4. Start production from the new release

Only do this after the build succeeds. This replaces the running PM2 process and may cause a brief interruption while the new process starts.

Replace `release-20261025-1` here with the **same name** you used in step 3:

```bash
pm2 delete ecoshopify

PORT=5000 pm2 start /opt/nvm/versions/node/v20.20.2/bin/npm \
  --name ecoshopify \
  --cwd /home/ecoshopify.com/releases/release-20261025-1 \
  -- start

pm2 save
```

## 5. Verify the deployment

```bash
pm2 list
pm2 describe ecoshopify
pm2 logs ecoshopify --lines 50
curl -I http://127.0.0.1:5000
curl -I https://ecoshopify.com
```

Check that PM2 is `online`, its `exec cwd` points to your new release directory, the local app responds, and the public site returns a successful HTTP status. If the local `curl` fails, inspect the PM2 logs; LiteSpeed's proxy cannot serve the app unless it is listening on port `5000`.

## Roll back

If the new release does not work, use the directory shown as the previous live `exec cwd` from step 1. The example below uses the previous release `9d52dd0`; replace it if your previous release has a different name.

```bash
pm2 delete ecoshopify

PORT=5000 pm2 start /opt/nvm/versions/node/v20.20.2/bin/npm \
  --name ecoshopify \
  --cwd /home/ecoshopify.com/releases/9d52dd0 \
  -- start

pm2 save
```

Keep the previous release directory until the new production deployment is verified.
