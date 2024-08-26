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
  id: '',
  name: '',
  description: '',
  color: '',
  size: '',
  count: 0,
  price: 0,
  category: '',
  brand: '',
  };

  const [thing, setThing] = useState<ThingType>(initialThing);
  const [modalActive1, setModalActive1] = useState<boolean>(true);
  const [modalActive2, setModalActive2] = useState<boolean>(true);
  const [initiate, setInitiate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const params = useParams();

  return (
    <WholePage>
      <div className={style.mainContent}>
        <div className={style.topNaming}>
          <Button link onClick={() => navigate(-1)}>
            <span style={{ fontSize: "1.2rem" }}>{"<"} Назад</span>
          </Button>

          <h1>{thing.name}</h1>

          {thing.issue && <h2 style={{ color: "red" }}>{thing.issue}</h2>}
          {!thing.isApproved && !thing.issue?.length && (
            <h2 style={{ color: "orange" }}>Вещь пока на модерации</h2>
          )}

          <div className={style.category}>{thing.category}</div>
        </div>
        <div className={style.mainWrapper}>
          <SideBar>
            <div className={`${style.photoBlock}`}>
              <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={100}
                totalSlides={thing.Photos.length}
              >
                <Slider>
                  {thing.Photos.map((photo, index) => (
                    <Slide key={`img-${photo.id}`} index={index}>
                      <ImageWithZoom
                        className={`${style.photo}`}
                        src={`${import.meta.env.VITE_THINGS}/${photo.photoUrl}`}
                        alt="Штанi"
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
            <div className={style.marginTop}>
              {/* <div className={style.topNaming}>
              
            </div> */}
            </div>

            <div className={style.oneLine}>
              {/* Осталось {getRemainigTime(thing.endDate)} */}

              {/* <ChipInline color="good">
                осталось {getRemainigTime(thing.endDate)}
              </ChipInline> */}
              <div className={style.ownerName}>
                <img
                  className={style.icon}
                  src="/assets/icons/ava-empty-olive.svg"
                  alt="svg"
                />
                {thing.User.lastName
                  ? `${thing.User.firstName} ${thing.User.lastName}`
                  : `${thing.User.firstName}`}
              </div>
            </div>

            <div className={style.address}>{thing.description}</div>
            <br />
            <div className={style.address}>{thing.thingAddress}</div>

            <div className={`${style.buttonDiv}`}>
              {user.id !== thing.userId && !initiate && (
                <Button
                  // className={`${style.button}`}
                  onClick={() => setModalActive1((prev) => !prev)}
                >
                  Давай меняться
                </Button>
              )}
              {user.id !== thing.userId && initiate && (
                <Chip>Вы уже предложили обмен</Chip>
              )}
              {user.id !== 0 && user.id === thing.userId ? (
                <Button onClick={() => setModalActive2((prev) => !prev)}>
                  Изменить
                </Button>
              ) : (
                <> </>
              )}
            </div>
            {user.id !== thing.userId && thing.id ? (
              <OtherThings thing={thing} />
            ) : (
              <div />
            )}
            <Modal active={modalActive1} setActive={setModalActive1}>
              <InitChange thingId={thing.id} setActive={setModalActive1} />
            </Modal>
            <Modal active={modalActive2} setActive={setModalActive2}>
              <ThingUpdateForm
                thing={thing}
                setThing={setThing}
                setActive={setModalActive2}
              />
              {/* <ThingUpdateForm thingId={thing.id}  initialThing={initialThing} />  */}
            </Modal>
          </MainContent>
        </div>
        {/* <div className={`${style.post}`}>
        <div className={`${style.mainContent}`}>
          <div className={`${style.addContent}`}>
            <div className={`${style.description}`}>{thing.description}</div>
            
            
          </div>
        </div>

      </div> */}
      </div>
    </WholePage>
  );
}
