import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { textToSpeech } from "../../js/tts";
import styles from "./Help.module.css";
import { speechToText } from "../../js/stt";
import { explainApp, explainBtn } from "../../js/readHelp";
import { positiveResponse } from "../../js/sttHandle";

function Help() {
  const navigate = useNavigate();
  const navigateTo = (path, params) => {
    navigate(path, { state: params });
    console.log("Redirecting...");
  };

  useEffect(() => {
    const readHelp = async () => {
      await explainBtn();

      await textToSpeech(
        "이 앱의 개발자와 이 앱의 개발 배경에 대해 설명해드릴까요?",
        1
      );
      const userRes = await speechToText(3000);
      if (positiveResponse.has(userRes)) {
        await explainApp();
      }
      await textToSpeech("다시 들려드릴까요?", 1);
      const userResult = await speechToText(3000);
      if (positiveResponse.has(userResult)) {
        readHelp();
      } else {
        await textToSpeech("첫 화면으로 돌아갑니다.", 1);
        navigateTo("/home");
      }
    };

    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);

    readHelp();

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return (
    <div className={styles.center}>
      <h1 className={styles.prettytext}> 도움말 </h1>
      <div>
        <h2 className={styles.btnhad}>앱 기능</h2>

        <div className={styles.decodiv}>
          <div>
            <li className={styles.decoli}>식품정보</li>
            <ul className={styles.decoul}>
              <li className={styles.nutri}>가공식품</li>
              <p className={styles.pmargin}>
                카메라를 이용해 가공 식품 표면을 촬영하며 식품 표면의
                품목보고번호를 인식시키면 해당식품에 대한 영양성분과 일일 적정
                섭취량 등의 정보 제공
              </p>
              <li className={styles.nutri}>음식점</li>
              <p className={styles.pmargin}>
                시중 음식점 브랜드명과 식품명을 음성으로 입력하면 해당 식품에
                대한 영양성분 정보 제공
              </p>
            </ul>
          </div>

          <div>
            <li className={styles.decoli}>유통기한</li>
            <p>
              카메라를 이용해 국내 가공 식품 표면의 유통기한을 인식시키면 식품의
              유통기한 정보 제공
            </p>
            <ul>
              <li className={styles.message}>
                유통기한이 지난 경우 :{" "}
                <span className={styles.clred}>경고메세지</span>
              </li>
              <li className={styles.message}>
                유통기한이 3일 이하로 남은 경우 :{" "}
                <span className={styles.clyellow}>주의메세지</span>
              </li>
              <li className={styles.message}>
                유통기한이 4일 이상으로 남은 경우 :{" "}
                <span className={styles.clgreen}>안심메세지</span>
              </li>
            </ul>
          </div>

          <div>
            <li className={styles.decoli}>재활용</li>
            <p>
              카메라를 이용해 가공 식품 표면의 재활용 마크를 인식시키면 해당
              식품 포장지의 분리배출 방법 정보 제공
            </p>
          </div>

          <div>
            <li className={styles.decoli}>설정</li>
            <p>음성 속도 조절 및 시각장애인 모드&비시각장애인 모드 전환 가능</p>
          </div>
          <hr className={styles.decohr} />
        </div>

        <h2 className={styles.btnhad}>앱 소개</h2>
        <div className={styles.decodiv}>
          <h3 className={styles.decohthree}>
            개발자 | 인천과학고등학교 29기 이우진, 김민재, 김보경
            <br />
            로고 디자인 | 인천과학고등학교 29기 이하늘, 김보경
          </h3>

          <p className={styles.psize}>
            이 앱은 시각장애인들이 음식에 들어있는 영양 성분을 알기 힘들어하는
            문제를 해결하기 위해 만들어졌습니다. <br /> 일반적으로
            시각장애인들은 텍스트를 읽어주는 휴대폰 앱을 사용해서 정보를 얻는데,
            그러나 대부분의 앱은 카메라로 읽은 텍스트를 처리없이 그대로 읽어주기
            때문에 정보를 이해하는 데 어려움이 있을 수 있습니다. <br /> 그래서
            이 앱은 가공식품에 나타나있는 품목보고번호를 이용해서 선택적으로
            정보를 제공합니다.
            <br /> 예를 들어, 과자봉지의 품목보고번호를 인식하면 그 과자에 대한
            영양 성분 정보를 알려줄 수 있습니다.
            <br /> 또한, 봉지 과자와 같은 경우에는 형태를 통해서 어떤 종류의
            과자인지 구분하기 어려울 수 있습니다. <br /> 그래서 이 앱은 그
            과자의 이름과 과자에 대한 설명도 함께 제공합니다.
            <br /> 그리고, 시각장애인들 뿐만 아니라 비장애인도 쉽게 알 수 없는
            일반적인 음식점 메뉴의 영양 성분 정보도 제공합니다.
            <br />
            마지막으로, 시각장애인들은 유통기한을 확인하는 것에 어려움이 때문에
            이 앱은 유통기한에 대한 정보도 제공합니다.
            <br /> 이렇게 개발된 이 앱은 시각장애인들이 음식을 선택할 때 더
            편리하고 효과적으로 도와줄 수 있습니다.
            <br />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Help;
