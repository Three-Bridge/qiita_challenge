import {Authenticator} from '@aws-amplify/ui-react'

export default function WinOrLossScreen() {
  return (
    <Authenticator
      socialProviders={['google', 'amazon', 'apple', 'facebook']}>
      <div>私はWinOrLossScreenだ</div>
    </Authenticator>
  )
}