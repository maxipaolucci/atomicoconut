export interface TeamEditModel {
  name: string,
  description: string,
  members: string[], //this is a list of member email, not User objects
  pusherSocketID?: string,
  slug?: string
}
