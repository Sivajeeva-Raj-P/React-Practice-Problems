function Pagination({ total, perPage, current, setCurrent }) {
  const pages = Math.ceil(total / perPage);

  return (
    <div>
      {[...Array(pages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrent(i + 1)}
          style={{ margin: 5, background: current === i + 1 ? "#2563eb" : "" }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
