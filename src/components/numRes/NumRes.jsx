const NumRes = ({ movies }) => {
  console.log(movies?.length);
  return (
    <p className="num-results">
      Found <strong>{movies ? movies.length : 0}</strong> results
    </p>
  );
};

export default NumRes;
