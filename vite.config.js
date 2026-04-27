import {defineConfig} from "vite"
import {crx} from "@crxjs/vite-plugin"
import manifest from "./manifest.json"
import {zip} from "zip-a-folder"

const outputDir = `twimg-video-fix-v${manifest.version}`

export default defineConfig({
  plugins: [
    crx({manifest}),
    {
      name: "zip-plugin",
      closeBundle: async () => {
        try {
          await zip(outputDir, `${outputDir}.zip`)
          console.log(`✅ Created ${outputDir}.zip`)
        } catch (error) {
          console.error("❌ Zip failed", error)
        }
      },
    },
  ],
  build: {
    outDir: outputDir,
  },
})
