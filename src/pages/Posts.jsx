import { useState, useEffect } from "react";
const api_endpoint = "http://localhost:3000/posts"

export default function Posts() {
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


    return (

        <main className="m-5">

            {/* cards presantation title */}
            <h2 className="my-5 d-flex justify-content-center align-items-center">
                As
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
    )
}