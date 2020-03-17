# Access the cluster using the command line (CLI)

To easily connect to the cluster, you need the OpenShift CLI `oc` that exposes commands for managing your applications, as well as lower level tools to interact with each component of your system. 

This topic guides you through getting started with the CLI, including installation and logging in.

## Use IBM Cloud Shell

To avoid installing the command line, the recommended approach is to use the IBM Cloud Shell is a cloud-based shell workspace that you can access through your browser.

It's preconfigured with the full IBM Cloud CLI and tons of plug-ins and tools that you can use to manage apps, resources, and infrastructure.

1. In the Console menu bar, click the IBM Cloud Shell icon to start a session

    ![](../assets/cloud-shell-access.png)

1. A session starts and automatically logs you in through the IBM Cloud CLI.

    ![](../assets/cloud-shell-login.png)


## Connect to the OpenShift cluster

1. In the OpenShift web console, click on the email/ID in the upper right. Choose the _Copy Login Command_ option.

    ![Copy the login credentials](../assets/copy-login-command.png)


1. In a Shell termimal, paste the login command you copied from the web console.

    ```bash
    oc login https://c100-e.us-south.containers.cloud.ibm.com:30360 --token=NYVkVysxxxxxxxxxxxxxxxxxxxxRQa8tM
    ```

    You should see a success message similar to the one below:

    ```bash
    oc login https://c100-e.us-south.containers.cloud.ibm.com:30360 --token=NYVkVysxxxxxxxxxxxxxxxxxxxxRQa8tM

    Logged into "https://c100-e.us-south.containers.cloud.ibm.com:30360" as "IAM#firstname.lasname@ibm.com" using the token provided.

    You have access to the following projects and can switch between them with 'oc project <projectname>'
    ```
Your CLI is now connected to your Red Hat OpenShift cluster running in IBM Cloud.


## Validate cluster access using `oc` commands

1. View nodes in the cluster.

    ```bash
    oc get node
    ```

2. View services, deployments, and pods.

    ```bash
    oc get svc,deploy,po --all-namespaces
    ```

3. View projects

    ```bash
    oc get projects
    ```

You've completed the getting started! Let's recap -- in this section, you:

* Got an OpenShift cluster and accessed its Web Console.
* Connected your local CLI to a running OpenShift cluster on IBM Cloud

## Install OpenShift CLI tools (Optional)

The `oc` CLI will be the main mechanism to interact with your OpenShift cluster. We'll be downloading and installing the CLI, and adding it to your environment path.

> _NOTE_: Check for newer releases on the [OpenShift Origin Releases](https://github.com/openshift/origin/releases/) page.

Download the `oc` tarball.

```bash
wget https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz
```

Unpack the tarball

```bash
tar -xvzf openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz
```

Rename it for ease of use

```bash
mv openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit ${HOME}/oc-cli
```

Update `PATH`.

> _NOTE_: If you restart your cloud shell, you may need to re-run this command.

```bash
export PATH=${PATH}:${HOME}/oc-cli
```

Verify the utility is available by using `which` and the help command.

```bash
which oc
```

```bash
oc help
```