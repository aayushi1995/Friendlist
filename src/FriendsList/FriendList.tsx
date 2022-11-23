import React, { useState } from "react";
import "./FriendList.styles.css";

const handleSort = (list: any) => {
  let fav: any = [];
  let nonfav: any = [];
  list?.forEach((object: any) => {
    if (object.isFavourite) {
      fav.push(object);
    } else {
      nonfav.push(object);
    }
  });
  return [...fav, ...nonfav];
};

const FriendsList = () => {
  const [inputText, setInputText] = useState("");
  const [list, setList] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState({
    isShow: false,
    message: "",
    isError: false
  });

  let handleOnChange = (event: any) => {
    setInputText(event.target.value);
  };

  let handleSubmit = () => {
    if (inputText !== "") {
      let object = {
        id: list.length + 1,
        name: inputText,
        isFavourite: false
      };
      let newList = [...list, object];
      setList(newList);
      setInputText("");
    } else {
      setToastMessage({
        isShow: true,
        message: "Cannot Add Empty Name",
        isError: true
      });
      setTimeout(() => {
        setToastMessage({
          message: ``,
          isError: false,
          isShow: false
        });
      }, 5000);
    }
  };

  const handleFavourite = (id: number, favouriteStatus: boolean) => {
    let findTheIndex = list.findIndex((o, index) => o.id === id);
    let newList = [...list];
    newList[findTheIndex] = {
      ...newList[findTheIndex],
      isFavourite: favouriteStatus
    };
    let sortedList = handleSort(newList);
    setList(sortedList);
    setToastMessage({
      isShow: true,
      message: `${newList[findTheIndex].name} is ${
        favouriteStatus ? `marked as favourite!` : `removed from favourites!`
      } `,
      isError: false
    });
    setTimeout(() => {
      setToastMessage({
        message: ``,
        isError: false,
        isShow: false
      });
    }, 5000);
  };

  const handleDelete = (id: number) => {
    let NewList: any[] = [];
    let name;

    list.forEach((object: any) => {
      if (object.id !== id) {
        NewList.push(object);
      } else {
        name = object.name;
      }
    });
    setList(NewList);
    setToastMessage({
      isShow: true,
      message: `${name} is successfully deleted!`,
      isError: false
    });
    setTimeout(() => {
      setToastMessage({
        message: ``,
        isError: false,
        isShow: false
      });
    }, 5000);
  };

  return (
    <div className="MainContainer">
      <div className="toastMessage">
        <div
          className={
            toastMessage.isShow
              ? `${
                  toastMessage.isError ? `RedToast` : `GreenToast`
                } toast showToast`
              : `toast removeToast`
          }
        >
          {toastMessage.message}
        </div>
      </div>
      <div className="Container">
        <div className="Title">FriendList</div>
        <div className="SearchBoxContainer">
          <input
            className="SearchBox"
            type="text"
            onChange={handleOnChange}
            value={inputText}
            tabIndex={0}
            onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="AddFriendButton commonButtonStyle"
          >
            Add Friend
          </button>
        </div>
        <div className="FriendListContainer">
          {list.map((object: any) => (
            <div className="FriendContainer" key={object.id} id={object.id}>
              <span className="FriendName" key={object.id}>
                {object.name}
              </span>
              <div className="FriendButtonContainer">
                <button
                  className=" commonButtonStyle FavouriteButton"
                  onClick={() =>
                    handleFavourite(object.id, !object.isFavourite)
                  }
                >
                  {object.isFavourite ? (
                    <span>&#9733;</span>
                  ) : (
                    <span>&#9734;</span>
                  )}
                </button>
                <button
                  className=" commonButtonStyle DeleteButton"
                  onClick={() => handleDelete(object.id)}
                >
                  <span>X</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
