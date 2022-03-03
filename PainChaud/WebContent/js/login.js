function validateLogin() { 
    let login = document.form;
	
	let name = login.login.value;
	if (name == "") {
        alert("Preencha o campo Login.");
		document.form.login.focus();
		return false;
	}
    
    let password = login.senha.value;
    // let expRegPassword = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,})$");
    if (password == "") {
        alert("Preencha o campo Senha.");
		document.form.senha.focus();
		return false;
    }
}

function redictLocation() {
	window.location.href = window.location.href.replace("#", "") + "pages/";
}