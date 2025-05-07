import classes from './NavBar.module.scss';
import {Link} from 'react-router-dom';

export default function Navbar() {
  return (
    <>
    <div className={classes.container}>
      <div className={classes.menuitems}>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </div>
    </>
  );
}