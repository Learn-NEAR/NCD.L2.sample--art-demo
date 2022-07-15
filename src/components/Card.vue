<template>
    <div class="relative border-card w-full border-2 border-white z-0">

        <!-- Decorative images -->
        <img src="@/assets/img/2.png" alt="" class="hidden md:block absolute bottom-96 lg:bottom-6 -left-14">
        <img src="@/assets/img/dots.png" alt="" class="hidden md:block absolute -top-14 -right-8 xl:right-14">

        <div class="flex flex-col lg:flex-row px-4 md:px-16 h-card">

            <!-- Left side -->
            <div class="w-full lg:w-1/2">

                <!-- Logo -->
                <div class="flex justify-center lg:justify-start">
                    <a href="#" class="flex items-center mt-7 md:mt-16 lg:mt-8 xl:mt-14 2xl:mt-20 text-4xl font-bold">
                        <img src="@/assets/img/near_logo_stack1.png" alt="" class="">
                        <span class="w-0.5 h-11 bg-black ml-1 mr-2"></span>
                        Arts
                        <span class="w-2 h-2 rounded-full bg-black ml-1 -mt-5"></span>
                    </a>
                </div>

                <div class="flex flex-col items-center lg:items-start">
                    <!-- Offer title -->
                    <h1
                        class="z-50 relative mt-4 md:mt-6 xl:mt-7 text-2xl md:text-3xl 2xl:text-6xl font-bold leading-8 md:leading-10 2xl:leading-tight text-center lg:text-left">
                        This demo allows you <br> to
                        <span class="absolute hidden lg:inline-block title-bg lg:mx-3 2xl:mx-5 rounded-2xl">
                            generate art
                        </span>
                        <span class="inline-block lg:hidden">
                            generate art
                        </span>
                    </h1>

                    <!-- Offer text -->
                    <p
                        class="offer-text text-xs 2xl:text-base mt-8 md:mt-11 lg:mt-7 2xl:mt-11 bg-gradient-to-b from-black to-gray-400 text-transparent bg-clip-text text-center lg:text-left">
                        Consectetur platea ac in sapien sollicitudin massa. Congue vestibulum
                        urna sapien quis adipiscing maecenas sed. Imperdiet erat blandit duis
                        lacus lectus eu, tortor luctus. Leo ultrices diam risus porta mauris
                        nisl euismod libero etiam. Diam tincidunt fusce cum massa at sapien
                        volutpat nunc. Morbi tincidunt urna, mattis sagittis auctor
                        elementum consectetur bibendum.
                    </p>
                </div>
                <!-- Offer buttons -->
                <div class="flex flex-col lg:flex-row items-center mt-8 lg:mt-6 2xl:mt-11">
                    <!-- Login btn -->
                    <button @click="signIn" class="">
                        <div class="bg-gray-300 offer-btn rounded-full">
                            <div class="flex h-full items-center justify-center ">
                                <p class="font-bold text-sm 2xl:text-2xl">
                                    Login with
                                    <span
                                        class="text-transparent bg-clip-text bg-gradient-to-r from-black hover:from-blue-500 to-black hover:to-blue-400">
                                        NEAR
                                    </span>
                                </p>
                            </div>
                        </div>
                    </button>
                    <!-- Second text -->
                    <div class="relative p-12 mt-8 lg:mt-0 lg:ml-8 ">
                        <img src="@/assets/img/mark.png" alt="" class="absolute -top-4 left-3 lg:hidden xl:block">
                        <div class="relative z-10 ">
                            <p class="text-sm xl:text-base tracking-tighter">
                                <b>Login for see more</b> <br>
                                here can be your art
                            </p>
                        </div>

                    </div>
                </div>

            </div>

            <!-- Right side -->
            <div class="w-full lg:w-1/2 ">
                <div class="relative flex items-center justify-center mt-8">

                    <img src="@/assets/img/square.png" alt="" class="w-24 lg:w-32 absolute top-6 md:-top-10 left-24">
                    <img src="@/assets/img/black.png" alt="" class="w-24 lg:w-32 absolute top-24 right-20">

                    <img src="@/assets/img/white.png" alt="" class="w-24 lg:w-32 absolute -bottom-12 left-12">
                    <img src="@/assets/img/romb.png" alt=""
                        class="w-24 lg:w-32 absolute -bottom-16 md:-bottom-48 left-56">
                    <img src="@/assets/img/vector.png" alt=""
                        class="w-24 lg:w-32 absolute -bottom-12 md:-bottom-36 right-0 md:right-24">

                    <div class="art-bg w-art transform rotate-6">
                        <div class="p-2 md:p-4 lg:p-3 xl:p-4">
                            <!-- Art image -->
                            <img src="@/assets/img/art-img.png" alt="" class="w-full h-full">
                        </div>
                    </div>
                    <div class="art-bg w-art transform -rotate-12 -ml-6 mt-64">
                        <div class="p-2 md:p-4 lg:p-3 xl:p-4">
                            <!-- Art image -->
                            <img src="@/assets/img/art-img.png" alt="" class="w-full h-full">
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        signIn: Function
    }
}
</script>