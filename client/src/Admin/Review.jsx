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
  Send as SendIcon,
  Mail as MailIcon
} from '@mui/icons-material';
import { toast } from 'sonner';
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb'
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles'

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState({
    type: "",
    date: "",
    itemId: "",
    minRating: "",
    maxRating: "",
  });
  const [response, setResponse] = useState({});
  const [stats, setStats] = useState({
    totalReviews: 0,
    ratingCounts: [0, 0, 0, 0, 0],
    avgRating: 0,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, [filter]); // Fetch reviews whenever the filter changes

  const fetchReviews = async () => {
    try {
      // Filter out empty values before appending to the URL
      const filteredParams = Object.fromEntries(
        Object.entries(filter).filter(([_, v]) => v) // Only include non-empty values
      );
      const queryParams = new URLSearchParams(filteredParams).toString();
      const { data } = await axios.get(
        `http://localhost:8000/api/review/admin?${queryParams}`
      );
      setReviews(data);
      calculateStats(data);
    } catch (error) {
      console.error("Error fetching reviews", error);
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
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) /
            totalReviews).toFixed(1)
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
      await axios.post(
        `http://localhost:8000/api/review/admin/respond/${reviewId}`,
        { response: response[reviewId] }
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

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className='mt-3 mb-5'>
                                <PageTitle value="Comments & Reviews"></PageTitle>
                                <CustomBreadcrumbs
                                    paths={[
                                        { label: 'Feedback Manage', href: "/feedbackmanage/comment&reviews" },
                                        { label: 'Comment & Reviews' },
                                    ]} />
                            </div>

        {/* Filter Section */}
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
      onChange={(e) => setFilter({ ...filter, minRating: e.target.value })}
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
                        '#D1A3FF',  // Light Purple
                        '#A66DFF',  // Lavender Purple
                        '#8B40FF',  // Bright Purple
                        '#6A1EEC',  // Deep Purple
                        '#4A148C'   // Dark Purple
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
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="group p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <div className="flex items-start space-x-4">
                <Avatar
                  alt={review.userId?.name || "Unknown"}
                  src={review.userId?.profilePicture}
                  className="w-14 h-14 border-4 border-purple-100 shadow-md"
                >
                  {!review.userId?.profilePicture && <PersonIcon className="text-purple-500" />}
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900 text-lg">
                      {review.userId?.name || "Anonymous"}
                      <span className="ml-2 text-yellow-500">
                        {Array(review.rating).fill(<StarIcon className="w-5 h-5" />)}
                      </span>
                    </h4>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {review.type}
                    </span>
                  
                  </div>
                  <p className="text-gray-600 mb-4">{review.comment}</p>
                  <span className="text-xs text-gray-400 mb-4">
      {new Date(review.createdAt).toLocaleDateString()}
    </span>
                  <div className="flex items-center space-x-4 mt-4">
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
                      onClick={() => handleDialogOpen(review._id)}
                    >
                      Public Response
                    </button>
                    <button
                       className="bg-gray-400 hover:bg-gray-500 text-white font-bold"
                       style={{
                         padding: "14px 18px",
                         width: "180px",
                         textTransform: "none",
                         fontSize: "16px",
                         borderRadius: "10px",
                         fontWeight: "bold"
                       }}
                      onClick={() => handleDialogOpen(review._id)}
                    >
                      Direct Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Response Dialog */}
       {/* Response Dialog */}
<Dialog
  open={openDialog}
  onClose={handleDialogClose}
  PaperProps={{ 
    className: "rounded-2xl min-w-[600px]",
    sx: { 
      '& .MuiDialog-container': {
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: '600px',
        },
      },
    }
  }}
>
  <DialogTitle className="bg-purple-100 text-gray-900 rounded-t-2xl py-4">
    <div className="flex items-center space-x-3">
      <SendIcon className="text-purple-600" />
      <span className="font-bold text-xl">Write Response</span>
    </div>
  </DialogTitle>
  <DialogContent className="pt-6 pb-4 space-y-4">
    <TextField
      autoFocus
      fullWidth
      multiline
      rows={4}
      variant="outlined"
      label="Your response..."
      className="rounded-lg"
      InputProps={{
        className: "focus:ring-2 focus:ring-purple-500 text-base"
      }}
      value={response[currentReviewId] || ""}
      onChange={(e) => handleResponseChange(currentReviewId, e.target.value)}
    />
    <div className="flex items-center text-gray-600">
      <MailIcon className="mr-2" />
      <span className="font-medium">
        {reviews.find(r => r._id === currentReviewId)?.userId?.email}
      </span>
    </div>
  </DialogContent>
  <DialogActions className="px-6 pb-4 gap-3">
    <button
      onClick={handleDialogClose}
      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition-colors duration-200"
    >
      Cancel
    </button>
    <button
      onClick={() => handleResponseSubmit(currentReviewId)}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-200"
    >
      Submit Response
    </button>
  </DialogActions>
</Dialog>
      </div>
    </div>
  );
};

export default Review;
