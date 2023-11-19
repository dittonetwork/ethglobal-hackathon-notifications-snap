import type { OnCronjobHandler, OnRpcRequestHandler } from "@metamask/snaps-types"
import connectNotifications from "./methods/connect-notifications"
import disconnectNotifications from "./methods/disconnect-notifications"
import sendNotification from "./methods/send-notification"
import fetchNotifications from "./methods/fetch-notifications"
import getNotificationsState from "./methods/get-notifications-state"

export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  const params = request.params as any

  switch (request.method) {
    case "ditto_connectNotifications":
      return await connectNotifications(params.address)

    case "ditto_disconnectNotifications":
      return await disconnectNotifications(params.address)

    case "ditto_getNotificationState":
      return await getNotificationsState(params.address)

    default:
      throw new Error("Method not found")
  }
}

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  switch (request.method) {
    case "fireCronjob":
      const notifications = await fetchNotifications()

      if (notifications.length === 0) return

      for await (const notification of notifications) {
        await sendNotification(notification.slice(0, 49))
      }

      return
    default:
      throw new Error("Method not found")
  }
}
