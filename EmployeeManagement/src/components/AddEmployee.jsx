import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    number: "",
    designation: "", // Changed to match the database field
    gender: "",
    course: [], // Store multiple courses as an array
    image: null,
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        course: [...prevEmployee.course, value],
      }));
    } else {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        course: prevEmployee.course.filter((course) => course !== value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("number", employee.number);
    formData.append("designation", employee.designation); // Append the designation
    formData.append("gender", employee.gender);
    formData.append("image", employee.image);
    formData.append("course", employee.course.join(',')); // Convert the array to a comma-separated string

    axios
      .post("http://localhost:3000/auth/add_employee", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Create Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputNumber" className="form-label">
              Number
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputNumber"
              placeholder="xxx-xxx-xxxx"
              onChange={(e) =>
                setEmployee({ ...employee, number: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="designation" className="form-label">
              Designation
            </label>
            <select
              name="designation"
              id="designation"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, designation: e.target.value })
              }
            >
              <option value="">Select Designation</option>
              {category.map((c) => (
                <option key={c.id} value={c.name}> {/* Use c.name if you want to store the name */}
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <div>
              <input
                type="radio"
                name="gender"
                id="male"
                value="Male"
                onChange={(e) =>
                  setEmployee({ ...employee, gender: e.target.value })
                }
              />
              <label htmlFor="male" className="form-check-label me-3">
                Male
              </label>
              <input
                type="radio"
                name="gender"
                id="female"
                value="Female"
                onChange={(e) =>
                  setEmployee({ ...employee, gender: e.target.value })
                }
              />
              <label htmlFor="female" className="form-check-label">
                Female
              </label>
            </div>
          </div>
          <div className="col-12">
            <label className="form-label">Course</label>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="BCA"
                value="BCA"
                onChange={handleCourseChange}
              />
              <label className="form-check-label" htmlFor="BCA">
                BCA
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="MCA"
                value="MCA"
                onChange={handleCourseChange}
              />
              <label className="form-check-label" htmlFor="MCA">
                MCA
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="BSC"
                value="BSC"
                onChange={handleCourseChange}
              />
              <label className="form-check-label" htmlFor="BSC">
                BSC
              </label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) =>
                setEmployee({ ...employee, image: e.target.files[0] })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
