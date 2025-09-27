import {Link } from 'react-router-dom';


function Menu() {
  return (
    <nav role="navigation"
        aria-label="Main Navigation"
        itemScope
        itemType="http://schema.org/SiteNavigationElement">
     

        <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><a href="https://google.com">Google</a></li>
        </ul>
    </nav>
  );
}

export default Menu;
