import getState from "../utils/get-state"

export default async function getNotificationsState(address: string): Promise<boolean> {
  const state = await getState()

  const addresses = JSON.parse(state.addresses as string ?? "[]") as string[]

  return addresses.some(a => a.toLowerCase() === address.toLowerCase())
}
