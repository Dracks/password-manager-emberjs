# View for password manager using django
View of [password manager using django](https://github.com/Dracks/password-manager-django) using EmberJS

I made this, as a view to know how works emberjs and django, also It has the feature that be a little project to made
tests about how work something of ember, for example try the drf plugin and localization plugin

# View

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

Also is required to have installed and runing the password manager server
https://github.com/Dracks/password-manager-django

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Todo
1. Change the group edition working, to work fine with the selector.
2. Implement the public/private key system. using keys on groups, and keys for user.
3. Refactor views to use components.
4. Refactor routes deleting the architecture of childs, in Sites/list and Site edit/new.
