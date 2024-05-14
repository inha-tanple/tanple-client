# Carbon Credit Exchange Platform

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

5. (Optional) You can toggle the Storybook screen by commenting out the below in '/src/app/_layout_.tsx'.

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
        "SERVER_URL": ""
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
