import { injectStyle } from 'styl-injector'
import parseStylesheet from '../helpers/parseStylesheet'

const setTheme = (component: any) => {
  try {
    if (component.theme) return component.theme
    if (component.$gridjs.options.theme) return component.$gridjs.options.theme
    return 'mermaid'
  } catch (error) {
    console.log(error)
  }
}

const assignTheme = async (component: any) => {
  try {
    if (component.activeTheme !== 'none') {
      let theme,
        stylesheet = ''

      theme = parseStylesheet(
        await (await fetch(`https://unpkg.com/gridjs/dist/theme/${component.activeTheme}.css`)).text()
      )

      if (theme) {
        for (const index in theme.cssRules) {
          let css = theme.cssRules[index].cssText
          if (css && !/^@/g.test(css)) {
            stylesheet = `${stylesheet}\n\n#${component.divId} ${css}`
          }
        }

        injectStyle(stylesheet, `${component.divId}__theme`)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export { setTheme, assignTheme }
