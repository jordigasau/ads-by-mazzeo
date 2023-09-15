import './assets/main.css'
import { defineCustomElement } from 'vue'

import ByMazzeoAds from './components/ByMazzeoAdManager.ce.vue'
const element = defineCustomElement(ByMazzeoAds)
customElements.define('by-mazzeo-ads', element)