# Nuxt GPT Assistant

This library gives you a gpt support on your applications. For both users and developers.

## Setup

To use this component, axios and tailwind are required and set on the project.

### Install Tailwind if not already used

```bash
npm install @nuxtjs/tailwindcss
```
Create tailwind.config.js
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

### Install Axios if not already used

```bash
npm install axios
```

### Install magnificient GPT Assistant ✨

```bash
npm install nuxt-gpt-assistant
```

### Setup your API key in .env

```env
OPENAI_API_KEY=<apiKey>
```

### Configure nuxt project

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

Then you will see appear a little robot on the bottom left corner 😋
