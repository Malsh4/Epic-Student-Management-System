import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudent,
} from "../api/studentService";
import {
  StudentIcon,
  UserIcon,
  ChartLineIcon,
  FilesIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  BellIcon,
  MagnifyingGlassIcon,
  XIcon,
  WarningIcon,
  ExamIcon,
  ListChecksIcon,
} from "@phosphor-icons/react";
function Student() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchId, setSearchId] = useState("");

  const loadStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      setError("Could not load students. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });

  // add student
  const emptyForm = {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    enrollmentDate: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  // One function handles ALL inputs, using the input's "name"
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); // clear that field's error while typing
  };

  // Basic validation
  const validateForm = () => {
    const errors = {};
    const today = new Date().toISOString().slice(0, 10);

    if (!form.firstName.trim()) errors.firstName = "First name is required";
    if (!form.lastName.trim()) errors.lastName = "Last name is required";

    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Enter a valid email";

    if (!form.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    else if (form.dateOfBirth >= today)
      errors.dateOfBirth = "Date of birth must be in the past";

    if (!form.enrollmentDate)
      errors.enrollmentDate = "Enrollment date is required";
    else if (form.dateOfBirth && form.enrollmentDate < form.dateOfBirth)
      errors.enrollmentDate = "Enrollment date cannot be before date of birth";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const openAddModal = () => {
    setForm(emptyForm);
    setFormErrors({});
    setSaveError("");
    setShowModal(true);
  };

  const handleAdd = async () => {
    if (!validateForm()) return;

    setSaving(true);
    setSaveError("");
    try {
      await createStudent(form);
      setShowModal(false);
      loadStudents(); // refresh the table
    } catch (err) {
      const data = err.response?.data;
      if (data?.fieldErrors) setFormErrors(data.fieldErrors); // 400 from backend validation
      setSaveError(
        data?.message || "Could not save student. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  // EDIT STUDENT
  const [editingId, setEditingId] = useState(null);

  const openEditModal = (student) => {
    setEditingId(student.id);
    setForm({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      dateOfBirth: student.dateOfBirth,
      enrollmentDate: student.enrollmentDate,
    });
    setFormErrors({});
    setSaveError("");
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    setSaving(true);
    setSaveError("");
    try {
      await updateStudent(editingId, form);
      setShowEditModal(false);
      loadStudents();
    } catch (err) {
      const data = err.response?.data;
      if (data?.fieldErrors) setFormErrors(data.fieldErrors);
      setSaveError(
        data?.message || "Could not update student. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };
  //delete student
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const openDeleteModal = (student) => {
    setDeletingStudent(student);
    setDeleteError("");
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError("");
    try {
      await deleteStudent(deletingStudent.id);
      setShowDeleteModal(false);
      loadStudents();
    } catch (err) {
      if (err.response?.status === 404) {
        setShowDeleteModal(false);
        loadStudents();
      } else {
        setDeleteError(
          err.response?.data?.message ||
            "Could not delete student. Please try again.",
        );
      }
    } finally {
      setDeleting(false);
    }
  };
  // search student using id
  const handleSearch = async () => {
    const id = searchId.trim();

    // empty search is showing all students again
    if (!id) {
      loadStudents();
      return;
    }
    if (!/^\d+$/.test(id)) {
      setStudents([]);
      setError("Student ID must be a number");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await getStudent(id); // GET /api/students/{id}
      setStudents([data]);
    } catch (err) {
      setStudents([]);
      if (err.response?.status === 404) {
        setError(`No student found with ID ${id}`);
      } else {
        setError("Could not search. Is the backend running?");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchId("");
    loadStudents();
  };
  return (
    <>
      <div className="student">
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
              <StudentIcon size={32} />
              <h1>Students</h1>
            </div>
            <div className="header-right">
              <BellIcon size={28} className="header-svg" />
              <MagnifyingGlassIcon size={28} className="header-svg" />
            </div>
          </div>
          <div>
            <div className="stu-content">
              <div className="table-header">
                <div className="d-flex align-items-center justify-content-start gap-3">
                  <h2>Student Details</h2>
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <input
                      type="text"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder="Search by Student ID"
                      className="search-input"
                    />
                    <button className="add-btn" onClick={handleSearch}>
                      <MagnifyingGlassIcon size={28} className="pe-2" />
                      Search
                    </button>
                    {searchId && (
                      <button className="close-btn" onClick={clearSearch}>
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <button className="add-btn" onClick={openAddModal}>
                  <PlusIcon size={28} className="pe-2" />
                  Add Student
                </button>
              </div>

              <div className="table-wrapper">
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Date of Birth</th>
                      <th>Enrollment Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading && (
                      <tr>
                        <td colSpan="7" className="text-center">
                          Loading...
                        </td>
                      </tr>
                    )}

                    {!loading && error && (
                      <tr>
                        <td colSpan="7" className="text-center text-danger">
                          {error}
                        </td>
                      </tr>
                    )}

                    {!loading && !error && students.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No students found. Click "Add Student" to create one.
                        </td>
                      </tr>
                    )}

                    {!loading &&
                      !error &&
                      students.map((s) => (
                        <tr key={s.id}>
                          <td>{s.id}</td>
                          <td>{s.firstName}</td>
                          <td>{s.lastName}</td>
                          <td>{s.email}</td>
                          <td>{formatDate(s.dateOfBirth)}</td>
                          <td>{formatDate(s.enrollmentDate)}</td>
                          <td className="actions">
                            <button
                              tooltip="Edit"
                              className="action-btn"
                              onClick={() => openEditModal(s)}
                            >
                              <PencilIcon size={24} />
                            </button>
                            <button
                              tooltip="Delete"
                              className="action-btn"
                              onClick={() => openDeleteModal(s)}
                            >
                              <TrashIcon size={24} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="student-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add Student</h2>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              >
                <XIcon size={24} />
              </button>
            </div>

            <div className="modal-body">
              {saveError && (
                <div className="alert alert-danger py-2">{saveError}</div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                  {formErrors.firstName && (
                    <small className="text-danger">
                      {formErrors.firstName}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                  {formErrors.lastName && (
                    <small className="text-danger">{formErrors.lastName}</small>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
                {formErrors.email && (
                  <small className="text-danger">{formErrors.email}</small>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                  />
                  {formErrors.dateOfBirth && (
                    <small className="text-danger">
                      {formErrors.dateOfBirth}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Enrollment Date</label>
                  <input
                    type="date"
                    name="enrollmentDate"
                    value={form.enrollmentDate}
                    onChange={handleChange}
                  />
                  {formErrors.enrollmentDate && (
                    <small className="text-danger">
                      {formErrors.enrollmentDate}
                    </small>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="add-btn"
                onClick={handleAdd}
                disabled={saving}
              >
                {saving ? "Saving..." : "Add Student"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="student-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Edit Student Details</h2>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowEditModal(false)}
              >
                <XIcon size={24} />
              </button>
            </div>

            <div className="modal-body">
              {saveError && (
                <div className="alert alert-danger py-2">{saveError}</div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                  {formErrors.firstName && (
                    <small className="text-danger">
                      {formErrors.firstName}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                  {formErrors.lastName && (
                    <small className="text-danger">{formErrors.lastName}</small>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
                {formErrors.email && (
                  <small className="text-danger">{formErrors.email}</small>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                  />
                  {formErrors.dateOfBirth && (
                    <small className="text-danger">
                      {formErrors.dateOfBirth}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Enrollment Date</label>
                  <input
                    type="date"
                    name="enrollmentDate"
                    value={form.enrollmentDate}
                    onChange={handleChange}
                  />
                  {formErrors.enrollmentDate && (
                    <small className="text-danger">
                      {formErrors.enrollmentDate}
                    </small>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="add-btn"
                onClick={handleUpdate}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Details"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="student-modal del-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header border-bottom-0">
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowDeleteModal(false)}
              >
                <XIcon size={24} />
              </button>
            </div>

            <div className="modal-body-delete">
              <div className="d-flex align-items-center justify-content-center flex-column gap-2">
                <WarningIcon size={38} className="delete-icon" />
                <h2 className="modal-title">Delete Student Details</h2>
                <p>
                  Are you sure you want to delete{" "}
                  <strong>
                    {deletingStudent?.firstName} {deletingStudent?.lastName}
                  </strong>
                  ?
                </p>
                {deleteError && (
                  <div className="alert alert-danger py-2">{deleteError}</div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="del-btn"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Student;
