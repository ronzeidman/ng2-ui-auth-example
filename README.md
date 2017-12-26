# ng2-ui-auth-example

angular2:
```
1) git clone https://github.com/ronzeidman/ng2-ui-auth-example.git
2) cd ng2-ui-auth-example
3) npm i
4) replace '<replace me>' tags from /server/src/config.ts and /client/src/config.ts with your google secret and client id 
5) npm start
3) start your browser at localhost:3000
```

Look at the source to understand more about the inner working of everything, if something is not clear feel free to add an issue and I'll specifically document it.


ionic2:
```
1) replace '<replace me>' tag from /server/src/config.ts and CAHNGE_ME from /ionic2/src/config.ts with your google secret and client id
2) npm run full:ionic
3) it should start your browser automatically but if not browse to localhost:8100
```

You can login with username: 'test' password: 'testtest' (it is hardcoded in the server)

Few dependencies that may require more attention:

1) node-gyp https://github.com/nodejs/node-gyp (this is for the bcrypt library for hashing passwords in the server)

2) for ionic2: cordova and ionic http://ionicframework.com/docs/v2/getting-started/installation/

3) for ionic2: git

#### Note: If you are using an IDE or a "smart" editor you'll probably want to open each folder seperately since not many editors/IDEs understand multiple "package.json"s and "tsconfig.json"s 
