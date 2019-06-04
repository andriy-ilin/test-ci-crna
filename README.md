# Ukrainer mobile application

[![Travis](https://travis-ci.org/andriy-ilin/ukrainer.apl.svg?branch=master)](https://travis-ci.org/andriy-ilin/ukrainer.apl)
[![Conventional Commits](https://img.shields.io/badge/Conventional_Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## About Ukrainer

Ukrainer, a new media project aimed to discover through a thorough research who we actually are and to share these discoveries. Ukrainer will share curious stories from obscure places, people, art, and food. Using what we’ve discovered, we will create a modern guide to Ukraine, translated into multiple languages.

## About project

Ukrainer.apl - react native application bootstrap with expo, designed to run on a mobile device such as a phone.

## Getting Started

Before start you need follow next steps:

1. Clone repo `git clone https://github.com/andriy-ilin/ukrainer.apl.git`
2. Create file `.env` [List of variables](ENVIRONMENT.md).
3. Install all dependencies `npm ci`
4. Run application `npm start`

## Running the tests

Just write `npm run test:watch` for running tests with watcher.
Or you can write `npm test -- -u --detectOpenHandles --forceExit` for running tests like CI stage before deploy.

## Structure of screens

1. [**Menu**](#menu-screen) - screen with links to main blocks in application.
2. **Main**
   1. **Home**
   - [**Home**](#home-screen) - screen with top and favorites list of articles on diffrent languages
   - [**Article**](#article-screen) - screen with full information about place or hero article. Includes long read text, video, images and team author who create this article. Button languages show how many translate this article have.
   - [**About**](#about-screen) - screen which tell user about project Ukrainer and introduce main team.
   - [**Team**](#team-screen) - screen with all heros who help create project Ukrainer.
   - [**Author**](#author-screen) - screen contains full information about author about it role in project and in what articles participate author.
   - [**Video**](#video-screen) - screen contains two block of video. Video story and how make this story (vlog).
   - [**Partners**](#partners-screen) - screen with list of partners and link to join to partnership.
   - [**Contacts**](#contacts-screen) - screen with list of social acconts in diffrent social media.
   2. [**Donate**](#donate-screen) - screen where user can read about how he can help Ukrainer.
   3. **Shop**
   - [**Shop**](#shop-screen) - screen contains list of product in Ukrainer shop.
   - [**Product**](#product-screen) - screen with details about product, sizes, purpose, color, weight, width and length.
   - [**Cart**](#cart-screen) - screen for make orders with product which user chose.
   4. **Favorite**
   - [**Favorite**](#favorite-screen) - screen contains list of favorites articles. User can add article to favorites on article screen.
   - [**Article**](#article-screen) - screen with full information about place or hero article. Includes long read text, video, images and team author who create this article. Button languages show how many translate this article have.
   5. **Regions**
   - [**Regions**](#regions-screen) - screen contains contains two block. First - region block show list of diffrent regions. Second - all articles block show list of all articles.
   - [**Region details**](#region-details-screen) - screen with full information about region. Short decription video about region and list of all articles from this region.
   - [**Article**](#article-screen) - screen with full information about place or hero article. Includes long read text, video, images and team author who create this article. Button languages show how many translate this article have.
3. **Map**
   1. [**Map**](#map-screen) - screen with list of some articles and location on map.
   2. [**Map point**](#map-point-screen) - screen with additional information about poin on map (article on map).

### Menu screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        This screen user see after press on header burger menu <br />
        Screen include list of links to
        <a
          href="#about-screen"
          alt="about"
          >about</a
        >,
        <a
          href="#team-screen"
          alt="team"
          >team</a
        >,
        <a
          href="#video-screen"
          alt="video"
          >video</a
        >,
        <a
          href="#partners-screen"
          alt="partners"
          >partners</a
        >,
        <a
          href="#contacts-screen"
          alt="contacts"
          >contacts</a
        > screens.
      </td>
      <td>
        <img src="https://i.imgur.com/17BNC6H.png" alt="home" width="200" />
      </td>
    </tr>
  </tbody>
</table>

### Home screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        First screen which user see after loading application. <br />
        Screen include: <br />
        - vertical carousel with top list of articles with links to
        <a
          href="#article-screen"
          alt="home"
          >article</a
        >
        <br />
        - link to screen with
        <a
          href="#regions-screen"
          alt="home"
          >all articles</a
        >
        <br />
        - horizontal scroll favorites list of articles with links to
        <a
          href="#article-screen"
          alt="home"
          >article</a
        >
      </td>
      <td>
        <img src="https://i.imgur.com/3uSWnvF.png" alt="home" width="200" />
      </td>
    </tr>
  </tbody>
</table>

### Article screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        To this screen user can get from
        <a
          href="#home-screen"
          alt="home"
          >home</a
        >,
        <a
          href="#favorite-screen"
          alt="favorite"
          >favorite</a
        >,
        <a
          href="#regions-screen"
          alt="regions"
          >regions</a
        >,
        <a
          href="#region-details-screen"
          alt="region-details"
          >region details</a
        >
        and
        <a
          href="#author-screen"
          alt="author"
          >author</a
        >, <br />
        Screen include: <br />
        - title <br />
        - main image <br />
        - text article <br />
        - slider, images <br />
        - video <br />
        - team list with links to
        <a
          href="#author-screen"
          alt="author"
          >author</a
        >
        screen
      </td>
      <td>
        <img src="https://i.imgur.com/tsdGAXY.png" alt="home" width="200" />
      </td>
    </tr>
  </tbody>
</table>

### About screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        To this screen user can get from
        <a
          href="#menu-screen"
          alt="menu"
          >menu</a
        >
        screen. <br />
        Screen include: <br />
        - title <br />
        - long description project <br />
        - team block <br />
        -- foto author<br />
        -- name, role author <br />
        -- author's blockquote <br />
        - team list with links to
        <a
          href="#author-screen"
          alt="author"
          >author</a
        >
        screen
      </td>
      <td>
        <img src="https://i.imgur.com/IhDhvsI.png" alt="home" width="200" />
      </td>
    </tr>
  </tbody>
</table>

### Team screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        To this screen user can get from
        <a
          href="#menu-screen"
          alt="menu"
          >menu</a
        >
        screen. <br />
        Screen include: <br />
        - links for join the team, share music, recommend location <br />
        - list of authors with link to
        <a
          href="#author-screen"
          alt="author"
          >author</a
        >
      </td>
      <td>
        <img src="https://i.imgur.com/4NFweb1.png" alt="home" width="200" />
      </td>
    </tr>
  </tbody>
</table>

### Author screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        To this screen user can get from
        <a
          href="#team-screen"
          alt="team"
          >team</a
        >
        or
        <a
          href="#article-screen"
          alt="article"
          >article</a
        >
        screens. <br />
        Screen include: <br />
        - foto, name, roles author <br />
        - articles list with
        <a
          href="#article-screen"
          alt="article"
          >link</a
        >
        to it
      </td>
      <td>
        <img src="https://i.imgur.com/7jTyjFS.png" alt="home" width="200" />
      </td>
    </tr>
  </tbody>
</table>

### Video screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        To this screen user can get from
        <a
          href="#menu-screen"
          alt="menu"
          >menu</a
        >
        screen. <br />
        Screen include two block with chnaging view: <br />
        - video (default view on screen) - article video list with search and
        filter functionality <br />
        - vlog - article vlog list with search and filter functionality <br />
      </td>
      <td>
        <img src="https://i.imgur.com/0GCBgvU.png" alt="home" width="200" />
      </td>
    </tr>
  </tbody>
</table>

### Partners screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        To this screen user can get from
        <a
          href="#menu-screen"
          alt="menu"
          >menu</a
        >
        screen. <br />
        Partners screen include list of links to partners  and button to google form to become a partner.
      </td>
      <td>
        <img src="https://i.imgur.com/tLIbvuj.png" alt="home" width="200" />
      </td>
    </tr>
  </tbody>
</table>

### Contacts screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        To this screen user can get from
        <a
          href="#home-screen"
          alt="home"
          >home</a
        >
        screen. <br />
        Contacts screen include list of links to social media.
      </td>
      <td>
        <img src="https://i.imgur.com/xnFWRFF.png" alt="home" width="200" />
      </td>
    </tr>
  </tbody>
</table>

### Donate screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        To this screen user can get from
        <a
          href="#menu-screen"
          alt="menu"
          >menu</a
        >
        screen. <br />
        Donate screen include short information about support the project and
        button to join supporting Ukrainer.
      </td>
      <td>
        <img src="https://i.imgur.com/bLS9xEg.png" alt="home" width="200" />
      </td>
    </tr>
  </tbody>
</table>

### Shop screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        To this screen user can get from
        <a
          href="#home-screen"
          alt="home"
          >home</a
        >
        screen. <br />
        Screen include: <br />
        - list of products with link to
        <a
          href="#product-screen"
          alt="product"
          >details product</a
        >
        <br />
        - title, price, image products <br />
      </td>
      <td>
        <img src="https://i.imgur.com/N0WntXW.png" alt="shop" width="200" />
      </td>
    </tr>
  </tbody>
</table>

### Product screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        To this screen user can get from
        <a
          href="#shop-screen"
          alt="shop"
          >shop</a
        >
        screen. <br />
        Screen include: <br />
        - vertical carousel images of product <br />
        - description about product <br />
        - additional information about product - size, color, weight, etc.
        <br />
        - select size, color, weight, etc. <br />
        - select quantity <br />
        - button add to cart <br />
      </td>
      <td>
        <img src="https://i.imgur.com/80NfnaQ.png" alt="product" width="200" />
      </td>
    </tr>
  </tbody>
</table>

### Cart screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        To this screen user can get from
        <a
          href="#shop-screen"
          alt="shop"
          >shop</a
        >
        screen. <br />
        Screen include: <br />
        - list of product with select quantity<br />
        - total price <br />
        - form shipment details, with required fields: name, phone, mail <br />
      </td>
      <td>
        <img src="https://i.imgur.com/fu66tbx.png" alt="cart" width="200" />
      </td>
    </tr>
  </tbody>
</table>

### Favorite screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        To this screen user can get from
        <a
          href="#home-screen"
          alt="home"
          >home</a
        >
        screen. <br />
        Screen include: <br />
        - list of favorite articles<br />
        - long press to article open delete modal <br />
        - short press to article open
        <a
          href="#article-screen"
          alt="home"
          >home</a
        >
        screen. <br />
      </td>
      <td>
        <img src="https://i.imgur.com/YMptyNs.png" alt="cart" width="200" />
      </td>
    </tr>
  </tbody>
</table>

### Regions screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        To this screen user can get from
        <a
          href="#home-screen"
          alt="home"
          >home</a
        >
        screen. <br />
        Screen include two block with changing view: <br />
        - list of regions with links to
        <a
          href="#region-details-screen"
          alt="region-details"
          >details region</a
        ><br />
        - list of all articles with links to details
        <a
          href="#article-screen"
          alt="article"
          >article</a
        ><br />
        Also on screen user can find specific article or filter few regions
      </td>
      <td>
        <img src="https://i.imgur.com/Wj9yPs9.png" alt="regions" width="200" />
      </td>
    </tr>
  </tbody>
</table>

### Region details screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        To this screen user can get from
        <a
          href="#regions-screen"
          alt="regions"
          >regions</a
        >
        screen. <br />
        Screen include full details about region: <br />
        - region description<br />
        - video about region<br />
        - list of region
        <a
          href="#article-screen"
          alt="article"
          >articles</a
        >
      </td>
      <td>
        <img src="https://i.imgur.com/ANPEPDw.png" alt="regions" width="200" />
      </td>
    </tr>
  </tbody>
</table>

### Map screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        To this screen user can get from
        <a href="#regions-screen" alt="regions">regions</a> screen. <br />
        Screen include list of some
        <a href="#map-point-screen" alt="map-point">points</a> (articles) which
        conencted to locations on map. When user swipe caruosel with articles
        maps coordinates rerender and user can see new location. <br />
      </td>
      <td>
        <img src="https://i.imgur.com/rGMp9a0.png" alt="regions" width="200" />
      </td>
    </tr>
  </tbody>
</table>

### Map point screen

<table>
  <thead>
    <tr>
      <th width="650px">About</th>
      <th width="210px">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        To this screen user can get from
        <a href="#map-screen" alt="map">map</a> screen. <br />
        Screen include details of map point (article): <br />
        - short description point <br />
        - video about point <br />
        - link to google maps to this point <br />
      </td>
      <td>
        <img src="https://i.imgur.com/R4GwBSP.png" alt="regions" width="200" />
      </td>
    </tr>
  </tbody>
</table>

## Structure project `Ukrainer` and relative repo

1. Mobile application - [ukrainer.apl](https://github.com/andriy-ilin/ukrainer.apl)
2. Admin web application - [ukrainer.web](https://github.com/andriy-ilin/ukrainer.web)
3. API (send push notifications) - [ukrainer.api](https://github.com/andriy-ilin/ukrainer.api)

## Built With

- [Expo](https://github.com/expo/expo) - Platform for making cross-platform mobile apps
- [Mobx](https://github.com/mobxjs/mobx) - Simple, scalable state management
- [Firebase](https://firebase.google.com/) - Development platform with Firebase Auth and Firebase Realtime Database services.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/andriy-ilin/ukrainer.apl/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **Andriy Ilin** - _Initial work_ - [Github profile](https://github.com/andriy-ilin)

See also the list of [contributors](https://github.com/andriy-ilin/ukrainer.apl/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
