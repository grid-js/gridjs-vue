import { Plugin } from 'gridjs/dist/src/plugin.d'
import { GridFrom, GridOptions } from '../../main.d'

// activate plugins
const activatePlugins = (component: any): void => {
  try {
    const plugins = component.$gridjs.options.plugins

    if (plugins) {
      plugins.forEach((plugin: Plugin<any>) => {
        component.grid.plugin.add(plugin)
      })
    }
  } catch (error) {
    console.error(error)
  }
}

// build table from element or HTML blob
const from = (input: GridFrom): HTMLElement | DocumentFragment | null => {
  try {
    if (input && typeof input === 'string') {
      return (
        document.querySelector(input) || (document.createRange().createContextualFragment(input) as DocumentFragment)
      )
    }

    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

// return options
function options(component: any): GridOptions {
  try {
    let options = {
      ...component.$gridjs.options,
      autoWidth: component.autoWidth,
      className: component.className,
      columns: component.columns,
      data: component.rows,
      fixedHeader: component.fixedHeader,
      from: from(component.from),
      height: component.height,
      language: component.language,
      pagination: component.pagination,
      resizable: component.resizable,
      search: component.search,
      server: component.server,
      sort: component.sort,
      style: component.styles || {
        container: {
          width: '100%'
        },
        table: {
          width: '100%'
        },
        header: {
          width: '100%'
        }
      },
      width: component.width
    }

    for (const key in options) {
      if (options[key] === undefined) {
        delete options[key]
      }
    }

    return options
  } catch (error) {
    console.error(error)
    return {}
  }
}

export default options
export { activatePlugins }
