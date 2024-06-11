import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Create = () => {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    isbn: "",
    publicationDate: "",
    author: {
      name: "",
      birthDate: "",
      biography: "",
    },
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    isbn: Yup.string()
      .matches(/^\d+$/, "ISBN must contain only numbers")
      .required("ISBN is required"),
    publicationDate: Yup.string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Publication Date must be in the format YYYY-MM-DD")
      .required("Publication Date is required"),
    author: Yup.object().shape({
      name: Yup.string().required("Author Name is required"),
      birthDate: Yup.string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Birth Date must be in the format YYYY-MM-DD")
        .required("Birth Date is required"),
      biography: Yup.string().required("Biography is required"),
    }),
  });

  const handleSubmit = async (values) => {
    await axios
      .post("https://6667100ba2f8516ff7a6251a.mockapi.io/api/booklist", values)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mt-4">
      <h2>Create Book</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="m-2">
          <div className="form-group mb-3">
            <label htmlFor="title">Book Name:</label>
            <Field
              type="text"
              className="form-control"
              id="title"
              name="title"
            />
            <ErrorMessage name="title" component="div" className="text-danger" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="isbn">ISBN:</label>
            <Field
              type="text"
              className="form-control"
              id="isbn"
              name="isbn"
            />
            <ErrorMessage name="isbn" component="div" className="text-danger" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="publicationDate">Publication Date:</label>
            <Field
              type="text"
              className="form-control"
              id="publicationDate"
              name="publicationDate"
            />
            <ErrorMessage name="publicationDate" component="div" className="text-danger" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="author.name">Author Name:</label>
            <Field
              type="text"
              className="form-control"
              id="author.name"
              name="author.name"
            />
            <ErrorMessage name="author.name" component="div" className="text-danger" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="author.birthDate">Birth Date:</label>
            <Field
              type="text"
              className="form-control"
              id="author.birthDate"
              name="author.birthDate"
            />
            <ErrorMessage name="author.birthDate" component="div" className="text-danger" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="author.biography">Biography:</label>
            <Field
              type="text"
              className="form-control"
              id="author.biography"
              name="author.biography"
            />
            <ErrorMessage name="author.biography" component="div" className="text-danger" />
          </div>
          <button type="submit" className="btn btn-danger">
            Create
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Create;
