import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Box, Typography, IconButton } from "@mui/material";
import { Reply as ReplyIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { toast } from "sonner";
import CustomBreadcrumbs from "../AtomicComponents/Breadcrumb";
import { PageTitle } from "../AtomicComponents/Typographics/TextStyles";


const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Comment = () => {

  //states
  const [comments, setComments] = useState([]);
  const [response, setResponse] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  // State for search filters
  const [productNameFilter, setProductNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  //fetch the comments
  const fetchComments = async () => {

    try {

      const token = localStorage.getItem("token");

      const { data } = await axios.get(`${backendUrl}/api/comment/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  //submit the admin response
  const handleResponseSubmit = async (commentId) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `${backendUrl}/api/comment/admin/${commentId}/response`,
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


  //delete comment from admin side
  const handleDeleteComment = async (commentId) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `${backendUrl}/api/comment/admin/admin/${commentId}`,
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

  // Filter function for comments based on name and category of products
  const filteredComments = comments.filter((comment) => {

    const productName = comment.productId?.name || ''; 
    const productCategory = comment.productId?.type || ''; 
  
    const productNameMatch = productName.toLowerCase().includes(productNameFilter.toLowerCase());
    const categoryMatch = productCategory.toLowerCase().includes(categoryFilter.toLowerCase());
  
    return productNameMatch && categoryMatch;

  });
  

  return (

    <div className="p-8 bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen">

      <div className="max-w-7xl mx-auto">

        <div className="mt-3 mb-5">

          <PageTitle value="Comment Management" />
          <CustomBreadcrumbs
            paths={[
              { label: "Comments & Reviews", href: "/commentreview/comment" },
              { label: "Comments" },
            ]}
          />

        </div>

        {/* Filter Inputs */}

        <div className="flex space-x-4 mb-4">

          <TextField
            label="Search Product Name"
            variant="outlined"
            value={productNameFilter}
            onChange={(e) => setProductNameFilter(e.target.value)}
            fullWidth
          />

          <TextField
            label="Search Category"
            variant="outlined"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            fullWidth
          />

        </div>

        {/* Comments List */}

        <div className="space-y-8">

          {filteredComments.map((comment) => {

            const productImage =
              comment.productId?.imgUrls?.[0]?.url || "https://via.placeholder.com/60";

            return (

              <div key={comment._id} 
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl 
              transition duration-300 space-y-5 border border-gray-100">

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
                      <p className="text-xs text-gray-400">
                        Commented on: {new Date(comment.createdAt).toLocaleString()}
                      </p>


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

                  <div className="flex space-x-1">

                    <IconButton onClick={() => handleDialogOpen(comment._id)} color="gray" aria-label="respond">
                      <ReplyIcon style={{ fontSize: "30px", color: "grey" }} />
                    </IconButton>

                    <IconButton
                      onClick={() => {
                        setCommentToDelete(comment._id);
                        setDeleteDialogOpen(true);
                      }}
                      color="error"
                      aria-label="delete"
                    >

                      <DeleteIcon style={{ fontSize: "30px", color: "red" }} />
                    </IconButton>

                  </div>

                </div>

              </div>

            );
          })}

        </div>

        {/* Dialog for Admin Response */}

        <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm" 
        sx={{ '& .MuiDialog-paper': { padding: 2, borderRadius: '16px', boxShadow: 24, width: '500px' } }}>

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

            <Button onClick={handleDialogClose} className="bg-gray-500 hover:bg-gray-200 text-white font-bold"
            sx={{ textTransform: "none", padding: "14px 18px", width: "180px", fontSize: "16px", fontWeight: "bold", borderRadius: "10px" }}>
              Cancel
              </Button>

            <Button onClick={() => handleResponseSubmit(currentCommentId)} variant="contained" 
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold" 
            sx={{ textTransform: "none", padding: "14px 18px", width: "180px", fontSize: "16px", fontWeight: "bold", borderRadius: "10px" }} color="primary">
              Submit
            </Button>

          </DialogActions>

        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} fullWidth maxWidth="xs">

          <DialogTitle>Confirm Delete</DialogTitle>

          <DialogContent>

            <Typography>Are you sure you want to delete this comment?</Typography>

          </DialogContent>

          <DialogActions>

            <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">Cancel</Button>

            <Button
              onClick={async () => {
                await handleDeleteComment(commentToDelete);
                setDeleteDialogOpen(false);
                setCommentToDelete(null);
              }}
              color="primary"
              variant="contained"
            >
              Delete
            </Button>

          </DialogActions>

        </Dialog>

      </div>

    </div>
    
  );
};

export default Comment;
