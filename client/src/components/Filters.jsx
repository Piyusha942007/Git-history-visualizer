const Filters = () => {
  return (
    <div className="filters">
      <select>
        <option>All Files</option>
        <option>High Churn</option>
        <option>Risky Files</option>
      </select>

      <select>
        <option>All Contributors</option>
        <option>Top 5</option>
      </select>
    </div>
  );
};

export default Filters;