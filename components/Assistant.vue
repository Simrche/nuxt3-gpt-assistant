<template>
    <div class="z-30 absolute">
        <div
            v-if="open"
            class="bg-white border flex flex-col rounded-2xl p-4 transition-all right-5 bottom-20 duration-300 fixed justify-between"
            :class="{
                'w-10/12': expanded,
                'w-3/12': !expanded,
                'h-96': !expanded,
                'h-[80vh]': expanded,
            }"
        >
            <div
                :class="{
                    'h-80': !expanded,
                    'h-[70vh]': expanded,
                }"
            >
                <div class="flex h-8 gap-x-2 items-center justify-between">
                    <p class="font-bold text-sm">{{ title }}</p>
                    <div class="flex gap-x-4">
                        <i
                            @click="expanded = !expanded"
                            :class="`cursor-pointer text-xl mdi ${
                                expanded
                                    ? 'mdi-arrow-collapse'
                                    : 'mdi-arrow-expand'
                            }`"
                        ></i>
                        <i
                            @click="open = false"
                            class="cursor-pointer text-xl mdi mdi-close"
                        ></i>
                    </div>
                </div>
                <div
                    class="flex flex-col mt-2 gap-y-4 overflow-y-scroll"
                    ref="feedDiv"
                    :class="{
                        'h-64': !expanded,
                        'h-[60vh]': expanded,
                    }"
                >
                    <div
                        v-for="message in feed"
                        :key="message.id"
                        class="max-w-64"
                    >
                        <div v-if="message.isUser" class="flex flex-col">
                            <div class="flex gap-x-2 items-center">
                                <img
                                    src="../assets/profil.png"
                                    class="rounded-full h-8 w-8"
                                />
                                <p class="rounded-md bg-gray-200 text-xs p-2">
                                    {{ message.text }}
                                </p>
                            </div>
                        </div>
                        <div v-else class="flex flex-col items-end">
                            <div class="flex gap-x-2 items-center">
                                <p class="rounded-md bg-gray-200 text-xs p-2">
                                    {{ message.text }}
                                </p>
                                <img
                                    src="../assets/robot.png"
                                    class="rounded-full h-8 w-8"
                                />
                            </div>
                        </div>
                    </div>
                    <div v-if="completing" class="flex flex-col items-end">
                        <div class="flex gap-x-2 items-center">
                            <div
                                class="rounded-md flex bg-gray-200 text-xs p-2 gap-x-2"
                            >
                                <div
                                    class="rounded-full bg-gray-400 h-2 w-2"
                                ></div>
                                <div
                                    class="rounded-full bg-gray-400 h-2 w-2"
                                ></div>
                                <div
                                    class="rounded-full bg-gray-400 h-2 w-2"
                                ></div>
                            </div>
                            <img
                                src="../assets/robot.png"
                                class="rounded-full h-8 w-8"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex h-16 gap-x-2 items-end">
                <input
                    v-model="message"
                    type="text"
                    class="rounded-md border-2 border-gray-300 h-10 text-xs w-full p-2"
                />
                <button
                    class="rounded-md flex bg-slate-200 h-10 text-white w-12 items-center justify-center"
                    @click="createMessage()"
                >
                    <img src="../assets/envoyer.png" class="w-6" />
                </button>
            </div>
        </div>
        <div
            class="border-black border rounded-full cursor-pointer flex bg-slate-400 h-12 shadow-xl text-white right-5 bottom-5 w-12 fixed items-center justify-center"
        >
            <img @click="open = !open" src="../assets/robot.png" class="w-8" />
        </div>
    </div>
</template>

<script setup lang="ts">
// const { $axios: axios } = useContext();

// const { $openai } = useContext();

type Message = {
    id: number;
    text: string;
    isUser: boolean;
};

const props = withDefaults(
    defineProps<{
        title?: string;
        envVarName: string;
        firstMessage?: string;
    }>(),
    {
        title: "Comment puis-je vous aider ?",
        firstMessage: "Comment puis-je vous aider ?",
    }
);

onMounted(() => {
    scrollToBottomOfFeed();
});

const open = ref(false);
const expanded = ref(false);
const message = ref("");
const feedDiv = ref<HTMLDivElement>();
const completing = ref(false);

// const http = axios.create({
//     baseURL: "https://api.openai.com/v1/chat",
//     headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         "OpenAI-Organization": process.env.OPENAI_ORG_ID,
//     },
// });

async function createMessage() {
    if (!message.value) return;

    feed.value.push({ text: message.value, isUser: true, id: Math.random() });

    const prompt = message.value;
    message.value = "";

    setTimeout(() => {
        scrollToBottomOfFeed();
    }, 100);

    completing.value = true;

    // http.post("/completions", {
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: prompt }],
    //     temperature: 0.7,
    // }).then((res) => {
    //     console.log(res.data.choices[0].message.content);
    //     feed.value.push({
    //         text: res.data.choices[0].message.content,
    //         isUser: false,
    //         id: Math.random(),
    //     });
    //     completing.value = false;
    // });
}

function scrollToBottomOfFeed() {
    if (!feedDiv.value) return;

    feedDiv.value.scrollTop = feedDiv.value.scrollHeight;
}

const feed = ref<Message[]>([
    {
        id: Math.random(),
        text: props.firstMessage,
        isUser: false,
    },
]);
</script>
