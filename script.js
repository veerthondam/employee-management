const loadApi = async () => {
  try {
    const apiCall = await fetch("db.json");
    const employees = await apiCall.json();
    let empList = document.querySelector(".employee-list");
    empList.innerHTML = "";

    empList.innerHTML = employees
      .map((data) => {
        return `<div id=${data.id} class="employee-item">${data.firstName}</div>`;
      })
      .join("");

    empList.addEventListener("click", (event) => {
      let empId = event.target.id;
      const clickedEmployee = employees.find((data) => data.id == empId);

      const emplySection = document.querySelector(".emply-section");
      if (clickedEmployee) {
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
          <div>${clickedEmployee.firstName} ${clickedEmployee.lastName}</div>
        </div>
        `;
      }
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
