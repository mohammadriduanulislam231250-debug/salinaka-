/* eslint-disable react/require-default-props */
import { CheckOutlined, LoadingOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { useModal } from '@/hooks';
import firebase from '@/services/firebase';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { displayDate } from '@/helpers/utils';

const ProductReviews = ({ reviews, id }) => {
  const { isAuth, profile } = useSelector((state) => ({
    isAuth: !!state.auth,
    profile: state.profile,
  }));

  const [localReviews, setLocalReviews] = useState(reviews || []);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLocalReviews(reviews || []);
  }, [reviews]);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const calculateAverageRating = () => {
    if (localReviews.length === 0) return 0;
    const sum = localReviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / localReviews.length).toFixed(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return;

    setIsSubmitting(true);
    const newReview = {
      id: firebase.generateKey(),
      rating,
      comment,
      user: profile.fullname || 'Anonymous',
      date: new Date().getTime(), // Use timestamp for consistency
    };

    const updatedReviews = [...localReviews, newReview];
    setLocalReviews(updatedReviews);
    setRating(0);
    setComment('');

    try {
      await firebase.editProduct(id, { reviews: updatedReviews });
      // Ideally show a toast here
    } catch (error) {
      console.error('Failed to save review:', error);
      // Rollback on error in a real app
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="product-reviews-section">
      <div className="reviews-header">
        <div className="reviews-stats">
          <h2>Reviews ({localReviews.length})</h2>
          {localReviews.length > 0 && (
            <div className="average-rating">
              <span className="rating-number">{calculateAverageRating()}</span>
              <div className="rating-stars">
                <StarFilled className="star-icon filled" />
              </div>
              <span className="rating-max">/ 5.0</span>
            </div>
          )}
        </div>
        <div className="reviews-divider" />
      </div>

      <div className="reviews-content-grid">
        <div className="reviews-list">
          {localReviews.length === 0 ? (
            <div className="no-reviews">
              <p>No reviews yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            localReviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="review-user">
                    <div className="user-avatar-circle">
                      {review.user ? review.user.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <div className="user-info">
                      <h4>{review.user}</h4>
                      <span className="review-date">
                        {review.date ? displayDate(review.date) : displayDate(new Date())}
                      </span>
                    </div>
                  </div>
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>
                        {star <= review.rating ? (
                          <StarFilled className="star-icon filled-sm" />
                        ) : (
                          <StarOutlined className="star-icon empty-sm" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))
          )}
        </div>

        <div className="review-form-container">
          {!isAuth ? (
            <div className="auth-required-box">
              <h3>Create a Review</h3>
              <p>You must be logged in to post a review.</p>
              <Link to="/signin" className="button">
                Sign In to Review
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="review-form">
              <h3>Add a Review</h3>
              <div className="form-group">
                <label>Your Rating</label>
                <div className="star-selector">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleRatingChange(star)}
                      onKeyDown={() => handleRatingChange(star)}
                      className={`star-select-item ${star <= rating ? 'selected' : ''}`}
                    >
                      {star <= rating ? <StarFilled /> : <StarOutlined />}
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="input-form read-only"
                  value={profile.fullname || 'Anonymous'}
                  readOnly
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Comment</label>
                <textarea
                  className="textarea-form"
                  placeholder="Share your experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows={5}
                />
              </div>

              <button
                className="button button-block"
                type="submit"
                disabled={isSubmitting || !rating || !comment.trim()}
              >
                {isSubmitting ? <LoadingOutlined /> : 'Submit Review'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

ProductReviews.propTypes = {
  reviews: PropTypes.array,
  id: PropTypes.string.isRequired,
};

export default ProductReviews;
