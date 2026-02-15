import { useState } from "react";
import image from "./image.svg";
import rectangle18 from "./rectangle-18.svg";
import vector2 from "./vector-2.svg";
import vector3 from "./vector-3.svg";
import vector4 from "./vector-4.svg";
import vector5 from "./vector-5.svg";
import vector6 from "./vector-6.svg";
import vector7 from "./vector-7.svg";
import vector8 from "./vector-8.svg";
import vector9 from "./vector-9.svg";
import vector10 from "./vector-10.svg";
import vector11 from "./vector-11.svg";
import vector12 from "./vector-12.svg";
import vector13 from "./vector-13.svg";
import vector14 from "./vector-14.svg";
import vector from "./vector.svg";

interface MetricCardData {
  title: string;
  value: string;
  unit: string;
  icon: string;
  position: {
    top: string;
    left: string;
  };
  titleSize: string;
  valueSize: string;
  unitSize: string;
  titlePosition: {
    top: string;
    left: string;
  };
  valuePosition: {
    top: string;
    left: string;
  };
  bgColor?: string;
  bgImage?: string;
}

interface DecorativeIcon {
  src: string;
  alt: string;
  style: {
    width: string;
    height: string;
    top: string;
    left: string;
  };
}

export const Frame = (): JSX.Element => {
  const [metrics] = useState<MetricCardData[]>([
    {
      title: "VELOCITY",
      value: "0.0",
      unit: "m/s",
      icon: vector2,
      position: { top: "134px", left: "63px" },
      titleSize: "text-[50px]",
      valueSize: "text-[85px]",
      unitSize: "text-3xl",
      titlePosition: { top: "156px", left: "87px" },
      valuePosition: { top: "213px", left: "135px" },
      bgColor: "bg-[#f566d6]",
    },
    {
      title: "ACCELERATION",
      value: "0.0",
      unit: "m/s²",
      icon: vector7,
      position: { top: "134px", left: "429px" },
      titleSize: "text-[35px]",
      valueSize: "text-[85px]",
      unitSize: "text-3xl",
      titlePosition: { top: "165px", left: "445px" },
      valuePosition: { top: "213px", left: "500px" },
      bgColor: "bg-[#f566d6]",
    },
    {
      title: "TEMPERATURE",
      value: "0.0",
      unit: "°C",
      icon: vector4,
      position: { top: "134px", left: "786px" },
      titleSize: "text-[35px]",
      valueSize: "text-[85px]",
      unitSize: "text-3xl",
      titlePosition: { top: "170px", left: "804px" },
      valuePosition: { top: "215px", left: "857px" },
      bgColor: "bg-[#f566d6]",
    },
    {
      title: "CURRENT",
      value: "0.0",
      unit: "amps",
      icon: vector3,
      position: { top: "404px", left: "229px" },
      titleSize: "text-[50px]",
      valueSize: "text-[85px]",
      unitSize: "text-[32px]",
      titlePosition: { top: "419px", left: "256px" },
      valuePosition: { top: "475px", left: "313px" },
      bgColor: "bg-[#f566d6]",
    },
    {
      title: "VOLTAGE",
      value: "0.0",
      unit: "volts",
      icon: vector6,
      position: { top: "404px", left: "634px" },
      titleSize: "text-[50px]",
      valueSize: "text-[85px]",
      unitSize: "text-3xl",
      titlePosition: { top: "417px", left: "666px" },
      valuePosition: { top: "479px", left: "714px" },
      bgImage: rectangle18,
    },
  ]);

  const decorativeIcons: DecorativeIcon[] = [
    {
      src: vector2,
      alt: "Vector",
      style: { width: "3.74%", height: "4.87%", top: "25.07%", left: "27.02%" },
    },
    {
      src: vector3,
      alt: "Vector",
      style: { width: "2.08%", height: "5.60%", top: "63.72%", left: "40.90%" },
    },
    {
      src: vector4,
      alt: "Vector",
      style: { width: "2.99%", height: "7.08%", top: "24.34%", left: "87.53%" },
    },
    {
      src: vector6,
      alt: "Vector",
      style: { width: "2.16%", height: "6.49%", top: "62.39%", left: "75.23%" },
    },
    {
      src: vector7,
      alt: "Vector",
      style: { width: "2.83%", height: "3.24%", top: "25.96%", left: "58.52%" },
    },
    {
      src: vector5,
      alt: "Vector",
      style: { width: "7.65%", height: "13.57%", top: "2.36%", left: "84.46%" },
    },
    {
      src: vector8,
      alt: "Vector",
      style: { width: "7.65%", height: "13.57%", top: "2.36%", left: "4.82%" },
    },
    {
      src: vector,
      alt: "Vector",
      style: {
        width: "6.23%",
        height: "11.06%",
        top: "79.96%",
        left: "85.89%",
      },
    },
    {
      src: vector13,
      alt: "Vector",
      style: { width: "5.32%", height: "10.42%", top: "4.90%", left: "22.79%" },
    },
    {
      src: vector9,
      alt: "Vector",
      style: { width: "5.53%", height: "9.82%", top: "62.83%", left: "7.23%" },
    },
    {
      src: image,
      alt: "Vector",
      style: { width: "5.26%", height: "9.33%", top: "3.98%", left: "67.41%" },
    },
    {
      src: vector14,
      alt: "Vector",
      style: { width: "5.26%", height: "9.33%", top: "80.83%", left: "12.47%" },
    },
    {
      src: vector10,
      alt: "Vector",
      style: {
        width: "4.57%",
        height: "11.06%",
        top: "88.79%",
        left: "46.97%",
      },
    },
  ];

  return (
    <main className="w-full min-w-[1203px] h-[678px] relative" role="main">
      <div
        className="absolute top-0 left-0 w-[1130px] h-[678px] bg-[#ffa9e2] aspect-[1.67]"
        aria-hidden="true"
      />

      <header className="absolute top-[22px] left-[400px] w-[376px] h-[78px] bg-[#cd4040] rounded-[20px] border-[5px] border-solid border-[#9d0707]">
        <h1 className="absolute top-[11px] left-[29px] [font-family:'Istok_Web-Regular',Helvetica] font-normal text-white text-[40px] tracking-[0] leading-[normal]">
          OPTIMISLAYTION
        </h1>
      </header>

      {metrics.map((metric, index) => (
        <section
          key={index}
          className="absolute w-[322px] h-[237px] rounded-[25px]"
          style={{
            top: metric.position.top,
            left: metric.position.left,
            ...(metric.bgColor && {
              backgroundColor: metric.bgColor
                .replace("bg-[", "")
                .replace("]", ""),
            }),
          }}
          aria-labelledby={`metric-title-${index}`}
        >
          {metric.bgImage && (
            <img
              className="absolute top-0 left-0 w-full h-full"
              alt=""
              src={metric.bgImage}
              aria-hidden="true"
            />
          )}
          <h2
            id={`metric-title-${index}`}
            className={`absolute w-[265px] [font-family:'Itim-Regular',Helvetica] font-normal text-white ${metric.titleSize} tracking-[0] leading-[normal]`}
            style={{
              top: `calc(${metric.titlePosition.top} - ${metric.position.top})`,
              left: `calc(${metric.titlePosition.left} - ${metric.position.left})`,
            }}
          >
            {metric.title}
          </h2>
          <p
            className={`absolute w-[179px] [font-family:'Pixelify_Sans-Bold',Helvetica] font-bold text-white ${metric.valueSize} text-center tracking-[0] leading-[normal]`}
            style={{
              top: `calc(${metric.valuePosition.top} - ${metric.position.top})`,
              left: `calc(${metric.valuePosition.left} - ${metric.position.left})`,
            }}
            aria-label={`${metric.title}: ${metric.value} ${metric.unit}`}
          >
            <span className="[font-family:'Pixelify_Sans-Bold',Helvetica] font-bold text-white text-[85px] tracking-[0]">
              {metric.value}
            </span>
            <span className="text-5xl">
              {" "}
              <br />
            </span>
            <span className={metric.unitSize}>{metric.unit}</span>
          </p>
        </section>
      ))}

      {decorativeIcons.map((icon, index) => (
        <img
          key={index}
          className="absolute"
          style={{
            width: icon.style.width,
            height: icon.style.height,
            top: icon.style.top,
            left: icon.style.left,
          }}
          alt={icon.alt}
          src={icon.src}
          aria-hidden="true"
        />
      ))}

      <div
        className="absolute w-[6.23%] h-[9.19%] top-[60.18%] left-[81.13%]"
        aria-hidden="true"
      >
        <img
          className="absolute w-[77.25%] h-full top-0 left-0"
          alt="Vector"
          src={vector11}
        />
        <img
          className="absolute w-[38.23%] h-[42.01%] top-[14.93%] left-[61.77%]"
          alt="Vector"
          src={vector12}
        />
      </div>
    </main>
  );
};
