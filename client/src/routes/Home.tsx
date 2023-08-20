import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Global/Button";
import ImgButton from "../components/Global/imgButton";
import Modal from "../components/Setting/Modal";
import { textToSpeech } from "../lib/tts";
import { speechToText } from "../lib/stt";
import Logo from "./logo.jpg";
import ISHSlogo from "./ISHSlogo.png";
import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();
  const navigateTo = (path: string) => {
    navigate(path);
    console.log("Redirecting...");
  };

  const [modalOpen, setModalOpen] = useState(false);

  const init = async () => {
    await textToSpeech(
      "식품 정보, 유통기한, 분리배출 방법, 알레르기, 도움말, 설정 중 원하시는 기능을 말씀해주세요.",
      3
    );
    const getButton = async () => {
      const res1 = await speechToText(3000);
      switch (res1) {
        case "식품 정보":
        case "식품정보":
          await textToSpeech(
            "가공식품의 영양성분 및 식품 정보를 알고 싶으시다면 '가공식품', 음식점 메뉴의 영양성분을 알고 싶으시다면 '음식점'을 말씀해주세요.",
            3
          );
          const getNutrientsWhere = async () => {
            const res2 = await speechToText(3000);
            if (res2 === "가공식품" || res2 === "가공 식품") {
              await textToSpeech(
                "가공식품 영양정보 찾기 화면으로 이동합니다.",
                2
              );
              navigateTo("/nutrients");
            } else if (res2 === "음식점") {
              await textToSpeech(
                "음식점 메뉴 영양정보 찾기 화면으로 이동합니다.",
                2
              );
              navigateTo("/restaurant");
            } else {
              await textToSpeech("다시 한 번 말씀해 주시겠어요?", 2);
              await getNutrientsWhere();
            }
          };
          await getNutrientsWhere();
          break;

        case "유통기한":
          await textToSpeech("유통기한 찾기 화면으로 이동합니다.", 2);
          navigateTo("/expiration");
          break;

        case "분리배출":
        case "분리배출방법":
        case "분리배출 방법":
        case "재활용 방법":
        case "재활용방법":
        case "재활용":
          await textToSpeech("분리배출 방법 찾기 화면으로 이동합니다.", 2);
          navigateTo("/recycle");
          break;

        case "알레르기":
        case "알러지":
        case "알레르지":
          await textToSpeech("알레르기 유발 성분 찾기 화면으로 이동합니다.", 2);
          navigateTo("/allergy");
          break;

        case "도움말":
          await textToSpeech("도움말 화면으로 이동합니다.", 2);
          navigateTo("/help");
          break;

        case "설정":
          await textToSpeech("설정 화면으로 이동합니다.", 2);
          setModalOpen(true);
          break;

        default:
          await textToSpeech("다시 한 번 말씀해 주시겠어요?", 2);
          getButton();
          break;
      }
    };
    getButton();
  };

  useEffect(() => {
    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);

    init();

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return (
    <div>
      {modalOpen && <Modal setModalOpen={setModalOpen} homeInit={init} />}
      <div className={styles.line}>
        <ImgButton
          classname={styles.settingimg}
          onClick={() => null}
          //onClick={() => navigateTo("/settings")}
          imgSource="setting"
          imgclassname={styles.decoimgbtn}
        />
      </div>

      <div className={styles.aboutlogo}>
        <ImgButton
          classname={styles.backcolor}
          imgclassname={styles.titleimage}
          imgSource={Logo}
          onClick={() => navigateTo("/help")}
        />
      </div>
      <div>
        <div className={styles.divbtnone}>
          <Button
            classname={styles.myButtonone}
            text="식품정보"
            onClick={() => null}
            //onClick={() => navigateTo("/nutrients")}
          />

          <Button
            classname={styles.myButtontwo}
            text="유통기한"
            onClick={() => null}
            //onClick={() => navigateTo("/expiration")}
          />
        </div>
        <div className={styles.divbtntwo}>
          <Button
            classname={styles.myButtonone}
            text="분리배출"
            onClick={() => null}
            //onClick={() => navigateTo("/recycle")}
          />

          <Button
            classname={styles.myButtontwo}
            text="알레르기"
            onClick={() => null}
            //onClick={() => navigateTo("/allergy")}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h6 style={{ margin: "0px" }}>
          시각장애인용 모드입니다. 버튼이 눌리지 않습니다.
        </h6>
      </div>
    </div>
  );
}

export default Home;
