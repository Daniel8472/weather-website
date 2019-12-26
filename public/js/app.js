
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
//messageOne.textContent = 'From javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
            messageThree.textContent = ''
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            messageThree.textContent = data.daily
            messageFour.textContent = data.hourly

            const findRain = data.nextWet.find(hour => hour.precipProbability > 0.5)
            console.log(findRain)
            console.table(data.nextWet)
            if (findRain) {
                var date = new Date(findRain.time*1000)
                var hours = date.getHours()
                var minutes = "0" + date.getMinutes()
                messageFive.textContent = 'There is over a 50% chance it will next rain at ' + hours + ':' + minutes
            } else {
                messageFive.textContent = 'No rain on the horizon!'
            }

        }
    })
   
})

    
})