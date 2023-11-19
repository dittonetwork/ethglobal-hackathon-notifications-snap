import getState from "../utils/get-state"
import { BACKEND_ADDRESS } from "../constants"

export default async function fetchNotifications(): Promise<string[]> {
  const state = await getState()

  const addresses = JSON.parse(state.addresses as string ?? "[]") ?? [] as string[]

  if (addresses.length === 0) return []

  try {
    return (await fetch(BACKEND_ADDRESS + "notifications/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        addresses: ["0xBc57c30c224b15d6125e3eBeB62AEe5E903e116C"]
      })
    }).then(r => r.json())) as string[]
  } catch (e: any) {
    // await sendNotification("Failed to fetch notifications")
    return []
  }
}
