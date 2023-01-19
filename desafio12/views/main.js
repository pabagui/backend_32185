const socket = io() // apunta al localhost:8080
window.onload= function(){
    const socket = io() 
    }

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


//normalizr
import { normalize, denormalize, schema } from "normalizr"
const messages = {
    author: {
      email: "mail del usuario",
      nombre: "nombre del usuario",
      apellido: "apellido del usuario",
      edad: "edad del usuario",
      alias: "alias del usuario",
      avatar: "url avatar (foto, logo) del usuario"
    },
    text: "mensaje del usuario"
  }
  
  // Definimos un esquema de usuarios (autores)
  const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' })
  
  // Definimos un esquema de textos (mensajes)
//   const textSchema = new schema.Entity('texts')
  
  // Definimos un esquema de mensajes totales
//   const messageSchema = new schema.Entity('chats', {
//     author: authorSchema,
//     texts: textSchema
//   });
  
  
  /* ---------------------------------------------------------------------------------------- */
  import util from 'util'
  
  function print(object) {
    console.log(util.inspect(object, false, 12, true))
  }
  
  console.log(' ------------- OBJETO ORIGINAL --------------- ')
  print(messages)
  console.log(JSON.stringify(messages).length)
  
  
  console.log(' ------------- OBJETO NORMALIZADO --------------- ')
  const normalizedMessages = normalize(messages, authorSchema);
  print(normalizedMessages)
  console.log(JSON.stringify(normalizedMessages).length)
  
  console.log(' ------------- OBJETO DENORMALIZADO --------------- ')
  const denormalizedMessages = denormalize(normalizedMessages.result, authorSchema, normalizedMessages.entities);
  print(denormalizedMessages)
  console.log(JSON.stringify(denormalizedMessages).length)

  const NormalizrReduction = document.getElementById('normalizrReduction')
  NormalizrReduction.addEventListener('click', e => {

})


 /*  SESSION ---------------------------------------------------------------------------------------- */

 const botonRegistro = document.getElementById('botonRegistro');

btn_register.addEventListener('submit', () => {
  const registerName = document.getElementById('registerName');
  const object = {};

  if (registerName) {
    object.name = registerName.value;
  }
  registerName.value = '';

});
