import { createApp } from 'vue';
import { containers } from './frameworkConfig.ts';
import App from './App.vue';

createApp(App).mount(`#${containers.vue}`);
