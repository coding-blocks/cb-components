import CBNavbar from './cb-navbar/index.svelte'
import './app.scss'

let elements = document.getElementsByTagName('cb-navbar')

// render all cb-navbar on page with this
if (elements.length) {
  elements = [...elements].map(el => new CBNavbar({
    target: el
  }))
}

export default elements;