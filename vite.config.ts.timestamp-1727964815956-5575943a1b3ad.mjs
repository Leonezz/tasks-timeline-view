// vite.config.ts
import react from "file:///home/zhuwenq/tasks-timeline-view/node_modules/.pnpm/@vitejs+plugin-react@3.1.0_vite@4.5.5_@types+node@20.16.10_terser@5.34.1_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "node:path";
import { defineConfig } from "file:///home/zhuwenq/tasks-timeline-view/node_modules/.pnpm/vite@4.5.5_@types+node@20.16.10_terser@5.34.1/node_modules/vite/dist/node/index.js";
import dts from "file:///home/zhuwenq/tasks-timeline-view/node_modules/.pnpm/vite-plugin-dts@2.3.0_@types+node@20.16.10_rollup@2.79.2_vite@4.5.5_@types+node@20.16.10_terser@5.34.1_/node_modules/vite-plugin-dts/dist/index.mjs";
import tailwindcss from "file:///home/zhuwenq/tasks-timeline-view/node_modules/.pnpm/tailwindcss@3.4.13_ts-node@10.9.2_@types+node@20.16.10_typescript@4.9.5_/node_modules/tailwindcss/lib/index.js";
var __vite_injected_original_dirname = "/home/zhuwenq/tasks-timeline-view";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true
    })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss]
    }
  },
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/index.tsx"),
      name: "ViteReactLibraryTemplate",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom", "tailwindcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS96aHV3ZW5xL3Rhc2tzLXRpbWVsaW5lLXZpZXdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3podXdlbnEvdGFza3MtdGltZWxpbmUtdmlldy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS96aHV3ZW5xL3Rhc2tzLXRpbWVsaW5lLXZpZXcvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAndGFpbHdpbmRjc3MnXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBkdHMoe1xuICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZVxuICAgIH0pXG4gIF0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFt0YWlsd2luZGNzc11cbiAgICB9XG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHN4JyksXG4gICAgICBuYW1lOiAnVml0ZVJlYWN0TGlicmFyeVRlbXBsYXRlJyxcbiAgICAgIGZvcm1hdHM6IFsnZXMnLCAndW1kJ10sXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYGluZGV4LiR7Zm9ybWF0fS5qc2BcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICd0YWlsd2luZGNzcyddLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICByZWFjdDogJ1JlYWN0JyxcbiAgICAgICAgICAncmVhY3QtZG9tJzogJ1JlYWN0RE9NJyxcbiAgICAgICAgICB0YWlsd2luZGNzczogJ3RhaWx3aW5kY3NzJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUixPQUFPLFdBQVc7QUFDdlMsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGlCQUFpQjtBQUp4QixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDRixrQkFBa0I7QUFBQSxJQUNwQixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1AsU0FBUyxDQUFDLFdBQVc7QUFBQSxJQUN2QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxJQUNYLEtBQUs7QUFBQSxNQUNILE9BQU8sS0FBSyxRQUFRLGtDQUFXLGVBQWU7QUFBQSxNQUM5QyxNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsTUFDckIsVUFBVSxDQUFDLFdBQVcsU0FBUyxNQUFNO0FBQUEsSUFDdkM7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxTQUFTLGFBQWEsYUFBYTtBQUFBLE1BQzlDLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxVQUNiLGFBQWE7QUFBQSxRQUNmO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
