# Introduction

In this hands-on lab you will learn how to use the OpenShift Container Platform on IBM Cloud. The goal of OpenShift is to provide a great experience for both Developers and System Administrators to develop, deploy, and run containerized applications.

You will familiarize yourself with OpenShift, deploy a micro-service Node.js application to OpenShift, scale the application, connect to a Cloudant DBaaS, check logs and monitor with Sysdig.

## Architecture

![architecture](./assets/app-architecture.png)

1. A developer deploy a Node.js micro service application from the OpenShift Console.
1. Building the application produces a Docker container image.
1. The image is pushed to a project in OpenShift cluster.
1. The application is deployed to a OpenShift cluster.
1. Users access the application.
1. A developer connects the application to a Cloudant database with IBM Cloud Operator.
1. An Ops monitors the app with Cloud Logs and Cloud Monitoring.

## Cloud Services used

This tutorial uses the following IBM Cloud Services:

* [Red Hat OpenShift on IBM Cloud](https://cloud.ibm.com/kubernetes/catalog/create?platformType=openshift)
* [IBM Cloud Logs](https://cloud.ibm.com/observe/logging)
* [IBM Cloud Monitoring](https://cloud.ibm.com/observe/monitoring)

## Command Lines

This diagram gives you an overview of the services and main command lines you will be using during the lab.

![cli](./assets/command-lines.png)

## Access the tutorial

The lab is accessible at this URL [https://ibm-cloud.github.io/openshift4-lab/](https://ibm-cloud.github.io/openshift4-lab/)