import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  ImageWithZoom,
} from "pure-react-carousel";
// import { GeolocationControl, Map, Placemark } from "@pbe/react-yandex-maps";
import "pure-react-carousel/dist/react-carousel.es.css";
import axios from "axios";
import style from "./ThingPage.module.css";
import type { ThingType } from "../../types";
import Modal from "../../components/Modal/Modal";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import InitChange from "../../components/ChangeHandlers/InitChange/InitChange";
// import { fetchGetNot } from "../../redux/user/userThunkActions";
// import ThingUpdateForm from "../../components/ChangeHandlers/ThingUpdateForm/ThingUpdateForm";
import SideBar from "../../components/SideBar/SideBar";
import WholePage from "../../components/WholePage/WholePage";
import MainContent from "../../components/MainContent/MainContent";
import Button from "../../components/Button/Button";
// import OtherThings from "../../components/OtherThings/OtherThings";
// import getRemainigTime from "../../service/getRemainigTime";
// import Chip from "../../components/Shared/Chip/Chip";
// import Spinner from "../../components/Widgets/Spinner/Spinner";
// import ChipInline from "../../components/Shared/ChipInline/ChipInline";

// type ByMeDealsType = {
//   id: number;
//   thingId: number;
//   status: number;
// };

export default function ThingPage(): JSX.Element {
  const initialThing = {
    id: "1",
    name: "Худи",
    description:
      "Свитер или свитшот из мягкого хлопчатобумажного трикотажа или флиса с капюшоном, а также боковыми скрытыми карманами. Также худи сходно с анораком — лёгкой курткой с капюшоном, тоже надеваемой через голову; как и анорак, может иметь большие накладные карманы- «кенгурятники» спереди и шнуровку-утяжку на капюшоне.",
    color: "Красный",
    size: "XL",
    count: 5,
    price: 2999,
    category: "Одежда",
    brand: "Т1",
  };

  const photos = [
    "https://cs11.livemaster.ru/storage/topic/NxN/dd/09/006b5d7549a09593848407108dd007a761b59h.jpg?h=bMOxW3ehKy7BwHkCdAfizQ",
    "https://avatars.mds.yandex.net/i?id=4075d77f357980cdd6ba7df20b0af09d_l-12626686-images-thumbs&n=13",
    "https://avatars.mds.yandex.net/i?id=7426e9da9d5da6df81f5c0dee6d38eec_l-5241638-images-thumbs&n=13",
  ];

  const [thing, setThing] = useState<ThingType>(initialThing);

  const navigate = useNavigate();
  const params = useParams();

  const getUser = async (): Promise<void> => {
    try {
      axios
        .get(`https://29-t1api.gortem.ru/products/${params.id}`)
        .then((res) => setThing(res.data))
        .catch((err) => console.log("Ошибка получения информации о вещи", err));
    } catch (error) {
      console.log(error);
    }
  };
  getUser();

  return (
    <WholePage>
      <div className={style.mainContent}>
        <div className={style.topNaming}>
          <Button link onClick={() => navigate(-1)}>
            <span style={{ fontSize: "1.2rem" }}>{"<"} Назад</span>
          </Button>
        </div>
        <div className={style.mainWrapper}>
          <SideBar>
            <div className={`${style.photoBlock}`}>
              <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={100}
                // totalSlides={thing.Photos.length}
                totalSlides={3}
              >
                {/* <Slider>
                  {thing.Photos.map((photo, index) => (
                    <Slide key={`img-${photo.id}`} index={index}>
                    <ImageWithZoom
                    className={`${style.photo}`}
                    src={`${import.meta.env.VITE_THINGS}/${photo.photoUrl}`}
                    alt="Вещь"
                    />
                    </Slide>
                    ))}
                    </Slider> */}
                <Slider>
                  {photos.map((photo, index) => (
                    <Slide key={`img-${photo}`} index={index}>
                      <ImageWithZoom
                        className={`${style.photo}`}
                        src={photo}
                        alt="Вещь"
                      />
                    </Slide>
                  ))}
                </Slider>
                <ButtonBack>Back</ButtonBack>
                <ButtonNext>Next</ButtonNext>
              </CarouselProvider>
            </div>
          </SideBar>
          <MainContent>
            <h1>{thing.name}</h1>

            <div className={style.category}>{thing.category}</div>
            <div className={style.oneLine}></div>

            <div className={style.address}>{thing.description}</div>
            <br />
          </MainContent>
        </div>
      </div>
    </WholePage>
  );
}
