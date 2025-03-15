// Australian postcode ranges by state
const POSTCODE_RANGES = {
    NSW: [[1000, 2599], [2619, 2899], [2921, 2999]],
    ACT: [[0, 299], [2600, 2618], [2900, 2920]],
    VIC: [[3000, 3999], [8000, 8999]],
    QLD: [[4000, 4999], [9000, 9999]],
    SA: [[5000, 5999]],
    WA: [[6000, 6797], [6800, 6999]],
    TAS: [[7000, 7999]],
    NT: [[800, 999]]
};

// Function to validate Australian postcode
function validateAustralianPostcode(postcode) {
    const numPostcode = parseInt(postcode);
    
    for (const [state, ranges] of Object.entries(POSTCODE_RANGES)) {
        for (const [min, max] of ranges) {
            if (numPostcode >= min && numPostcode <= max) {
                return { isValid: true, state };
            }
        }
    }
    return { isValid: false, state: null };
}

// Mock function to get suburb (in real implementation, this would be an API call)
function getSuburbFromPostcode(postcode) {
    // This is a mock implementation. In reality, you would:
    // 1. Call an Australian Post API or similar service
    // 2. Get the actual suburb name
    // For now, we'll return a mock suburb
    return `Suburb ${postcode}`;
}

// Mock function to get UV index (in real implementation, this would be an API call)
function getUVIndex(location) {
    // This is a mock implementation. In reality, you would:
    // 1. Call a weather/UV API service
    // 2. Get the actual UV index for the location
    // For now, we'll return a random UV index
    return Math.floor(Math.random() * 16);
}

// Function to store location data in localStorage
function storeLocationData(data) {
    localStorage.setItem('locationData', JSON.stringify(data));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const postcodeInput = document.getElementById('postcodeInput');
    const searchButton = document.getElementById('searchButton');
    const errorMessage = document.getElementById('errorMessage');
    const locationResult = document.getElementById('locationResult');
    const locationDetails = document.getElementById('locationDetails');
    const uvValue = document.getElementById('uvValue');
    const navigationButtons = document.querySelector('.navigation-buttons');

    // Only allow numbers in postcode input
    postcodeInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    searchButton.addEventListener('click', () => {
        const postcode = postcodeInput.value.trim();
        
        // Reset UI
        errorMessage.style.display = 'none';
        locationResult.classList.remove('show');
        navigationButtons.style.display = 'none';

        // Validate postcode
        if (postcode.length !== 4) {
            errorMessage.textContent = 'Please enter a 4-digit postcode';
            errorMessage.style.display = 'block';
            return;
        }

        const { isValid, state } = validateAustralianPostcode(postcode);
        
        if (!isValid) {
            errorMessage.textContent = 'Please enter a valid Australian postcode';
            errorMessage.style.display = 'block';
            return;
        }

        // Get location details
        const suburb = getSuburbFromPostcode(postcode);
        const uvIndex = getUVIndex({ postcode, suburb, state });

        // Store the data
        const locationData = {
            postcode,
            suburb,
            state,
            uvIndex,
            timestamp: new Date().toISOString()
        };
        storeLocationData(locationData);

        // Update UI
        locationDetails.innerHTML = `
            <strong>Location:</strong> ${suburb}, ${state} ${postcode}
        `;
        uvValue.textContent = uvIndex;
        locationResult.classList.add('show');
        navigationButtons.style.display = 'flex';
    });
}); 