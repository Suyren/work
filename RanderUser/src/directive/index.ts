import { App } from 'vue'
import { clickOutside } from './ClickOutside'


export const initDirective = (app: App<Element>) => {
  clickOutside(app);
}