import { copyable, divider, heading, panel, text } from "@metamask/snaps-ui"
import getState from "../utils/get-state"
import updateState from "../utils/update-state"
import { BACKEND_ADDRESS } from "../constants"
import sendNotification from "./send-notification"

export default async function disconnectNotifications(address: string) {
  const result: boolean = await snap.request({
    method: "snap_dialog",
    params: {
      type: "confirmation",
      content: panel([
        heading("Disconnect notifications"),
        text(
          `Do you really want to stop receiving notifications for this wallet?`
        ),
        divider(),
        copyable(address)
      ])
    }
  })

  if (!result) return false

  const currentState = await getState()
  const currentAddresses = JSON.parse(currentState?.addresses as string ?? "[]") as string[]

  if (currentAddresses.some(addr => addr.toLowerCase() === address.toLowerCase())) {
    await updateState({
      addresses: JSON.stringify(currentAddresses.filter(a => a.toLowerCase() !== address.toLowerCase()))
    })
  }

  await fetch(BACKEND_ADDRESS + "notifications/del-address", {
    method: "POST",
    body: JSON.stringify({
      address
    })
  })

  await sendNotification("Notifications disconnected")

  return true
}
