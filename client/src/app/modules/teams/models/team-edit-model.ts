export interface TeamEditModel {
  name: string,
  description: string,
  email: string, // user email for api check
  members: string[], //this is a list of member email, not User objects
  pusherSocketID?: string,
  slug?: string
}
