import { FaStar, FaRegStar } from 'react-icons/fa';
import styles from './StarRating.module.scss';

interface StarRatingProps {
  rating: number;
  size?: 'small' | 'medium' | 'large';
}

const StarRating = ({ rating, size = 'medium' }: StarRatingProps) => {
  const roundedRating = Math.round(rating);
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<FaStar key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }

  return <div className={`${styles['star-rating']} ${styles[size]}`}>{stars}</div>;
};

export default StarRating;
