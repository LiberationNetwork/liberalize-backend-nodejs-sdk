# LiberationNetwork/liberalize-backend-nodejs-sdk
This is the clientside SDK to implement Single Sign On with Liberalize

The `liberalize-backend-nodejs-sdk` package contains only the functionality necessary to signin via Liberalize. It is typically used to easily implement login components with liberalize and are heavily used in liberalize services as well as open source projects.

**Note:** By default, LiberalizeSSO will be in production mode. The staging version are for you to integrate with other staging environments of Liberalize services. Don't forget to build the correct environment when deploying your applications.

## Installation
    npm install liberalize-sso-js-sdk 
or
    
    yarn add liberalize-sso-js-sdk

## Import