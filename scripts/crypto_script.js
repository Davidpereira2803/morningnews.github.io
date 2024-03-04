
// Function to fetch and display cryptocurrency prices
async function displayCryptoPrices() {
    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,solana&vs_currencies=usd';
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      // Extract prices from the response
      const bitcoinPrice = data.bitcoin.usd;
      const ethereumPrice = data.ethereum.usd;
      const ripplePrice = data.ripple.usd;
      const solanaPrice = data.solana.usd;
  
      // Display prices on the webpage
      const cryptoPricesContainer = document.getElementById('cryptoPrices');
      cryptoPricesContainer.innerHTML = `
        <p>Bitcoin Price: $${bitcoinPrice}</p>
        <p>Ethereum Price: $${ethereumPrice}</p>
        <p>Solana Price: $${solanaPrice}</p>
      `;
    } catch (error) {
      console.error('Error fetching cryptocurrency prices:', error.message);
    }
  }

  
  
  // Call the function to display crypto prices
  displayCryptoPrices();
  