# expo-server on a cloudflare worker

## How this project was created

1. Create the expo app and workers server

   ```bash
   pnpm create expo-app@latest 2511-expo-cf-worker
   cd 2511-expo-cf-worker
   ```

1. Create server function
   - Update [app.json](app.json)
      - `web` > `output`: `server`
      - `experiments` > `reactServerFunctions`: `true`
   - `pnpx expo install react-server-dom-webpack`
   - Create [actions/server-func.ts](actions/server-func.ts)
   - Call `serverFunc` in [app/_layout.tsx](app/_layout.tsx)
   - Confirm the server function is working with the expo dev server: `pnpm run start`

1. Create the cloudflare worker server

   ```bash
   pnpm create cloudflare@latest 2511-expo-cf-worker
   ? Category ? Hello World example > SSR / full-stack app
   ? Language ? TypeScript
   mv 2511-expo-cf-worker server
   ```

   Remove `server/package.json`, move scripts and deps to root, `pnpm install`

   ```bash
   pnpm install
   ```

1. Replace [server/src/index.ts](server/src/index.ts) and try to run
   - `pnpx expo install expo-server`
   - `npx expo export -p web`
      - ^^^ `pnpx ...` doesn't work for some reason
   - Update [server/wrangler.jsonc](server/wrangler.jsonc)
      - `"assets": { "directory": "../dist/client" }`
      - Add `"nodejs_compat"` to `compatibility_flags`
   - `pnpm run cf-dev`

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
