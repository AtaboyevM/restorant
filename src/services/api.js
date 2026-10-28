export const fetchDbData = async () => {
  try {
    const response = await fetch('/db.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Direct fetch from /db.json failed, loading fallback data', error);
    const fallback = await import('../../public/db.json');
    return fallback.default || fallback;
  }
};

export const fetchRestaurants = async () => {
  const data = await fetchDbData();
  return data.restaurants || [];
};

export const fetchRestaurantById = async (id) => {
  const restaurants = await fetchRestaurants();
  return restaurants.find((r) => r.id === id) || null;
};

export const fetchSpecials = async () => {
  const data = await fetchDbData();
  return data.specials || [];
};

export const fetchReviews = async () => {
  const data = await fetchDbData();
  return data.reviews || [];
};
