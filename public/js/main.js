const socket = io();
const container = document.getElementById('ListContainer');


async function LoadListing() {
    const renderData = (listings) => {
        container.innerHTML = '';
        listings.forEach(({ _id, title, quantity }) => {
            const ItemList = document.createElement('li');
            const ClaimButton = document.createElement('button');
            ClaimButton.innerHTML = 'Claim!';

            ClaimButton.addEventListener('click', () => ClaimFood(_id));

            ItemList.innerHTML = `
                <div>Item: ${title}</div>
                <div id="${_id}">Quantity: ${quantity}</div>
            `;
            ItemList.appendChild(ClaimButton);
            container.appendChild(ItemList);
        });
    };

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            try {
                const response = await axios.get(`/api/v1/Listings?lat=${lat}&long=${long}`);
                renderData(response.data.Listings);
            } catch (error) {
                console.log(error);
            }
        },

        async () => {
            try {
                const response = await axios.get('/api/v1/Listings');
                renderData(response.data.Listings);
            } catch (err) {
                console.log(err);
            }
        }
    );
}

LoadListing();

async function ClaimFood(id) {
    const token =
        (window.RePlateAuth && window.RePlateAuth.getToken && window.RePlateAuth.getToken()) ||
        localStorage.getItem('replate_token');

    if (!token) {
        alert('You need to be logged in to claim food. Redirecting to login page.');
        window.location.href = '/Login.html';
        return;
    }

    try {
        await axios.post(
            '/api/v1/listings/claim',
            { ListingID: id },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log('Claimed!');
        alert('Food claimed successfully! Check your order code in the response log.');
    } catch (error) {
        console.log(error);
        console.log('Couldnt Claim!');
        alert('Could not claim this item. It might be unavailable.');
    }
}

socket.on('update-foodcount', (data) => {
    const quant = document.getElementById(data.ListingID);
    if (quant) {
        quant.innerHTML = `Quantity: ${data.newQuantity}`;
    }
});
