import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as studentService from "../../service/StudentService";

function StudentListFunc() {
    const [students, setStudents] = useState([]);
    const [minPoint, setMinPoint] = useState("");
    const [maxPoint, setMaxPoint] = useState("");

    useEffect(() => {
        getAllStudents(minPoint, maxPoint);
    }, [minPoint, maxPoint]);

    const getAllStudents = async (minPoint, maxPoint) => {
        let res = await studentService.getAllStudents(minPoint, maxPoint);
        setStudents(res);
    };

    const handleDelete = async (id) => {
        let result = await studentService.deleteStudent(id);
        if (result) {
            setStudents(students.filter(student => student.id !== id));
        }
    };

    return (
        <div className="container mt-4">
            <h2>Danh sách học sinh</h2>
            <Link to="/create" className="btn btn-success mb-3">Thêm mới</Link>
            <div className="mb-3">
                <input
                    value={minPoint}
                    onChange={(e) => setMinPoint(e.target.value)}
                    className="form-control"
                    placeholder="Điểm tối thiểu"
                />
                <input
                    value={maxPoint}
                    onChange={(e) => setMaxPoint(e.target.value)}
                    className="form-control mt-2"
                    placeholder="Điểm tối đa"
                />
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Địa chỉ</th>
                    <th>Điểm</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {students.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>{item.point}</td>
                        <td>
                            <Link to={`/edit/${item.id}`} className="btn btn-warning btn-sm">Sửa</Link>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="btn btn-danger btn-sm ms-2"
                            >
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentListFunc;
