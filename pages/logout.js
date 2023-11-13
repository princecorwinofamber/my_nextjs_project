export default function LogoutPage() {
    return (
        <>
            <button onClick={() => fetch('/api/logout', { method: 'POST' })}>Log out</button>
        </>
    )
}
