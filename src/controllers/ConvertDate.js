function NormalDateFormat(value) {
    const date = new Date(value);
    const currentDate = new Date();

    const timeDifference = currentDate - date;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const monthsDifference = Math.floor(daysDifference / 30);
    const yearsDifference = Math.floor(monthsDifference / 12);

    if (yearsDifference > 0) {
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    } else if (monthsDifference > 0) {
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long' });
    } else if (daysDifference >= 3) {
        return `${daysDifference}d ago`;
    } else if (daysDifference === 2) {
        return '2d ago';
    } else if (daysDifference === 1) {
        return '1d ago';
    } else if (hoursDifference >= 24) {
        return `${Math.floor(hoursDifference / 24)}d ago`;
    } else if (hoursDifference >= 1) {
        return `${hoursDifference}h ago`;
    } else {
        return 'Just now';
    }

    // Example usage:
    // const formattedDate = formatDate("2024-04-08T15:51:55.705Z");


}
export default NormalDateFormat;