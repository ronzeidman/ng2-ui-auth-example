# ng2-ui-auth-example for ionic 2
This project is a basic starter that combines `ionic 2` with `ng-ui-auth`

To run first install [ionic][1]:

## Usage
1. Modify the `config.ts` file to fit your google/facebook api keys
2. `ionic serve`
3. after user has been authenticated, you should use the `JwtHttp` as your http client. I recommend wrapping it with your own class for easy data manipulation (Take a look on the `JsonHttpGateway`)

Feel free to ask any questions

[1]:http://ionicframework.com/docs/v2/getting-started/tutorial/
