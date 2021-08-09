const waitForSelector = (selector: string): Promise<HTMLElement> => {
  return new Promise((resolve, reject) => {
    try {
      const element = document.querySelector(selector)
      if (element) return element

      const mutObserver = new MutationObserver(mutations => {
        for (const mutation of mutations) {
          const nodes = Array.from(mutation.addedNodes) as HTMLElement[]
          for (const node of nodes) {
            if (node.nodeType === 1) {
              const check = node.querySelector(selector)
              if (check) {
                mutObserver.disconnect()
                resolve(node)
              }
            }
          }
        }
      })

      mutObserver.observe(document.documentElement, { childList: true, subtree: true })
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

export default waitForSelector
