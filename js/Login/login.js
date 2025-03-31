async function loginUser(login, senha) {
    const url = "https://feg0ucemi1.execute-api.us-east-1.amazonaws.com/v1/oab?";  // Nova URL para autenticação
    try {
        // Requisição POST

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                "tag": "login",
                "login": login,
                "senha": senha,
                "method": "POST"
             })  // Send the tag object directly, not inside an array
        })

        const responseData = await response.json();
        return responseData
    } catch (error) {
        console.error("Erro ao enviar dados:", error);
        alert("Ocorreu um erro ao salvar os dados.");
    }
}

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

    const result = await loginUser(login, senha);
    const body = result['body']
    console.log()
    if (result['login'] == "true") {
        alert("Login bem-sucedido!");
        localStorage.setItem("authenticated", "true");
        window.location.href = "changeData.html";
    } else {
        document.getElementById("error-message").style.display = "block";
    }
});
