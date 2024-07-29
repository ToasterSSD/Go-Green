import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'tinymce': 'tinymce/tinymce'
    }
  },
  optimizeDeps: {
    include: [
      'tinymce/tinymce',
      'tinymce/icons/default',
      'tinymce/plugins/advlist',
      'tinymce/plugins/autolink',
      'tinymce/plugins/lists',
      'tinymce/plugins/link',
      'tinymce/plugins/image',
      'tinymce/plugins/charmap',
      'tinymce/plugins/print',
      'tinymce/plugins/preview',
      'tinymce/plugins/anchor',
      'tinymce/plugins/searchreplace',
      'tinymce/plugins/visualblocks',
      'tinymce/plugins/code',
      'tinymce/plugins/fullscreen',
      'tinymce/plugins/insertdatetime',
      'tinymce/plugins/media',
      'tinymce/plugins/table',
      'tinymce/plugins/paste',
      'tinymce/plugins/help',
      'tinymce/plugins/wordcount',
      'tinymce/themes/silver',
      'tinymce/skins/ui/oxide/skin.min.css',
      'tinymce/skins/ui/oxide/content.min.css',
      'tinymce/skins/content/default/content.min.css'
    ]
  },
  server: {
    port: 3000
  }
});
