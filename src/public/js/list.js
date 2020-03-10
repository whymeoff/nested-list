const inputTags = `<li><input type="text" id="input" placeholder="Input" />
                   <button onclick="add()">Add</button></li>`

function add() { // add new li element to ul
    const list = event.target.parentElement.parentElement
    let upClass, downClass

    // to show or not to show buttons Up and Down
    if (list.children.length === 1) {
        upClass = 'disable'
        downClass = 'disable'
    } else if (list.children.length === 2) {
        upClass = 'disable'
        list.children[0].children[1].classList.remove('disable')
    } else {
        upClass = 'disable'
        for (let i = 0; i < list.children.length - 2; i++) {
            list.children[i].children[1].classList.remove('disable')
            list.children[i].children[2].classList.remove('disable')
        }
    }

    const inputData = event.target.parentElement.children[0].value
    
    if (inputData.length === 0) return

    const input = `<li>
                        <p>${inputData}</p>
                        <button class="${upClass}" onclick="up()">Up</button>
                        <button class="${downClass}" onclick="down()">Down</button>
                        <button onclick="remove()">Remove</button>
                        <button onclick="sublistAdd()">Add Sublist</button>
                        <button class="disable" onclick="removeSublist()">Remove sublist</button>
                   </li>`


    
    list.innerHTML = input + list.innerHTML
}

function up() { // to up element in list
    const list = event.target.parentElement.parentElement

    const current = event.target.parentElement
    const previous = current.previousSibling

    // to show or not to show buttons Up and Down
    if (previous === list.children[0] && list.children.length === 3) {
        list.children[0].children[1].classList.remove('disable')
        list.children[0].children[2].classList.add('disable')
        current.children[1].classList.add('disable')
        current.children[2].classList.remove('disable')
    } else if (list.children.length > 3) {
        if (previous === list.children[0]) {
            list.children[0].children[1].classList.remove('disable')
            current.children[1].classList.add('disable')
            current.children[2].classList.remove('disable')
        } else if (current === list.children[list.children.length - 2]) {
            previous.children[2].classList.add('disable')
            current.children[2].classList.remove('disable')
        }
    }

    current.parentNode.insertBefore(current, previous)
}

function down() { // to down element in list
    const list = event.target.parentElement.parentElement

    const current = event.target.parentElement
    const next = current.nextSibling

    // to show or not to show buttons Up and Down
    if (list.children.length === 3) {
        next.children[1].classList.add('disable')
        next.children[2].classList.remove('disable')
        current.children[1].classList.remove('disable')
        current.children[2].classList.add('disable')
    } else if (list.children.length > 3) {
        if (current === list.children[0]) {
            next.children[2].classList.remove('disable')
            next.children[1].classList.add('disable')
            current.children[1].classList.remove('disable')
            current.children[2].classList.remove('disable')
        } else if (next === list.children[list.children.length - 2]) {
            next.children[2].classList.remove('disable')
            current.children[2].classList.add('disable')
        }
    }

    next.parentNode.insertBefore(next, current)
}

function remove() { // to remove element from list
    const list = event.target.parentElement.parentElement
    event.target.parentElement.remove()
    
    // to show or not to show buttons Up and Down
    if (list.children.length === 3) {
        list.children[0].children[1].classList.add('disable')
        list.children[0].children[2].classList.remove('disable')
        list.children[1].children[2].classList.add('disable')
        list.children[1].children[1].classList.remove('disable')
    } else if (list.children.length === 2) {
        list.children[0].children[1].classList.add('disable')
        list.children[0].children[2].classList.add('disable')
    } else if (list.children.length > 3) {
        if (event.target.parentElement === list.children[0]) {
            list.children[1].children[1].classList.add('disable')
        } else if (event.target.parentElement === list.children[list.children.length - 2]) {
            list.children[list.children.length - 3].children[2].classList.add('disable')
        }
    }

    event.target.parentElement.remove()
}

function sublistAdd() { // to add sublist to element
    event.target.parentElement.children[5].classList.remove('disable')
    event.target.parentElement.innerHTML += `<ul>${inputTags}</ul>`
}

function removeSublist() { // to remove sublist
    event.target.parentElement.lastChild.remove()
    event.target.classList.add('disable')
}