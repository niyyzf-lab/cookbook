import React, { useState, useEffect } from "react";
import type { RecipeItem } from "~/help/typeHelps";
import { Icon } from "@iconify/react";
import { useInView } from "react-intersection-observer";

function ImgShow(props: { pic?: string; className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px 100px 0px",
  });

  useEffect(() => {
    if (inView) {
      const img = new Image();
      img.src = `https://images.weserv.nl/?url=${props.pic}@1w_1h_1q.webp`;

      img.onload = () => {
        setIsLoaded(true);
      };

      img.onerror = () => {
        setIsLoaded(false);
      };
    }
  }, [inView, props.pic]);

  return (
    <>
      <img
        className=" w-full h-full"
        src={
          isLoaded && inView
            ? `https://images.weserv.nl/?url=${props.pic}@600w_30q.webp`
            : undefined
        }
        alt=""
        ref={ref}
      />
      {!isLoaded && (
        <span className=" h-full w-full flex  items-center absolute  pl-[10px] ">
          <progress className="progress w-[calc(100%-20px)]"></progress>
        </span>
      )}
    </>
  );
}

function AvatarShow(props: { pic?: string; className?: string }) {
  const [isLoaded, setIsLoaded] = useState(true);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsLoaded(false);
  };

  // 检查 props.pic 是否存在，如果不存在就将 ownerFace 设置为空字符串
  const ownerFace = props.pic || "";

  return (
    <div>
      {isLoaded ? (
        <div className="avatar">
          <div className="w-12 rounded-full ring ring-primary ring-offset-base-100  ring-offset-2">
            {ownerFace ? (
              <img
                src={`https://images.weserv.nl/?url=${ownerFace}@100w_100h.webp`}
                alt=""
                onLoad={handleLoad}
                onError={handleError}
              />
            ) : (
              <img
                className={props.className}
                src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
                alt="默认图像"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="avatar">
          <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              className={props.className}
              src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
              alt="默认图像"
            />
          </div>
        </div>
      )}
    </div>
  );
}
//难度控件,传入简单，中等，困难，显示对应的图标
function DifficultyShow(props: { difficulty?: string }) {
  const { difficulty } = props;
  if (difficulty === "简单") {
    return (
      <>
        <Icon icon="ph:star-fill" />
      </>
    );
  } else if (difficulty === "普通") {
    return (
      <>
        <Icon icon="ph:star-fill" />
        <Icon icon="ph:star-fill" />
      </>
    );
  } else if (difficulty === "困难") {
    return (
      <>
        <Icon icon="ph:star-fill" />
        <Icon icon="ph:star-fill" />
        <Icon icon="ph:star-fill" />
      </>
    );
  } else {
    return (
      <>
        <Icon icon="ph:star-fill" />
      </>
    );
  }
}

//传入数字大于一万，显示单位万，大于1k，显示单位为千，否则显示原数字
function numFormat(num?: number) {
  if (!num) {
    return "?";
  }
  if (num > 10000) {
    return (num / 10000).toFixed(1) + "万";
  } else if (num > 1000) {
    return (num / 1000).toFixed(1) + "千";
  } else {
    return num;
  }
}
function RecipeCard(props: { recipeItem: RecipeItem }) {
  const { recipeItem } = props;
  return (
    <div className="card  bg-base-100 shadow-xl rounded-lg w-[calc(100%-10px)]">
      <figure className=" rounded-lg h-max min-h-[200px] relative">
        <ImgShow pic={recipeItem.pic} />
      </figure>
      <span className="absolute top-2 right-2">
        <AvatarShow pic={recipeItem.face} />
      </span>
      <span className=" text-red-400 text-lg bg-base-100/40 p-1 rounded-md  absolute top-2 left-2">
        <DifficultyShow difficulty={props.recipeItem.difficulty} />
      </span>

      <div className="card-body justify-star justify-items-start">
        <h2 className=" card-title">{recipeItem.name}</h2>
        <div className="flex flex-col">
          <div className="flex">
            <p>食材：</p>
            <div className="flex flex-wrap">
              {recipeItem.emojis
                ?.filter((item) => item !== null)
                .map((item, index) => (
                  <span key={index} className="text-2xl">
                    <Icon icon={item} />
                  </span>
                ))}
            </div>
          </div>
          <div className="flex gap-2 w-fit">
            <span className=" flex flex-col items-center ">
              {likeIcon()}
              {numFormat(recipeItem.stat?.like)}
            </span>
            <span className=" flex flex-col items-center ">
              {coinIcon()}
              {numFormat(recipeItem.stat?.coin)}
            </span>
            <span className=" flex flex-col items-center ">
              {favoriteIcon()}
              {numFormat(recipeItem.stat?.favorite)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  function favoriteIcon() {
    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        xmlns="http://www.w3.org/2000/svg"
        data-v-edb4b09a=""
        className=" text-yellow-400"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.8071 9.26152C18.7438 9.09915 17.7624 8.36846 17.3534 7.39421L15.4723 3.4972C14.8998 2.1982 13.1004 2.1982 12.4461 3.4972L10.6468 7.39421C10.1561 8.36846 9.25639 9.09915 8.19315 9.26152L3.94016 9.91102C2.63155 10.0734 2.05904 11.6972 3.04049 12.6714L6.23023 15.9189C6.96632 16.6496 7.29348 17.705 7.1299 18.7605L6.39381 23.307C6.14844 24.6872 7.62063 25.6614 8.84745 25.0119L12.4461 23.0634C13.4276 22.4951 14.6544 22.4951 15.6359 23.0634L19.2345 25.0119C20.4614 25.6614 21.8518 24.6872 21.6882 23.307L20.8703 18.7605C20.7051 17.705 21.0339 16.6496 21.77 15.9189L24.9597 12.6714C25.9412 11.6972 25.3687 10.0734 24.06 9.91102L19.8071 9.26152Z"
          fill="currentColor"
        ></path>
      </svg>
    );
  }

  function coinIcon() {
    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        xmlns="http://www.w3.org/2000/svg"
        data-v-36000414=""
        className=" text-red-400"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.045 25.5454C7.69377 25.5454 2.54504 20.3967 2.54504 14.0454C2.54504 7.69413 7.69377 2.54541 14.045 2.54541C20.3963 2.54541 25.545 7.69413 25.545 14.0454C25.545 17.0954 24.3334 20.0205 22.1768 22.1771C20.0201 24.3338 17.095 25.5454 14.045 25.5454ZM9.66202 6.81624H18.2761C18.825 6.81624 19.27 7.22183 19.27 7.72216C19.27 8.22248 18.825 8.62807 18.2761 8.62807H14.95V10.2903C17.989 10.4444 20.3766 12.9487 20.3855 15.9916V17.1995C20.3854 17.6997 19.9799 18.1052 19.4796 18.1052C18.9793 18.1052 18.5738 17.6997 18.5737 17.1995V15.9916C18.5667 13.9478 16.9882 12.2535 14.95 12.1022V20.5574C14.95 21.0577 14.5444 21.4633 14.0441 21.4633C13.5437 21.4633 13.1382 21.0577 13.1382 20.5574V12.1022C11.1 12.2535 9.52148 13.9478 9.51448 15.9916V17.1995C9.5144 17.6997 9.10883 18.1052 8.60856 18.1052C8.1083 18.1052 7.70273 17.6997 7.70265 17.1995V15.9916C7.71158 12.9487 10.0992 10.4444 13.1382 10.2903V8.62807H9.66202C9.11309 8.62807 8.66809 8.22248 8.66809 7.72216C8.66809 7.22183 9.11309 6.81624 9.66202 6.81624Z"
          fill="currentColor"
        ></path>
      </svg>
    );
  }

  function likeIcon() {
    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
        className=" text-red-400"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.77234 30.8573V11.7471H7.54573C5.50932 11.7471 3.85742 13.3931 3.85742 15.425V27.1794C3.85742 29.2112 5.50932 30.8573 7.54573 30.8573H9.77234ZM11.9902 30.8573V11.7054C14.9897 10.627 16.6942 7.8853 17.1055 3.33591C17.2666 1.55463 18.9633 0.814421 20.5803 1.59505C22.1847 2.36964 23.243 4.32583 23.243 6.93947C23.243 8.50265 23.0478 10.1054 22.6582 11.7471H29.7324C31.7739 11.7471 33.4289 13.402 33.4289 15.4435C33.4289 15.7416 33.3928 16.0386 33.3215 16.328L30.9883 25.7957C30.2558 28.7683 27.5894 30.8573 24.528 30.8573H11.9911H11.9902Z"
          fill="currentColor"
        ></path>
      </svg>
    );
  }
}

export default RecipeCard;
