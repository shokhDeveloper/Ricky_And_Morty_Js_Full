let form = document.querySelector("form");
let inputs = document.querySelectorAll("form input");
let email_label_text = document.querySelector(".email_label_text");
let password_label_text = document.querySelector(".password_label_text");
const handleChange = (event) => {
    let rejex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    switch (event.target.id) {
          case "email":
        {
          if (rejex.test(event.target.value)) {
            if (email_label_text.getAttribute("class").includes("text-danger")) {
              email_label_text.classList.remove("text-danger");
              email_label_text.textContent = "Email";
            }
          } else {
            email_label_text.classList.add("text-danger");
            email_label_text.textContent = "Email it's required";
          }
        }
        break;
      case "password": {
        if (event.target.value.length > 3 && event.target.value.length < 15) {
          if (password_label_text.getAttribute("class").includes("text-danger")) {
            password_label_text.classList.remove("text-danger");
            password_label_text.textContent = "Password";
          }
        } else {
          password_label_text.classList.add("text-danger");
          password_label_text.textContent = "Password it's required";
        }
      }
    }
  };
  inputs.forEach((item) => {
    item.addEventListener("keyup", handleChange);
    item.addEventListener("blur", handleChange);
  });
  const handleSub = (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    axios
      .post(`http://localhost:999/login`, {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((response) => {
        let { accessToken, user } = response.data;
        window.localStorage.setItem("token_ricky", accessToken);
        window.localStorage.setItem("user_ricky", JSON.stringify(user));
        if (
          window.localStorage.getItem("token_ricky") !== null ||
          window.localStorage.getItem("token_ricky") !== undefined
        ) {
          window.location.replace("http://127.0.0.1:5500/Main/index.html");
        }
      });
  };
  form.addEventListener("submit", handleSub);