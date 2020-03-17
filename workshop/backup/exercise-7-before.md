# Exercise 7: Configure LogDNA agent for OpenShift  cluster

The LogDNA agent is responsible for collecting and forwarding logs to your IBM Log Analysis with LogDNA instance. After you provision an instance of IBM Log Analysis with LogDNA, you must configure a LogDNA agent for each log source that you want to monitor.

To configure your Kubernetes cluster to send logs to your IBM Log Analysis with LogDNA instance, you must install a *LogDNA-agent* pod on each node of your cluster. The LogDNA agent reads log files from the pod where it is installed, and forwards the log data to your LogDNA instance.

To forward logs to your LogDNA instance, complete the following steps from the command line:

## Step 1. Access your cluster through the CLI

[Access your cluster using the oc CLI](../getting-started/setup_cli#access-your-cluster-using-the-oc-cli). 

## Launch the LogDNA webUI

You launch the web UI within the context of an IBM Log Analysis with LogDNA instance, from the IBM Cloud UI. 

Complete the following steps to launch the web UI:

1. Click the **Menu** icon ![](../assets/admin.png) &gt; **Observability**. 

2. Select **Logging**. 

    The list of instances that are available on IBM Cloud is displayed.

3. Select your instance. Check with the instructor which instance  you should use for the lab.

4. Click **View LogDNA**.

The Web UI opens.

## Step 3. Get the ingestion key for your LogDNA instance

1. In the LogDNA web UI, select the **Settings** icon ![](../assets/admin.png). Then select **Organization**.
2. Select **API keys**.

    ![](../assets/views-img-18.png)

3. Copy the ingestion key.

## Step 4. Store your LogDNA ingestion key as a Kubernetes secret

You must create a Kubernetes secret to store your LogDNA ingestion key for your service instance. The LogDNA ingestion key is used to open a secure web socket to the LogDNA ingestion server and to authenticate the logging agent with the IBM Log Analysis with LogDNA service.

1. Create a project. A project is a namespace in a cluster.

    ```
    oc adm new-project --node-selector='' ibm-observe
    ```

    Set `--node-selector=''` to disable the default project-wide node selector in your namespace and avoid pod recreates on the nodes that got unselected by the merged node selector.

2. Create the service account **logdna-agent** in the cluster namespace **ibm-observe**. A service account is in Openshift what a service ID is in IBM Cloud. Run the following command:

    ```
    oc create serviceaccount logdna-agent -n ibm-observe
    ```

4. Grant the serviceaccount access to the **Privileged SCC** so the service account has permissions to create priviledged LogDNA pods. Run the following command:

    ```
    oc adm policy add-scc-to-user privileged system:serviceaccount:ibm-observe:logdna-agent
    ```

5. Add a secret. The secret sets the ingestion key that the LogDNA agent uses to send logs.

    ```
    oc create secret generic logdna-agent-key --from-literal=logdna-agent-key=INGESTION_KEY -n ibm-observe 
    ```

    Where `INGESTION_KEY` is the ingestion key for the LogDNA instance where you plan to forward and collect the cluster logs.


## Step 5. Deploy the LogDNA agent in the cluster

Create a Kubernetes daemon set to deploy the LogDNA agent on every worker node of your Kubernetes cluster. 

The LogDNA agent collects logs with the extension `*.log` and extensionsless files that are stored in the `/var/log` directory of your pod. By default, logs are collected from all namespaces, including `kube-system`, and automatically forwarded to the IBM Log Analysis with LogDNA service.

Run the following command if you are working on a LogDNA instance that is located in US-South:

```
oc create -f https://assets.us-south.logging.cloud.ibm.com/clients/logdna-agent-ds-os.yaml -n ibm-observe
```

```
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: logdna-agent
  labels:
    app: logdna-agent
spec:
  selector:
    matchLabels:
      app: logdna-agent
  template:
    metadata:
      labels:
        app: logdna-agent
    spec:
      containers:
      - name: logdna-agent
        image: logdna/logdna-agent:latest
        imagePullPolicy: Always
        env:
        - name: LOGDNA_AGENT_KEY
          valueFrom:
            secretKeyRef:
              name: logdna-agent-key
              key: logdna-agent-key
        - name: LDAPIHOST
          value: api.us-south.logging.cloud.ibm.com
        - name: LDLOGHOST
          value: logs.us-south.logging.cloud.ibm.com
        - name: LOGDNA_PLATFORM
          value: k8s
        - name: USEJOURNALD
          value: files
        # - name: LOGDNA_TAGS
        #   value: production,cluster1,othertags
        resources:
          requests:
            cpu: 20m
          limits:
            memory: 500Mi
        securityContext:
          privileged: true
        volumeMounts:
        - name: varlog
          mountPath: /var/log
        - name: vardata
          mountPath: /var/data
        - name: kubeletlogs
          mountPath: /var/data/kubeletlogs
        - name: varlibdockercontainers
          mountPath: /var/lib/docker/containers
          readOnly: true
        - name: mnt
          mountPath: /mnt
          readOnly: true
        - name: docker
          mountPath: /var/run/docker.sock
        - name: osrelease
          mountPath: /etc/os-release
        - name: logdnahostname
          mountPath: /etc/logdna-hostname
      serviceAccount: logdna-agent
      serviceAccountName: logdna-agent
      volumes:
      - name: varlog
        hostPath:
          path: /var/log
      - name: vardata
        hostPath:
          path: /var/data
      - name: kubeletlogs
        hostPath:
          path: /var/data/kubeletlogs
      - name: varlibdockercontainers
        hostPath:
          path: /var/lib/docker/containers
      - name: mnt
        hostPath:
          path: /mnt
      - name: docker
        hostPath:
          path: /var/run/docker.sock
      - name: osrelease
        hostPath:
          path: /etc/os-release
      - name: logdnahostname
        hostPath:
          path: /etc/hostname
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 100%
```

Run the following command if you are working on a LogDNA instance that is located in Frankfurt:

```
oc create -f https://assets.eu-de.logging.cloud.ibm.com/clients/logdna-agent-ds-os.yaml -n ibm-observe
```

## Step 6. Verify that the LogDNA agent is deployed successfully

To verify that the LogDNA agent is deployed successfully, run the following command:

1. Target the project where the LogDNA agent is deployed.

    ```
    oc project ibm-observe
    ```

2. Verify that the `logdna-agent` pods on each node are in a **Running** status.

    ```
    oc get pods -n ibm-observe
    ```


The deployment is successful when you see one or more LogDNA pods.
* **The number of LogDNA pods equals the number of worker nodes in your cluster.**
* All pods must be in a `Running` state.
* *Stdout* and *stderr* are automatically collected and forwarded from all containers. Log data includes application logs and worker logs.
* By default, the LogDNA agent pod that runs on a worker collects logs from all namespaces on that node.

After the agent is configured, you should start seeing logs from this cluster in the LogDNA web UI. If after a period of time you cannot see logs, check the agent logs.

To check the logs that are generated by a LogDNA agent, run the following command:

```
oc logs logdna-agent-<ID>
```

Where *ID* is the ID for a LogDNA agent pod. 

For example, 

```
oc logs logdna-agent-xxxkz
```


## Step 7. Launch the LogDNA webUI to verify that logs are being forwarded from the LogDNA agent

Next, go to the LogDNA web UI. In the **Views** page, click **Everything** to verify that logs from the cluster are available through the UI. 


