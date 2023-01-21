export async function fetchImages(breed) {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/6e5b977b2a10cc8cf7a99a53/pair/USD/JPY`
    );
    const data = await response.json();
    return data;
  }