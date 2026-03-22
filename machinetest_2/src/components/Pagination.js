function Pagination({ total, perPage, current, setCurrent }) {
  const pages = Math.ceil(total / perPage);

  return (
    <div>
      {Array.from({ length: pages }, (_, i) => (
        <button key={i} onClick={() => setCurrent(i + 1)}>
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
