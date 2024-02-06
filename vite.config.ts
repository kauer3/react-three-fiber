import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "fetch-jsonp",
      "@ant-design/icons-vue",
      "lodash-es",
      "dayjs",
      "vue",
      "vue-router",
      "vue-i18n",
      "async-validator",
    ],
  },
});
