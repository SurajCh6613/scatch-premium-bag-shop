import React from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex justify-between p-4 shadow">
      <Link to='/' className="text-2xl">Scatch</Link>
      <div className="">
        <ul className="flex gap-8  pr-4">
          <Link>New Launches</Link>
          <Link>Women</Link>
          <Link>Men</Link>
          <Link>Collection</Link>
          <Link>Sale</Link>
          <Link>Under 1999</Link>
          <Link>Combo Sets</Link>
          <Link>Summer Essential</Link>
          <Link to='/login'>
            <FaUser />
          </Link>
          <Link>
            <FaSearch />
          </Link>
          <Link>
            <FaRegHeart />
          </Link>
          <Link>
            <FaShoppingCart />
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
