import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '/@',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
  },
  plugins: [vue()],
});

// // Conditional Config
// export default ({ command, mode }) => {
//   console.log('vite.config:', command, mode);
//   if (command === 'serve') {
//     // serve specific config
//     return {
//       alias: {
//         '/@/': path.resolve(__dirname, 'src'),
//       },
//     };
//   } else {
//     return {
//       // build specific config
//     };
//   }
// };
