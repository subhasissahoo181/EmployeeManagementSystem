import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    number: "",
    designation: "",
    gender: "",
    course: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
      .then(result => {
        if (result.data.Status) {
          setCategories(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));

    axios.get(`http://localhost:3000/auth/employee/${id}`)
      .then(result => {
        if (result.data.Status) {
          const emp = result.data.Result[0];
          setEmployee({
            name: emp.name,
            email: emp.email,
            number: emp.number,
            designation: emp.designation,
            gender: emp.gender,
            course: emp.course,
            image: emp.image, // Assuming image is a URL or filename
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("number", employee.number);
    formData.append("designation", employee.designation);
    formData.append("gender", employee.gender);
    formData.append("course", employee.course);
    if (employee.image) formData.append("image", employee.image);

    axios.put(`http://localhost:3000/auth/edit_employee/${id}`, formData)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/employee');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
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
              value={employee.name}
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
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputNumber" className="form-label">
              Mobile No
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputNumber"
              placeholder="xxx-xxx-xxxx"
              value={employee.number}
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
              id="designation"
              className="form-select"
              value={employee.designation}
              onChange={(e) =>
                setEmployee({ ...employee, designation: e.target.value })
              }
            >
              <option value="">Select Designation</option>
              {categories.map((c) => (
                <option key={c.id} value={c.designation}>
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
                checked={employee.gender === 'Male'}
                onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
              />
              <label htmlFor="male" className="form-check-label me-3">
                Male
              </label>
              <input
                type="radio"
                name="gender"
                id="female"
                value="Female"
                checked={employee.gender === 'Female'}
                onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
              />
              <label htmlFor="female" className="form-check-label">
                Female
              </label>
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="course" className="form-label">
              Course
            </label>
            <div>
              <input
                type="checkbox"
                id="bca"
                value="BCA"
                checked={employee.course.includes('BCA')}
                onChange={(e) => {
                  const newCourse = e.target.checked
                    ? [...employee.course.split(','), e.target.value]
                    : employee.course.split(',').filter(c => c !== e.target.value);
                  setEmployee({ ...employee, course: newCourse.join(',') });
                }}
              />
              <label htmlFor="bca" className="form-check-label me-3">
                BCA
              </label>
              <input
                type="checkbox"
                id="mca"
                value="MCA"
                checked={employee.course.includes('MCA')}
                onChange={(e) => {
                  const newCourse = e.target.checked
                    ? [...employee.course.split(','), e.target.value]
                    : employee.course.split(',').filter(c => c !== e.target.value);
                  setEmployee({ ...employee, course: newCourse.join(',') });
                }}
              />
              <label htmlFor="mca" className="form-check-label me-3">
                MCA
              </label>
              <input
                type="checkbox"
                id="bsc"
                value="BSC"
                checked={employee.course.includes('BSC')}
                onChange={(e) => {
                  const newCourse = e.target.checked
                    ? [...employee.course.split(','), e.target.value]
                    : employee.course.split(',').filter(c => c !== e.target.value);
                  setEmployee({ ...employee, course: newCourse.join(',') });
                }}
              />
              <label htmlFor="bsc" className="form-check-label">
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
              onChange={(e) =>
                setEmployee({ ...employee, image: e.target.files[0] })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
