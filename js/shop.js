$(function() {
    shop_items = [];

    // Пользователь кликает на кнопку "Купить."
    $('.shop--item--buy').click(function() {
        // Достаем номенклатурный номер товара.
        let item_id = $(this).parent('.shop--item').data('item-id');
        if (!shop_items.includes(item_id)) {
            // Добавляем к корзину только 1 раз.
            shop_items.push(item_id);
            updateShopCart();
            updateShopOrderList();
        }
        showShopCart();
    })

    // Показываем корзину.
    showShopCart = function() {
        $('#shop--cart').show();
        $('#shop--order').show();
    }

    // Скрываем корзину
    hideShopCart = function() {
        $('#shop--cart').hide();
        $('#shop--order').hide();
    }

    // Обновляем количество элементов в корзине.
    updateShopCart = function() {
        $('#shop--cart--count').html(shop_items.length);
    }

    // Пользователь кликает на количество элементов в корзине - перекидываем его на заказ.
    $('#shop--cart--count').click(function() {
        $('html, body').animate({
            scrollTop: parseInt($("#shop--order").offset().top)
        }, 1000);
    });

    // Обновляем список продуктов в заказе.
    updateShopOrderList = function() {
        var content = '';
        shop_items.forEach(function(value, index) {
            let product = $('.shop--item[data-item-id="' + value + '"]');
            let product_title = $('.shop--item--title', product).text();
            let product_price = $('.shop--item--price--value', product).text();
            content = content + '<div class="shop--order--list-item">' + product_title + ' - ' + product_price + ' руб. <span class="shop--order--list-item-remove" data-item-id="' + value + '">удалить</span></div>';
        })
        $('#shop--order--list').html(content);
    }

    // Удаляем продукты из заказа.
    $('#shop--order--list').on('click', '.shop--order--list-item-remove', function() {
        var item_id = $(this).data('item-id');
        shop_items = shop_items.filter(function(value) {
            return value != item_id;
        });

        if (shop_items.length == 0) {
            hideShopCart();
        }
        updateShopCart();
        updateShopOrderList();
    });
});
