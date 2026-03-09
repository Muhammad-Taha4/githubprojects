import toast from "react-hot-toast";

export const toggleWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem('ishine_wishlist') || '[]');
    const index = wishlist.findIndex(item => item.id === product.id);

    if (index > -1) {
        wishlist.splice(index, 1);
        toast.success('Removed from wishlist');
    } else {
        wishlist.push(product);
        toast.success('Added to wishlist');
    }

    localStorage.setItem('ishine_wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new Event('wishlistUpdate'));
};

export const isInWishlist = (productId) => {
    const wishlist = JSON.parse(localStorage.getItem('ishine_wishlist') || '[]');
    return wishlist.some(item => item.id === productId);
};

export const addToCart = (product, quantity = 1) => {
    let cart = JSON.parse(localStorage.getItem('ishine_cart') || '[]');
    const index = cart.findIndex(item => item.id === product.id);

    if (index > -1) {
        cart[index].quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    localStorage.setItem('ishine_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    toast.success('Added to cart');
};
