export default async function getState() {
  return (await snap.request({
    method: "snap_manageState",
    params: {
      operation: "get"
    }
  })) ?? {}
}
