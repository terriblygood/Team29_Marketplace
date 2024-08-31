import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import style from "./ThingPage.module.scss";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  ImageWithZoom,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import SideBar from "../../components/SideBar/SideBar";
import WholePage from "../../components/WholePage/WholePage";
import MainContent from "../../components/MainContent/MainContent";
import Button from "../../components/Button/Button";
import { notifySuccess, notifyWarning } from "../../toasters";
import Modal from "../../components/Modal/Modal";
import UpdateThingForm from "../../components/UpdateThingForm/UpdateThingForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addItemToCart, increaseQuantity } from "../../store/slices/cartSlice";
import { apiUrl } from "../../App";

// Маппинг русских категорий на английские
const categoryMap: { [key: string]: string } = {
  МЕРЧ: "MERCH",
  КАНЦЕЛЯРИЯ: "CHANCELLERY",
  ОДЕЖДА: "CLOTHES",
  // Добавьте другие категории по мере необходимости
};

export default function ThingPage(): JSX.Element {
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
  const [modalActive, setModalActive] = useState<boolean>(true);
  const [thing, setThing] = useState<any>(null);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const isAdmin = localStorage.getItem("isAdmin");
  const isAdminBool = isAdmin ? JSON.parse(isAdmin) || false : false;

  const getThing = async (): Promise<void> => {
    try {

      axios
        .get(`${apiUrl}/products/${params.id}`)
        
        .then((res) => setThing(res.data))
        .catch((err) => console.log("Ошибка получения информации о вещи", err));
    } catch (error) {
      // Обрабатываем ошибку
      console.error("Ошибка получения информации о вещи", error);
    }
  };

  const deleteThing = async (): Promise<void> => {
    {
      try {
        const del = await axios.delete(
          `${apiUrl}/products/${params.id}`
        );
        navigate("/");
        notifySuccess("Вещь успешно добавлена.");
      } catch (error) {
        console.log(error);
        notifyWarning("Пожалуйста, заполните все поля.");
      }
    }
  };

  const handleAddToCart = async () => {
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
    const existingCartItem = cartItems.find((item) => item.id === thing.id);

    if (!userId) {
      console.error("User ID not found or invalid");
      return;
    }

    const productType =
      categoryMap[thing.category.toUpperCase()] || thing.category;

    if (existingCartItem) {
      if (!existingCartItem.cartItemId) {
        console.error("Cart item ID is undefined. Cannot update cart item.");
        return;
      }

      try {
        const response = await axios.post(
          `${apiUrl}/carts/${existingCartItem.cartItemId}`,
          {
            count: existingCartItem.quantity + 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status !== 200) {
          console.error("Failed to update cart item:", response.data);
          return;
        }

        dispatch(increaseQuantity(thing.id));
      } catch (error) {
        console.error("Error updating cart item:", error);
      }
    } else {
      try {
        const payload = {
          consumerId: userId,
          productType: productType,
          productId: thing.id,
          count: 1,
        };
        console.log("Sending payload:", JSON.stringify(payload));
        const response = await axios.post(`${apiUrl}/carts/`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status !== 200) {
          console.error("Failed to add item to cart:", response.data);
          return;
        }

        const result = response.data;

        if (result.id) {
          dispatch(
            addItemToCart({
              ...thing,
              quantity: 1,
              cartItemId: result.id,
            })
          );
        } else {
          console.error("Response does not contain cartItemId:", result);
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  useEffect(() => {
    getThing();
  }, []);

  if (!thing) {
    return <div>Loading...</div>;
  }

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
          ) : null}
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
                totalSlides={3}
              >
                <Slider>
                  {photos.map((photo: string, index: number) => (
                    <Slide key={`img-${index}`} index={index}>
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
            {thing.count ? (
              <Button color="green" onClick={handleAddToCart}>
                Добавить в корзину
              </Button>
            ) : (
              <h2>Товара нет в наличии</h2>
            )}
          </MainContent>
        </div>
      </div>
    </WholePage>
  );
}