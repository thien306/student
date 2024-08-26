import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as studentService from "../../service/StudentService";

function StudentCreate() {
    const [form, setForm] = useState({
        name: "",
        address: "",
        point: 0
    });
    const navigate = useNavigate();

    const objectValid = {
        name: Yup.string().required("Tên không được để trống")
            .min(3, "Tên không được ngắn hơn 3 ký tự")
    };

    const saveStudent = async (value) => {
        value.point = +value.point;
        let isSuccess = await studentService.saveStudent(value);
        if (isSuccess) {
            toast.success("Thêm mới thành công");
            navigate("/student");
        } else {
            toast.error("Thêm mới thất bại.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Thêm mới học sinh</h2>
            <Formik
                initialValues={form}
                onSubmit={saveStudent}
                validationSchema={Yup.object(objectValid)}
            >
                <Form>
                    <div className="form-group">
                        <label htmlFor="name">Tên:</label>
                        <Field name="name" className="form-control" />
                        <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Địa chỉ:</label>
                        <Field name="address" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="point">Điểm:</label>
                        <Field name="point" type="number" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Thêm mới</button>
                </Form>
            </Formik>
        </div>
    );
}

export default StudentCreate;
