const withBrowser = (browserContext) => {
    const withMobile = (callback) => {
        return async function () {
            const { width, height } = await browserContext.getWindowSize();
            await browserContext.setWindowSize(520, Math.max(height, 1440));
            try {
                await callback.call(browserContext)
            } finally {
                await browserContext.setWindowSize(width, height);
            }
        }
    }

    const addToCart = async () => {
        await browserContext.url(`/hw/store/catalog/0`);
    
        const addToCartBtn = await browserContext.$('.ProductDetails-AddToCart');
        await addToCartBtn.waitForExist();
        await addToCartBtn.click();
    }

    const navigateToPage = async (page, selector) => {
        await browserContext.url(`/hw/store/${page}`);

        const cart = await browserContext.$(selector);
        await cart.waitForExist();
    }

    return { addToCart, navigateToPage, withMobile};
}

const pages_registry = {
    CART_PAGE: 'cart',
    CATALOG_PAGE: 'catalog',
    DELIVERY_PAGE: 'delivery',
    CONTACTS_PAGE: 'contacts',
    HOME_PAGE: '',
}


module.exports = {
    withBrowser,
    pages_registry,
}