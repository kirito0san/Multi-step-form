let Next = document.querySelector(".Next");
let previous = document.querySelector(".previous");
let first = document.querySelector(`.first-step`);
let form = document.querySelector(`form`);
let car = document.querySelector(`.car-img`);
let stepPage = document.querySelectorAll(".step");
let main = document.querySelector("main");
let required = document.querySelectorAll(".required");
let condition = document.querySelector(".condition");
let step = 0;
// step one
let selectfirst = document.querySelectorAll(`.first-step .required`);
let cars = [
    "./images/wepik-export-20240418114106zlcX.png",
    "./images/wepik-export-20240418114456PXxS.png",
    "./images/wepik-export-20240418114717FFaS (1).png",
    "./images/wepik-export-20240418120929xAyf (2).png",
    "./images/wepik-export-20240418121455widq.png",
];

[...selectfirst].forEach((e, i) => {
    e.nextElementSibling.addEventListener("change", () => {
        e.nextElementSibling.style.border = "none";
        if ([...selectfirst].every((e) => e.nextElementSibling.value !== "")) {
            car.style.opacity = "100";
            car.src = cars[Math.floor(Math.random() * 5)];
            console.log(2);
            section[step].style.overflowY = "scroll";
        } else {
            section[step].style.overflowY = "hidden";
            car.style.opacity = "0";
        }
    });
});
// step two
const secondstep = document.querySelector(".second-step");
let AddOrder = document.querySelector(".Add-Order");
let divOrder = document.querySelectorAll(".div-order");
let data = secondstep.querySelectorAll("input,textarea");
let remove = document.createElement("btn");
let order = 0;
let res;
let pics = document.getElementById("pics");
let picsBtn = document.querySelector(".picsBtn button");
picsBtn.addEventListener("click", () => {
    pics.click();
});

AddOrder.addEventListener("click", () => {
    if (
        [...section[1].querySelectorAll(".required")].some((e) => e.nextElementSibling.value === "")
    ) {
        condition.style.top = "100px";
        condition.children[0].innerHTML = "* There are empty fields, please fill them. ";
        return;
    }

    // remove img input
    let Imgcar = document.querySelector(".imgPreview");
    if (Imgcar) {
        Imgcar.remove();
    }
    div.className = "AnotherOrder";
    divOrder.forEach((e) => {
        let div = document.createElement("div");
        let div2 = document.createElement("div");
        let button = document.createElement("button");
        e.appendChild(div);
        div.innerHTML = `
    <div>
<p>part name: <span>${data[0].value}</span></p>
<p>how many : <span>${data[1].value}</span></p>
<p>serial number : <span>${data[2].value}</span></p>
<p>part description : <span>${data[3].value}</span></p>
    </div>
    <div>${res ? `<img class="carImg" src="${res ? res : ""}" alt="car">` : ""}  </div>
    `;
        div.appendChild(button);
        div.appendChild(div2);
        div.style.opacity = `1`;
        button.setAttribute("class", "remove");
        button.innerHTML = "remove";
        button.type = "button";
        button.addEventListener("click", (el) => {
            div.remove();
        });
        if (res) {
            order += 1;
        }
    });
    [...section[1].querySelectorAll(".required")].forEach((e) => {
        e.nextElementSibling.value = "";
    });
});
// file images
let img = document.createElement("img");
pics.onchange = () => {
    let previewFile = document.querySelector(".previewFile");
    let file = pics.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        res = e.target.result;
        previewFile.appendChild(img);
        img.className = "imgPreview";
        img.src = res;
        img.alt = "idk";
    };
};

