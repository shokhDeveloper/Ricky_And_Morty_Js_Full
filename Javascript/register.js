let form = document.querySelector("form");
let inputs = document.querySelectorAll("form input");
let name_label_text = document.querySelector(".name_label_text");
let lastname_label_text = document.querySelector(".lastname_label_text");
let email_label_text = document.querySelector(".email_label_text");
let password_label_text = document.querySelector(".password_label_text");
const handleChange = (event) => {
  let rejex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  switch (event.target.id) {
    case "name":
      {
        if (event.target.value.length > 1) {
          if (name_label_text.getAttribute("class").includes("text-danger")) {
            name_label_text.classList.remove("text-danger");
            name_label_text.textContent = "Name";
          }
        } else {
          name_label_text.classList.add("text-danger");
          name_label_text.textContent = "Name it's required";
        }
      }
      break;
    case "lastname":
      {
        if (
          event.target.value.endsWith("ov") ||
          event.target.value.endsWith("ev") ||
          event.target.value.endsWith("va")
        ) {
          if (
            lastname_label_text.getAttribute("class").includes("text-danger")
          ) {
            lastname_label_text.classList.remove("text-danger");
            lastname_label_text.textContent = "Lastname";
          }
        } else {
          lastname_label_text.classList.add("text-danger");
          lastname_label_text.textContent = "Lastname it's required";
        }
      }
      break;
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
    .post(`http://localhost:999/register`, {
      name: data.get("name"),
      lastname: data.get("lastname"),
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

// let p = document.querySelector(".p");
// let n = document.querySelector(".n");
// let page = document.querySelectorAll(".page");
// let max = 12;
// let data = [
//   {
//     page: 1,
//     data: [
//       {
//         name: "Binal",
//       },
//       {
//         name: "Binal",
//       },
//       {
//         name: "Begzod",
//       },
//       {
//         name: "Usha",
//       },
//     ],
//   },
//   {
//     page: 2,
//     data: [
//       {
//         name: "Shohjahon",
//       },
//       {
//         name: "Binal",
//       },
//       {
//         name: "Doston",
//       },
//       {
//         name: "Messi",
//       },
//     ],
//   },
//   {
//     page: 3,
//     data: [
//         {
//           name: "Shohjahon",
//         },
//         {
//           name: "Binal",
//         },
//         {
//           name: "Doston",
//         },
//         {
//           name: "Messi",
//         },
//       ],
//   },
//   {
//     page: 4,
//     data: [
//       {
//         name: "Binal",
//       },
//       {
//         name: "Binal",
//       },
//       {
//         name: "Begzod",
//       },
//       {
//         name: "Usha",
//       },
//     ],
//   },
//   {
//     page: 5,
//     data: [
//       {
//         name: "Shohjahon",
//       },
//       {
//         name: "Binal",
//       },
//       {
//         name: "Doston",
//       },
//       {
//         name: "Messi",
//       },
//     ],
//   },
//   {
//     page: 6,
//     data: [
//         {
//           name: "Shohjahon",
//         },
//         {
//           name: "Binal",
//         },
//         {
//           name: "Doston",
//         },
//         {
//           name: "Messi",
//         },
//       ],
//   },
//   {
//     page: 7,
//     data: [
//       {
//         name: "Binal",
//       },
//       {
//         name: "Binal",
//       },
//       {
//         name: "Begzod",
//       },
//       {
//         name: "Usha",
//       },
//     ],
//   },
//   {
//     page: 8,
//     data: [
//       {
//         name: "Shohjahon",
//       },
//       {
//         name: "Binal",
//       },
//       {
//         name: "Doston",
//       },
//       {
//         name: "Messi",
//       },
//     ],
//   },
//   {
//     page: 9,
//     data: [
//         {
//           name: "Shohjahon",
//         },
//         {
//           name: "Binal",
//         },
//         {
//           name: "Doston",
//         },
//         {
//           name: "Messi",
//         },
//       ],
//   },
// ];
// console.log(data);
// let result_div = document.querySelector(".result");
// const handleRenderResult = (result) => {
//   if (result?.length) {
//     result_div.innerHTML = null;
//     for (let i = 0; i < result.length; i++) {
//       let h1 = document.createElement("H1");
//       h1.classList.add("text-light");
//       h1.appendChild(document.createTextNode(result[i].name));
//       result_div.appendChild(h1);
//     }
//   }
// };
// const handleRenderData = (data, page) => {
//   if (page !== undefined && page !== null) {
//     let result = [];
//     for (let i = 0; i < data.length; i++) {
//       if (data[i].page === page) {
//         result = data[i].data;
//         handleRenderResult(result);
//       }
//     }
//   } else {
//     handleRenderResult(data[0].data);
//   }
// };
// const handleClick = (event) => {
//   console.log(event.target.textContent - 0);
//   handleRenderData(data, event.target.textContent - 0);
// };
// n.addEventListener("click", () => {
//   let array = [];
//   page.forEach((item) => {
//     array = [...array, item.textContent - 0];
//   });
//   let max_page = Math.max(...array);
//   if (max > max_page) {
//     page.forEach((item) => {
//       item.textContent = Number(item.textContent) + 1;
//     });
//   }
// });
// page.forEach((item) => {
//   item.addEventListener("click", handleClick);
// });
// p.addEventListener("click", () => {
//   let array = [];
//   page.forEach((item) => {
//     array = [...array, item.textContent - 0];
//   });
//   let min_page = Math.min(...array);
//   if (min_page > 1) {
//     page.forEach((item) => {
//       item.textContent = Number(item.textContent) - 1;
//     });
//   }
// });

// handleRenderData(data, null);
