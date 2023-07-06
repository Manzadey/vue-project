import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import {createApp} from 'vue'
import App from './App.vue'
import components from '@/components/UI';

const vm = createApp(App)

components.forEach(component => vm.component(component.name, component));

vm.mount('#app');