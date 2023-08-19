const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
);

document.addEventListener('DOMContentLoaded', function () {
    const showLocationBtn = document.getElementById('showLocationBtn');
    const locationInfo = document.getElementById('locationInfo');
  
    showLocationBtn.addEventListener('click', async function () {
      showLocationBtn.disabled = true;
      showLocationBtn.textContent = 'Loading...';
  
      try {
        const ipResponse = await fetch('https://api64.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIP = ipData.ip;
  
        const accessToken = 'df13f5c85d252e'; 
        const locationResponse = await fetch(`https://ipinfo.io/${userIP}?token=${accessToken}`);
        const locationData = await locationResponse.json();
        const { city, country } = locationData;
  
        locationInfo.textContent = `Your country is ${regionNames.of(country)} and city is ${city}.`;
        locationInfo.classList.remove('hidden');
      } catch (error) {
        console.error('Error fetching location:', error);
      } finally {
        showLocationBtn.disabled = false;
        showLocationBtn.textContent = 'Show my location';
      }
    });
  });
  