#!/usr/bin/env groovy

/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
@Library("df-common-pipeline@master")

import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import java.util.UUID
import com.boeing.da.digitalfactory.*

node {
    /*****************************************************
    * DO NOT CHANGE the below
    *****************************************************/
    sharedPipeline = new nodejsPipeline()

    //limit concurrent builds
    properties([
            buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '3', daysToKeepStr: '', numToKeepStr: '3')),
            disableConcurrentBuilds()
    ])

    //load the default env vars first
    sharedPipeline.setDefaultEnvVars(env)

    /******************************************************
     Overriden pipeline variables - YOU SHOULD CHANGE THESE TO MEET YOUR NEEDS
    ******************************************************/
    env.APP_BASE_NAME = "react-ui-nodejs-starter" //think of this as the spring-boot app name
    env.CF_PUSH_APP_NAME = "react-ui-nodejs-starter"
    env.DEPLOY_TO_EWD = "true" //should be true or false
    env.DEPLOY_TO_PHX = "true" //should be true or false
    env.DEPLOY_TO_CLT = "true" //should be true or false
    env.CF_PRE_CREDS_ID = 'AIMS_COOKBOOK-buildmachine'
    env.CF_PROD_CREDS_ID = 'AIMS_COOKBOOK-automation'    
    env.CF_ORG = 'AIMS_COOKBOOK'
    env.CF_PUSH_MEMORY_QUOTA = '512M'
    env.CF_PUSH_DISK_QUOTA = '256M'
    env.CF_APP_PATH = 'node src/server/server.js' // This is the start command for your application.

    /******************************************************
     Other _available_ variables. If you do not override them, then the values of these variables are the defaults from the common pipeline (shown below, just for examples).
    ******************************************************/
    
    // env.MATTERMOST_ENDPOINT = 'https://mattermost.web.boeing.com/hooks/6x3spkrc17fybnn1bxgfz7rdph'
    // env.CF_PUSH_INSTANCE_COUNT = "1"
    // env.CF_PUSH_TIMEOUT = 1440
    // env.CF_PUSH_BUILDPACK = "nodejs_buildpack"

    def services = [
            // Add your services as necessary:
            [ name: "aims-df-service-registry" ]
            // [ name: "my-service1" ],
            // [ name: "my-service2" ]
    ]

    def envVars = [
      // Add your environment variables as necessary:
      // [key: 'MY_NODEJS_ENV_VARIABLE', value: "someValue"]
    ]

    sharedPipeline.runPipeline(services, envVars)

}