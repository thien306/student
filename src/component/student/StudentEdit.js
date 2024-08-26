import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as studentService from "../../service/StudentService";

function StudentEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({ name: "", address: "", point: "" });

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                let res = await studentService.findStudentById(id);
                console.log("Fetched student:", res); // Debugging line
                setStudent(res || { name: "", address: "", point: "" });
            } catch (error) {
                console.error("Error fetching student:", error);
            }
        };
        fetchStudent();
    }, [id]);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let result = await studentService.updateStudent(id, student);
            console.log("Update result:", result); // Debugging line
            if (result) {
                navigate("/student");
            } else {
                console.error("Update failed.");
            }
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Chỉnh sửa học sinh</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Tên:</label>
                    <input
                        type="text"
                        name="name"
                        value={student.name || ""}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Địa chỉ:</label>
                    <input
                        type="text"
                        name="address"
                        value={student.address || ""}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="point">Điểm:</label>
                    <input
                        type="number"
                        name="point"
                        value={student.point || ""}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Lưu</button>
            </form>
        </div>
    );
}

export default StudentEdit;
