# Helper Functions

## \$gridjs.helper

Simplifies use of Vue components in table formatters.

Usage:

```js
export default {
  components: {
    Grid
  },
  data() {
    return {
      columns: [
        {
          name: 'Name',
          formatter: cell =>
            return this.$gridjs.helper({
              components: { TestComponent },
              template: `<test-component :content="content"></test-component>`,
              data() {
                return {
                  content: `🥳 ${cell}`
                }
              }
            })
        },
        'Email'
      ],
      rows: Array(5)
        .fill()
        .map(() => [faker.name.findName(), faker.internet.email()])
    }
  },
  template: `
    <div><grid :columns="columns" :rows="rows"></grid></div>
  `
}
```

## \$gridjs.html

Renders [HTML in a formatter function](https://gridjs.io/docs/examples/html-cells).

Example:

```js
this.columns = [
  {
    name: 'Model',
    formatter: cell => this.$gridjs.html(`<b>${cell}</b>`)
  }
]
```

## \$gridjs.h

Grid.js is built in Preact, so why not take advantage of it? Renders a [Preact virtual DOM instance](https://gridjs.io/docs/examples/virtual-dom).

Usage:

```js
this.columns = [
  {
    name: 'Actions',
    formatter: (cell, row) => {
      return this.$gridjs.h(
        'button',
        {
          onClick: () =>
            alert(`
          Editing "${row.cells[0].data}"
        `)
        },
        'Edit'
      )
    }
  }
]
```

[< Back to contents](index.md)
