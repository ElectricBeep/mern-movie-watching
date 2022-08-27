import { useRef, useState } from "react";
import { useContext } from "react";
import Footer from "../../components/footer/Footer";
import ListItem from "../../components/listItem/ListItem";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./myList.scss";
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";

const MyList = () => {
    const { user: contextUser } = useContext(AuthContext);

    //For moving list
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);

    const clickLimit = window.innerWidth / 230;

    const listRef = useRef();

    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
        }
        if (direction === "right" && slideNumber < 10 - clickLimit) {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
        }
    };

    return (
        <>
            <Navbar />
            <div className="myList">
                <div className="myListTitleWrapper">
                    <span className="myListTitle">Your List</span>
                    <div className="myListText">
                        Here you can see all of the movies and series you addded to your list.
                    </div>
                </div>
                <div className="myListWrapper">
                    {contextUser.likedMovies?.lenght > 3 && (
                        <ArrowBackIosNewOutlined
                            className="sliderArrow left"
                            onClick={() => handleClick("left")}
                            style={{ display: !isMoved && "none" }}
                        />
                    )}
                    <div className="myListMovie" ref={listRef}>
                        {contextUser.likedMovies?.map((item, i) => (
                            <ListItem key={i} index={i} item={item} type={"mylist"} />
                        ))}
                    </div>
                    {contextUser.likedMovies?.lenght > 3 && (
                        <ArrowForwardIosOutlined
                            className="sliderArrow right"
                            onClick={() => handleClick("right")}
                        />
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default MyList