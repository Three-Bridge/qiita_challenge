
export default function tilte() {
    const navigate = ();
    return (
        <>
            <h2>バーコード読み取り</h2>
            <div>{authUser?.username || '未ログイン'}</div>
            <div>{resObject.success}</div>
            <button onClick={() => loginWithSocialAccount()}>Googleでログイン</button>
            <button onClick={() => signOutWithSocialAccount()}>サインアウト</button>
            <button onClick={() => navigate('/scan')}>つづきから</button>
            <button onClick={() => navigate('/scan')}>はじめから</button>
        </>
    )

}