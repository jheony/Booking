const signUp = document.getElementById('singup');
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // 입력받은 값 저장
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // 임시 계정
    var validUsername = "user";
    var validPassword = "password123";

    // 입력값 검사
    if (username === validUsername && password === validPassword) {
        document.getElementById('message').textContent = "Login successful!";
        document.getElementById('message').style.color = "green";
    } else {
        document.getElementById('message').textContent = "Invalid username or password.";
        document.getElementById('message').style.color = "red";
    }
});
// 회원가입으로 이동
signUp.addEventListener('click',function(){

})