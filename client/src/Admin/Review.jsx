import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import {
  Person as PersonIcon,
  Star as StarIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { toast } from 'sonner';
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb'
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles'
import debounce from 'lodash.debounce';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState({
    productId: "",
    rating: "",
    userId: "",
  });
  const [response, setResponse] = useState({});
  const [stats, setStats] = useState({
    totalReviews: 0,
    ratingCounts: [0, 0, 0, 0, 0],
    avgRating: 0,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, [filter]); // Fetch reviews whenever the filter changes

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('token'); // or get it from wherever you store it
  
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const filteredParams = Object.fromEntries(
        Object.entries(filter).filter(([_, v]) => v) // Only include non-empty values
      );
      const queryParams = new URLSearchParams(filteredParams).toString();
      
      const { data } = await axios.get(
        `http://localhost:8000/api/review/admin/all?${queryParams}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setReviews(data);
      console.log(data);
      calculateStats(data);
    } catch (error) {
      console.error("Error fetching reviews", error);
      toast.error("Failed to fetch reviews. Please check your authentication.");
    }
  };
  

  const calculateStats = (reviews) => {
    const totalReviews = reviews.length;
    const ratingCounts = [0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      ratingCounts[review.rating - 1]++;
    });

    const avgRating =
      totalReviews > 0
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
        : "0.0";
    setStats({ totalReviews, ratingCounts, avgRating });
  };

  const handleResponseChange = (reviewId, value) => {
    setResponse({
      ...response,
      [reviewId]: value,
    });
  };

  const handleResponseSubmit = async (reviewId) => {
    try {
      const token = localStorage.getItem("token"); // or whatever key you're using
  
      await axios.put(
        `http://localhost:8000/api/review/admin/respond/${reviewId}`,
        { adminResponse: response[reviewId] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      fetchReviews(); // Fetch updated reviews after submitting the response
      toast.success("Response submitted successfully!");
      handleDialogClose();
    } catch (error) {
      console.error("Error responding to review", error);
      toast.error("Failed to submit the response.");
    }
  };
  

  const handleDialogOpen = (reviewId) => {
    setCurrentReviewId(reviewId);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentReviewId(null);
    setResponse({});
  };

  const handleClickOpen = (reviewId) => {
    setCurrentReviewId(reviewId); // Set the review ID to delete
    setOpenDialogDelete(true); // Open the confirmation dialog
  };

  const handleCloseDialog = () => {
    setOpenDialogDelete(false); // Close the confirmation dialog without deleting
  };

  const handleConfirmDelete = () => {
    handleDeleteReview(currentReviewId); // Call the delete function with the review ID
    setOpenDialogDelete(false); // Close the dialog after deletion
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem("token");


      await axios.delete(
        `http://localhost:8000/api/review/admin/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}` // Include the JWT token in the Authorization header
          }
        }
      );
      fetchReviews(); // Refresh the review list after deletion
      toast.success("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review", error);
      toast.error("Failed to delete review.");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mt-3 mb-5">
          <PageTitle value="Comments & Reviews" />
          <CustomBreadcrumbs
            paths={[
              { label: 'Feedback Manage', href: "/feedbackmanage/comment&reviews" },
              { label: 'Comment & Reviews' },
            ]}
          />
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap gap-4 mt-6 mb-8 items-end">
          <FormControl className="w-64 flex">
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              InputProps={{ style: { height: 48 } }} // Ensures consistent height
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            />
          </FormControl>

          <FormControl className="w-48 flex">
            <TextField
              label="Date"
              type="date"
              variant="outlined"
              size="small"
              InputProps={{ style: { height: 48 } }} // Ensures consistent height
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            />
          </FormControl>

          <FormControl className="w-48 flex">
            <InputLabel>Rating Filter</InputLabel>
            <Select
              label="Rating Filter"
              size="small"
              className="h-12"
              MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
              onChange={(e) => setFilter({ ...filter, rating: e.target.value })}
            >
              <MenuItem value="">
                <em>All Ratings</em>
              </MenuItem>
              {[5, 4, 3, 2, 1].map((num) => (
                <MenuItem key={num} value={num}>
                  {Array(num)
                    .fill(null)
                    .map((_, index) => (
                      <StarIcon key={index} className="text-yellow-400 w-4 h-4" />
                    ))}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <button
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold"
            style={{
              padding: "14px 18px",
              width: "180px",
              textTransform: "none",
              fontSize: "16px",
              borderRadius: "10px",
              fontWeight: "bold"
            }}
            onClick={fetchReviews}
          >
            Filter
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white rounded-xl shadow-lg transform transition hover:scale-105 duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <PeopleIcon className="text-purple-600 text-3xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Reviews</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalReviews}</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-lg transform transition hover:scale-105 duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <StarIcon className="text-yellow-500 text-3xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Average Rating</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.avgRating}
                  <span className="text-yellow-500 ml-1">★</span>
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-lg transform transition hover:scale-105 duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <BarChartIcon className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Rating Distribution</h3>
            </div>
            <Bar
              data={{
                labels: ["★☆☆☆☆", "★★☆☆☆", "★★★☆☆", "★★★★☆", "★★★★★"],
                datasets: [
                  {
                    label: "Review Count",
                    data: stats.ratingCounts,
                    backgroundColor: [
                      '#D1A3FF', '#A66DFF', '#8B40FF', '#6A1EEC', '#4A148C'
                    ],
                    borderWidth: 0,
                  },
                ],
              }}
              options={{
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-8">
  {reviews.map((review) => (
    <div
      key={review._id}
      className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 space-y-5 border border-gray-100"
    >
      {/* Reviewer Info */}
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-6">
          <Avatar
            alt={review.userId?.name}
            src={review.userId?.profilePicture}
            className="w-24 h-24 mt-4"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-900">
              {review.userId?.name || 'Anonymous'}
            </p>
            <p className="text-sm text-gray-500">{review.userId?.email}</p>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">Product:</span>{' '}
              {review.productName}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">Category:</span>{' '}
              {review.productCategory}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 text-yellow-500">
          {Array(review.rating)
            .fill(null)
            .map((_, index) => (
              <StarIcon key={index} className="w-5 h-5" />
            ))}
        </div>
      </div>

      {/* Review Comment */}
      <div className="flex justify-between items-center">
  <p className="text-gray-700 text-[15px] leading-relaxed">{review.comment}</p>
  <span className="text-sm text-gray-500 ml-4 whitespace-nowrap">
    {new Date(review.createdAt).toLocaleDateString()}
  </span>
</div>


      {/* Admin Response */}
      {review.adminResponse ? (
        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-purple-700 font-semibold mb-1">Admin Response:</p>
          <p className="text-gray-800">{review.adminResponse}</p>
        </div>
      ) : (
        <Button
        variant="contained"
        color="primary"
        className="bg-purple-700 hover:bg-purple-800 text-white font-bold"
        style={{
          padding: "14px 18px",
          width: "180px",
          textTransform: "none",
          fontSize: "16px",
          borderRadius: "10px",
          fontWeight: "bold",
          marginRight: "10px"
        }}
          onClick={() => handleDialogOpen(review._id)}
        >
          Respond
        </Button>
      )}

      {/* Delete Button */}
      <Button
        className="bg-gray-900 hover:bg-gray-500 text-white font-bold"
        sx={{
          textTransform: "none",
          padding: "14px 18px",
          width: "180px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "10px"
        }}
        onClick={() => handleClickOpen(review._id)} 
      >
        Delete Review
      </Button>
    </div>
  ))}
</div>

        {/* Response Dialog */}
        <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm" sx={{ '& .MuiDialog-paper': { padding: 3, borderRadius: '16px', boxShadow: 24, width: '500px' } }}>
  <DialogTitle>Respond to Review</DialogTitle>
  <DialogContent>
    <TextField
      fullWidth
      multiline
      rows={5}
      label="Your Response"
      value={response[currentReviewId] || ""}
      onChange={(e) => handleResponseChange(currentReviewId, e.target.value)}
      variant="outlined"
      margin="dense"
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDialogClose} className="bg-gray-500 hover:bg-gray-200 text-white font-bold"
            sx={{
              textTransform: "none",
              padding: "14px 18px",
              width: "180px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "10px"
            }}>
      Cancel
    </Button>
    <Button
      variant="contained"
      className="bg-purple-700 hover:bg-purple-800 text-white font-bold"
      sx={{
        textTransform: "none",
        padding: "14px 18px",
        width: "180px",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "10px"
      }}
      endIcon={<SendIcon />}
      onClick={() => handleResponseSubmit(currentReviewId)}
    >
      Submit
    </Button>
  </DialogActions>
</Dialog>


<Dialog open={openDialogDelete} onClose={handleCloseDialog}>
        <DialogTitle>Delete Review</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this review?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  );
};

export default Review;
