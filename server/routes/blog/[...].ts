export default defineEventHandler((event) => {
    // event.context.path to get the route path: '/api/foo/bar/baz'
    // event.context.params._ to get the route segment: 'bar/bazo
    setResponseStatus(event, 410, 'Gone') 
  })