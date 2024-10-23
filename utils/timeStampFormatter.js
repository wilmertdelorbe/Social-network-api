// Helper function to add the correct ordinal suffix to a date
const appendOrdinalSuffix = (day) => {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const relevantDigits = (day % 100);
  const suffix = (suffixes[(relevantDigits - 20) % 10] || suffixes[relevantDigits] || suffixes[0]);
  return `${day}${suffix}`;
};

// My custom timestamp formatter
// It takes a timestamp and optional configuration object as parameters
const formatTimeStamp = (
  timestamp,
  { monthFormat = 'short', includeOrdinalSuffix = true, includeTime = true } = {}
) => {
  const dateObj = new Date(timestamp);
  
  // My personalized month names
  const monthNames = {
    short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  const month = monthNames[monthFormat][dateObj.getMonth()];
  const day = includeOrdinalSuffix ? appendOrdinalSuffix(dateObj.getDate()) : dateObj.getDate();
  const year = dateObj.getFullYear();

  let formattedDate = `${month} ${day}, ${year}`;

  if (includeTime) {
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12 for midnight
    
    formattedDate += ` at ${hours}:${minutes} ${ampm}`;
  }

  return formattedDate;
};

module.exports = formatTimeStamp;