<div align="center">
  <br>
<p align="center" width="100%">
    <img src="docs/images/logo.png" alt="tanple icon" style="width: 140px; height:140px; display: block; margin: auto; border-radius: 80%;">
</p>
  <h2>탄소저감 크레딧 플랫폼, 탄플 - 클라이언트</h2></hr>
  <p align="center">
    <img src="https://img.shields.io/badge/React_Native-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React Native badge">
    <img src="https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white" alt="Expo badge">
    <img src="https://img.shields.io/badge/Zustand-000000?style=flat-square&logo=zustand&logoColor=white" alt="Zustand badge">
    <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white" alt="TanStack Query badge">
    <img src="https://img.shields.io/badge/React_Native_Paper-6200EE?style=flat-square&logo=react&logoColor=white" alt="React Native Paper badge">
    <img src="https://img.shields.io/badge/Lottie-FF69B4?style=flat-square&logo=lottie&logoColor=white" alt="Lottie badge">
  </p>
</div>

## Getting Started

### Information

```
React Native 0.73.6
Expo SDK 50.0.14
Expo Router
Airbnb ESLint & Prettier
React Native Paper
```

<br/>

### Installation

1. Clone the repository:

```bash
git clone https://github.com/inha-tanple/tanple-client.git
```

2. Navigate to the project directory:

```bash
cd tanple-client
```

3. Install dependencies:

```bash
npm install
```

<br/>

### Usage

1. Make [.env] file in root directory

```bash
# google Ouath 2.0 client ID
ANDROID_CLIENT_ID=
IOS_CLIENT_ID=
EXPO_CLIENT_ID=
WEB_CLIENT_ID=

# your backend server URL
SERVER_URL=
```

2. Make [env.d.ts] file in root directory

```ts
declare module '@env' {
  export const ANDROID_CLIENT_ID: string
  export const IOS_CLIENT_ID: string
  export const EXPO_CLIENT_ID: string
  export const WEB_CLIENT_ID: string
  export const SERVER_URL: string
}
```

3. Make [expo-env.d.ts] file in root directory

```ts
/// <reference types="expo/types" />

// NOTE: This file should not be edited and should be in your git ignore
```

4. Package Install & Edit file like this
   <br/>
   ./node_modules/react-native-snap-carousel/src/carousel/Carousel.js
   <br/>
   ./node_modules/react-native-snap-carousel/src/Pagination/Pagination.js
   <br/>
   ./node_modules/react-native-snap-carousel/src/Pagination/PaginationDot.js
   <br/>
   ./node_modules/react-native-snap-carousel/src/ParallaxImage/ParallaxImage.js

```bash
npm install
```

```js
// from
import { ... ,ViewPropTypes } from 'react-native';

// to
import { ... } from 'react-native';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
```

5. Put google-services.json on root directory

   You need to register a firebase key for the notification service.
   <br/>
   Follow the instructions at the address below.
   https://docs.expo.dev/push-notifications/fcm-credentials/

6. (Optional) You can toggle the Storybook screen by commenting out the below in '/src/app/_layout_.tsx'.

   [Current react-native-skia version doesn't support storybook]

```tsx
// other codes ...
export { default } from '../../.storybook'
// other codes ...
```

<br/>

### Build

You can build it by creating an [eas.json] file and adding env option.

```json
{
  "cli": {
    "version": ">= 7.6.2"
  },
  "build": {
    "preview": {
      "distribution": "internal",
      "env": {
        "ANDROID_CLIENT_ID": "",
        "IOS_CLIENT_ID": "",
        "EXPO_CLIENT_ID": "",
        "WEB_CLIENT_ID": "",
        "SERVER_URL": "",
        "ANDROID_NDK": "/home/expo/Android/Sdk/ndk/25.1.8937393"
      },
      "ios": {
        "simulator": true
      },
      "android": {
        "ndk": "25.1.8937393"
      }
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

```bash
# run on ios simulator
npm run ios

# run on android emulator
npm run android

# build android
eas build -p android --profile preview

# build ios
eas build -p ios --profile preview
```
