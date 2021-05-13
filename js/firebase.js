$(function() {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyC6SG9lfPK20EVKypMW_c486mqas2QWv5c",
        authDomain: "pieceofursoul-cb757.firebaseapp.com",
        databaseURL: "https://pieceofursoul-cb757-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "pieceofursoul-cb757",
        storageBucket: "pieceofursoul-cb757.appspot.com",
        messagingSenderId: "328201222842",
        appId: "1:328201222842:web:56abe592d5c70eae5be083"
    };
    // Initialize Firebase.
    firebase.initializeApp(firebaseConfig);

    $("#feedback--intro").click(function (){
        $("#feedback--wrapper").toggle('blind');
    })

    // Проверяем поля на наличие в них данных.
    function validateFormField(id) {
        let value = $("#" + id).val();
        console.log(value);
        if (!value) {
            let title = $("label[for='" + id + "']").text();
            alert('Введите, пожалуйста, ' + title);
            return false;
        }
        return true;
    }

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
