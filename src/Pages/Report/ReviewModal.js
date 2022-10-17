import React from "react";
import Grid from "@mui/material/Grid";

import { IconButton, Modal, Tooltip, Box, Typography } from "@mui/material";
import * as Icons from "@mui/icons-material";
import moment from "moment";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const images = [
    {
        id: 1,
        label: "Bird",
        imgPath:
            "https://cdn6.f-cdn.com/contestentries/1301217/27758306/5acbe984b11d9_thumb900.jpg",
    },
    {
        id: 2,
        label: "ID card ",
        imgPath:
            "https://sb.kaleidousercontent.com/67418/800x533/c5b0716f3d/animals-0b6addc448f4ace0792ba4023cf06ede8efa67b15e748796ef7765ddeb45a6fb.jpg",
    },
];

const ReportModal = ({
    open,
    setOpen,
    productDetails: {
        description,
        title,
        productpostedon,
        inorganic_views,
        price,
        reviewedat,
        username,
        usernumber,
        productaddress,
        email,
    },
}) => {
    return (
        <Modal
            hideBackdrop
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                maxWidth: "70%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "30px",
            }}
        >
            <Grid container spacing={2} columns={4}>
                <Grid item xs={2}>
                    <div
                        style={{
                            zIndex: 1000,
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "1%",
                            position: "relative",
                        }}
                    >
                        <div style={{ backgroundColor: "white" }}>
                            <div
                                style={{
                                    backgroundColor: "#76BA1B",
                                    paddingLeft: "5px",
                                    paddingRight: "5px",
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    height: "70px",
                                }}
                            >
                                <h1
                                    style={{
                                        fontSize: "20px",
                                        color: "white",
                                        marginTop: "-5px",
                                    }}
                                >
                                    {title}
                                </h1>
                                {/* <Box
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "white" },
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    marginTop: "-15px",
                    marginRight: "10px",
                  }}
                  onClick={() => setOpen(false)}
                >
                  <Icons.CloseOutlined
                    style={{
                      fontSize: "40px",
                      color: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "5px",
                    }}
                  />
                </Box> */}
                            </div>

                            <div
                                style={{
                                    marginTop: "-12px",
                                    height: "300px",
                                }}
                            >
                                {/* image slider starts here */}
                                <div>
                                    <Carousel
                                        showThumbs={false}
                                        internal={4000}
                                        showStatus={false}
                                    >
                                        {images.map((image) => (
                                            <img
                                                loading="lazy"
                                                src={image.imgPath}
                                                key={image.id}
                                                style={{
                                                    width: "100%",
                                                    height: "300px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ))}
                                    </Carousel>
                                </div>
                                {/* image slider ends here */}
                            </div>
                        </div>

                        {/* second row */}
                        <div style={{ backgroundColor: "white" }}>
                            <h1
                                style={{
                                    backgroundColor: "#76BA1B",
                                    paddingLeft: "5px",
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                    fontSize: "18px",
                                    color: "white",
                                    marginTop: 0,
                                }}
                            >
                                Details
                            </h1>
                            <div
                                style={{
                                    marginTop: "-12px",
                                    height: "auto",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingLeft: "50px",
                                    paddingRight: "50px",
                                    marginBottom: "40px",
                                }}
                            >
                                {/* left side */}
                                <div>
                                    <p
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Icons.Title sx={{ color: "#FFA500" }} />
                                        <p
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                marginLeft: "10px",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: "18px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Product Name
                                            </span>
                                            <span style={{ fontSize: "14px" }}>
                                                {/* {productDetails.title} */}
                                                {title}
                                            </span>
                                        </p>
                                    </p>

                                    <p
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginTop: "-40px",
                                        }}
                                    >
                                        <Icons.Category sx={{ color: "#FFA500" }} />
                                        <p
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                marginLeft: "10px",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: "18px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Posted On
                                            </span>
                                            <span style={{ fontSize: "14px" }}>
                                                {/* {productDetails.category} */}
                                                {moment(productpostedon).format("d-M-Y")}
                                            </span>
                                        </p>
                                    </p>
                                    {/* <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "-40px",
                    }}
                  >
                    <Icons.LocationOnOutlined sx={{ color: "#FFA500" }} />
                    <p
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        Location
                      </span>
                      <span style={{ fontSize: "14px" }}>
                        {/* {productDetails.country} */}
                                    {/* now now
                      </span>
                    </p>
                  </p> */}
                                    <p
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginTop: "-40px",
                                        }}
                                    >
                                        <Icons.LocationOnOutlined sx={{ color: "#FFA500" }} />
                                        <p
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                marginLeft: "10px",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: "18px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Ad Views
                                            </span>
                                            <span style={{ fontSize: "14px" }}>
                                                {/* {productDetails.country} */}
                                                {inorganic_views}
                                            </span>
                                        </p>
                                    </p>
                                </div>
                                {/* right side */}
                                <div>
                                    <p
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Icons.CardMembership sx={{ color: "#FFA500" }} />
                                        <p
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                marginLeft: "10px",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: "18px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Price
                                            </span>
                                            <span style={{ fontSize: "14px" }}>
                                                {/* {productDetails.planname} */}
                                                {parseInt(price).toLocaleString("en-US")}
                                            </span>
                                        </p>
                                    </p>
                                    {/* <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "-40px",
                    }}
                  >
                    <Icons.Class sx={{ color: "#FFA500" }} />
                    <p
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        Phone Number
                      </span>
                      <span style={{ fontSize: "14px" }}>
                        {/* {productDetails.subcategory} */}
                                    {/* something
                      </span>
                    </p>
                  </p> */}
                                    <p
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginTop: "-40px",
                                        }}
                                    >
                                        <Icons.DateRange sx={{ color: "#FFA500" }} />
                                        <p
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                marginLeft: "10px",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: "18px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Report Date
                                            </span>
                                            <span style={{ fontSize: "14px" }}>
                                                {moment(reviewedat).format("d-M-Y")}
                                            </span>
                                        </p>
                                    </p>
                                    {/* <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "-40px",
                    }}
                  >
                    <Icons.DateRange sx={{ color: "#FFA500" }} />
                    <p
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        Email
                      </span>
                      <span style={{ fontSize: "14px" }}>
                        {productDetails.email}
                      </span>
                    </p>
                  </p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div
                        style={{
                            backgroundColor: "white",
                            marginTop: "1%",
                            zIndex: 9999,
                            position: "relative",
                        }}
                    >
                        <h1
                            style={{
                                backgroundColor: "#76BA1B",
                                paddingLeft: "5px",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                fontSize: "18px",
                                color: "white",
                                marginTop: 0,
                            }}
                        >
                            Ad Description
                        </h1>
                        <p
                            style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                textAlign: "justify",
                                paddingButton: "40px",
                            }}
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    </div>

                    <div style={{ backgroundColor: "white" }}>
                        <h1
                            style={{
                                backgroundColor: "#76BA1B",
                                paddingLeft: "5px",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                fontSize: "18px",
                                color: "white",
                                marginTop: 0,
                            }}
                        >
                            User Info
                        </h1>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                borderRadius: "50%",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src="https://sb.kaleidousercontent.com/67418/800x533/c5b0716f3d/animals-0b6addc448f4ace0792ba4023cf06ede8efa67b15e748796ef7765ddeb45a6fb.jpg"
                                alt="UserPicture"
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                            />
                            <p>{username}</p>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                padding: "10px 15px 10px 15px",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                                <p style={{ display: "flex", alignItems: "center" }}>
                                    <Icons.LocalPhone
                                        style={{
                                            fontSize: "20px",
                                            color: "#FFA500",
                                            marginRight: "10px",
                                        }}
                                    />
                                    <span>{usernumber}</span>
                                </p>
                                <p style={{ display: "flex", alignItems: "center" }}>
                                    <Icons.LocationOnOutlined
                                        sx={{
                                            fontSize: "20px",
                                            color: "#FFA500",
                                            marginRight: "10px",
                                        }}
                                    />
                                    <span>{productaddress}</span>
                                </p>
                            </div>
                            <div>
                                <p style={{ display: "flex", alignItems: "center" }}>
                                    <Icons.Mail
                                        sx={{
                                            fontSize: "20px",
                                            color: "#FFA500",
                                            marginRight: "10px",
                                        }}
                                    />
                                    <span
                                        onClick={() => window.open(`mailto:${email}`)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        Contact Via Email
                                    </span>
                                </p>
                                <p></p>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            backgroundColor: "#76BA1B",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <h1
                            style={{
                                paddingLeft: "5px",
                                paddingTop: "5px",
                                paddingBottom: "5px",
                                fontSize: "20px",
                                color: "white",
                                marginTop: 0,
                            }}
                        >
                            Close
                        </h1>
                        <Box
                            sx={{
                                cursor: "pointer",
                                "&:hover": { backgroundColor: "white" },
                                borderRadius: "50%",
                                width: "40px",
                                height: "40px",
                                marginRight: "10px",
                                marginTop: "5px",
                            }}
                        >
                            <Icons.CloseOutlined
                                style={{
                                    fontSize: "40px",
                                    color: "red",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                }}
                                onClick={() => setOpen(false)}
                            />
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default ReportModal;



