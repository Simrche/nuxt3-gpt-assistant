import { defineNuxtModule } from "@nuxt/kit";
import { join } from "pathe";

export default defineNuxtModule({
    hooks: {
        "components:dirs"(dirs) {
            dirs.push({
                path: join(__dirname, "components"),
                prefix: "robot",
            });
        },
    },
});
