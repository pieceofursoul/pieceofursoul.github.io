$(function() {

    $("#feedback--intro").click(function (){
        $("#feedback--wrapper").toggle('blind');
    })

    // Отправляем сообщение из формы обратной связи.
    $("#feedback_form").submit(function (e) {
        // Останавливаем форму от отправки данных.
        e.preventDefault();

        // Валидация полей формы.
        if (!validateFormField('feedback_form--name') || !validateFormField('feedback_form--body')) {
            return;
        }

        // Инициализируем базу данных.
        let db = firebase.firestore();
        let date = new Date();

        // Генерируем уникальный идентификатор записи. Формат "post-CURRENT_TIMESTAMP-RANDOM_STRING".
        let post_id = "post-" + date.getTime() + "-" + Math.random().toString(36).substr(2, 5);

        // Отправляем данные из формы в базы данных
        let post = db.collection("feedback").doc(post_id).set({
            from: $("#feedback_form--name").val(),
            body: $("#feedback_form--body").val(),
            time: date.toUTCString(),
        })
        .then(function() {
            alert("Сообщение было отправлено.");
        })
        .catch(function(error) {
            alert("К сожалению сообщение не отправлено, попробуйте, пожалуйста, попозже.");
            console.error("Error writing document: ", error);
        });

    });
});
