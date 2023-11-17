import { useRouter } from "next/router";

export default function LogoutPage() {
    const router = useRouter();
    return (
        <>
            <button onClick={() => fetch('/api/logout', { method: 'POST' }).then(() => router.reload())}>Log out</button>
        </>
    )
}
