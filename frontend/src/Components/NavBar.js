import React from "react";
import mainlogo from "../images/logo/emporium-logo.png";
import styled from "styled-components";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded";
import { IconButton } from "@material-ui/core";
import DehazeIcon from "@material-ui/icons/Dehaze";
import CloseIcon from "@material-ui/icons/Close";
import categories from "./categories";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const shoppingCart = useSelector((state) => state.shoppingCart);
  const { cartProducts } = shoppingCart;

  const navBar = useSelector((state) => state.navBar);

  const user = useSelector((state) => state.user);

  const loggedUser = user.loggedUser || {};

  const navBarHandler = () => {
    dispatch({
      type: "TOGGLE_NAV_BAR",
    });
  };

  const dashboardClickHandle = () => {
    navBarHandler();
    history.push("/dashboard");
  };

  return (
    <>
      <MainContainer toggle={navBar}>
        <Logo>
          <Link to="/">
            <img src={mainlogo} alt="emporium-logo-ecommerce" />
          </Link>
        </Logo>

        <Items>
          <ul>
            {categories && (
              <>
                {categories.map((category, index) => (
                  <Link key={index} to={`/category/${category.name}`}>
                    <li onClick={navBarHandler}>{category.name}</li>
                  </Link>
                ))}
              </>
            )}

            {loggedUser && loggedUser.accountType === "Administrator" && (
              <li onClick={dashboardClickHandle}> Dashboard - Admin </li>
            )}
          </ul>
        </Items>

        {Object.keys(loggedUser).length !== 0 ? (
          <Link to="/my-account">
            <UserDiv>
              <PersonRoundedIcon style={{ fill: "#fb743e" }} />
              <div style={{ marginLeft: "10px" }}> {loggedUser.name} </div>
            </UserDiv>
          </Link>
        ) : (
          <Link to="/login">
            <UserDiv>
              <PersonRoundedIcon style={{ fill: "#fb743e" }} />
              <div style={{ marginLeft: "10px" }}> My Account </div>
            </UserDiv>
          </Link>
        )}

        <Link to="/mycart">
          <CartDiv>
            <ShoppingBasketRoundedIcon style={{ fill: "#fb743e" }} />
            <div style={{ marginLeft: "10px" }}>
              Cart {cartProducts.length === 0 ? "" : `(${cartProducts.length})`}
            </div>
          </CartDiv>
        </Link>

        <ScrollBarDiv>
          <IconButton onClick={navBarHandler}>
            {navBar ? <DehazeIcon /> : <CloseIcon />}
          </IconButton>
        </ScrollBarDiv>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-family: "Nunito", sans-serif;

  .cartNumber {
    font-size: 10px;
    color: #fb743e;
    font-weight: 800;
  }

  ul {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    background: grey;
    height: 100vh;
    width: 25vw;
    z-index: 10;
    padding: 2rem;
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
    overflow: hidden;
    -webkit-box-shadow: 10px 0px 21px 4px rgba(201, 201, 201, 0.66);
    -moz-box-shadow: 10px 0px 21px 4px rgba(201, 201, 201, 0.66);
    box-shadow: 10px 0px 21px 4px rgba(201, 201, 201, 0.66);
    transition: 0.8s all;
    transform: ${(props) =>
      props.toggle ? "translate(-500px)" : " translate(0)"};

    @media (max-width: 576px) {
      width: 60vw;
    }

    li {
      padding-top: 2rem;
      text-decoration: none;
      color: white;
    }
  }
`;

const Logo = styled.div`
  img {
    width: 150px;
    object-fit: contain;
  }
`;

const Items = styled.div`
  ul {
    list-style-type: none;
    display: flex;
  }
  li {
    margin: 0 1rem;
    cursor: pointer;
  }

  @media (max-width: 576px) {
    li {
      margin: 0;
    }
  }
`;

const UserDiv = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 576px) {
    div {
      display: none;
    }
  }
`;

const CartDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 0 2rem;
  @media (max-width: 576px) {
    div {
      display: none;
    }
    margin: 0rem;
  }
`;

const ScrollBarDiv = styled.div``;

export default NavBar;
