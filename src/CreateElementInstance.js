import { defineCustomElement, createApp, getCurrentInstance, h } from 'vue'


const getStylesRecursively = (component) => {
  const customElementStyles = []

  if (component.styles) {
    customElementStyles.push(...component.styles)
  }

  const childComponents = component.components
  if (childComponents) {
    Object.keys(childComponents).forEach((name) => {
      const styles = getStylesRecursively(childComponents[name])
      customElementStyles.push(...styles)
    })
  }

  return customElementStyles
}

export const defineCustomElementWrapped = (component, { plugins = [] } = {}) =>
  defineCustomElement({
    styles: getStylesRecursively(component),
    render: () => h(component),
    setup() {
      const app = createApp()

      // install plugins
      plugins.forEach(app.use)

      const inst = getCurrentInstance()
      Object.assign(inst.appContext, app._context)
      Object.assign(inst.provides, app._context.provides)
    }
  })
