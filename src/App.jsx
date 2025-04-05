import { useState, useEffect } from "react";

const api_endpoint = "http://localhost:3000/posts"


export default function App() {
  const [todos, setTodos] = useState([]);

  // fetch call to the server
  function fetchTodos() {
    fetch(api_endpoint)
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(setTodos)
      .catch((error) => console.error("Error fetching todos:", error));
  }

  useEffect(fetchTodos, []);

  // delete functionality
  function handleDelete(postSlug) {
    fetch(`${api_endpoint}/${postSlug}`, { method: "DELETE", })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        setTodos((prevTodos) => prevTodos.filter((post) => post.slug !== postSlug));
      })
      .catch((error) => console.error("Error deleting post:", error));
  }

  return (
    <>
      {/* header */}
      <header>
        <div id="site_title" className="mx-5 d-flex flex-column justify-content-center">
          <h1 className="p-0 m-0">LeoLeo's cooking blog</h1>
          <p className="text-secondary-subtle fst-italic ps-5 m-0">- a window to my disatrous kitchen endeavors</p>
        </div>
        <div id="header_complexity_1"></div>
        <div id="header_complexity_2">

          {/* nav buttons */}
          <div className="d-flex justify-content-end align-items-center mt-2 me-5">
            <a href="" className="nav-link">Home</a>
            <a href="" className="mx-1 nav-link active ">My best successes</a>
            <a href="" className="nav-link">My worst disasters</a>
          </div>
        </div>

      </header >

      {/* main */}
      <main className="m-5">

        {/* cards presantation title */}
        <h2 className="my-5 d-flex justify-content-center align-items-center">
          A
          <div className="d-flex flex-column justify-content-center align-items-center">
            <i className="bi bi-arrow-down text_highlight"></i>
            <span className="fs-6 mx-2">short</span>
            <i className="bi bi-arrow-up text_highlight"></i>
          </div>
          list of my
          <span className="text_highlight mx-2">most successful</span>
          recipes :3
        </h2>

        {/* cards */}
        <div className="card-container">
          {/* .map() to generate as many cards as needed */}
          {todos.map((post, index) => (
            <div
              key={post.slug}
              className="card mb-5 text-light border-2"
              style={{ maxWidth: "100%", backgroundColor: "#27391C", borderColor: "#255F38" }}
            >
              <div className={`row g-0 ${index % 2 === 0 ? "" : "flex-row-reverse"}`}>
                <div className="col-3">
                  <img src={post.image} alt={post.title} className="img-fluid rounded-start" />
                </div>
                <div className="col-9">
                  <div className="card-body">
                    <div className={`d-flex justify-content-between align-items-center ${index % 2 === 0 ? "" : "flex-row-reverse"}`}>
                      <h4 className={`card-title text-white ${index % 2 === 0 ? "" : "text-end me-3"}`}>{post.title}</h4>
                      <button className="btn btn-danger" onClick={() => handleDelete(post.slug)}> Delete </button>
                    </div>
                    <p className={`card-text fs-5 ${index % 2 === 0 ? "" : "text-end"}`}>{post.content}</p>
                    <div className={`card-tags ${index % 2 === 0 ? "" : "text-end"}`}>

                      {/* .map() te gather all the tags from the tag key  */}
                      {post.tags.map((tag, index) => (
                        <span key={index} className="badge me-1">
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main >

      {/* footer */}
      <footer className="text-light py-3" style={{ backgroundColor: "#27391C" }}>
        <div className="container text-center">
          <p className="m-0">© {new Date().getFullYear()} LeoLeo's cooking blog&tm; All rights reserved.</p>
        </div>
      </footer>
    </>

  )
}