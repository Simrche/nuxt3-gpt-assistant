# Nuxt GPT Assistant

This project gives you a gpt support on your applications. For help the client or you as a developer.

### Setup

To use this component, axios and tailwind are required and set on the project.

```bash
npm install @nuxtjs/tailwindcss
```

```bash
npm install axios
```

```bash
npm install nuxt-gpt-assistant
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        "nuxt-gpt-assistant/nuxt",
        [
            "@nuxtjs/tailwindcss",
            {
                config: "~/tailwind.config.js",
            },
        ],
    ],
    runtimeConfig: {
        public: {
            openaiApiKey: process.env.OPENAI_API_KEY,
        },
    },
});
```

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // ...,
        "./node_modules/nuxt-gpt-assistant/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};

```

### Utilisation

```vue
<template>
    <RobotAssistant />
</template>

<script setup lang="ts"></script>

<style>
@import url("~/assets/css/main.css");
</style>
```

Then you will see appear a little robot on the bottom left corner :)
