
const calculoRandom = () => {
    const array = []
    process.on('message', msg => {
      for (let i = 0; i < msg.limit; i++) {
        const object = {
          value: 0,
          cant: 0
        }
        let random = Math.round(Math.random() * i)
        if (array.length === 0) {
          object.value = random
          object.cant = 1
          array.push(object)
        } else {
          if (array.find(el => el.value === random)) {
            const index = array.findIndex(el => el.value === random)
            const oneMore = array[index].cant + 1
            array[index].cant = oneMore
          } else {
            object.value = random
            object.cant = 1
            array.push(object)
          }
        }
      }
      process.send({ event: 'response', respuesta: array })
    })
}


/*
    let sum = 0
    for (let i = 0; i < 6e9; i++) {
        sum += i
    }
    return sum
}


process.on('exit', () => {
    console.log(`worker #${process.pid} cerrado`)
})

process.on('message', msg => {
    console.log(`worker #${process.pid} iniciando su tarea`)
    const sum = calculo()
    process.send(sum)
    console.log(`worker #${process.pid} finalizó su trabajo`)
    process.exit()
})

process.send('listo')
*/

calculoRandom ()