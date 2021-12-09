import React from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import DehazeIcon from "@material-ui/icons/Dehaze";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Header, Divider, Label } from "semantic-ui-react";

import mainlogo from "../images/logo/emporium-logo.png";
import categories from "./categories";

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

        <div style={{ display: "flex", alignItems: "center" }}>
          <Items>
            <ul>
              <Divider horizontal>
                <Header as="h2" className="heading">
                  Categories
                </Header>
              </Divider>
              {categories && (
                <>
                  {categories.map((category, index) => (
                    <Link key={index} to={`/category/${category.name}/page/1`}>
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
                <img
                  className="user-icon"
                  src="/images/user-profile-icon.png"
                  alt="usericon"
                />
                <div style={{ marginLeft: "10px" }}> {loggedUser.name} </div>
              </UserDiv>
            </Link>
          ) : (
            <Link to="/login">
              <UserDiv>
                <img
                  className="user-icon"
                  src="/images/user-profile-icon.png"
                  alt="usericon"
                />
                <div style={{ marginLeft: "10px" }}> My Account </div>
              </UserDiv>
            </Link>
          )}

          <Link to="/mycart">
            <CartDiv>
              <div>
                <img
                  className="cart-icon"
                  src="/images/shopping-bag.png"
                  alt="cart-icon"
                ></img>
                <Label circular size="tiny" color="orange">
                  {cartProducts.length === 0 ? 0 : `${cartProducts.length}`}
                </Label>
              </div>

              <div style={{ marginLeft: "10px" }}>My Cart</div>
            </CartDiv>
          </Link>

          <ScrollBarDiv>
            <IconButton onClick={navBarHandler}>
              {navBar ? <DehazeIcon /> : <CloseIcon />}
            </IconButton>
          </ScrollBarDiv>
        </div>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Nunito", sans-serif;
  height: 3.5rem;
  margin: 0 1rem;

  .cartNumber {
    font-size: 10px;
    color: #fb743e;
    font-weight: 800;
  }

  ul {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: calc(3.5rem + 35px);
    left: 0;
    color: white;
    background: white;
    height: calc(100vh - (3.5rem + 35px));
    width: 25vw;
    z-index: 10;
    padding: 2rem;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow: hidden;
    transition: 0.8s all;
    transform: ${(props) =>
      props.toggle ? "translate(-500px)" : " translate(0)"};
    box-shadow: 5px 1px 0 rgba(0, 0, 0, 0.1);

    @media (max-width: 576px) {
      width: 60vw;
    }

    li {
      padding-top: 2rem;
      text-decoration: none;
      color: black;
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

  .user-icon {
    width: 30px;
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

    .cart-icon {
      margin: 0 20px;
    }
  }

  .cart-icon {
    width: 20px;
  }
`;

const ScrollBarDiv = styled.div``;

export default NavBar;
