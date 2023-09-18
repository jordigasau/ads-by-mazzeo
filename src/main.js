import { defineCustomElement } from 'vue'
import './assets/main.css'

import ByMazzeoAdManagerCe from './components/ByMazzeoAdManager.ce.vue'
 
customElements.define(
  'by-mazzeo-ads',
  defineCustomElement(ByMazzeoAdManagerCe)
)
