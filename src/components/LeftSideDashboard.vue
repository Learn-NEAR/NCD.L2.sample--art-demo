<template>
    <div class="relative hidden lg:block dashboard-profile h-auto">

        <img src="@/assets/img/romb.png" alt="" class="absolute w-20 left-0 -top-6 ">
        <img src="@/assets/img/square.png" alt="" class="absolute w-24 -left-6 top-72">

        <div class="flex flex-col items-center">
            <a href="#" class="flex items-center text-4xl font-bold mt-12">
                <img src="@/assets/img/near_logo_stack1.png" alt="" class="">
                <span class="w-0.5 h-11 bg-black ml-1 mr-2"></span>
                Arts
                <span class="w-2 h-2 rounded-full bg-black ml-1 -mt-5"></span>
            </a>
            <div class="mt-12 w-20 h-20 rounded-full dashboard-profile-img flex justify-center items-center">
                <img src="@/assets/img/near_logo_stack2.png" alt="" class="">
            </div>
            <a
                class="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-400 text-xl font-bold mt-5">{{ accountId }}</a>
            <button @click.prevent="signOut" href="#"
                class="flex items-center mt-6 font-bold text-base hover:text-gray-500">
                <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none">
                    <path
                        d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z"
                        fill="black" />
                </svg>
                Logout
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        accountId: String,
        signOut: Function
    }
}
</script>