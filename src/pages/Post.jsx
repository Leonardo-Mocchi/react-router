import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Post() {
    const [post, setPost] = useState(null);
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState("recipe");
    const { slug } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${slug}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => setPost(data))
            .catch(err => console.error("Error fetching post:", err));

        fetch(`http://localhost:3000/posts`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error("Error fetching posts:", err));
    }, [slug]);

    if (!post) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    // Find the current post by slug
    const currentPost = posts.find((p) => p.slug === slug);

    // Determine the previous and next posts by id
    const previousPost = currentPost ? posts.find(p => p.id === currentPost.id - 1) : null;
    const nextPost = currentPost ? posts.find(p => p.id === currentPost.id + 1) : null;

    return (
        <main>

            {/* Post Header with Background Image */}
            <div
                style={{
                    minHeight: "50vh",
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}>
            </div>

            <div className="container d-flex justify-content-between mt-3">
                {/* Back Button */}
                <button
                    className="btn btn-custom back"
                    onClick={() => navigate(-1)}
                    type="button">
                    <i className="bi bi-arrow-return-right"></i> Go Bacc
                </button>

                {/* Navigation Buttons */}
                <div className="d-flex align-items-center">
                    {/* Previous Post Button */}
                    <button
                        className={`btn btn-custom me-2 d-flex align-items-center ${!previousPost && "d-none"}`}
                        type="button"
                        onClick={() => {
                            if (previousPost) {
                                navigate(`/posts/${previousPost.slug}`);
                            }
                        }}
                    >
                        <i className="bi bi-arrow-left"></i>
                        <span className="ms-2">Previous Episode</span>
                    </button>

                    {/* Next Post Button */}
                    <button
                        className={`btn btn-custom d-flex align-items-center ${!nextPost && "d-none"}`}
                        type="button"
                        onClick={() => {
                            if (nextPost) {
                                navigate(`/posts/${nextPost.slug}`);
                            }
                        }}
                        disabled={!nextPost}
                    >
                        <span className="me-2">Next Episode</span>
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
            </div>

            {/* Post Details Section */}
            <section id="post_details" className="mt-3">
                <div className="container">
                    <div className="row g-4">
                        {/* Post Image */}
                        <div className="col-12 col-md-5">
                            <img className="img-fluid" src={post.image} alt={post.title} />
                        </div>
                        {/* Post Content */}
                        <div className="col-12 col-md-7">
                            <h1>{post.title}</h1>
                            <p>{post.content}</p>
                            {/* Tags */}
                            <div className="tags mt-3">
                                {post.tags.map((tag, index) => (
                                    <span key={index} className="badge bg-success me-2">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs Section */}
            <section id="post_tabs" className="mt-5">
                <div className="container">
                    {/* Tabs Navigation */}
                    <ul className="nav nav-tabs border-4 text-light" style={{ borderColor: "#27391C" }}>
                        <li className="nav-item">
                            <button
                                className={`nav-link me-1 text-light ${activeTab === "recipe" ? "active" : ""}`}
                                onClick={() => setActiveTab("recipe")}
                            >
                                Recipe
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                style={{ minWidth: "120px" }}
                                className={`nav-link text-light ${activeTab === "ingredients" ? "active" : ""}`}
                                onClick={() => setActiveTab("ingredients")}
                            >
                                Ingredients
                            </button>
                        </li>
                    </ul>

                    {/* Tabs Content */}
                    <div className="tab-content mt-4">
                        {/* Recipe Tab */}
                        {activeTab === "recipe" && (
                            <div className="tab-pane fade show active mb-5">
                                <h3>How to do it</h3>
                                {post.recipe.split("\n").map((step, index) => (
                                    step.trim() && (
                                        <p key={index} className="ps-3">{step.trim()}</p>
                                    )
                                ))}
                            </div>
                        )}
                        {/* Ingredients Tab */}
                        {activeTab === "ingredients" && (
                            <div className="tab-pane fade show active" style={{ minHeight: "300px" }}>
                                <h3>What you need</h3>
                                <ul className="ps-3" style={{ listStyle: "none" }}>
                                    {post.ingredients.map((ingredient, index) => (
                                        <li key={index} style={{ lineHeight: "1.8" }}>{ingredient.trim()}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}