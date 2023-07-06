import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import dayjs from "dayjs";
import ru from 'dayjs/locale/ru';
import {createApp} from 'vue'
import App from './App.vue'
import components from '@/components/UI';

const vm = createApp(App)

components.forEach(component => vm.component(component.name, component));

dayjs.locale('ru', ru);

vm.config.globalProperties.$dayjs = dayjs;

vm.mount('#app');