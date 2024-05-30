import React, { useState } from "react";
import {
  Add,
  ArrowBack,
  ArrowDropDown,
  ArrowForward,
  Close,
  Delete,
  Menu,
  Person2Outlined,
  Remove,
  Search,
  ShareOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  ClickAwayListener,
  Collapse,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import "./assets/scss/app.scss";

import HeroBannerImage from "./assets/images/hero-image.jpg";

import TeixeiraAdventure from "./assets/images/teixeira-adventure.png";

// new products images
import NewHelmet1 from "./assets/images/hjc-cl-17.png";
import NewHelmet2 from "./assets/images/zeus-z-806.png";
import NewHelmet3 from "./assets/images/arai-tour-cross-3.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// best seller background
import BestSellerBackground from "./assets/images/agv-best-seller-bg.jpg";
import BestSellerHelmet from "./assets/images/agv-best-sellers.png";

// blogs images
import Blog1 from "./assets/images/blog-1.jpg";
import Blog2 from "./assets/images/blog-2.jpeg";
import Blog3 from "./assets/images/blog-3.jpeg";

// category images
import FullFaceHelmet from "./assets/images/full-face-helmet.png";
import { useEffect } from "react";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false,
  centerMode: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const carouselRef = React.createRef();
function App() {
  const newProducts = [
    {
      name: "HJC CL-17 CAPTAIN AMERICA (SNELL)",
      price: "$350.5",
      image: NewHelmet1,
    },
    {
      name: "ZEUS Z-806 NEW SUPERTECH II50 MATT",
      price: "$350.5",
      image: NewHelmet2,
    },
    {
      name: "ARAI TOUR CROSS 3 - DETOUR RED",
      price: "$350.5",
      image: NewHelmet3,
    },
    {
      name: "HJC CL-17 CAPTAIN AMERICA (SNELL)",
      price: "$350.5",
      image: NewHelmet1,
    },
    {
      name: "ZEUS Z-806 NEW SUPERTECH II50 MATT",
      price: "$350.5",
      image: NewHelmet2,
    },
    {
      name: "ARAI TOUR CROSS 3 - DETOUR RED",
      price: "$350.5",
      image: NewHelmet3,
    },
  ];

  const blogList = [
    {
      date: "02/08/2017",
      description: "Dennis wins Van Doren Invitational WSBC Champ.",
      image: Blog1,
    },
    {
      date: "02/08/2017",
      description: "Dennis wins Van Doren Invitational WSBC Champ.",
      image: Blog2,
    },
    {
      date: "02/08/2017",
      description: "Dennis wins Van Doren Invitational WSBC Champ.",
      image: Blog3,
    },
  ];

  const helmetCategoryList = [
    {
      icon: FullFaceHelmet,
      name: "Full Face Helmet",
    },
    {
      icon: FullFaceHelmet,
      name: "Modular Helmet",
    },
    {
      icon: FullFaceHelmet,
      name: "Half Face Helmet",
    },
  ];

  const [anchorCategoryEl, setAnchorCategoryEl] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const [openMobileDrawer, setOpenMobileDrawer] = useState(false);
  const [openMobileCategoryMenu, setOpenMobileCategoryMenu] = useState(false);

  // navigate the carousel
  const handleMoveCarouselOnClick = (e) => {
    const dir = e.currentTarget.getAttribute("data-nav");
    switch (dir) {
      case "previous":
        carouselRef.current.slickPrev();
        break;
      case "next":
        carouselRef.current.slickNext();
        break;
    }
  };

  // enlarge the first viewed product after change carousel
  const handleHighlightTheFirstViewedProduct = () => {
    const firstActiveCarouselItem = document.querySelectorAll(".slick-active");

    if (firstActiveCarouselItem[0]) {
      firstActiveCarouselItem.forEach((item) => {
        item.classList.remove("focused-product");
      });

      firstActiveCarouselItem[0].classList.add("focused-product");
    }
  };

  useEffect(() => {
    if (!openMobileDrawer) {
      setOpenMobileCategoryMenu(false);
    }
  }, [openMobileDrawer]);

  return (
    // root component
    <Box className="app">
      {/* header */}
      <AppBar
        position="fixed"
        classes={{
          root: "app-header",
        }}
      >
        <Box className="app-logo">EVNX.</Box>
        <Box className="app-navigation-page">
          <Box className="page-item selected">Home</Box>
          <Box className="page-item">Blog</Box>
          <Box
            className="page-item"
            onMouseEnter={(e) => setAnchorCategoryEl(e.currentTarget)}
            onMouseLeave={() => setAnchorCategoryEl(null)}
          >
            Category
            <ArrowDropDown />
            {/* sub menu category */}
            <Popper
              open={Boolean(anchorCategoryEl)}
              anchorEl={anchorCategoryEl}
              placement="bottom-start"
              className="category-popper"
            >
              {helmetCategoryList.map((item, key) => (
                <Box key={key} className="category-item">
                  <img src={item.icon} alt={item.name} />
                  <Typography variant="body1" className="name">
                    {item.name}
                  </Typography>
                </Box>
              ))}
            </Popper>
          </Box>

          <Box className="page-item">Contacts</Box>
        </Box>
        <Box className="app-others">
          <Box className="currency">
            USD
            <ArrowDropDown />
          </Box>
          <TextField
            classes={{
              root: "text-field",
            }}
            placeholder="SEARCH"
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={() => setOpenCart(true)}>
            <Badge
              badgeContent={0}
              classes={{
                badge: "shopping-cart-count",
              }}
            >
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
          <IconButton>
            <Person2Outlined />
          </IconButton>
        </Box>
        <IconButton
          className="mobile-hamburger"
          onClick={() => setOpenMobileDrawer(true)}
        >
          <Menu />
        </IconButton>
      </AppBar>

      {/* drawer for mobile */}
      <Drawer
        open={openMobileDrawer}
        anchor="right"
        onClose={() => setOpenMobileDrawer(false)}
        classes={{
          paper: "drawer",
        }}
      >
        <Box className="upper-section">
          <Box className="search-section">
            <TextField
              classes={{
                root: "text-field",
              }}
              placeholder="SEARCH"
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Box className="currency">
              USD
              <ArrowDropDown />
            </Box>
          </Box>

          <Box className="mobile-navigation">
            <Box className="mobile-page-item">Home</Box>
            <Box className="mobile-page-item">Blogs</Box>
            <Box
              className="mobile-page-item"
              onClick={() => setOpenMobileCategoryMenu((n) => !n)}
            >
              Category <ArrowDropDown />
            </Box>
            <Collapse in={openMobileCategoryMenu}>
              <Box className="mobile-category-list">
                {helmetCategoryList.map((item, key) => (
                  <Box key={key} className="category-item">
                    <img src={item.icon} alt={item.name} />
                    <Typography variant="body1" className="name">
                      {item.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Collapse>
            <Box className="mobile-page-item">Contacts</Box>
          </Box>
          <Button
            variant="contained"
            className="mobile-shopping-cart"
            disableElevation
            onClick={() => {
              setOpenCart(true);
              setOpenMobileDrawer(false);
            }}
          >
            My Shopping Cart
          </Button>
        </Box>
        <Box className="my-account">
          <Typography variant="body1">Hi, John Doe</Typography>
          <Avatar />
        </Box>
      </Drawer>

      {/* content */}
      <Box className="app-content">
        {/* hero section */}
        <Box className="app-hero">
          <img
            className="banner"
            src={HeroBannerImage}
            alt="A rider wearing a helmet"
          />
          <Box className="backdrop"></Box>
          <Box className="hero-content">
            <IconButton className="hero-section-nav">
              <ArrowBack />
            </IconButton>
            <Box className="content">
              <Box className="hero-header">
                <Box className="hero-text">
                  <Typography variant="h3" className="hero-title">
                    TEIXEIRA ADVENTURE
                  </Typography>
                  <Typography variant="subtitle2" className="hero-subtitle">
                    ADVANCED POLYCARBONATE COMPOSITE SHELL
                  </Typography>
                </Box>
                <img
                  src={TeixeiraAdventure}
                  alt="Teixeira Adaventure Advanced Polycarbonate Composite Shell"
                />
              </Box>
              <Box className="hero-details">
                <Box className="details">
                  <Button>
                    Color <span className="color-switcher"></span>
                  </Button>
                  <Box className="price">
                    PRICE <span>$125.9</span>
                  </Box>
                  <Button>View Product</Button>
                </Box>
                <Button className="share-hero-product">
                  <ShareOutlined />
                </Button>
              </Box>
            </Box>
            <IconButton className="hero-section-nav">
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>

        {/* carousel section */}
        <Box className="carousel-section">
          <Box className="carousel-navigation">
            <IconButton onClick={handleMoveCarouselOnClick} data-nav="previous">
              <ArrowBack />
            </IconButton>
            <Typography variant="h3" className="carousel-title">
              NEW PRODUCTS
            </Typography>
            <IconButton onClick={handleMoveCarouselOnClick} data-nav="next">
              <ArrowForward />
            </IconButton>
          </Box>

          {/* carousel */}
          <Box className="carousel">
            <Slider
              ref={carouselRef}
              {...settings}
              afterChange={handleHighlightTheFirstViewedProduct}
            >
              {newProducts.map((prod, key) => (
                <Box key={key} className="carousel-product">
                  <Typography variant="h6" className="name">
                    {prod.name}
                  </Typography>
                  <Box className="price-image-buy-btn">
                    <Box className="price-buy-btn">
                      <Typography variant="h5" className="price">
                        {prod.price}
                      </Typography>
                      <Button className="btn-buy">BUY NOW</Button>
                    </Box>
                    <img src={prod.image} alt={prod.name} />
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
        {/* blog and best sellers */}
        <Box className="blogs-best-sellers">
          <Box className="blogs">
            <Box className="blog-header">
              <Typography variant="h5" className="title">
                BLOGS X EVENTS
              </Typography>
              <Typography variant="subtitle1" className="see-all">
                SEE ALL
              </Typography>
            </Box>
            <Divider />
            <Box className="blog-list">
              {blogList.map((blog, key) => (
                <Box className="blog-item" key={key}>
                  <img src={blog.image} alt={blog.description} />
                  <Box className="blog-info">
                    <Typography variant="subtitle2" className="blog-info_date">
                      {blog.date}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      className="blog-info_description"
                    >
                      {blog.description}
                    </Typography>
                    <Typography variant="subtitle1" className="read-more">
                      READ MORE
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box className="best-sellers">
            <img
              src={BestSellerBackground}
              alt="Dirt Bike Racing"
              className="background"
            />
            <Box className="backdrop"></Box>
            <img
              src={BestSellerHelmet}
              alt="Green Helmet"
              className="best-selling-helmet"
            />
            <Box className="best-seller-description">
              <Typography variant="h3" className="best-seller-title">
                AGV BEST SELLERS
              </Typography>
              <Divider className="divider" />
              <Typography variant="subtitle2" className="best-seller-sub-title">
                SEE OUR MOST POPULAR PRODUCTS
              </Typography>
              <Button
                variant="contained"
                disableElevation
                className="btn-shop-now"
              >
                SHOP NOW
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={openCart}
        classes={{
          paper: "cart-paper",
        }}
      >
        <Box className="cart-header">
          <Typography variant="h3" className="cart-title">
            Shopping Cart
          </Typography>
          <IconButton onClick={() => setOpenCart(false)}>
            <Close />
          </IconButton>
        </Box>
        <Box className="cart-content">
          <Box className="cart-content_list">
            <Box className="cart-item">
              <img src={NewHelmet1} alt="Item 1" />
              <Typography variant="subtitle1" className="product-name">
                Item 1
              </Typography>
              <Box className="item-quantity">
                <IconButton>
                  <Add />
                </IconButton>
                <TextField
                  classes={{
                    root: "text-field",
                  }}
                />
                <IconButton>
                  <Remove />
                </IconButton>
              </Box>
              <Typography variant="subtitle1">$ 00.00</Typography>
              <IconButton>
                <Delete />
              </IconButton>
            </Box>
            <Box className="cart-item">
              <img src={NewHelmet2} alt="Item 1" />
              <Typography variant="subtitle1" className="product-name">
                Item 1
              </Typography>
              <Box className="item-quantity">
                <IconButton>
                  <Add />
                </IconButton>
                <TextField
                  classes={{
                    root: "text-field",
                  }}
                />
                <IconButton>
                  <Remove />
                </IconButton>
              </Box>
              <Typography variant="subtitle1">$ 00.00</Typography>
              <IconButton>
                <Delete />
              </IconButton>
            </Box>
            <Box className="cart-item">
              <img src={NewHelmet1} alt="Item 1" />
              <Typography variant="subtitle1" className="product-name">
                Item 1
              </Typography>
              <Box className="item-quantity">
                <IconButton>
                  <Add />
                </IconButton>
                <TextField
                  classes={{
                    root: "text-field",
                  }}
                />
                <IconButton>
                  <Remove />
                </IconButton>
              </Box>
              <Typography variant="subtitle1">$ 00.00</Typography>
              <IconButton>
                <Delete />
              </IconButton>
            </Box>
            <Box className="cart-item">
              <img src={NewHelmet2} alt="Item 1" />
              <Typography variant="subtitle1" className="product-name">
                Item 1
              </Typography>
              <Box className="item-quantity">
                <IconButton>
                  <Add />
                </IconButton>
                <TextField
                  classes={{
                    root: "text-field",
                  }}
                />
                <IconButton>
                  <Remove />
                </IconButton>
              </Box>
              <Typography variant="subtitle1">$ 00.00</Typography>
              <IconButton>
                <Delete />
              </IconButton>
            </Box>
          </Box>
          <Box className="cart-order-details">
            <Typography variant="body1" className="total-items">
              Items in your cart: 0
            </Typography>
            <Box className="cart-total-price">
              <Typography variant="h3">Total: $ 00.00</Typography>
            </Box>
          </Box>
        </Box>
        <DialogActions
          classes={{
            root: "shopping-cart-actions",
          }}
        >
          <Button
            variant="contained"
            disableElevation
            className="btn-cart-checkout"
            onClick={() => setOpenCart(false)}
          >
            Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
