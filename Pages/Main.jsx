import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const [books,setBooks]=useState([])
    const[deleteData,setDeleteData]=useState([])
    useEffect((()=>{
        fetchData()
    }),[deleteData])
const fetchData=async()=>{
    await axios.get('https://6667100ba2f8516ff7a6251a.mockapi.io/api/booklist')
    .then(res=>setBooks(res.data))
    .catch((error)=>console.log(error))
}
const handleDelete=async(id)=>{
  await axios.delete(`https://6667100ba2f8516ff7a6251a.mockapi.io/api/booklist/${id}`)
  .then(res=>setDeleteData(res.data))
  .catch((error)=>console.log(error));
  }
  

    return (
               <div>
                <h2 className='text-center'>Library Book List</h2>
      <div className="row row-cols-1 row-cols-md-2 mx-2 my-2 g-4">
        {books.map((element, index) => {
          return (
            <div key={element.id}>
              <div className="card col">
                <div className="card-body">
                  <h5 className="card-title">Book Name : {element.title}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                   <b>ISBN number </b>: {element.isbn}
                  </h6>
                   <p className="card-text">
                  <b>Publication Date :</b> {element.publicationDate} <br/>
                  </p>
                  <h4>Author Details</h4>
                  <p className="card-text"><b>Author :</b>{element.author.name}</p>
                  <p className="card-text"><b>D.O.B :</b>{element.author.birthDate}</p>
                  <p className="card-text"><b>Biography :</b>{element.author.biography}</p>
                  <button
                    onClick={() => {
                      handleDelete(element.id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
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

export default Main;