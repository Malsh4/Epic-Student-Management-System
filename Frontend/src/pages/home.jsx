import "chart.js/auto";
import { NavLink } from "react-router-dom";
import { react } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  StudentIcon,
  UserIcon,
  ChartLineIcon,
  FilesIcon,
  BellIcon,
  MagnifyingGlassIcon,
  CaretRightIcon,
  ExamIcon,
  ListChecksIcon,
} from "@phosphor-icons/react";
function Home() {
  return (
    <>
      <nav className="sidebar">
        <h6 className="p-2 mb-4">Epic - Student Management System </h6>
        <ul>
          <li>
            <NavLink to="/home">
              <ChartLineIcon size={28} className="pe-1" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/student">
              <StudentIcon size={28} className="pe-1" />
              Students
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-disabled">
              <FilesIcon size={28} className="pe-1" />
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-disabled">
              <ListChecksIcon size={28} className="pe-1" />
              Attendance
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-disabled">
              <ExamIcon size={28} className="pe-1" />
              Exam Results
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-disabled">
              <UserIcon size={28} className="pe-1" />
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className="main-content">
        <div className="header">
          <div className="d-flex align-items-center gap-2">
            <ChartLineIcon size={32} />
            <h1>Dashboard</h1>
          </div>

          <div className="header-right">
            <BellIcon size={28} className="header-svg" />
            <MagnifyingGlassIcon size={28} className="header-svg" />
          </div>
        </div>
        <div className="dash-content">
          <div>
            <div className="d-flex gap-2">
              <div className="top-card">
                <div className="d-flex justify-content-between w-100 align-items-center">
                  <h6 className="mb-0">Grade 01</h6>
                  <CaretRightIcon size={16} />
                </div>
                <div className="d-flex align-items-center justify-content-start gap-2 w-100">
                  <h1>35</h1>
                  <div className="d-flex flex-column">
                    <p className="mb-0">20 Girls</p>
                    <p className="mb-0">15 Boys</p>
                  </div>
                </div>
              </div>
              <div className="top-card">
                <div className="d-flex justify-content-between w-100 align-items-center">
                  <h6 className="mb-0">Grade 02</h6>
                  <CaretRightIcon size={16} />
                </div>
                <div className="d-flex align-items-center justify-content-start gap-2 w-100">
                  <h1>43</h1>
                  <div className="d-flex flex-column">
                    <p className="mb-0">20 Girls</p>
                    <p className="mb-0">15 Boys</p>
                  </div>
                </div>
              </div>
              <div className="top-card">
                <div className="d-flex justify-content-between w-100 align-items-center">
                  <h6 className="mb-0">Grade 03</h6>
                  <CaretRightIcon size={16} />
                </div>
                <div className="d-flex align-items-center justify-content-start gap-2 gap-3 w-100">
                  <h1>42</h1>
                  <div className="d-flex flex-column">
                    <p className="mb-0">20 Girls</p>
                    <p className="mb-0">15 Boys</p>
                  </div>
                </div>
              </div>
              <div className="top-card">
                <div className="d-flex justify-content-between w-100 align-items-center">
                  <h6 className="mb-0">Grade 04</h6>
                  <CaretRightIcon size={16} />
                </div>
                <div className="d-flex align-items-center justify-content-start gap-2 w-100">
                  <h1>39</h1>
                  <div className="d-flex flex-column">
                    <p className="mb-0">20 Girls</p>
                    <p className="mb-0">15 Boys</p>
                  </div>
                </div>
              </div>
              <div className="top-card">
                <div className="d-flex justify-content-between w-100 align-items-center">
                  <h6 className="mb-0">Grade 05</h6>
                  <CaretRightIcon size={16} />
                </div>
                <div className="d-flex align-items-center justify-content-start gap-2 w-100">
                  <h1>45</h1>
                  <div className="d-flex flex-column">
                    <p className="mb-0">20 Girls</p>
                    <p className="mb-0">15 Boys</p>
                  </div>
                </div>
              </div>
              <div className="top-card">
                <div className="d-flex justify-content-between w-100 align-items-center">
                  <h6 className="mb-0">Grade 06</h6>
                  <CaretRightIcon size={16} />
                </div>
                <div className="d-flex align-items-center justify-content-start gap-2 w-100">
                  <h1>45</h1>
                  <div className="d-flex flex-column">
                    <p className="mb-0">20 Girls</p>
                    <p className="mb-0">15 Boys</p>
                  </div>
                </div>
              </div>
              <div className="top-card">
                <div className="d-flex justify-content-between w-100 align-items-center">
                  <h6 className="mb-0">Grade 07</h6>
                  <CaretRightIcon size={16} />
                </div>
                <div className="d-flex align-items-center justify-content-start gap-2 w-100">
                  <h1>45</h1>
                  <div className="d-flex flex-column">
                    <p className="mb-0">20 Girls</p>
                    <p className="mb-0">15 Boys</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex gap-4">
            <div className="card">
              <div className="chart-header">
                <h5 className="chart-title">Attendance of Students</h5>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Week
                  </button>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        1st
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        2nd
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        3rd
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        4th
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="chart-box">
                <Bar
                  data={{
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
                    datasets: [
                      {
                        label: "student attendance",
                        data: [65, 45, 65, 54, 24],
                        backgroundColor: ["rgb(68, 128, 240)"],
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        text: "student attendance",
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="card">
              <div className="chart-header">
                <h5 className="chart-title">Results</h5>
                <div className="d-flex align-items-center justify-content-end gap-2 w-100">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Grade
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          Grade 01
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Grade 02
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Grade 03
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Subject
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          Maths
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          English
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Science
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="chart-box">
                <Doughnut
                  data={{
                    labels: [
                      "A: Distinction",
                      "B: Very Good Pass",
                      "C: Credit Pass",
                      "S: Ordinary Pass",
                      "F: Fail",
                    ],
                    datasets: [
                      {
                        label: "My First Dataset",
                        data: [5, 19, 10, 12, 17],
                        backgroundColor: [
                          "#1d4b5c",
                          "#1a6d84",
                          "#18a3bb",
                          "#35c5db",
                          "#adedf4",
                        ],
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "right",
                      },
                      title: {
                        text: "Student Results",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Home;
