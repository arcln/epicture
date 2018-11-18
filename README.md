# Epicture

## Sections
1. [Introduction](#epicture)
2. [Sections](#sections)
3. [Features](#features)
4. [Usage](#usage)
    1. [Gradle](#gradle)
    2. [Expo local developpement build](#expo-local-developpement-build)
    3. [Expo QR code](#expo-qr-code)
5. [Imgur API](#imgur-api)
    1. [Usage](#imgur-usage)
    2. [Examples](#examples)
    2. [Utils](#utils)
    2. [Routes](#routes)

## Features

## Usage
### Gradle
### Expo local developpement build
To build this project locally with expo, you just to follow these steps
1. Install [nodejs](https://nodejs.org/en/download/)
2. Clone Epicture repository
3. run `npm i`
4. run npm start
5. Follow the guide on how to [scan an expo QR core](#expo-qr-code). Replace the given url by the one shown in your terminal.

### Expo QR code
First, install the expo application on your smartphone [android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [ios](https://itunes.apple.com/app/apple-store/id982107779).
Then go to https://expo.io/@onehandedpenguin/epicture and scan the QR code with the application.

---
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
