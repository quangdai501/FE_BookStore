export const priceToString = (price) => {
    return (price).toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
}