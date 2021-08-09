const parseStylesheet = (input: string): CSSStyleSheet | null => {
  try {
    const iframe = document.createElement('iframe')
    document.head.appendChild(iframe)

    if (iframe && iframe.contentDocument) {
      const style = iframe.contentDocument.createElement('style')
      style.textContent = input
      iframe.contentDocument.head.appendChild(style)
      const stylesheet = iframe.contentDocument.styleSheets[0]
      iframe.remove()
      return stylesheet
    }

    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

export default parseStylesheet
