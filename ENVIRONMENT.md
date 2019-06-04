# Environment Variables

Application can be configured using these environment variables:

| Name                           | Default value | Description                                                          |
| :----------------------------- | :------------ | :------------------------------------------------------------------- |
| `EXPO_DEBUG`                   | false         | Environment in which application is running. Can be `true`, `false`. |
| `FIREBASE_API_KEY`             | not set       | Firebase project settings. API key                                   |
| `FIREBASE_AUTH_DOMAIN`         | not set       | Firebase project settings. Auth domain                               |
| `FIREBASE_DATABASE_URL`        | not set       | Firebase project settings. Database url                              |
| `FIREBASE_PROJECT_ID`          | not set       | Firebase project settings. Project id                                |
| `FIREBASE_STORAGE_BUCKET`      | not set       | Firebase project settings. Storage bucket                            |
| `FIREBASE_MESSAGING_SENDER_ID` | not set       | Firebase project settings. Messaging sender id                       |
| `FIREBASE_AUTH_MAIL`           | not set       | Firebase project settings. Auth domain with read db role             |
| `FIREBASE_AUTH_PASS`           | not set       | Firebase project settings. Auth pass with read db role               |
| `PUSH_ENDPOINT`                | null          | Ukrainer API service URL. Need for register token device.            |
| `PUSH_SECRET_CODE`             | null          | Secret code to parse requests on ukrainer api services.              |
| `PUSH_APP_NAME`                | ukrainer      | App name to parse requests on ukrainer api services.                 |
