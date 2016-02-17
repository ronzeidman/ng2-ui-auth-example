# ng2-ui-auth-example
To run first install rethinkdb on your localhost (http://rethinkdb.com/docs/install/)
if you're on windows it's just an exe file you need to run (no system files changes, no messy installer/uninstaller).
```
modify server/src/config.ts to include your google secret
modify client/src/top.ts to include your google client id
npm install
jspm install
node server/src/server.js
```
and you're done.

