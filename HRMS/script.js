document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".content-section");
    const navLinks = document.querySelectorAll(".sidebar ul li a");

    // Function to show a section
    function showSection(sectionId) {
        sections.forEach((section) => {
            section.id === sectionId ?
                section.classList.add("active") :
                section.classList.remove("active");
        });
    }

    // Show dashboard by default
    showSection("dashboard");

    // Add event listeners to nav links
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute("href").substring(1);
            showSection(sectionId);
        });
    });

    // Employee List and Add Employee Functionality
    const employeeList = document.getElementById("employeeList");
    const addEmployeeBtn = document.getElementById("addEmployeeBtn");
    const modal = document.getElementById("employeeModal");
    const closeModalBtn = document.getElementsByClassName("close")[0];

    let employees = [{
            name: "John Doe",
            position: "Software Engineer",
            department: "Development",
            email: "john@example.com",
            phone: "1234567890",
        },
        {
            name: "Jane Smith",
            position: "HR Manager",
            department: "HR",
            email: "jane@example.com",
            phone: "0987654321",
        },
    ];

    // Render the employee list
    function renderEmployeeList() {
        employeeList.innerHTML = "";
        employees.forEach((employee, index) => {
            employeeList.innerHTML += `
                <div class="employee">
                    <p><strong>${employee.name}</strong></p>
                    <p>Position: ${employee.position}</p>
                    <p>Department: ${employee.department}</p>
                    <p>Email: ${employee.email}</p>
                    <p>Phone: ${employee.phone}</p>
                    <button onclick="deleteEmployee(${index})">Delete</button>
                </div>
            `;
        });
    }

    // Delete employee function
    window.deleteEmployee = function(index) {
        employees.splice(index, 1);
        renderEmployeeList();
    };

    // Initially render the employee list
    renderEmployeeList();

    // Open modal
    addEmployeeBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Close modal
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal if user clicks outside of it
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Handle form submission to add a new employee
    document.getElementById("addEmployeeForm").addEventListener("submit", (e) => {
        e.preventDefault();

        // Get values from form
        const name = document.getElementById("employeeName").value;
        const position = document.getElementById("employeePosition").value;
        const department = document.getElementById("employeeDepartment").value;
        const email = document.getElementById("employeeEmail").value;
        const phone = document.getElementById("employeePhone").value;

        // Add new employee to the array
        employees.push({ name, position, department, email, phone });

        // Re-render employee list
        renderEmployeeList();

        // Close modal and reset form
        modal.style.display = "none";
        e.target.reset();
    });

    // Attendance Table
    let attendanceData = [];

    // Function to display attendance data
    function displayAttendance(data) {
        const tbody = document.querySelector("#attendanceTable tbody");
        tbody.innerHTML = ""; // Clear previous data

        if (data.length === 0) {
            // Show placeholder if no data
            tbody.innerHTML = `
            <tr class="placeholder">
                <td colspan="6">No attendance data available. Please select a date or add employee attendance records.</td>
            </tr>
            `;
        } else {
            // Display attendance data
            data.forEach((employee) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.position}</td>
                <td>${employee.department}</td>
                <td>${employee.phone}</td>
                <td>
                    <span class="attendance-status ${employee.status.toLowerCase()}">${employee.status}</span>
                </td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
                `;
                tbody.appendChild(row);
            });
        }
    }

    // Load attendance data on page load (with no data initially)
    document.addEventListener("DOMContentLoaded", () => {
        displayAttendance(attendanceData);
    });

    // Example to add data later (for testing)
    document.getElementById("filterAttendanceBtn").addEventListener("click", () => {
        attendanceData = [{
                name: "John Doe",
                position: "Software Engineer",
                department: "Development",
                phone: "1234567890",
                status: "Present",
            },
            {
                name: "Jane Smith",
                position: "HR Manager",
                department: "HR",
                phone: "0987654321",
                status: "Absent",
            },
        ];
        displayAttendance(attendanceData); // Reload table with data
    });

    // Charts (Graph Section)

    // Attendance Rate Chart
    const attendanceCtx = document.getElementById("attendanceChart").getContext("2d");
    const attendanceChart = new Chart(attendanceCtx, {
        type: "line",
        data: {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            datasets: [{
                label: "Attendance %",
                data: [80, 85, 90, 75, 88],
                backgroundColor: "rgba(52, 152, 219, 0.5)",
                borderColor: "#3498db",
                fill: true,
                tension: 0.1,
            }, ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    // Payroll Section Charts
    const salaryDistributionCtx = document
        .getElementById("salaryDistributionChart")
        .getContext("2d");
    const salaryDistributionChart = new Chart(salaryDistributionCtx, {
        type: "pie",
        data: {
            labels: ["HR", "Marketing", "Development", "Sales", "Operations"],
            datasets: [{
                label: "Salary Distribution",
                data: [15000, 10000, 20000, 18000, 15000],
                backgroundColor: [
                    "#1abc9c",
                    "#3498db",
                    "#e74c3c",
                    "#f39c12",
                    "#9b59b6",
                ],
            }, ],
        },
    });

    const paymentStatusCtx = document
        .getElementById("paymentStatusChart")
        .getContext("2d");
    const paymentStatusChart = new Chart(paymentStatusCtx, {
        type: "doughnut",
        data: {
            labels: ["Paid", "Pending", "Failed"],
            datasets: [{
                label: "Payment Status",
                data: [85, 10, 5],
                backgroundColor: ["#2ecc71", "#f39c12", "#e74c3c"],
            }, ],
        },
    });

    // Leave Management Charts
    const leaveStatusCtx = document.getElementById("leaveStatusChart").getContext("2d");
    const leaveStatusChart = new Chart(leaveStatusCtx, {
        type: "bar",
        data: {
            labels: ["Approved", "Pending", "Rejected"],
            datasets: [{
                label: "Leave Status",
                data: [20, 12, 8],
                backgroundColor: ["#3498db", "#f39c12", "#e74c3c"],
            }, ],
        },
    });

    const leaveTypesCtx = document.getElementById("leaveTypesChart").getContext("2d");
    const leaveTypesChart = new Chart(leaveTypesCtx, {
        type: "pie",
        data: {
            labels: ["Sick Leave", "Vacation", "Maternity Leave", "Study Leave"],
            datasets: [{
                label: "Leave Types",
                data: [15, 20, 10, 5],
                backgroundColor: ["#1abc9c", "#e74c3c", "#f39c12", "#9b59b6"],
            }, ],
        },
    });

    // Performance Tracking Charts
    const performanceRatingsCtx = document
        .getElementById("performanceRatingsChart")
        .getContext("2d");
    const performanceRatingsChart = new Chart(performanceRatingsCtx, {
        type: "line",
        data: {
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [{
                label: "Performance Ratings",
                data: [4.0, 4.2, 4.1, 4.3, 4.2, 4.4],
                borderColor: "#2ecc71",
                backgroundColor: "rgba(46, 204, 113, 0.3)",
                fill: true,
            }, ],
        },
    });

    // Top Performers Trend (if needed)
    const topPerformersCtx = document.getElementById("topPerformersChart").getContext("2d");
    const topPerformersChart = new Chart(topPerformersCtx, {
        type: "bar",
        data: {
            labels: ["John Doe", "Jane Smith", "Alan Walker", "Eve Adams"],
            datasets: [{
                label: "Performance Score",
                data: [85, 90, 78, 88],
                backgroundColor: ["#3498db", "#e74c3c", "#2ecc71", "#f39c12"],
            }, ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
});