const loadApi = async () => {
  try {
    const apiCall = await fetch("db.json");
    const employees = await apiCall.json();
    renderEmployees(employees);
    let addEmployee = document.querySelector(".add-emp");
    let empAddSection = document.querySelector(".employ-add-section");
    let submitForm = document.querySelector(".employ-add-section form");
    addEmployee.addEventListener("click", function () {
      empAddSection.style.display = "flex";
    });
    empAddSection.addEventListener("click", (e) => {
      if (e.target.classList.contains("employ-add-section")) {
        empAddSection.style.display = "none";
      }
    });
    submitForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(submitForm);
      const values = [...formData.entries()];
      let empData = {};
      values.forEach((val) => {
        empData[val[0]] = val[1];
      });

      empData.id = employees[employees.length - 1].id + 1;
      employees.push(empData);
      submitForm.reset();
      empAddSection.style.display = "none";

      renderEmployees(employees);
    });

    /*  employees.forEach((emp) => {
      const empDiv = document.createElement("div");
      empDiv.classList.add("employee-item");
      empDiv.innerHTML = `
       <p>${emp.firstName}</p>
    `;

      empList.appendChild(empDiv); 
    });*/
  } catch (error) {
    console.log(error);
    throw new Error("Error", error.message);
  }
};

loadApi();

const renderEmployees = (employees) => {
  let empList = document.querySelector(".employee-list");
  empList.innerHTML = "";
  empList.innerHTML = employees
    .map((data, index) => {
      const activeClass = index == 0 ? "active" : "";
      return `<div id=${data.id} class="employee-item ${activeClass}">${data.firstName}</div>`;
    })
    .join("");

  displayEmployee(employees[0]);
  empList.addEventListener("click", (event) => {
    if (event.target.classList.contains("employee-item")) {
      const isAlreadyActive = event.target.classList.contains("active");

      if (!isAlreadyActive) {
        const activeRecord = empList.querySelector(".employee-item.active");
        if (activeRecord) {
          activeRecord.classList.remove("active");
        }

        event.target.classList.add("active");

        // Display the clicked employee's details
        const empId = event.target.id;
        const clickedEmployee = employees.find((data) => data.id == empId);

        if (clickedEmployee) {
          displayEmployee(clickedEmployee);
        }
      }
    }
  });
};

const displayEmployee = (clickedEmployee) => {
  const emplySection = document.querySelector(".emply-section");

  emplySection.innerHTML = "";
  emplySection.innerHTML = `
        <div class="Emp-profile-container">
        <div class="profile-img">
          <img src="${
            clickedEmployee.imageUrl
              ? "./assets/" + clickedEmployee.imageUrl
              : "./assets/noimage.png"
          }"  alt=${clickedEmployee.firstName}>
        </div>
          <div class="employee-details">
            <div class="title">
              ${clickedEmployee.firstName} ${clickedEmployee.lastName}
            </div>
            <div class="email">
              ${clickedEmployee.email}
            </div>
            <div class="email">
              ${clickedEmployee.contactNumber}
            </div>
          </div>
        </div>
        `;
};
