import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})

// // https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     proxy:{
//       '/api': {
//         target: "http://localhost:PORT",
//         changeOrigin: true
//       }
//     }
//   },
//   plugins: [react()],
//   port: 3000
// })