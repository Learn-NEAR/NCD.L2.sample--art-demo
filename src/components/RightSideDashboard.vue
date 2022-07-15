<template>
    <div class="lg:ml-10 w-full">
        <nav>
            <!-- Mobile navigation -->
            <div class="lg:hidden">
                <div class="flex flex-col md:flex-row items-center md:justify-between">
                    <!-- Logo -->
                    <a href="#" class="flex items-center text-4xl font-bold ">
                        <img src="@/assets/img/near_logo_stack1.png" alt="" class="">
                        <span class="w-0.5 h-11 bg-black ml-1 mr-2"></span>
                        Arts
                        <span class="w-2 h-2 rounded-full bg-black ml-1 -mt-5"></span>
                    </a>

                    <div class="mt-4 flex justify-between items-center w-full md:w-auto">
                        <!-- Account name -->
                        <div class="flex items-center md:mr-5">
                            <div
                                class="w-10 h-10 md:w-16 md:h-16 p-2 rounded-full dashboard-profile-img flex justify-center items-center">
                                <img src="@/assets/img/near_logo_stack2.png" alt="" class="">
                            </div>
                            <a
                                class="ml-4 md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-400">{{
                                        accountId
                                }}</a>
                        </div>
                        <!-- Logout btn -->
                        <button @click.prevent="signOut"
                            class="flex items-center font-bold text-sm hover:text-gray-500">
                            <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z"
                                    fill="black" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <form action="" class="mt-7 lg:mt-0 flex flex-col md:flex-row items-center justify-between w-full">

                <!-- Search -->
                <div v-if="generatedDesign" class="w-full flex items-center">
                    <input type="text"
                        class="placeholder-current text-gray-500 focus:text-black dashboard-search outline-none pl-16 py-4 font-bold"
                        :value="generatedDesign.seed">
                    <button @click.prevent="handleClaimDesign()"
                        class="ml-6 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-600 transform active:scale-95">Claim</button>
                </div>

                <!-- Generate new art -->
                <button @click.prevent="handleGenerateDesign()"
                    class="mt-7 md:mt-0 text-sm xl:text-base 2xl:text-lg generate-btn ml-auto bg-gradient-to-r from-purple-700 to-blue-400 rounded-full p-0.5 transform active:scale-95 duration-75">
                    <div class="bg-transparent hover:bg-gray-300 rounded-full duration-300">
                        <div
                            class="w-full h-full font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-white hover:from-purple-700 hover:to-blue-400 py-4 duration-500">
                            Generate new art
                        </div>
                    </div>
                </button>
            </form>
        </nav>

        <div v-if="generatedDesign != null"
            class="relative mt-8 ownart-bg h-auto px-5 md:px-20 lg:px-16 xl:px-8 2xl:px-10 pt-9 pb-12">
            <div class="relative flex flex-col md:flex-row items-start md:items-end mt-9">

                <img src="@/assets/img/romb.png" alt="" class="hidden md:block lg:hidden absolute w-16 top-0 right-24">
                <img src="@/assets/img/black.png" alt="" class="hidden md:block absolute w-16 lg:w-24 -top-4 right-0">

                <h1 class=" font-bold text-3xl 2xl:text-4xl md:pl-10">Your last generated art</h1>
                <p class="float-left text-gray-500 mt-3 md:mt-0 md:ml-6 font-bold text-lg 2xl:text-2xl">
                    #{{ generatedDesign.seed }}</p>
            </div>
            <pre class="text-xs w-full p-8">{{ generatedDesign.instructions }}</pre>
        </div>

        <div class="relative flex flex-col md:flex-row items-start md:items-end mt-9">

            <img src="@/assets/img/romb.png" alt="" class="hidden md:block lg:hidden absolute w-16 top-0 right-24">
            <img src="@/assets/img/black.png" alt="" class="hidden md:block absolute w-16 lg:w-24 -top-4 right-0">

            <h1 class=" font-bold text-3xl 2xl:text-4xl md:pl-10">My art in own</h1>
            <p class="float-left text-gray-500 mt-3 md:mt-0 md:ml-6 font-bold text-lg 2xl:text-2xl">here is
                your art</p>
        </div>

        <!-- Own art section -->
        <div class="relative mt-8 ownart-bg h-auto px-5 md:px-20 lg:px-16 xl:px-8 2xl:px-10 pt-9 pb-12">

            <img src="@/assets/img/square.png" alt="" class="hidden md:block lg:hidden w-24 absolute top-6 -left-12">
            <img src="@/assets/img/vector.png" alt="" class="hidden md:block absolute w-24 -bottom-12 right-0">

            <div v-if="myDesign">

                <div class="flex items-center justify-center xl:justify-start">

                    <!-- Burn art btn -->
                    <button @click.prevent="handleBurnDesign"
                        class="hidden xl:flex text-xs 2xl:text-sm ml-9  items-center justify-center xl:w-52 2xl:w-72 burn-shadow font-bold bg-white text-red-400 hover:bg-red-400 hover:text-white rounded-full py-3 transform active:scale-95 duration-75">
                        <svg class="mr-4" xmlns="http://www.w3.org/2000/svg" width="37" height="38" viewBox="0 0 37 38"
                            fill="none">
                            <path
                                d="M22.3543 16.0802C22.3543 14.8669 23.9774 14.5453 24.408 15.6806C25.4496 18.4268 26.2085 20.8836 26.2085 22.2118C26.2085 26.4449 22.7574 29.8764 18.5002 29.8764C14.243 29.8764 10.7918 26.4449 10.7918 22.2118C10.7918 20.7848 11.6678 18.0552 12.8292 15.0634C14.3337 11.1879 15.0859 9.25014 16.0145 9.14576C16.3116 9.11237 16.6358 9.17241 16.9009 9.30996C17.7293 9.73981 17.7293 11.8533 17.7293 16.0802C17.7293 17.3501 18.7647 18.3796 20.0418 18.3796C21.319 18.3796 22.3543 17.3501 22.3543 16.0802Z"
                                stroke="currentColor" stroke-width="2" />
                            <path
                                d="M16.9582 29.8761L16.5595 28.885C15.8536 27.1304 16.1507 25.1313 17.3363 23.6577V23.6577C17.9341 22.9147 19.0656 22.9147 19.6634 23.6577V23.6577C20.849 25.1313 21.1461 27.1304 20.4402 28.885L20.0415 29.8761"
                                stroke="currentColor" stroke-width="2" />
                        </svg>
                        burn art
                    </button>

                </div>

                <div class="xl:hidden mt-8 flex flex-col md:flex-row items-center">

                    <div class="art-bg p-4 sm:p-4 md:p-4 w-full md:w-2/4 h-auto">
                        <pre style="font-size: 7px; line-height: 9px;">{{ myDesign.instructions }}</pre>
                    </div>

                    <div class="flex flex-col space-y-8 ml-4 w-full md:w-2/4 mt-6 md:mt-0">

                        <!-- Burn art btn -->
                        <button @click.prevent="handleBurnDesign"
                            class="text-xs 2xl:text-sm flex items-center justify-center w-full burn-shadow font-bold bg-white text-red-400 hover:bg-red-400 hover:text-white rounded-full py-3 transform active:scale-95 duration-75">
                            <svg class="mr-4" xmlns="http://www.w3.org/2000/svg" width="37" height="38"
                                viewBox="0 0 37 38" fill="none">
                                <path
                                    d="M22.3543 16.0802C22.3543 14.8669 23.9774 14.5453 24.408 15.6806C25.4496 18.4268 26.2085 20.8836 26.2085 22.2118C26.2085 26.4449 22.7574 29.8764 18.5002 29.8764C14.243 29.8764 10.7918 26.4449 10.7918 22.2118C10.7918 20.7848 11.6678 18.0552 12.8292 15.0634C14.3337 11.1879 15.0859 9.25014 16.0145 9.14576C16.3116 9.11237 16.6358 9.17241 16.9009 9.30996C17.7293 9.73981 17.7293 11.8533 17.7293 16.0802C17.7293 17.3501 18.7647 18.3796 20.0418 18.3796C21.319 18.3796 22.3543 17.3501 22.3543 16.0802Z"
                                    stroke="currentColor" stroke-width="2" />
                                <path
                                    d="M16.9582 29.8761L16.5595 28.885C15.8536 27.1304 16.1507 25.1313 17.3363 23.6577V23.6577C17.9341 22.9147 19.0656 22.9147 19.6634 23.6577V23.6577C20.849 25.1313 21.1461 27.1304 20.4402 28.885L20.0415 29.8761"
                                    stroke="currentColor" stroke-width="2" />
                            </svg>
                            burn art
                        </button>
                    </div>
                </div>

                <div class="mt-12 flex items-center justify-between space-x-20">
                    <div class="bg-gray-800 editor rounded-xl w-full">
                        <div class="w-full h-8 bg-gray-900 rounded-t-xl">
                            <p
                                class="inline-block ml-12 align-middle pt-2 h-full px-4 bg-gray-700 text-gray-400 text-sm">
                                about.#{{ myDesign.seed }}</p>
                            <div class="flex">
                                <div class="grid grid-flow-row text-gray-500 text-sm m-3 md:m-4 gap-y-2">
                                    <div class="">
                                        <p>1</p>
                                    </div>
                                    <div class="">
                                        <p>2</p>
                                    </div>
                                    <div class="">
                                        <p>3</p>
                                    </div>
                                    <div class="">
                                        <p>4</p>
                                    </div>
                                    <div class="">
                                        <p>5</p>
                                    </div>
                                </div>
                                <div class="grid grid-flow-row text-gray-500 text-sm m-3 md:m-4">
                                    <div class="pb-1 ">
                                        <p class="text-green-400">.about <span class="text-gray-500">{</span></p>
                                    </div>
                                    <div class="py-1 border-l border-gray-600 pl-4 md:pl-8">
                                        <p class="text-gray-600">/* basic info */</p>
                                    </div>
                                    <div class="flex py-1 border-l border-gray-600 pl-4 md:pl-8">
                                        <p class="text-blue-200">seed<span class="text-gray-600">:</span>
                                        </p>
                                        <p class="ml-4 text-purple-200">{{ myDesign.seed }}<span
                                                class="text-gray-600">;</span></p>
                                    </div>
                                    <div class="flex py-1 border-l border-gray-600 pl-4 md:pl-8">
                                        <p class="text-blue-200">Owner<span class="text-gray-600">:</span>
                                        </p>
                                        <p class="ml-4 text-purple-200">{{ accountId }}<span
                                                class="text-gray-600 -ml-2">;</span></p>
                                    </div>
                                    <div class="pt-1 ">
                                        <p class="text-gray-500">}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="hidden xl:block">
                        <pre class="text-xs">{{ myDesign.instructions }}</pre>
                    </div>
                </div>
            </div>

            <div v-else>
                <div class="flex items-center justify-center xl:justify-start">
                    <div class="flex ">
                        <h2 class="text-3xl 2xl:text-4xl font-bold">No arts yet... </h2>
                        <span class="block w-3 h-3  ml-2"> please claim</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        accountId: String,
        signOut: Function,
        generatedDesign: Object,
        myDesign:Object,
        handleGenerateDesign:Function,
        handleClaimDesign:Function,
        handleBurnDesign:Function
    }
}
</script>