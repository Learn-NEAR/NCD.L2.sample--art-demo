<template>
    <section class="bg-gray-400 w-full ">
        <div class="w-full h-full linear-40 inner-shadow">
            <div class="p-4 md:px-10 md:py-14 lg:px-9 lg:py-8 xl:px-11 xl:py-12 2xl:px-12 2xl:py-14 mx-auto">
                <!-- Card -->
                <Card :signIn="signIn"/>

                <!-- Footer -->
                <HomeFooter />
            </div>
        </div>
    </section>
</template>

<script>
import { useAuth } from "@/composables/useAuth"
import Card from "../components/Card.vue";
import HomeFooter from "../components/HomeFooter.vue";

export default {
    components: { Card, HomeFooter },
    setup() {
        const { signIn } = useAuth();
        return {
            signIn
        };
    }
}
</script>