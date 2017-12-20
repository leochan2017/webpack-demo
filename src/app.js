import './css/commom.css'
import Layer from './components/layer/layer.js'

const App = function () {
    let dom = document.getElementById('app')

    let layer = new Layer()

    dom.innerHTML = layer.tpl({
        name: 'Leo',
        arr: ['apple', 'mi', 'nokia']
    })
}

new App()