# Epicture

A cross platform mobile client to browse the Imgur platform, designed to be simple as Instagram.

## Contents
- [Introduction](#introduction)
    - [Contributors](#contributors)
    - [Disclaimer](#disclaimer)
- [Features](#features)
- [Getting started](#getting-started)
    - [Remote build](#remote-build)
    - [Local build (Android)](#local-build-android)
    - [Local build (iOS)](#local-build-ios)
- [Development](#development)
    - [Local dev server](#local-dev-server)
    - [Launching from Expo QR code](#launching-from-expo-qr-code)
    - [Running tests](#running-tests)
- [Imgur API](#imgur-api)
    - [Imgur Usage](#imgur-usage)
    - [Examples](#examples)
    - [Utils](#utils)
    - [Routes](#routes)

## Introduction

This application is not (yet) an official Imgur client for mobile users.

It was written using react-native and expo, and runs on Android SDK 21-28 / iOS 10.0-12.1.

### Contributors

* [Paul Laffitte](https://github.com/paullaffitte)
* [Arthur Chaloin](https://github.com/arthurchaloin)

### Disclaimer

We do not endorse any responsablities regarding what could happen to your Imgur account..

## Features

* Display the user's personalized timeline
* Explore photos with various sorting possibilities
* Upload pictures (publicly or not)
* View other user's profile
* View and manage your profile
* View and manage your favorites
* Search for pictures

## Getting started

### Remote build

You can build remotely using Expo's servers and your Expo account.

```bash
expo login

# Android
expo build:android

# iOS
expo build:ios
```

Then launch the app by following [thoose steps](#launching-from-Expo-qr-code) and replacing the url by your own username.

### Local build (Android)

To build a production APK for Android, use the Graddle Wrapper tool in the `android/` directory.

```bash
cd android
./gradlew build
```

### Local build (iOS)

To build a production IPA for iOS, open the Xcode workspace in the `ios/` directory (on a mac).

```bash
cd ios
pod install
open epicture.xcworkspace
```

## Development

### Local dev server

You will need a recent node.js version to run this project. Install the dependencies and start the expo development server.

```bash
yarn
npm i -g expo-cli
expo start
```

Then follow the guide on how to [scan an expo QR core](#launching-from-Expo-qr-code). Replace the given url by the one shown in your terminal.

### Launching from Expo QR code

First, install the expo application on your smartphone [android](https://play.google.com/store/apps/details?id=host.exp.exponent)/[ios](https://itunes.apple.com/app/apple-store/id982107779).
Then go to https://expo.io/@onehandedpenguin/epicture and scan the QR code with the application.

### Running tests

This application is tested using [Jest](https://jestjs.io). To run all the test suites, use `yarn test`.

Tests suites are located in the `__tests__` directory for screens, and `components/__tests__` for components.

## Imgur API
### Imgur Usage
``` js
let imgur = new Imgur(clientId, Config.clientSecret, access_token);
```

### Examples
Construct without access_token and then login
``` js
let imgur = new Imgur(clientId, Config.clientSecret);
let galleryUnauthenticated = await imgur.gallery({page: 2});

imgur.login(access_token);
let galleryAuthenticated = await imgur.toogleFavorite({albumHash: 'hash'});
};
```

Construct with access_token and then logout
``` js
let imgur = new Imgur(clientId, Config.clientSecret, access_token);
let favorites = await imgur.favorites({
    username: 'username',
    page: 2,
});

imgur.logout();
let gallery = await imgur.gallery({page: 5});
```

### Utils
Login
``` js
imgur.login(access_token);
```
Logout
``` js
imgur.logout();
```
Toggle vote - shorthand for toggling up/down/unvote. To be used in a button onclick callback for instance
``` js
let vote = imgur.toggleVote(vote, currentValue, galleryHash);
```
Get auth url - the url to start the authentication protocol, using OAuth 2.0
``` js
let authUrl = imgur.getAuthUrl(redirectUrl);
```

### Routes
[Account](https://apidocs.imgur.com/#c94c8719-fe68-4854-b96d-70735dd8b2bc)
``` js
imgur.account({username});
```
[Account submissions](https://apidocs.imgur.com/#286367c1-bb24-4e74-bad9-d2c75b943b3c)
``` js
imgur.accountSubmissions({username});
```
[Account images](https://apidocs.imgur.com/#ee366f7c-69e6-46fd-bf26-e93303f64c84)
``` js
imgur.accountImages();
```
[Upvote](https://apidocs.imgur.com/#23e5f110-318a-4872-9888-1bb1f864b360)
``` js
imgur.upvote({galleryHash});
```
[Downvote](https://apidocs.imgur.com/#23e5f110-318a-4872-9888-1bb1f864b360)
``` js
imgur.downvote({galleryHash});
```
[Unvote](https://apidocs.imgur.com/#23e5f110-318a-4872-9888-1bb1f864b360)
``` js
imgur.unvote({galleryHash});
```
[Toogle favorite](https://apidocs.imgur.com/#31c72664-59c1-426f-98d7-ac7ad6547cc2)
``` js
imgur.toogleFavorite({albumHash});
```
[Favorites](https://apidocs.imgur.com/#a432a8e6-2ece-4544-bc7a-2999eb586f06)
``` js
imgur.favorites({username, page, sort});
```
[Share](https://apidocs.imgur.com/#39729532-1f9f-4b56-ba26-f4ef8d757ef1)
``` js
imgur.share({imageHash, title, topic, tags});
```
[Gallery](https://apidocs.imgur.com/#eff60e84-5781-4c12-926a-208dc4c7cc94)
``` js
imgur.gallery({section, sort, window, page, showViral, mature, album_previews});
```
[Gallery search](https://apidocs.imgur.com/#3c981acf-47aa-488f-b068-269f65aee3ce)
``` js
imgur.gallerySearch({sort, window, page, q});
```
[Gallery image](https://apidocs.imgur.com/#6b97ac3f-0fbc-43d9-bb8e-47321ee6dc46)
``` js
imgur.galleryImage({galleryImageHash});
```
[Gallery tag](https://apidocs.imgur.com/#0f89160b-8bb3-40c5-b17b-a02cc8a2f73d)
``` js
imgur.galleryTag({tagName, sort, window, page});
```

