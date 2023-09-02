import ListBox from "../listbox/ListBox";
import Watched from "../watched/Watched";

const Main = ({ movies }) => {
  return (
    <main className="main">
      <ListBox movies={movies} />
      <Watched />
    </main>
  );
};

export default Main;
