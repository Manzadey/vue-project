import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import dayjs from "./libs/dayjs";
import {createApp} from 'vue'
import App from './App.vue'
import components from '@/components/UI';

const vm = createApp(App)

// Global Components
components.forEach(component => vm.component(component.name, component));

// Libraries
vm.config.globalProperties.$dayjs = dayjs;

vm.mount('#app');