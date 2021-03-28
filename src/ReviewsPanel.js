const ReviewsPanel = ({ location, onClose }) => {
  if (location == null || location == undefined) {
    return null;
  }
  return (
    <Modal open onClose={onClose}>
      <p>Testing</p>
    </Modal>
  );
};
