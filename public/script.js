// This file handles click events and basic UI manipulations.

document.addEventListener('DOMContentLoaded', () => {
  // 1. GET UV Index
  const btnGetUV = document.getElementById('btnGetUV');
  const uvResult = document.getElementById('uvResult');
  const uvIndexValue = document.getElementById('uvIndexValue');

  btnGetUV.addEventListener('click', async () => {
    const location = document.getElementById('locationInput').value.trim();
    if (!location) return alert('Please enter a suburb or postcode');

    // Example: call your Node backend to fetch UV for `location`
    try {
      const response = await fetch(`/api/uv?location=${location}`);
      const data = await response.json();
      uvIndexValue.textContent = data.uv || 'N/A';
      uvResult.style.display = 'block';
    } catch (err) {
      console.error(err);
      alert('Unable to fetch UV index');
    }
  });

  // 2. Show Clothing Suggestions
  const btnViewClothing = document.getElementById('btnViewClothing');
  const clothingSection = document.getElementById('clothingSection');
  btnViewClothing.addEventListener('click', () => {
    clothingSection.style.display = 'block';
  });

  // 3. Sunscreen Calculator
  const btnCalcSunscreen = document.getElementById('btnCalcSunscreen');
  const calcResult = document.getElementById('calcResult');
  const spoonCount = document.getElementById('spoonCount');
  btnCalcSunscreen.addEventListener('click', async () => {
    const toneVal = document.getElementById('skinToneSelect').value;
    // Example: Call your Node backend route /api/sunscreen
    try {
      const res = await fetch(`/api/sunscreen?skinTone=${toneVal}`);
      const data = await res.json();
      spoonCount.textContent = data.layers;
      calcResult.style.display = 'block';
    } catch (err) {
      console.error(err);
      alert('Error calculating sunscreen');
    }
  });

  // 4. Set Reminder
  const btnSetReminder = document.getElementById('btnSetReminder');
  const reminderInterval = document.getElementById('reminderInterval');
  const reminderMessage = document.getElementById('reminderMessage');
  const intervalValue = document.getElementById('intervalValue');

  btnSetReminder.addEventListener('click', () => {
    if (!reminderInterval.value) return alert('Enter an interval');
    intervalValue.textContent = reminderInterval.value;
    reminderMessage.style.display = 'block';
    // For actual reminders, your friend might add Notification or email logic
  });
});
