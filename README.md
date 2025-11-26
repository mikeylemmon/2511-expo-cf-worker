# expo-server on a cloudflare worker

## Running the app

```text
pnpm install
pnpm run export
pnpm run cf-dev
```

## Current state

- [x] Web app served by wrangler dev server
- [x] API route works (GET /hello)
- [ ] Server function works (fails with "Illegal invocation" error)

  Call to [serverFunc](actions/server-func.ts) is failing with:
  ```text
  [wrangler:error] TypeError: Illegal invocation: function called with incorrect `this` reference. See https://developers.cloudflare.com/workers/observability/errors/#illegal-invocation-errors for details.
     at null.<anonymous> (file:///.../server/src/dist/server/_expo/functions/_flight/%5B...rsc%5D.js:13:39)
     at f (file:///.../server/src/dist/server/_expo/functions/_flight/%5B...rsc%5D.js:2:2060)
     at a (file:///.../server/src/dist/server/_expo/functions/_flight/%5B...rsc%5D.js:2:1556)
  ```

## How this project was created

1. Create the expo app

   ```text
   pnpm create expo-app@latest 2511-expo-cf-worker
   cd 2511-expo-cf-worker
   ```

1. Create a server function
   - Update [app.json](app.json)
      - `web` > `output`: `server`
      - `experiments` > `reactServerFunctions`: `true`
   - `pnpx expo install react-server-dom-webpack`
   - Create [actions/server-func.ts](actions/server-func.ts)
   - Call `serverFunc` in [app/_layout.tsx](app/_layout.tsx)
   - Confirm the server function is working with the expo dev server: `pnpm run start`

1. Create the cloudflare worker server

   ```text
   pnpm create cloudflare@latest 2511-expo-cf-worker
   # Category? Hello World example > SSR / full-stack app
   # Language? TypeScript
   mv 2511-expo-cf-worker server
   ```

   - Remove `server/package.json`, move scripts and deps to root, `pnpm install`
   - `pnpx expo install expo-server`
   - Add workerd handler to [server/src/index.ts](server/src/index.ts)
   - Update [server/wrangler.jsonc](server/wrangler.jsonc)
      - `"assets": { "directory": "./src/dist/client" }`
      - Add `"nodejs_compat"` to `compatibility_flags`
      - Add `"rules"` to catch the exported files

1. Export the app and run the worker
   - `pnpm run export`
      - which runs: `expo export -p web --output-dir=server/src/dist`
      - Note that `pnpx expo export...` doesn't work for some reason
   - `pnpm run cf-dev`

1. Create an API route, call from _layout.tsx

---

## Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
