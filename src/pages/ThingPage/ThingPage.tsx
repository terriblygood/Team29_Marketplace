import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  ImageWithZoom,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import axios from "axios";
import style from "./ThingPage.module.scss";
import type { ShortThingType, ThingType } from "../../types";
import SideBar from "../../components/SideBar/SideBar";
import WholePage from "../../components/WholePage/WholePage";
import MainContent from "../../components/MainContent/MainContent";
import Button from "../../components/Button/Button";
import { notifySuccess, notifyWarning } from "../../toasters";
import Modal from "../../components/Modal/Modal";
import UpdateThingForm from "../../components/UpdateThingForm/UpdateThingForm";
import { API } from "../../App";

export default function ThingPage(): JSX.Element {
  const [modalActive, setModalActive] = useState<boolean>(true);
  const initialThing = {
    // id: "1",
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

  const [thing, setThing] = useState<ShortThingType>(initialThing);

  const navigate = useNavigate();
  const params = useParams();

  const isAdmin = localStorage.getItem("isAdmin");
  const isAdminBool = isAdmin ? JSON.parse(isAdmin) || false : false;

  const getThing = async (): Promise<void> => {
    try {
      axios
        .get(`${API}/products/${params.id}`)
        // .get(`${API}/products/${params.id}`)
        .then((res) => setThing(res.data))
        .catch((err) => console.log("Ошибка получения информации о вещи", err));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteThing = async (): Promise<void> => {
    {
      try {
        const del = await axios.delete(
          `https://29-t1api.gortem.ru/products/${params.id}`
        );
        navigate("/");
        notifySuccess("Вещь успешно добавлена.");
      } catch (error) {
        console.log(error);
        notifyWarning("Пожалуйста, заполните все поля.");
      }
    }
  };

  useEffect(() => {
    getThing();
  }, []);

  return (
    <WholePage>
      <div className={style.mainContent}>
        <div className={style.topNaming}>
          <Button color="blue" onClick={() => navigate(-1)}>
            <span style={{ fontSize: "1.2rem" }}>{"<"} Назад</span>
          </Button>
          {isAdminBool ? (
            <>
              <Button color="danger" onClick={deleteThing}>
                Удалить товар
              </Button>
              <Button
                color="blue"
                onClick={() => setModalActive((prev) => !prev)}
              >
                Обновить товар
              </Button>
            </>
          ) : (
            <></>
          )}
          <Modal active={modalActive} setActive={setModalActive}>
            <UpdateThingForm
              setActive={setModalActive}
              initialThing={initialThing}
              id={params.id ?? ""}
            />
          </Modal>
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
            <h1>{thing.name.charAt(0).toUpperCase() + thing.name.slice(1)}</h1>

            <div className={style.category}>{thing.category}</div>
            <div className={style.oneLine}>{thing.size}</div>
            <div className={style.oneLine}>{thing.color}</div>
            <div className={style.oneLine}>Остаток: {thing.count} шт.</div>
            <div className={style.oneLine}>Стоимость: {thing.price} к.</div>

            <div className={style.address}>{thing.description}</div>
            {isAdminBool ? (
              <>
                {thing.count ? (
                  <Button color="green">Добавить в корзину</Button>
                ) : (
                  <h2>Товара нет в наличии</h2>
                )}
              </>
            ) : (
              <>
                {thing.count ? (
                  <Button color="green">Добавить в корзину</Button>
                ) : (
                  <h2>Товара нет в наличии</h2>
                )}
              </>
            )}
            <br />
          </MainContent>
        </div>
      </div>
    </WholePage>
  );
}
