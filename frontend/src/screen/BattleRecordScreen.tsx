import {Authenticator} from '@aws-amplify/ui-react'

export default function BattleRecordScreen(){
    return(
        <Authenticator
          socialProviders={['google', 'amazon', 'apple', 'facebook']}>
            <div>私はBattleRecordScreenだ</div>
        </Authenticator>
    )
}