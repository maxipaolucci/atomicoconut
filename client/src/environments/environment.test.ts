// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  testing: true,
  apiHost : '',
  showLogs : false,
  mapsApiKey : 'AIzaSyBVl8QaQnQGBw6IyvlQ5K3XepPj6Z9nHt0',
  pusher: {
    key: '27cd80ad4160d1834d8b',
    cluster: 'ap4',
    channel: 'pusher-events-channel'
  }
};