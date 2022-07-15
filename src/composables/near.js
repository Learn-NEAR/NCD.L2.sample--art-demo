import { ref } from "vue";
import {
    wallet,
    getTempDesign,
    getMyClaimedDesign,
    generateDesign,
    claimDesign,
    burnDesign,
} from "@/services/near";

const generatedDesign = ref(null)
const myDesign = ref(null)
const isLoading = ref(false)
const err = ref(null)

export const useArtDemo = () => {

    const handleGetTempDesign = async (accountId) => {
        return await getTempDesign(accountId)
    }

    const handleGetMyClaimedDesign = async (accountId) => {
        return await getMyClaimedDesign(accountId)
    }

    const handleGenerateDesign = async (accountId) => {
        await generateDesign()
        generatedDesign.value = await getTempDesign(accountId)
    }

    const handleClaimDesign = async (seed) => {
        await claimDesign(seed).then(res => console.log(res), res => console.log(res))
        myDesign.value = await getMyClaimedDesign(wallet.getAccountId())
    }

    const handleBurnDesign = async () => {
        await burnDesign()
        myDesign.value = null
    }

    return {
        isLoading,
        generatedDesign,
        myDesign,
        err,
        getTempDesign:handleGetTempDesign,
        getMyClaimedDesign: handleGetMyClaimedDesign,
        generateDesign: handleGenerateDesign,
        claimDesign: handleClaimDesign,
        burnDesign: handleBurnDesign
    }
}