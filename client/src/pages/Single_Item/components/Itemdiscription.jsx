import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductTabs() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("specification");
  // Comments state
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const [posting, setPosting] = useState(false);
    const [users, setUsers] = useState([]);


  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/product/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/review/${id}`);
        setReviews(response.data);
      } catch (err) {
        console.error('Failed to load reviews:', err);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/comment/${id}`);
        setComments(response.data);
      } catch (err) {
        console.error("Failed to load comments");
      }
    };

    fetchProduct();
    fetchReviews();
    fetchComments();
  }, [id]);


    useEffect(() => {
      const token  = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) {
        setLoading(false);
        return;
      }
  
      const fetchUsers = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/v1/users", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);

    const userId = localStorage.getItem("userId");
    const currentUserArray = users.filter((u) => u._id === userId);
    const currentUser = currentUserArray.length > 0 ? currentUserArray[0] : null;



  // Fetch comments


  if (loading) return <p></p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-md border-2 border-gray-200">
      {/* Tab Headers (Centered) */}
      <div className="flex justify-center border-b-2 border-gray-300">
        <button
          className={`py-3 px-8 text-lg font-medium ${
            activeTab === "specification"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("specification")}
        >
          Specification
        </button>

        <button
          className={`py-3 px-8 text-lg font-medium ${
            activeTab === "review"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("review")}
        >
          Review
        </button>

        <button
          className={`py-3 px-8 text-lg font-medium ${
            activeTab === "comments"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("comments")}
        >
          Comments
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-8 ">
        {activeTab === "specification" ? (
          <div>
            <p className="text-justify text-gray-800 mb-8">
              The TEAM T-FORCE DELTAα RGB 32GB (2x16GB)  DDR5 5600MHz RAM is a high-performance memory kit designed for gamers and power users seeking speed, stability, and visual appeal. With a sleek black design and vibrant RGB lighting, it enhances any build while delivering exceptional performance through its 5600MHz speed and low 1.2V operating voltage. Featuring a 288-pin DIMM form factor, CAS latency of 38, and a first word latency of 13.571ns, this non-ECC, unbuffered memory ensures smooth multitasking and fast data access. Backed by a 4-year warranty and equipped with a reliable heat spreader for optimal thermal performance, this kit is in stock and ready to power your next-gen system.
            </p>

            {/*<h3 className="text-xl font-semibold mb-4">{product.description}</h3>*/}
      

            <p className="mt-6 text-sm text-gray-700">
              <span className="font-bold">Category:</span> {product.type}
            </p>
          </div>
        ) : activeTab === "review" ? (
          <div className='text-gray-800'>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="mb-6 p-4 border-b border-gray-200">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, index) => (
                        <span key={index}>
                          {index < review.rating ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">{review.rating}/5</span>
                  </div>
                  <p className="mb-2">{review.comment}</p>
                  <p className="text-sm text-gray-500">
                    By {review?.userId?.name || 'Anonymous'} on {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  {review.adminResponse && (
                    <div className="mt-2 p-2 bg-gray-50 rounded">
                      <p className="text-sm font-semibold text-gray-700">Admin Response:</p>
                      <p className="text-sm text-gray-600">{review.adminResponse}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No reviews available for this product.</p>
            )}
          </div>
        ) : (
          // Comments Tab Content
          <div className="text-gray-800">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>
            {commentsLoading ? (
              <p>Loading comments...</p>
            ) : commentError ? (
              <p className="text-red-500">{commentError}</p>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="mb-6 p-4 border-b border-gray-200">
                  <p className="mb-2">{comment.comment}</p>
                  <p className="text-sm text-gray-500">
                    By {comment?.userId?.name || 'User'} on {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                  {comment.adminResponse && (
                    <div className="mt-2 p-2 bg-gray-50 rounded">
                      <p className="text-sm font-semibold text-gray-700">Admin Response:</p>
                      <p className="text-sm text-gray-600">{comment.adminResponse}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No comments yet. Be the first to comment!</p>
            )}
            {/* Comment Form */}
            <form
              className="mt-6 flex flex-col gap-2"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!commentInput.trim()) return;
                setPosting(true);
                setCommentError(null);
                try {
                  // Send token if available for authenticated comment posting
                  const token = localStorage.getItem("token");
                  const config = token
                    ? { headers: { Authorization: `Bearer ${token}` } }
                    : {};
                  const res = await axios.post(
                    `${backendUrl}/api/comment/${id}/safe`,
                    { comment: commentInput },
                    config
                  );

                  // Patch the returned comment with your name if you are logged in
                  let newComment = res.data;
                  if (currentUser) {
                    newComment = {
                      ...newComment,
                      userId: {
                        _id: currentUser._id,
                        name: currentUser.name,
                      },
                    };
                  }
                  setComments([newComment, ...comments]);
                  setCommentInput("");
                } catch (err) {
                  setCommentError(err.response?.data?.message || "Failed to post comment");
                  console.error('Failed to post comment:', err);
                } finally {
                  setPosting(false);
                }
              }}
            >
              <textarea
                className="border rounded p-2 w-full"
                rows={3}
                placeholder="Write a comment..."
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                disabled={posting}
              />
              <button
                type="submit"
                className="self-end bg-black text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={posting || !commentInput.trim()}
              >
                {posting ? "Posting..." : "Post Comment"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
