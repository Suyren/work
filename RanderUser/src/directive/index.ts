import { App } from 'vue'
import { clickOutside } from './clickOutside'


export const initDirective = (app: App<Element>) => {
  clickOutside(app);
}