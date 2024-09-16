import {Amplify} from 'aws-amplify'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'ap-northeast-1_TUBhSTpkw',
      userPoolClientId: 'ap-northeast-1_TUBhSTpkw',
      loginWith: {
        oauth: {
          domain: 'my-app-auth.auth.ap-northeast-1.amazoncognito.com',
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: ['https://qiita-challenge-1.onrender.com/callback'],
          redirectSignOut: ['https://qiita-challenge-1.onrender.com'],
          responseType: 'code',
          providers: ['Google']
        }
      }
    }
  }
})