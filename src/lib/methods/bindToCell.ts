import { Necktie } from '@lesniewski.pro/necktie'
import { html } from 'gridjs'
import { uid } from 'uid'
import { ComponentOptions } from 'vue/types'

const bindToCell = (component: ComponentOptions<any>) => {
  try {
    const uuid = uid(16)
    const tie = new Necktie()
    tie.startListening()

    tie.bind(
      `[data-obj-id='${uuid}']`,
      (el: string) =>
        new Vue({
          el,
          ...component
        })
    )

    return html(`<span data-obj-id=${uuid}></span>`)
  } catch (error) {
    console.error(error)
  }
}

export default bindToCell
