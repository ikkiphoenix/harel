import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SpinnerLoading = ({ loading, size = "3x", ...props }) => {
  return loading && <FontAwesomeIcon icon="spinner" spin size={size} />;
};

export default SpinnerLoading;
