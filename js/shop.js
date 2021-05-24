$(function() {
    shop_items = [];

    // Показываем корзину и форму заказа.
    showShopCart = function() {
        $('#shop--cart').show();
        $('#shop--order').show();
    }

    // Скрываем корзину и форму заказа.
    hideShopCart = function() {
        $('#shop--cart').hide();
        $('#shop--order').hide();
    }

    // Обновляем количество элементов в корзине.
    updateShopCart = function() {
        $('#shop--cart--count').html(shop_items.length);
    }

    // Генерируем список товаров и цену.
    getShopItems = function() {
        var items = []
        shop_items.forEach(function(value, index) {
            let product = $('.shop--item[data-item-id="' + value + '"]');
            let product_title = $('.shop--item--title', product).text();
            let product_price = $('.shop--item--price--value', product).text();
            items.push({'id': value, 'title': product_title, 'price': product_price});
        });
        return items;
    }
    // Обновляем список продуктов в заказе.
    updateShopOrderList = function() {
        var content = '';
        items = getShopItems();
        items.forEach(function(value, index) {
            content = content + '<div class="shop--order--list-item">' + value.title + ' - ' + value.price + ' руб. <span class="shop--order--list-item-remove" data-item-id="' + value.id + '">удалить</span></div>';
        });
        $('#shop--order--list').html(content);
    }

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

    // Пользователь кликает на количество элементов в корзине - перекидываем его на заказ.
    $('#shop--cart--count').click(function() {
        $('html, body').animate({
            scrollTop: parseInt($("#shop--order").offset().top)
        }, 1000);
    });

    // Удаляем продукты из заказа при нажатии на "удалить".
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

    // Отправляем сообщение из формы обратной связи.
    $("#shop--order-form").submit(function (e) {
        // Останавливаем форму от отправки данных.
        e.preventDefault();

        // Валидация полей формы - все поля обязательны.
        if (!validateFormField('shop--order-form--name')
            || !validateFormField('shop--order-form--mail')
            || !validateFormField('shop--order-form--phone')
            || !validateFormField('shop--order-form--address')) {
            return;
        }

        // Инициализируем базу данных.
        let db = firebase.firestore();
        let date = new Date();

        // Генерируем уникальный идентификатор записи. Формат "order-CURRENT_TIMESTAMP-RANDOM_STRING".
        let order_id = "order-" + date.getTime() + "-" + Math.random().toString(36).substr(2, 5);

        var content = '';
        items = getShopItems();
        items.forEach(function(value, index) {
            content = content + 'ID: ' + value.id + '; Название: ' + value.title + '; Цена: ' + value.price + ' руб.';
        });

        // Отправляем данные из формы в базы данных
        let order = db.collection("shop_orders").doc(order_id).set({
            name: $("#shop--order-form--name").val(),
            mail: $("#shop--order-form--mail").val(),
            phone: $("#shop--order-form--phone").val(),
            address: $("#shop--order-form--address").val(),
            items: content,
            time: date.toUTCString(),
        })
        .then(function() {
            alert("Заказ был отправлен.");
            shop_items = [];
            updateShopCart()
            updateShopOrderList();
        })
        .catch(function(error) {
            alert("К сожалению заказ не отправлен, попробуйте, пожалуйста, попозже.");
            console.error("Error writing document: ", error);
        });
    });

});
