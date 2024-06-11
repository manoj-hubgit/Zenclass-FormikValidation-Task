import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('https://6667100ba2f8516ff7a6251a.mockapi.io/api/booklist');
      setBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editbookform/${id}`);
  };

  return (
    <div>
      <h2 className='text-center'>Library Book List</h2>
      <div className="row row-cols-1 row-cols-md-2 mx-2 my-2 g-4">
        {books.map((element) => {
          return (
            <div key={element.id} className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Book Name: {element.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    <b>ISBN number:</b> {element.isbn}
                  </h6>
                  <p className="card-text">
                    <b>Publication Date:</b> {element.publicationDate}
                  </p>
                  <button
                    onClick={() => handleEdit(element.id)}
                    className="btn btn-primary mx-2"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Edit;
