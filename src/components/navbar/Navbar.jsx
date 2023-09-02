import Logo from "../logo/Logo";
import Search from "../search/Search";
import NumRes from "../numRes/NumRes";

const Navbar = ({ movies }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumRes movies={movies} />
    </nav>
  );
};

export default Navbar;
