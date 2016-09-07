function showCartInfo() {
    var session = window.sessionStorage,
        data = JSON.parse(session.getItem('cart'));

    $('#test').text(data.totalNumber);
}

showCartInfo();