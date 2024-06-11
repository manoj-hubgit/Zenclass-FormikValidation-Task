import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditAuthor = () => {
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
    navigate(`/editauthorform/${id}`);
  };

  return (
    <div>
      <h2 className='text-center'>Library Author List</h2>
      <div className="row row-cols-1 row-cols-md-2 mx-2 my-2 g-4">
        {books.map((element) => {
          return (
            <div key={element.id} className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Author Name: {element.author.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    <b>D.O.B:</b> {element.author.birthDate}
                  </h6>
                  <p className="card-text">
                    <b>Biography:</b> {element.author.biography}
                  </p>
                  <button
                    onClick={() => handleEdit(element.id)}
                    className="btn btn-primary mx-2"
                  >
                    Edit Author
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

export default EditAuthor;
