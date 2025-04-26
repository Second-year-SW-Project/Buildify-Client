import { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import {
  Send as SendIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { toast } from "sonner";
import CustomBreadcrumbs from "../AtomicComponents/Breadcrumb";
import { PageTitle } from "../AtomicComponents/Typographics/TextStyles";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [response, setResponse] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:8000/api/comment/admin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(data);
    } catch (error) {
      toast.error("Failed to fetch comments.");
      console.error(error);
    }
  };

  const handleResponseChange = (commentId, value) => {
    setResponse({
      ...response,
      [commentId]: value,
    });
  };

  const handleDialogOpen = (commentId) => {
    setCurrentCommentId(commentId);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentCommentId(null);
    setResponse({});
  };

  const handleResponseSubmit = async (commentId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8000/api/comment/admin/respond/${commentId}`,
        { adminResponse: response[commentId] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Response submitted successfully!");
      fetchComments();
      handleDialogClose();
    } catch (error) {
      toast.error("Failed to submit response.");
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8000/api/comment/admin/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Comment deleted successfully!");
      fetchComments();
    } catch (error) {
      toast.error("Failed to delete comment.");
      console.error(error);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mt-3 mb-5">
          <PageTitle value="Comment Management" />
          <CustomBreadcrumbs
            paths={[
              { label: "Feedback Manage", href: "/feedbackmanage/comment&reviews" },
              { label: "Comments" },
            ]}
          />
        </div>

        {/* Comments List */}
        <div className="space-y-8">
          {comments.map((comment) => {
            const productImage =
              comment.productId?.imgUrls?.[0]?.url || "https://via.placeholder.com/60";

            return (
              <div
                key={comment._id}
                className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 space-y-5 border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-6">
                    <Avatar
                      alt={comment.userId?.name}
                      src={comment.userId?.profilePicture}
                      className="w-24 h-24 mt-4"
                    />
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-gray-900">
                        {comment.userId?.name || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-500">{comment.userId?.email}</p>
                      <p className="text-sm text-gray-600">{comment.comment}</p>

                      <Box display="flex" alignItems="center" gap={2}>
                        <img
                          src={productImage}
                          alt={comment.productId?.name || "Product"}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <Box>
                          <Typography fontWeight="bold">{comment.productId?.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {comment.productId?.type}
                          </Typography>
                        </Box>
                      </Box>

                      {comment.adminResponse && (
                        <p className="text-sm mt-2 text-purple-700 bg-purple-50 border border-purple-200 p-3 rounded-xl">
                          <strong>Admin Response:</strong> {comment.adminResponse}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-4 items-center">
  <Button
    variant="outlined"
    color="primary"
    onClick={() => handleDialogOpen(comment._id)}
    startIcon={<SendIcon />}
    className="hover:bg-purple-200 transition duration-300"
  >
    Respond
  </Button>
  <Button
    variant="outlined"
    color="error"
    onClick={() => handleDeleteComment(comment._id)}
    startIcon={<DeleteIcon />}
    className="hover:bg-red-200 transition duration-300"
  >
    Delete
  </Button>
</div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Dialog for Admin Response */}
        <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
          <DialogTitle>Respond to Comment</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Admin Response"
              type="text"
              fullWidth
              multiline
              minRows={3}
              value={response[currentCommentId] || ""}
              onChange={(e) => handleResponseChange(currentCommentId, e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button
              onClick={() => handleResponseSubmit(currentCommentId)}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Comment;
