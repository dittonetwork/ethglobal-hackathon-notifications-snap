import { copyable, divider, heading, panel, text } from "@metamask/snaps-ui"
import updateState from "../utils/update-state"
import getState from "../utils/get-state"
import { BACKEND_ADDRESS } from "../constants"
import sendNotification from "./send-notification"

export default async function connectNotifications(address: string) {
  const result: boolean = await snap.request({
    method: "snap_dialog",
    params: {
      type: "confirmation",
      content: panel([
        heading("Connect notifications"),
        text(
          `Do you really want this wallet to receive notifications from Ditto Network?`
        ),
        divider(),
        copyable(address)
      ])
    }
  })

  if (String(result) !== "true") return false

  const currentState = await getState()
  const currentAddresses = JSON.parse(currentState?.addresses as string ?? "[]") as string[]

  await updateState({
    addresses: JSON.stringify([...new Set([...currentAddresses, address.toLowerCase()])])
  })

  await fetch(BACKEND_ADDRESS + "notifications/add-address", {
    method: "POST",
    body: JSON.stringify({
      address
    })
  })

  await sendNotification("Successfully connected notifications")

  return true
}
