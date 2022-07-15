<template>
    <div class="bg-gray-300">
        <div class="container mx-auto px-6 pt-12 lg:pt-20">

            <!-- Content -->
            <div class="flex">

                <!-- Left side dashboard -->
                <left-side-dashboard :accountId="accountId" :signOut="signOut" />

                <!-- Right side dashboard -->
                <right-side-dashboard :accountId="accountId" :signOut="signOut" :generatedDesign="generatedDesign"
                    :myDesign="myDesign" :handleBurnDesign="handleBurnDesign" :handleClaimDesign="handleClaimDesign"
                    :handleGenerateDesign="handleGenerateDesign" />
            </div>

            <!-- Footer -->
            <dashboard-footer />
        </div>
    </div>
    <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="true" />
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { useArtDemo } from "@/composables/near"
import { useAuth } from "@/composables/useAuth"
import { onBeforeMount } from '@vue/runtime-core';
import { useToast } from "vue-toastification";
import DashboardFooter from '../components/DashboardFooter.vue';
import LeftSideDashboard from '../components/LeftSideDashboard.vue';
import RightSideDashboard from '../components/RightSideDashboard.vue';

export default {
    components: {
        Loading,
        DashboardFooter,
        LeftSideDashboard,
        RightSideDashboard
    },
    setup() {
        const { accountId, signOut } = useAuth();
        const { generatedDesign, myDesign, getTempDesign, getMyClaimedDesign, generateDesign, claimDesign, burnDesign, isLoading } = useArtDemo();
        const toast = useToast()

        onBeforeMount(async () => {
            isLoading.value = true
            generatedDesign.value = await getTempDesign(accountId.value)
            if (generatedDesign.value === null) {
                await generateDesign(accountId.value)
            }
            myDesign.value = await getMyClaimedDesign(accountId.value)
            isLoading.value = false
        })

        async function handleGenerateDesign() {
            try {
                isLoading.value = true
                await generateDesign(accountId.value)
            } catch (error) {
                toast.error("Error while generating new design")
            }
            isLoading.value = false
        }

        async function handleClaimDesign() {
            if (myDesign.value) {
                toast.error("You can have only 1 design claimed. First burn you already claimed design, to be able to claim new one")
            } else {
                try {
                    isLoading.value = true
                    await claimDesign(generatedDesign.value.seed)
                } catch (error) {
                    const errorMessage = error?.kind?.ExecutionError
                    toast.error(errorMessage.slice(0, errorMessage.match(', filename').index))
                }
            }
            isLoading.value = false
        }

        async function handleBurnDesign() {
            try {
                isLoading.value = true
                await burnDesign()
            } catch (error) {
                const errorMessage = error?.kind?.ExecutionError
                toast.error(errorMessage.slice(0, errorMessage.match(', filename').index))
            }
            isLoading.value = false
        }

        return {
            accountId,
            signOut,
            handleGenerateDesign,
            myDesign,
            generatedDesign,
            handleClaimDesign,
            handleBurnDesign,
            isLoading
        }
    }
}
</script>

<style>
.dashboard-art {
    height: 313px;
    width: 313px;
}
</style>