const socket = io() // apunta al localhost:8080

function showMessages(msgs) {
    let html = '<table class="table table-condensed"><tr><th>Fecha</th><th>Email</th><th>Mensaje</th></tr>';
    // let html = '<tr></tr>'
    const emailStyle = 'style="color: blue; font-weight: bold;"';
    const dateStyle = 'style="color: brown; font-weight: normal;"';
    const messageStyle = 'style="color: green; font-weight: normal; font-style: italic"';

    const messagesToShow = msgs.map(({ fecha, autor, texto }) => {
        // return `<li ${emailStyle}>${fecha} - ${autor}: ${texto}</li>`
        // return html += 
        return html +
                `<tr>
                    <td ${dateStyle}>${fecha}</td>
                    <td ${emailStyle}>${autor}</td>
                    <td ${messageStyle}>${texto}</td>
                 </tr>`

                
                // `<td ${dateStyle}>${fecha}</td>
                //  <td ${emailStyle}>${autor}</td>
                //  <td ${messageStyle}>${texto}</td>`
    })


        const mensajesHtml = `${messagesToShow.join('\n')}`
        
 

    const messageList = document.getElementById('messageList')
    messageList.innerHTML = mensajesHtml

}

socket.on('mensajesActualizados', mensajes => {
    showMessages(mensajes)
})

const submitButton = document.getElementById('submitButton')
submitButton.addEventListener('click', e => {
    const inputEmail = document.getElementById('inputEmail')
    const inputMessage = document.getElementById('inputMessage')
    if (inputEmail.value && inputMessage.value) {
        const mensaje = {
            autor: inputEmail.value,
            texto: inputMessage.value
        }
        socket.emit('nuevoMensaje', mensaje)
    } else {
        alert('Ingresa un mensaje')
    }
})


function showProducts(prods) {
    let html = '<table class="table table-dark"><tr style="color: green;"><th>Nombre producto</th><th>Precio</th><th>Foto</th></tr>';
    const photoStyle = 'style="width:70px; height:90px;"';

    const productsToShow = prods.map(({ nombre, precio, foto }) => {     
        return html +
                `<tr>
                    <td>${nombre}</td>
                    <td>${precio}</td>
                    <td ${photoStyle}>${foto}</td>
                 </tr>`
    })


        const productosHtml = `${productsToShow.join('\n')}`
        
 

    const productList = document.getElementById('productList')
    productList.innerHTML = productosHtml
}

socket.on('productosActualizados', productos => {
    showProducts(productos)
})

const submitButtonProduct = document.getElementById('submitButtonProduct')
submitButtonProduct.addEventListener('click', e => {
    const title = document.getElementById('title')
    const price = document.getElementById('price')
    const thumbnail = document.getElementById('thumbnail')
    if (title.value && price.value && thumbnail.value) {
        const producto = {
            nombre: title.value,
            precio: price.value,
            foto: thumbnail.value
        }
        socket.emit('nuevoProducto', producto)
    } else {
        alert('Ingresa un producto')
    }
})

