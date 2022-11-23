const socket = io()

io.on('connection', (socket) => {
    console.log('Usuario conectado')
})


/*
socket.on('mensajes chat', data => {
    const p = document.getElementById('msg');
    p.innerHTML = data.msg;
    // alert(data)
    prods = data.prods;
    socket.emit('notificacion', 'Mensaje recibido exitosamente')
});

socket.on('mensajes guardados', data => {
    const messages = document.getElementById('messages');
    let html = '<table class="table table-condensed"><tr><th>E-mail</th><th>Fecha</th><th>Mensaje</th></tr>';
    const emailStyle = 'style="color: blue; font-weight: bold;"';
    const dateStyle = 'style="color: brown; font-weight: normal;"';
    const messageStyle = 'style="color: green; font-weight: normal; font-style: italic"';
    data.map( m => {
        html += `<tr>
                    <td ${emailStyle}>${m.email}</td>
                    <td ${dateStyle}>${m.date}</td>
                    <td ${messageStyle}>${m.message}</td>
                </tr>`;
    })
    html += '</table>'
    messages.innerHTML = html;
})

*/

function showMessages(m) {
    const writtenMessages = m.map(({ date, email, message }) => {
        return `<li>${date} - ${email}: ${message}</li>`
    })

    const messagesHtml = `
        <ul>
        ${writtenMessages.join('\n')}
        </ul>`

    const messageList = document.getElementById('messages')
    messageList.innerHTML = messagesHtml

    // console.table(writtenMessages)
}

socket.on('mensajesActualizados', messages => {
    showMessages(messages)
})

const botonEnviar = document.getElementById('submitButton')
botonEnviar.addEventListener('click', e => {
    const inputAutor = document.getElementById('email')
    const inputMensaje = document.getElementById('message')
    if (inputAutor.value && inputMensaje.value) {
        const msgs = {
            autor: inputAutor.value,
            texto: inputMensaje.value
        }
        socket.emit('nuevoMensaje', msgs)
    } else {
        alert('ingrese algun mensaje')
    }
})


