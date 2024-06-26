# Monitoring

In this section, you will learn to monitor the health and performance of your application. OpenShift Container Platform ships with a pre-configured and self-updating monitoring stack that is based on the Prometheus open source project and its wider eco-system. It provides monitoring of cluster components and ships with a set of Grafana dashboards

## Observe Metrics in the Developer View

1. In the **Developer** perspective, go to the **Observe** to review the CPU, Memory usage and more

    ![Monitoring Dashboard](../assets/ocp-monitoring-dashboard.png)

1. Let's re-use the same commmand we load in the section before to generate some requests, this will in turn generate data into Prometheus.

    ```sh
    while sleep 1; do curl -s https://$HOST/info; done
    ```

1. Swith to the `Metrics` tab

    ![Metrics](../assets/ocp-monitoring-metrics.png)

1. Create a `custom Query` to see the total container cpu usage in seconds on a Graph.

    ```sh
    sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_irate) by (container)
    ```

1. The following graph should appear

    ![Custom Query](../assets/ocp-monitoring-query.png)

1. The **Events** view is useful for identifying the timeline of events and finding potential error messages. When tracking the state of a new rollout, managing existing assets, or even something simple like exposing a route, the Events view is critical in identifying the timeline of activity. This becomes even more useful when considering that multiple operators may be working against a single cluster.

    ![Monitoring Events](../assets/ocp-monitoring-events.png)

You'll want to refer to this view throughout the lab. Almost all actions we take in in OpenShift will result in an event being fired in this view. As it is updated real-time, it's a great way to track changes to state.

> Red Hat OpenShift on IBM Cloud comes with [Grafana](https://grafana.com/) dashboard bundled in the console.

1. In the Dashboard tab, make sure to select **Kubernetes / Compute Resources / Namespace (Pods)** in the drop-down menu.

    ![observe](../assets/ocp-grafana.png)

2. You should be able to see the CPU and Memory usage for your application.

    ![Grafana also project](../assets/ocp-grafana-cpu.png)

In production environments, this is helpful for identifying the average amount of CPU or Memory your application uses, especially as it can fluctuate through the day. We'll use this information in the next exercise to set up auto-scaling for our pods.
