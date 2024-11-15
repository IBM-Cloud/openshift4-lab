# Deploying an application

In this exercise, you'll deploy a simple Node.js Express application - "Example Health". Example Health is a simple UI for a patient health records system. We'll use this example to demonstrate key OpenShift features throughout this workshop. You can find the sample application GitHub repository here: [https://github.com/svennam92/node-s2i-openshift](https://github.com/svennam92/node-s2i-openshift)

## Deploy Example Health

1. Launch the `OpenShift web console`.

    ![console](../assets/ocp-console.png)

1. Select the **Project** view to display all the projects. This view might be empty based on your permission.

    ![project](../assets/ocp-project.png)

1. Create a new project by selecting **Create Project**. Call the project `lab-<your-lastname>`.

    > If you've been invited to a lab account, an existing project may have been created for you. Otherwise, make sure to give a unique project name using your last name.

    ![create](../assets/ocp-create-project.png)

1. Access the **Project Details** under the section **Home** on the left side menu.

    ![Project Details](../assets/ocp48-project-details.png)

1. Switch from the **Administrator** to the **Developer** view.

    ![switch](../assets/ocp-switch.png)

1. In the **Developer** view, make sure your project is selected. Click **+Add** in the right panel and select **Import From Git** to deploy the app.

    ![fromgit](../assets/ocp-project-view.png)

1. Enter the repository `https://github.com/lionelmace/nodejs-openshift-patient` in the Git Repo URL field.

    ![git](../assets/ocp-configure-git.png)

    Note that the builder image automatically detected the language Node.js.

1. Enter `health` for the application name field. Name your application such as `patient-ui`. Hit **Create** at the bottom of the window to build and deploy the application.

    ![app](../assets/ocp-app-name-short.png)

    Your application is being deployed.

## View the Example Health

1. You should see the app you just deployed.

    ![topology](../assets/ocp-topology-app.png)

1. Select the app by clicking the icon nodejs in the middle of the circle. A contextual panel will pop up with the app details including the Deployment, the Pods, Builds, Services and Routes.

    ![details](../assets/ocp-topo-app-details.png)

    * **Pods**: Your Node.js application containers
    * **Builds**: The auto-generated build that created a Docker image from your Node.js source code, deployed it to the OpenShift container registry, and kicked off your deployment config.
    * **Services**: Tells OpenShift how to access your Pods by grouping them together as a service and defining the port to listen to
    * **Routes**: Exposes your services to the outside world using the LoadBalancer provided by the IBM Cloud network

1. Click on **View Logs** next to your completed Build. This shows you the process that OpenShift took to install the dependencies for your Node.js application and build/push a Docker image.

    ![Build Logs](../assets/ocp43-build-logs.png)

    You should see that looks like this:

    ```bash
    Successfully pushed image-registry.openshift-image-registry...
    Push successful
    ```

1. Click back to the **Topology** and select your app again. Click on the url under **Routes** to open your application with the URL.

    ![ui](../assets/patient-ui-web.png)

    You can enter any strings for username and password, for instance `test:test` because the app is running in demo mode.

Congrats! You've deployed a `Node.js` app to OpenShift Container Platform.

You've completed the first exercise! Let's recap -- in this exercise, you:

* Deployed the "Example Health" Node.js application directly from GitHub into your cluster
* Used the "Source to Image" strategy provided by OpenShift
* Deployed an end-to-end development pipeline
* New commits that happen in GitHub can be pushed to your cluster with a simple \(re\)build
* Looked at your app in the OpenShift console.

## What's Next?

Let's dive into some Day 1 OpenShift Operations tasks, starting with Monitoring and Logging
