export default function timeSince(unixTimestamp) {
    const now = Date.now();
    const secondsPast = Math.floor((now - unixTimestamp * 1000) / 1000);
  
    if (secondsPast < 60) {
        return `${secondsPast}s ago`;
      }
      if (secondsPast < 3600) {
        const minutes = Math.floor(secondsPast / 60);
        return `${minutes}m ago`;
      }
      if (secondsPast < 86400) {
        const hours = Math.floor(secondsPast / 3600);
        return `${hours}h ago`;
      }
      if (secondsPast < 2592000) { // 30 days
        const days = Math.floor(secondsPast / 86400);
        return `${days}d ago`;
      }
      if (secondsPast < 31536000) { // 12 months
        const months = Math.floor(secondsPast / 2592000); // 30 days per month
        return `${months}mo ago`;
      }
      const years = Math.floor(secondsPast / 31536000); // 365 days per year
      return `${years}y ago`;
}