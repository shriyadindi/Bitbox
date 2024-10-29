const Blog = require('../Models/blog');
const { v4: uuidv4 } = require('uuid');

// Function to handle creating a new blog post
exports.postBlog = async (req, res) => {
    try {
        const { title, author, content, category } = req.body;
        console.log("Received blog data = ", req.body);

        // Check if all required fields are present
        if (!title || !author || !content || !category) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create a new Blog instance with the category
        const newBlog = new Blog({
            title,
            author,
            content,
            category,
            id: uuidv4(),
        });

        // Save the blog post to the database
        const result = await newBlog.save();
        console.log("Blog saved:", result);

        // Send a success response
        res.status(201).json({ message: "Blog post created successfully", blog: result });
    } catch (error) {
        console.error("Error creating blog post:", error);
        res.status(500).json({ message: "Error creating blog post", error });
    }
};



// Function to handle retrieving all blog posts
exports.getAllBlogs = async (req, res) => {
    try {
        // Retrieve all blog posts from the database
        const blogs = await Blog.find();

        // Send the list of blog posts
        res.status(200).json({ message: "All blog posts retrieved successfully", blogs });
    } catch (error) {
        console.error("Error retrieving all blog posts:", error);
        res.status(500).json({ message: "Error retrieving all blog posts", error });
    }
};
