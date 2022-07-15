import { watchEffect,ref } from "vue";
import { useRouter } from 'vue-router';
import { wallet, CONTRACT_ID, } from "@/services/near";

const accountId = ref(wallet.getAccountId())

export const useAuth = () => {
    const router = useRouter()

    const handleSignIn = () => {
        // redirects user to wallet to authorize your dApp
        // this creates an access key that will be stored in the browser's local storage
        // access key can then be used to connect to NEAR and sign transactions via keyStore
        wallet.requestSignIn({
            contractId: CONTRACT_ID,
            methodNames: [] // add methods names to restrict access
        })
    }

    const handleSignOut = () => {
        wallet.signOut()
        accountId.value = wallet.getAccountId()
    }

    watchEffect(() => {
        if (accountId.value) {
            router.push('/dashboard')
        }

        if (!accountId.value) {
            router.push('/')
        }
    })

    return {
        wallet,
        accountId,
        signIn: handleSignIn,
        signOut: handleSignOut
    };
}