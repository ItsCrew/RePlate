const socket = io()
const container = document.getElementById("ListContainer")


async function LoadListing() {
    const renderData = (listings) => {
        container.innerHTML = ""
        listings.forEach(({ _id, title, quantity }) => {
            const ItemList = document.createElement("li")
            const ClaimButton = document.createElement("button")
            ClaimButton.innerHTML = "Claim!"

            ClaimButton.addEventListener("click", () => ClaimFood(_id))

            ItemList.innerHTML = `
                <div>Item: ${title}</div>
                <div id="${_id}">Quantity: ${quantity}</div>
            `
            ItemList.appendChild(ClaimButton)
            container.appendChild(ItemList)
        })
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude
            const long = position.coords.longitude
            try {
                const response = await axios.get(`/api/v1/Listings?lat=${lat}&long=${long}`)
                renderData(response.data.Listings)
            } catch (error) {
                console.log(error)
            }
        },

        async (error) => {
            try {
                const response = await axios.get('/api/v1/Listings')
                renderData(response.data.Listings)
            } catch (err) {
                console.log(err)
            }
        }
    )
}

LoadListing()

async function ClaimFood(id) {
    try {
        await axios.post('/api/v1/listings/claim', { ListingID: id })
        console.log("Claimed!");
    } catch (error) {
        console.log(error)
        console.log("Couldnt Claim!")
    }
}

socket.on('update-foodcount', (data) => {
    const quant = document.getElementById(data.ListingID)
    quant.innerHTML = `Quantity: ${data.newQuantity}`
})