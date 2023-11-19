export default function sendNotification(message: string, type: "native" | "inApp" = "inApp") {
  return snap.request({
    method: "snap_notify",
    params: {
      type: type,
      message
    }
  })
}
