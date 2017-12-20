import './css/commom.css'

const App = function () {
    let dom = document.getElementById('app')

    dom.innerHTML = layer.tpl({
        name: 'Leo',
        arr: ['apple', 'mi', 'nokia']
    })
}

new App()