// file images
secondstep.querySelectorAll(".required");
// end step two
//  Next btn
let translate = 0;
Next.addEventListener("click", (el) => {
    let isEmpty = [...section[step].querySelectorAll(".required")].some(
        (e) => e.nextElementSibling.value == "" || e.nextElementSibling.value == ".."
    );
    if (isEmpty && step !== 1) {
        condition.style.top = "100px";
        if (step == 0) {
            condition.children[0].innerHTML = "* there are empty choice, please fill them.";
            return;
        }
        condition.children[0].innerHTML = "* there are empty fields, please fill them.";
        return;
    }

    let isDivEmpty = divOrder[0].childElementCount == 0;
    if (step == 1 && isDivEmpty) {
        condition.style.top = "100px";
        condition.children[0].innerHTML = "* U Need to add order ";
        return;
    }

    if (step == 2 && !validateEmail(email.value)) {
        condition.style.top = "100px";
        condition.children[0].innerHTML = "* this email is not valid";
        return;
    }
    if (step == 2 && password.value !== rePassword.value) {
        condition.style.top = "100px";
        condition.children[0].innerHTML = "* check ur password and try again ";
        return;
    }
    if (step == 2 && password.value.length <= 5) {
        condition.style.top = "100px";
        condition.children[0].innerHTML = "* password must have 6 char ";
        return;
    }
    if (step == 4) {
        let number = [];
        for (let i = 0; i < 6; i++) {
            number.push(Math.floor(Math.random() * 10));
        }
        document.querySelector(".order-number").innerHTML = number.join("");
        document.querySelector(".buttons").remove();
    }
    condition.style.top = "-200px";
    // stop move
    if (step < main.children.length - 1) {
        stp(1, -100);
    }
});
let section = document.querySelectorAll("section");
if (section[step].scrollHeight <= 600) {
    section[step].style.overflowY = "hidden";
}

// step fifth ....

let carInfo = document.querySelector(".car-info");
let clientInfo = document.querySelector(".client-info");
let deliveryInfo = document.querySelector(".delivery-info");
let parts = document.querySelector(".parts");
// step fifth ....
let fifthStep = document.querySelectorAll(".fifth-step p > span");
let mainDive = document.querySelectorAll("main > div");
let deleteOrder = document.querySelector(".delete-Order");

deleteOrder.addEventListener("click", (e) => {
    step = 0;
    mainDive.forEach((e, i) => {
        if (i == 0) return;
        e.style.transform = `translateX(110%)`;
    });
    divOrder.forEach((e) => {
        e.innerHTML = "";
    });
    mainDive[0].style.transform = `translateX(0)`;
    deleteOrder.style.display = "none";
    car.src = "";
    form.reset();
});

function stp(num, where) {
    translate = num > 0 ? "calc(-110% - 300px)" : "calc(110% + 300px)";
    mainDive[step].style.transform = `translateX(${translate})`;
    if (step == 1 && num == -1) {
        translate = 0;
    }
    step += num;
    mainDive[step].style.transform = `translateX(0)`;
    if (section[step].scrollHeight <= 600) {
        section[step].style.overflowY = "hidden";
    }
    if (step === 1) {
        AddOrder.style.display = `block`;
    } else {
        AddOrder.style.display = `none`;
    }
    if (step == 4) {
        Next.innerHTML = "submit";
        deleteOrder.style.display = "block";
    } else {
        deleteOrder.style.display = "none";
        Next.innerHTML = "next";
    }
    // DATA
    fifthStep.forEach((e) => {
        e.innerHTML = document.getElementById(e.className).value;
    });

    // DATA
}
let div = document.querySelectorAll("main > div");
//  previous btn
previous.addEventListener("click", (el) => {
    if (step === 1) {
        stp(-1, 0);
        return;
    }
    if (step > 0) {
        stp(-1, 100);
    }
});
// step two
// step three
let code = document.querySelectorAll(".code");
let codeContainer = document.querySelectorAll(".code-container");

let liCode = document.querySelectorAll(".code li");
let down = document.querySelectorAll(".down");
let show = document.querySelectorAll(".show");
let rotate = 0;
liCode.forEach((e, i) => {
    e.addEventListener("click", (el) => {
        e.parentElement.nextElementSibling.innerHTML = `<img class="imgs" src=${el.currentTarget.children[0].src} alt="EG-flag" />  <p>+${liCode[i].value}</p>`;
    });
});
codeContainer.forEach((e, i) => {
    e.addEventListener("click", () => {
        rotate += 180;
        down[i].style.transform = `rotate(${rotate}deg)`;
        if (code[i].style.display == "flex") {
            code[i].style.display = "none";
        } else {
            code[i].style.display = "flex";
        }
    });
});
let email = document.querySelector("#email");

let okkay = document.querySelector(".okkay");
let password = document.querySelector("#password");
let rePassword = document.querySelector("#re-type-password");
function validateEmail(email) {
    const regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}
okkay.addEventListener("click", () => {
    condition.style.top = "-200px";
});
// step three
