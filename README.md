# React UI Starter

# Getting Started

## Prerequisites 2 knowledge of git

1. Node.js

This project relies on the [Enterprise Artifactory](https://sres.web.boeing.com/) to download project dependencies from external repositories (npm). To configure your machine to use the Enterprise Artifactory, please follow the guide for [npm](http://skynet.hb.cal.boeing.com/wiki/index.php/Setting_up_Maven_and_NPM_for_the_Boeing_Artifactory).

## Git

Use the git clone command to make a copy of the repository in a new directory.

```$ git clone git@git-ssh.web.boeing.com:aims-root/cookbook/reusable-software/react-ui-starter.git```

## Installation

```
$ npm install
```

## Build

The static files for the project are located in src/client. The files are bundled using npm and Webpack, and placed in `dist/`. To build the `dist/` directory for production, run ```$npm run build```.

## Run

There are multiple ways to starting the application. 

To start the application normally, run ```$ npm run start```.
To start the application for development (with hot reloading), run ```$ npm run dev```.

The application will be running on ```localhost:3000```.

# Deployment

## Cloud (Pivotal Cloud Foundry)

To deploy to PCF, ensure that you are targeting the correct space with `cf target`. Then, run the following commands:

```
$ gulp                    # build the dist/ files using webpack
$ npm prune --production  # remove development dependencies before uploading
$ cf push
```

By default, the `cf push` command will use the `manifest.yml` file. To use a different manifest file, use `cf push -f manifest-test.yml`.

After deploying the PCF, run ```$ npm install``` again to re-install development dependencies.

# References

## Styling
* [Google Material Design](https://material.io/guidelines/)
* [Boeing Digital Experience](http://design.web.boeing.com)
* [Boeing Intranet Style Guide](http://intranetstyleguide.web.boeing.com/index.cfm)
  * [Web Page Templates](http://intranetstyleguide.web.boeing.com/6_templates.cfm)
* [Boeing Colors](http://brandcenter.web.boeing.com/_standards/color.cfm)

## Programming
* [React](https://facebook.github.io/react/)
* [React Tutorial](https://tighten.co/blog/react-101-building-a-gif-search-engine)
* [React Cheat Sheet](https://ihatetomatoes.net/wp-content/uploads/2017/01/react-cheat-sheet.pdf)
* [Material-UI](http://www.material-ui.com/#/)
* [Material-UI Color Mapping](https://github.com/callemall/material-ui/blob/master/src/styles/getMuiTheme.js)