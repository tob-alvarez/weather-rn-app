export default getBackgroundColor = (hour) => {
    if (hour >= 6 && hour < 12) {
      return '#3BB7EA'; // Mañana
    } else if (hour >= 12 && hour < 18) {
      return '#3BB7EA'; // Tarde
    } else if (hour >= 18 && hour < 21) {
      return '#FFA07A'; // Anochecer
    } else {
      return '#2F4F4F'; // Noche
    }
};