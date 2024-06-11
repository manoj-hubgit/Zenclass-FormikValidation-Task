import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditBookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    title: "",
    isbn: "",
    publicationDate: "",
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
    title: Yup.string()
      .required("Title is required"),
      isbn: Yup.string()
      .matches(/^\d+$/, "ISBN must contain only numbers")
      .required("ISBN is required"),
    publicationDate: Yup.string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Publication Date must be in the format YYYY-MM-DD")
      .required("Publication Date is required"),
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
      <h2>Edit Book</h2>
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
                <td>Title</td>
                <td>
                  <Field
                    type="text"
                    className="form-control"
                    name="title"
                  />
                  <ErrorMessage name="title" component="div" className="text-danger" />
                </td>
              </tr>
              <tr>
                <td>ISBN</td>
                <td>
                  <Field
                    type="text"
                    className="form-control"
                    name="isbn"
                  />
                  <ErrorMessage name="isbn" component="div" className="text-danger" />
                </td>
              </tr>
              <tr>
                <td>Publication Date</td>
                <td>
                  <Field
                    type="text"
                    className="form-control"
                    name="publicationDate"
                  />
                  <ErrorMessage name="publicationDate" component="div" className="text-danger" />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="btn btn-danger">
            Update Book
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditBookForm;
