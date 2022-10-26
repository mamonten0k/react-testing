const { withBrowser, pages_registry } = require('./common.helpers');

describe('<Общие требования>', async function () {
    it('Есть навигация при десктопном размере экрана', async function () {
        const browser = this.browser;
        const { navigateToPage } = withBrowser(browser);

        await navigateToPage(pages_registry.HOME_PAGE, '.Home');
        await browser.assertView('desktop', 'div.container:nth-child(1)', {
            compositeImage: true
        })
    })

    it('При ширине меньше 576px навигационное меню скрывается за <гамбургер>', async function () {
        const browser = this.browser;
        const { withMobile, navigateToPage } = withBrowser(browser);

        await withMobile(async () => {
            await navigateToPage(pages_registry.HOME_PAGE, '.Home');
            const button = await this.browser.$(".Application-Toggler");
            await this.browser.assertView('mobile', 'div.container:nth-child(1)');
        })();
    })

    it('При клике на <гамбургер> навигационное меню раскывается', async function () {
        const browser = this.browser;
        const { withMobile, navigateToPage } = withBrowser(browser);

        await withMobile(async () => {
            await navigateToPage(pages_registry.HOME_PAGE, '.Home');
            const button = await this.browser.$(".Application-Toggler");
            await button.click();
            await this.browser.assertView('mobile', 'div.container:nth-child(1)');
        })();
    })

    it('При повторном клике на <гамбургер> меню исчезает', async function () {
        const browser = this.browser;
        const { withMobile, navigateToPage } = withBrowser(browser);

        await withMobile(async () => {
            await navigateToPage(pages_registry.HOME_PAGE, '.Home');
            const button = await this.browser.$(".Application-Toggler");
            await button.click();
            await button.click();
            await this.browser.assertView('mobile', 'div.container:nth-child(1)');
        })();
    })

    it('При клике на ссылку происходит переход на другую страницу, <гамбургер> закрывается', async function () {
        const browser = this.browser;
        const { withMobile, navigateToPage } = withBrowser(browser);

        await withMobile(async () => {
            await navigateToPage(pages_registry.HOME_PAGE, '.Home');
            const button = await this.browser.$(".Application-Toggler");
            await button.click();
            const link = await this.browser.$('.nav-link');
            await link.click();
            await this.browser.assertView('mobile', '#root');
        })();
    });
})

describe('Страницы', async function () {
    it('Страница Доставки имеет статичное содержание', async function () {
        const browser = this.browser;
        const { navigateToPage } = withBrowser(browser);

        await navigateToPage(pages_registry.DELIVERY_PAGE, '.Delivery');
        await browser.assertView('plain', '#root', {})
    });

    it('Страница Доставки адаптивная', async function () {
        const browser = this.browser;
        const { withMobile, navigateToPage } = withBrowser(browser);

        await withMobile(async () => {
            await navigateToPage(pages_registry.DELIVERY_PAGE, '.Delivery');
            await browser.assertView('plain', '#root', {})
        })();
    });

    it('Страница Контактов имеет статичное содержание', async function () {
        const browser = this.browser;
        const { withMobile, navigateToPage } = withBrowser(browser);

        await withMobile(async () => {
            await navigateToPage(pages_registry.DELIVERY_PAGE, '.Delivery');
            await browser.assertView('plain', '#root', {})
        })();
    });

    it('Страница Контактов адаптивная', async function () {
        const browser = this.browser;
        const { navigateToPage } = withBrowser(browser);

        await navigateToPage(pages_registry.HOME_PAGE, '.Home');
        await browser.assertView('plain', '#root', {})
    });

    it('Домашнаяя страница имеет статичное содержание', async function () {
        const browser = this.browser;
        const { navigateToPage } = withBrowser(browser);

        await navigateToPage(pages_registry.HOME_PAGE, '.Home');
        await browser.assertView('plain', '#root', {})
    });

    it('Домашнаяя страница адаптивная', async function () {
        const browser = this.browser;
        const { withMobile, navigateToPage } = withBrowser(browser);

        await withMobile(async () => {
            await navigateToPage(pages_registry.HOME_PAGE, '.Home');
            await browser.assertView('plain', '#root', {})
        })();
    });
})

describe("<Корзина>", async function() {
    it('Компонент адаптивен', async function () {
        const browser = this.browser;
        const { withMobile, navigateToPage } = withBrowser(browser);

        await withMobile(async () => {
            await navigateToPage(pages_registry.CART_PAGE, '.Cart');
            await browser.assertView('plain', '#root', {})
        })();
    });

    it('Состояние сохраняется после перезагрузки', async function () {
        const browser = this.browser;
        const { addToCart, navigateToPage } = withBrowser(browser);
        
        await addToCart();
        await navigateToPage(pages_registry.CART_PAGE, '.Cart');
        await navigateToPage(pages_registry.CART_PAGE, '.Cart');

        await browser.assertView('plain', '#root', {
            compositeImage: true,
        });
    });

    it("Все товары удаляются при нажатии кнопки <Clear shopping cart>", async function() {
        const browser = this.browser;
        const { addToCart, navigateToPage } = withBrowser(browser);
        
        await addToCart();
        await navigateToPage(pages_registry.CART_PAGE, '.Cart');

        const button = await browser.$('.Cart-Clear')
        await button.click()

        await browser.assertView('plain', '.Cart', {
            screenshotDelay: 0.3,
        });
    });
})

describe('<Каталог>', async function () {
    it('Компонент адаптивен', async function () {
        const browser = this.browser;
        const { withMobile, navigateToPage } = withBrowser(browser);

        await withMobile(async () => {
            await navigateToPage(pages_registry.CATALOG_PAGE, '.Catalog');
            await browser.assertView('plain', '#root', {})
        })();
    });

    it(`При добавлении товара в корзину, в каталоге на карточке товара отобразится сообщение <Item in cart>`, async function() {
        const browser = this.browser;
        const { addToCart,navigateToPage } = withBrowser(browser);

        await addToCart();
        await navigateToPage(pages_registry.CATALOG_PAGE, '.Catalog');

        await browser.assertView('plain', '#root', {
            screenshotDelay: 0.3,
        });
    });
})


