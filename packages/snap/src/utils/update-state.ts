import { Json } from "@metamask/snaps-types"

export default async function updateState(newState: Record<string, Json>) {
  const currentState = await snap.request({
    method: "snap_manageState",
    params: {
      operation: "get"
    }
  }) ?? {}

  await snap.request({
    method: "snap_manageState",
    params: {
      operation: "update",
      newState: {
        ...currentState,
        ...newState
      }
    }
  })
}
