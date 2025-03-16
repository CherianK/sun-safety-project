// This file handles click events and basic UI manipulations.

// UV Index and Recommendations Data
const SKIN_TYPES = {
    1: "Fair (Type I)",
    2: "Fair (Type II)",
    3: "Medium (Type III)",
    4: "Medium (Type IV)",
    5: "Dark (Type V)",
    6: "Dark (Type VI)"
};

const BASE_LAYERS = {
    FAIR: 2,    // Type I-II
    MEDIUM: 1,  // Type III-IV
    DARK: 1     // Type V-VI
};

function getClothingRecommendation(uvIndex) {
    if (uvIndex <= 2) {
        return {
            level: "Low",
            recommendations: [
                "Minimal sun protection is generally needed",
                "Normal summer clothing (short-sleeve shirt, shorts/pants) is often fine for short periods",
                "Lightweight long sleeves and a hat recommended for extended stays or very fair skin",
                "Sunglasses that block UVA/UVB to protect your eyes"
            ]
        };
    } else if (uvIndex <= 5) {
        return {
            level: "Moderate",
            recommendations: [
                "Wear shirts with sleeves, lightweight pants, or skirts that cover the legs",
                "Use a wide-brim hat to protect face, ears, and neck for longer outdoor stays",
                "Sunglasses with 99–100% UVA/UVB protection",
                "Apply sunscreen (SPF 30 or higher) on exposed skin",
                "Fair-skinned individuals should prefer more coverage if outside for more than 15–30 minutes"
            ]
        };
    } else if (uvIndex <= 7) {
        return {
            level: "High",
            recommendations: [
                "Wear sun-protective clothing (UPF-rated or tightly-woven clothes)",
                "Long sleeves and long pants strongly recommended for extended periods",
                "Wide-brim hat that shades face, ears, and back of neck",
                "Sunglasses with UVA/UVB protection",
                "SPF 30+ broad-spectrum sunscreen, reapply every two hours",
                "Seek shade during peak hours (10 a.m.–4 p.m.)"
            ]
        };
    } else if (uvIndex <= 10) {
        return {
            level: "Very High",
            recommendations: [
                "Full coverage with long-sleeved shirts and long pants/maxi dresses (preferably UPF-labeled)",
                "Wide-brim or legionnaire-style hats",
                "Sunglasses with full UVA/UVB coverage",
                "Broad-spectrum sunscreen (SPF 30–50) with frequent reapplication",
                "Limit direct sun exposure during peak hours"
            ]
        };
    } else {
        return {
            level: "Extreme",
            recommendations: [
                "Maximum coverage: tightly-woven, long-sleeved UPF clothing and full-length pants",
                "Hats that fully cover the head and neck",
                "High-SPF (30–50+) sunscreen on all exposed skin, reapply every 1–2 hours",
                "UV-blocking sunglasses",
                "Stay in shade or indoors when possible, especially during midday"
            ]
        };
    }
}

function getBaseLayers(skinType) {
    if (skinType <= 2) return BASE_LAYERS.FAIR;
    if (skinType <= 4) return BASE_LAYERS.MEDIUM;
    return BASE_LAYERS.DARK;
}

function getUVAdjustment(uvIndex) {
    if (uvIndex <= 5) return 0;
    if (uvIndex <= 7) return 1;
    if (uvIndex <= 10) return 2;
    return 3;
}

function getSkinTypeCategory(skinType) {
    if (skinType <= 2) return "Fair (Type I-II)";
    if (skinType <= 4) return "Medium (Type III-IV)";
    return "Dark (Type V-VI)";
}

