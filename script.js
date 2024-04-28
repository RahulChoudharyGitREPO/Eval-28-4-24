
document.addEventListener('DOMContentLoaded', () => {
const employeeTable = document.getElementById('employeeTable');
const filterByDepartment = document.getElementById('departmentFilter');
const filterByGender = document.getElementById('genderFilter');
const sortBySalary = document.getElementById('salarySort');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentPage = 1;
let limit = 10; 

function fetchEmployees(filters = {}, sort = '', order = '') {
  const url = new URL('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees');
  url.searchParams.append('page', currentPage);
  url.searchParams.append('limit', limit);

  if (filters.filterBy) {
    url.searchParams.append('filterBy', filters.filterBy);
    url.searchParams.append('filterValue', filters.filterValue);
  }

  if (sort) {
    url.searchParams.append('sort', sort);
    url.searchParams.append('order', order);
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      updateTable(data);
      updatePagination(data.totalPages);
    })
    .catch(error => console.error(error));
}

// function updateTable(data) {
//   const tableBody = employeeTable.getElementsByTagName('tbody')[0];
//   tableBody.innerHTML = ''; // Clear previous data

//   data.data.forEach((employee, index) => {
//     const tableRow = document.createElement('tr');
//     tableRow.innerHTML = `
//       <td>${currentPage * limit - limit + index + 1}</td>
//       <td>${employee.name}</td>
//       <td>${employee.gender}</td>
//       <td>${employee.department}</td>
//       <td>${employee.salary}</td>
//     `;
//     tableBody.appendChild(tableRow);
//   });
// }
function updateTable(data) {
    const tableBody = employeeTable.getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear previous data
  
    if (data && data.data) {
      data.data.forEach((employee, index) => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
          <td>${currentPage * limit - limit + index + 1}</td>
          <td>${employee.name}</td>
          <td>${employee.gender}</td>
          <td>${employee.department}</td>
          <td>${employee.salary}</td>
        `;
        tableBody.appendChild(tableRow);
      });
    }
  }

function updatePagination(totalPages) {
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

//  Filters, Sort, and Pagination
filterByDepartment.addEventListener('change', () => {
    const filterBy = 'department';
    const filterValue = filterByDepartment.value;
    const sort = sortBySalary.value;
    const order = sort ? 'asc' : ''; 
    fetchEmployees({ filterBy, filterValue }, sort, order);
  });
  
  
filterByGender.addEventListener('change', () => {
  const filterBy = 'gender';
  const filterValue = filterByGender.value;
  const sort = sortBySalary.value;
  const order = sort ? 'asc' : ''; 
  fetchEmployees({ filterBy, filterValue }, sort, order);
});

sortBySalary.addEventListener('change', () => {
  const sort = sortBySalary.value;
  const order = sort ? 'asc' : ''; 
  const filterBy = filterByDepartment.value;
  const filterValue = filterByGender.value;
  fetchEmployees({ filterBy, filterValue }, sort, order);
});

// prevButton.addEventListener('click', () => {
//   if (currentPage > 1) {
//     currentPage--;
//     fetchEmployees();
//   }
// });
prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchEmployees();
    }
  });
  

  nextButton.addEventListener('click', () => {
    const totalPages = parseInt(nextButton.dataset.totalPages); 
    if (currentPage < totalPages) {
      currentPage++;
      fetchEmployees();
    }
  });
  
  function updatePagination(totalPages) {
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
  }
fetchEmployees();
});

