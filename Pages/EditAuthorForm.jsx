import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditAuthorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    author: {
      name: "",
      birthDate: "",
      biography: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://6667100ba2f8516ff7a6251a.mockapi.io/api/booklist/${id}`);
      setInitialValues(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = Yup.object().shape({
    author: Yup.object().shape({
      name: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
        .required("Name is required"),
      birthDate: Yup.string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Birth Date must be in the format YYYY-MM-DD")
        .required("Birth Date is required"),
      biography: Yup.string().required("Biography is required"),
    }),
  });

  const handleSubmit = async (values) => {
    try {
      await axios.put(`https://6667100ba2f8516ff7a6251a.mockapi.io/api/booklist/${id}`, values);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Author</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Author Name</td>
                <td>
                  <Field
                    type="text"
                    className="form-control"
                    name="author.name"
                  />
                  <ErrorMessage name="author.name" component="div" className="text-danger" />
                </td>
              </tr>
              <tr>
                <td>D.O.B</td>
                <td>
                  <Field
                    type="text"
                    className="form-control"
                    name="author.birthDate"
                  />
                  <ErrorMessage name="author.birthDate" component="div" className="text-danger" />
                </td>
              </tr>
              <tr>
                <td>Biography</td>
                <td>
                  <Field
                    type="text"
                    className="form-control"
                    name="author.biography"
                  />
                  <ErrorMessage name="author.biography" component="div" className="text-danger" />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="btn btn-danger">
            Update Author
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditAuthorForm;