function getRiskAndRecommendation(uvIndex, skinType) {
    const category = getSkinTypeCategory(skinType);
    
    if (uvIndex <= 2) {
        if (category === "Fair (Type I-II)") {
            return {
                risk: "Minimal risk",
                recommendation: "Beneficial for Vitamin D. No sunscreen needed for short exposure (<30 min). Regular outdoor activities encouraged."
            };
        } else if (category === "Medium (Type III-IV)") {
            return {
                risk: "Very low risk. Good Vitamin D synthesis.",
                recommendation: "No sunscreen needed for short exposure (<45 min). Enjoy regular outdoor activities."
            };
        } else {
            return {
                risk: "Negligible risk. Longer Vitamin D synthesis required.",
                recommendation: "Sunscreen typically not required. Extended outdoor activities beneficial."
            };
        }
    } else if (uvIndex <= 5) {
        if (category === "Fair (Type I-II)") {
            return {
                risk: "Moderate risk (burn in 20-30 min).",
                recommendation: "Use SPF 15+, reapply every 2 hours. Limit direct sun exposure (11 am–3 pm)."
            };
        } else if (category === "Medium (Type III-IV)") {
            return {
                risk: "Low–moderate risk (burn in 30-45 min).",
                recommendation: "SPF 15+ recommended if outdoors >45 min. Seek shade during midday."
            };
        } else {
            return {
                risk: "Low risk (minimal burn likelihood).",
                recommendation: "Sunscreen optional; SPF 15+ advised for extended exposure (1–2 hours)."
            };
        }
    } else if (uvIndex <= 7) {
        if (category === "Fair (Type I-II)") {
            return {
                risk: "High risk (burn in 15-20 min).",
                recommendation: "SPF 30+, protective clothing (hat, sunglasses). Limit midday sun exposure."
            };
        } else if (category === "Medium (Type III-IV)") {
            return {
                risk: "Moderate–high risk (burn in 25-35 min).",
                recommendation: "SPF 30+ sunscreen recommended; wear protective clothing, seek shade during midday."
            };
        } else {
            return {
                risk: "Moderate risk (burn after 45-60 min).",
                recommendation: "SPF 15–30 recommended for exposure over an hour. Protective clothing beneficial."
            };
        }
    } else if (uvIndex <= 10) {
        if (category === "Fair (Type I-II)") {
            return {
                risk: "Very high risk (burn in 10-15 min).",
                recommendation: "SPF 50+ essential, protective clothing mandatory, minimize sun exposure (10 am–4 pm)."
            };
        } else if (category === "Medium (Type III-IV)") {
            return {
                risk: "High risk (burn in 15-25 min).",
                recommendation: "SPF 50+ strongly recommended; wear protective clothing, limit sun exposure, seek shade regularly."
            };
        } else {
            return {
                risk: "Moderate–high risk (burn after 30-45 min).",
                recommendation: "SPF 30+ highly recommended for prolonged exposure; limit midday sun, use protective clothing."
            };
        }
    } else {
        if (category === "Fair (Type I-II)") {
            return {
                risk: "Extreme risk (burn within 5-10 min).",
                recommendation: "SPF 50+ mandatory, strict sun protection (hat, sunglasses, full clothing), avoid outdoor activities between 10 am–4 pm."
            };
        } else if (category === "Medium (Type III-IV)") {
            return {
                risk: "Very high risk (burn in 10-20 min).",
                recommendation: "SPF 50+ essential; minimize outdoor exposure, wear protective clothing, and frequently seek shade."
            };
        } else {
            return {
                risk: "High risk (burn after 20-30 min).",
                recommendation: "SPF 50+ strongly recommended; wear protective clothing, limit exposure significantly, and seek frequent shade."
            };
        }
    }
}

function updateClothingRecommendations(uvIndex) {
    const clothingDiv = document.getElementById('clothingRecommendation');
    const { level, recommendations } = getClothingRecommendation(uvIndex);
    
    const recommendationsList = recommendations
        .map(rec => `<li>${rec}</li>`)
        .join('');
    
    clothingDiv.innerHTML = `
        <h3>UV Level: ${level}</h3>
        <ul>
            ${recommendationsList}
        </ul>
    `;
}

function updateTables(uvIndex) {
    // Update Sunscreen Calculations Table
    const sunscreenTableBody = document.querySelector('#sunscreenTable tbody');
    sunscreenTableBody.innerHTML = '';

    for (let skinType = 1; skinType <= 6; skinType++) {
        const baseLayers = getBaseLayers(skinType);
        const uvAdjustment = getUVAdjustment(uvIndex);
        const totalLayers = baseLayers + uvAdjustment;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${SKIN_TYPES[skinType]}</td>
            <td class="total-layers">${totalLayers}</td>
            <td class="minor-info">Base: ${baseLayers}, UV Adjustment: +${uvAdjustment}</td>
        `;
        sunscreenTableBody.appendChild(row);
    }

    // Update Recommendations Table
    const recommendationsTableBody = document.querySelector('#recommendationsTable tbody');
    recommendationsTableBody.innerHTML = '';

    for (let skinType = 1; skinType <= 6; skinType++) {
        const { risk, recommendation } = getRiskAndRecommendation(uvIndex, skinType);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${SKIN_TYPES[skinType]}</td>
            <td>${risk}</td>
            <td>${recommendation}</td>
        `;
        recommendationsTableBody.appendChild(row);
    }
}

// Generate random UV index only once on page load
function generateRandomUV() {
    const uvIndex = Math.floor(Math.random() * 16); // 0 to 15
    document.getElementById('currentUV').textContent = uvIndex;
    
    // Update tables based on which page we're on
    if (document.getElementById('sunscreenTable')) {
        updateTables(uvIndex);
    }
    
    // Update recommendations if we're on the recommendations page
    if (document.getElementById('clothingRecommendation')) {
        const clothingRec = getClothingRecommendation(uvIndex);
        const clothingDiv = document.getElementById('clothingRecommendation');
        clothingDiv.innerHTML = `
            <h3>UV Level: ${clothingRec.level}</h3>
            <ul>
                ${clothingRec.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        `;

        // Update recommendations table
        const recommendationsTableBody = document.querySelector('#recommendationsTable tbody');
        recommendationsTableBody.innerHTML = '';

        for (let skinType = 1; skinType <= 6; skinType++) {
            const { risk, recommendation } = getRiskAndRecommendation(uvIndex, skinType);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${SKIN_TYPES[skinType]}</td>
                <td>${risk}</td>
                <td>${recommendation}</td>
            `;
            recommendationsTableBody.appendChild(row);
        }
    }
}

// Initial load - generate UV index once
document.addEventListener('DOMContentLoaded', generateRandomUV);
