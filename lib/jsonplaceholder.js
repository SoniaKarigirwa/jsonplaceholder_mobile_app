// export const jsonPlaceholderConfig = {
//   endpoint: "https://jsonplaceholder.typicode.com",
// };

/**
 * Creates a new user.
 * @param {Object} userData - The user data to create a new user.
 * @param {string} userData.username - The name of the user.
 * @param {string} userData.email - The email of the user.
 * @param {number} [userData.age] - The age of the user (optional).
 * @returns {Promise<Object>} Promise object represents the created user.
 */
export const createUser = async (userData) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    throw new Error("Error creating user");
  }
  return response.json();
};

// GET /users
export const getAllUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Error fetching users");
  }
  return response.json();
};

// GET /users/1
export const getUserById = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching user with id ${id}`);
  }
  return response.json();
};

/**
 * Signs out the current user.
 * @returns {Promise<void>} Promise object representing the sign-out process.
 */
export const signOut = async () => {
  // You can perform any necessary tasks for signing out here
  // For example, clearing user data, tokens, etc.
  return Promise.resolve(); // Placeholder for actual sign-out logic
};

// GET /users/1/posts
export const getPostsByUserId = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  );
  if (!response.ok) {
    throw new Error(`Error fetching posts for user with id ${userId}`);
  }
  return response.json();
};

/**
 * Creates a new post.
 * @param {Object} postData - The post data to create a new post.
 * @param {number} postData.userId - The ID of the user creating the post.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.body - The body content of the post.
 * @returns {Promise<Object>} Promise object represents the created post.
 */
export const createPost = async (postData) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    throw new Error("Error creating post");
  }
  return response.json();
};

// GET /posts
export const getAllPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Error fetching posts");
  }
  return response.json();
};

// GET /posts/1
export const getPostById = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching post with id ${id}`);
  }
  return response.json();
};

// GET /posts/1/comments
export const getCommentsByPostId = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  if (!response.ok) {
    throw new Error(`Error fetching comments for post with id ${id}`);
  }
  return response.json();
};

// DELETE /posts/1
export const deletePostById = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error(`Error deleting post with id ${id}`);
  }
  return true; // Returns true if the response succeeded
};
