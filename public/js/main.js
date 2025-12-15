const socket = io()
const container = document.getElementById("ListContainer")


async function LoadListing() {
    try {
        const response = await axios.get('/api/v1/Listings')
        const listings = response.data.Listings;

        listings.forEach(({ _id, title, description, quantity, pickupWindow, status, donor }) => {
            const ItemList = document.createElement("li")
            const ClaimButton = document.createElement("button")
            ClaimButton.innerHTML = "Claim!"

            if (ClaimButton) {
                ClaimButton.addEventListener("click", () => {
                    ClaimFood(_id)
                })
            }

            ItemList.innerHTML = `
            <div>Item: ${title}</div>
            <div id="${_id}">Quantity: ${quantity}</div>
            `

            if (container) {
                ItemList.appendChild(ClaimButton)
                container.appendChild(ItemList)
            }
        });
    } catch (error) {
        console.log(error);
    }
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