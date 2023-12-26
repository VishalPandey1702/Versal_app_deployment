export function countStars(arrayOfObjects) {
  const totalStars = {};

  arrayOfObjects.forEach((object) => {
    Object.keys(object).forEach((key) => {
      if (!totalStars[key]) {
        totalStars[key] = 0;
      }
      const value = object[key];
      if (value >= 1 && value <= 5) {
        totalStars[key] += value;
      }
    });
  });

  return totalStars;
}
