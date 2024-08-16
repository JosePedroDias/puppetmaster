# Puppet Master

The purpose of this project is to offer a simple way to trigger multiple browser clients to behave in a coherent manner. Usages of it are multiplayer games, but it can also be useful on other collaborative or competitive tasks.

You're expected to pass 3 parameters to the puppetmaster:
- the number of browser windows/clients to spawn
- the configuration each should use to start
- a set of puppeteer actions that are to be called from each browser's page object. This function receives the browser index so they can differ in behavior.

The puppetmaster also returns the array of pages. This allows for an outside orchestrator to affect those pages, if need be.

If you need the browser profiles to be reset at app start, uncomment the `rm` command commented out that main.mjs's main function.

Tested on OSX only.

## Reference
- https://pptr.dev/api/puppeteer.page
