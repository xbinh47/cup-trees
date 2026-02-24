/**
 * API Helper Functions for Bracket Viewer
 * Handles API calls to Uniscore API
 */

const API_CONFIG = {
    BASE_URL: 'https://opta-api.uniscore.vn/api/v1',
    LANGUAGE: 'en'
};

/**
 * Fetch cup trees data from API
 * @param {string} seasonId - The season ID to fetch
 * @returns {Promise<Object>} - The processed data ready for rendering
 */
async function fetchCupTreesFromAPI(seasonId) {
    if (!seasonId || seasonId.trim() === '') {
        throw new Error('Season ID is required');
    }

    const url = `${API_CONFIG.BASE_URL}/season/${seasonId}/cup-trees?language=${API_CONFIG.LANGUAGE}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiData = await response.json();
    
    // Validate API response
    if (apiData.code !== 1) {
        throw new Error(apiData.message || 'API returned an error');
    }
    
    if (!apiData.data || !apiData.data.cup_trees) {
        throw new Error('Invalid API response structure');
    }
    
    // Transform API data to match expected format
    return {
        season_id: apiData.data.season_id,
        cup_trees: apiData.data.cup_trees
    };
}

/**
 * Fetch and render season data from API
 * @param {string} seasonId - The season ID to fetch and render
 */
async function loadSeasonFromAPI(seasonId) {
    const errEl = document.getElementById('error');
    const jsonInput = document.getElementById('jsonInput');
    
    try {
        // Show loading state
        errEl.style.display = 'block';
        errEl.style.background = 'rgba(0, 123, 255, 0.2)';
        errEl.innerHTML = '🔄 Loading from API...';
        
        // Fetch data
        const data = await fetchCupTreesFromAPI(seasonId);
        
        // Update textarea with formatted JSON
        jsonInput.value = JSON.stringify(data, null, 2);
        
        // Render the brackets
        if (typeof renderAll === 'function') {
            renderAll(data);
        } else {
            throw new Error('renderAll function not found');
        }
        
        // Hide error message on success
        errEl.style.display = 'none';
        errEl.style.background = 'rgba(255, 0, 0, 0.2)';
        
        // Show success message briefly
        const successMsg = document.createElement('div');
        successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: rgba(0, 255, 0, 0.2); color: #0f0; padding: 10px 20px; border-radius: 5px; z-index: 9999;';
        successMsg.textContent = '✅ Data loaded successfully!';
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
        
    } catch (error) {
        // Show error message
        errEl.textContent = `❌ Error: ${error.message}`;
        errEl.style.display = 'block';
        errEl.style.background = 'rgba(255, 0, 0, 0.2)';
        console.error('API Error:', error);
    }
}

/**
 * Quick test function with the provided season ID
 */
function testAPICall() {
    const testSeasonId = 'c9dxsq8ov73r5s2';
    loadSeasonFromAPI(testSeasonId);
}

// Export functions for use in HTML
if (typeof window !== 'undefined') {
    window.fetchCupTreesFromAPI = fetchCupTreesFromAPI;
    window.loadSeasonFromAPI = loadSeasonFromAPI;
    window.testAPICall = testAPICall;
}
