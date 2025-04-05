import { useState, useEffect } from "react";

const api_endpoint = "http://localhost:3000/posts";

export default function HomePage() {
    const [posts, setPosts] = useState([]);

    // Fetch posts from the server
    function fetchPosts() {
        fetch(api_endpoint)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                const randomPosts = data.sort(() => 0.5 - Math.random()).slice(0, 3);
                setPosts(randomPosts);
            })
            .catch(error => console.error("Error fetching posts:", error));
    }

    useEffect(fetchPosts, []);

    return (
        <main className="m-5">
            {/* Hero Section */}
            <section
                className="text-center py-5"
                style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white",
                    borderRadius: "10px",
                }}
            >
                <h1 className="display-4">Welcome to my Cooking Blog, <span className="text-success">Dear Hungry Reader</span>!</h1>
                <p className="fs-5 mt-3 mb-0">
                    A place where my <span className="text-success">kitchen disasters</span> turn into delicious recipes<span className="text-success">*</span>
                </p>
                <p className="fs-6 text-secondary fst-italic m-0"><span className="text-success">*</span>sometimes</p>
            </section>

            {/* About Section */}
            <section className="my-5">
                <h2 className="text-success text-center">About This Blog</h2>
                <p className="fs-5 text-center">
                    Here, you'll find a short and sweet collection of my <span className="text-success">most successful recipes</span>,
                    tips for cooking, and a sprinkle of humor from my kitchen experiments.
                </p>
            </section>

            {/* Featured Recipes Section */}
            <section className="my-5">
                <h3 className="text-success text-center">Featured Recipes</h3>
                <div className="d-flex justify-content-center gap-4 flex-wrap mt-4">
                    {posts.slice(0, 3).map((post) => (
                        <div key={post.slug} className="card text-light" style={{ width: "18rem", backgroundColor: "#27391C", borderColor: "#255F38" }}>
                            <img src={post.image} className="card-img-top" alt={post.title} />
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.content.substring(0, 90)} ...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="my-5 text-center">
                <h3 className="text-success">Explore More!</h3>
                <p className="fs-5">
                    Use the navigation above to check out my <span className="text-success">latest recipes</span> or learn more <span className="text-success">about me</span>.
                </p>
            </section>

            {/* Stick Around Section */}
            <section className="my-5 text-center">
                <h3 className="text-success">Stick Around!</h3>
                <p className="fs-5">
                    This blog is constantly evolving, with new recipes and stories being added regularly, this is just the beginning ;)
                    <br /> Stick around to see more updates in the future, and don’t forget to share your favorite recipes with your friends!
                </p>
            </section>
        </main>
    );
}