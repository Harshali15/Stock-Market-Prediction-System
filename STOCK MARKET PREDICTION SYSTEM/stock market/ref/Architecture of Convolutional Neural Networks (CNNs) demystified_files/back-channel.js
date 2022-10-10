function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

jQuery(document).ready(function($){
	if(getCookie('openid_sid')){
		$.ajax({
			type: 'GET',
			url: '/back-channel/logout-back.php',
			success: function(data){
				if(data.success){
					$.ajax({
						type: 'GET',
						url: data.redirect,
						success: function(){
							location.reload(true);
						},
						error: function(e) {
							console.log(e);
						}
					});
				}
			},
			error: function(e){
				console.error(e);
			}
		});
	}
});
