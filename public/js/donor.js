const socket = io()
const ProduceForm = document.querySelector(".ProduceForm")
const SubmitForm = document.querySelector(".SubmitForm")
const FormTitle = document.querySelector("#title")
const FormDescription = document.querySelector("#Description")
const FormQuantity = document.querySelector("#Quantity")
const FormPickupStart = document.querySelector("#PickupStart")
const FormPickupEnd = document.querySelector("#PickupEnd")



ProduceForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    navigator.geolocation.getCurrentPosition(async (position) => {
        console.log(position.coords);
        const payload = {
            title: FormTitle.value,
            description: FormDescription.value,
            quantity: FormQuantity.value,
            pickupWindow: {
                start: FormPickupStart.value,
                end: FormPickupEnd.value
            },
            location: {
                type: 'Point',
                coordinates: [position.coords.longitude, position.coords.latitude]
            }
        }
        try {
            await axios.post('/api/v1/listings', payload)
            window.location.href = "/Dashboard.html"
        } catch (error) {
            console.log(error);

        }
    })


})