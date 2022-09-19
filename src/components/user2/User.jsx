import React from "react";

import { Link } from "react-router-dom";

import Carousel from "./Carousel.jsx";

import Card from "./Card.jsx";
import "../../App.css";
import bg from "./img/bg.jpg";
import footer_bg from "./img/footer_bg3.jpg";
import cardBg from "./img/card_bg.jpg";
import bngLogo from "./img/BNG_logo2.png";

import ads from "./img/ads.jpg";
import ads2 from "./img/ads2_real.png";

import social1 from "./img/fb_logo.png";
import social2 from "./img/line.webp";
import social3 from "./img/website.png";
import social4 from "./img/gmail.png";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import HelpIcon from "@mui/icons-material/Help";
import LaptopIcon from "@mui/icons-material/Laptop";
import GavelIcon from "@mui/icons-material/Gavel";

import ScrollAnimationItem from "react-scroll-fade-animation";

function User() {
  return (
    <div className="bg-blue-gray-50 fontFamilyKanit">
      <nav className="flex justify-between w-full h-14 z-10 bg-white fixed top-0 shadow-lg overflow-hidden">
        <Link to="/">
          <img src={bngLogo} alt="logo" className="flex md:block ml-5 h-full" />
        </Link>
        <div className="flex md:block self-center mr-5 w-max gap-4">
          <Link to="/user">
            <button className="py-2 px-5 text-white bg-sky-400 rounded-md  shadow-md hover:bg-sky-500">
              ลงทะเบียน
            </button>
          </Link>
        </div>
      </nav>

      <div className="flex w-full mt-14">
        <div className="w-full block text-center">
          <Carousel />
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        {/* content */}

        <div className="w-full container  ">
          <h6
            className="md:ml-12 md:text-left text-2xl md:text-4xl font-bold mt-3 lg:mt-8"
            style={{ color: "#486cb7" }}
          >
            เลือกการกู้เงินที่ใช่สำหรับคุณ
          </h6>
        </div>
        <div className="md:flex w-full container">
          <div className=" flex p-2 w-full md:w-1/2  ">
            <ScrollAnimationItem
              path={"right"}
              delay={300}
              duration={1500}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={ads}
                alt="ads"
                className="rounded-md  max-w-auto mx-auto"
              />
            </ScrollAnimationItem>
          </div>
          <div className="w-full block self-center md:w-1/2 ">
            <blockquote className="p-2 text-left">
              <h1 className="text-xl text-black font-bold">
                ทำไมถึงควรกู้กับเรา?
              </h1>
              <p className="text-sm md:text-lg mt-3  ">
                ในสถานการณ์ปัจจุบัน มีเว็บไซต์กู้เงินให้เลือกเป็นจำนวนมาก <br />
                <b>แต่</b>มีเว็บที่ไม่ขึ้นตรงกับองค์กรเป็นจำนวนมาก หรือ
                มีการขอข้อมลเยอะเกินไป ไม่ว่าจะเป็นคนค้ำประกัน <br />
                <br />
                <b>ซึ่ง</b>ไม่ใช่กับเว็บไซต์เรา <b>BNG</b> ของเรานั้น
                ลงทะเบียนง่ายๆภายในไม่กี่นาที ขออนุมัติการเงินง่าย
                ไม่จำเป็นต้องมีคนค้ำประกัน ไม่จำเป็นต้องมีข้อมูลทางการเงิน
                เพียงแค่บัตรประชาชนใบเดียวเท่านั้น สามารถยื่นกู้ได้อย่างง่ายดาย
              </p>
            </blockquote>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://lin.ee/LtrrqGM"
              className="mx-auto flex justify-center"
            >
              <button className="animate-bounce h-16 w-56 px-6 mx-auto mt-7 lg:mt-16 fontFamilyKanit text-lg rounded-md border-4 border-gray-400 text-sky-500 hover:text-sky-700 ">
                สอบถามข้อมูลเพิ่มเติม
              </button>
            </a>
            {/* <button  className="animate-bounce h-16 w-56 px-6 mx-auto mt-16 fontFamilyKanit text-lg rounded-md border-2 text-sky-500 hover:text-sky-700">สอบถามข้อมูลเพิ่มเติม</button> */}
          </div>
        </div>

        <div className="w-full container mt-10 ">
          <h6
            className="md:ml-12 md:text-left text-2xl md:text-4xl font-bold  mt-3 lg:mt-8"
            style={{ color: "#486cb7" }}
          >
            BNG คู่คิดธุรกิจรุ่นใหม่
          </h6>
        </div>
        <div className="md:flex w-full container bg-gray-100vs">
          <div className="block self-center w-full md:w-2/4 m-0  ">
            <blockquote className="text-left md:ml-14 p-4">
              <h1 className="text-xl text-black font-bold">ประวัติบริษัท</h1>
              <p className="text-sm md:text-lg mt-3  ">
                <b>บริษัท บีเอ็นจี จำกัด (มหาชน)</b> จดทะเบียน
              
                <br />
                จัดตั้งบริษัทเมื่อ
                <b>วันที่ 30 สิงหาคม 2555</b>
                <br /> โดยมีวัตถุประสงค์เพื่อ
                ประกอบธุรกิจสนับสนุนการค้าของลูกค้า โดยให้บริการสินเชื่อ
                หรือเงินกู้ พร้อมส่งเสริมสนับสนุนให้ ธุรกิจเดินหน้าก้าวไปสู่
                <br />
                ความสำเร็จหรือเพื่อต่อยอดในหน้าที่การงานที่ดึขึ้น
                <br />
                บริษัทของเราเป็น ที่เชื่อมั่น และไว้ใจ สำหรับการใช้บริการ
                <br />
                เป็นอย่างยิ่ง
              </p>
            </blockquote>
          </div>
          <div className="w-full md:w-1/4 my-auto p-5">
          <ScrollAnimationItem
              path={"right"}
              delay={1000}
              duration={2000}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p> บริษัทของเราเป็น ที่เชื่อมั่น และไว้ใจ สำหรับการใช้บริการ</p>
            </ScrollAnimationItem>
              
          </div>
          <div className=" flex justify-end p-2 w-full md:w-1/4 ">
          <ScrollAnimationItem
              path={"right"}
              delay={300}
              duration={2000}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
               <img src={ads2} className="w-full md:w-6/6" />
            </ScrollAnimationItem>
           
          </div>
        </div>
        <div className="w-full container">
          <h6
            className="md:ml-12 md:text-left text-2xl md:text-4xl font-bold"
            style={{ color: "#486cb7" }}
          >
            แผนการกู้ยืม
          </h6>
        </div>
        <div className="flex flex-wrap container justify-center m-5  ">
          <Card />
        </div>
        <div className="w-full container ">
          <h6 className=" md:ml-12 md:text-left text-2xl md:text-4xl font-bold text-black">
            เชื่อมั่นในเรา BNG จะช่วยเหลือทุกท่านด้วยใจ
          </h6>
        </div>
        <div className="container  p-5 grid gap-5 md:grid-cols-2 md:grid-rows-2 ">
          <div
            className="w-full p-5  rounded-md shadow-md "
            style={{
              backgroundImage: `url(${cardBg})`,
              backgroundSize: "cover",
            }}
          >
            <h1 className="text-black text-xl pt-10 ">
              มีประสบการณ์ดำเนินการธุรกิจสินเชื่อมากกว่า
              <br />
              <br />
              <br />
              <p className="text-5xl">10 ปี</p>
            </h1>
          </div>
          <div
            className="w-full p-5  rounded-md shadow-md"
            style={{
              backgroundImage: `url(${cardBg})`,
              backgroundSize: "cover",
            }}
          >
            <h1 className="text-black text-xl pt-10 ">
              สนับสนุนลูกค้าเงินกู้และ SMEs มากกว่า
              <br />
              <br />
              <br />
              <p className="text-5xl">3,000 ราย</p>
            </h1>
          </div>
          <div
            className="w-full p-5  rounded-md shadow-md"
            style={{
              backgroundImage: `url(${cardBg})`,
              backgroundSize: "cover",
            }}
          >
            <h1 className="text-black text-xl pt-10 ">
              ให้สินเชื่อไปแล้วมากกว่า
              <br />
              <br />
              <br />
              <p className="text-5xl">100 ล้านบาท</p>
            </h1>
          </div>
          <div
            className="w-full p-5  rounded-md shadow-md"
            style={{
              backgroundImage: `url(${cardBg})`,
              backgroundSize: "cover",
            }}
          >
            <h1 className="text-black text-xl pt-10 ">
              บริษัท บีเอ็นจี จำกัดมหาชน (BNG Corp.) จดทะเบียนในตลาดหลักทรัพย์
              <br />
              <br />
              <img src={bngLogo} className="w-28 mx-auto" />
            </h1>
          </div>
        </div>

        {/* contact_footer */}
        <footer
          className="bg-blue-gray-400"
          style={{
            backgroundImage: `url(${footer_bg})`,
            backgroundSize: "cover",
          }}
        >

          {/* desktop */}
          <div
            className="hidden container md:flex w-full m-0 p-0 "
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          >
            
            <div className="w-1/3 md:block text-white ml-5">
            <h6 className="text-white text-left text-2xl  font-bold m-0 mx-5 mt-4">
              ติดต่อเรา
            </h6>
              <div className="text-left">
                <img src={social1} className="w-5 md:w-14  mx-5 my-2 inline " />
                <a
                  className="inline text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://lin.ee/LtrrqGM"
                >
                  FACEBOOK
                </a>
              </div>
              <div className="text-left">
                <img
                  src={social2}
                  className="w-5 md:w-14   mx-5 my-2 inline "
                />
                <a
                  className="inline text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://lin.ee/LtrrqGM"
                >
                  LINE
                </a>
              </div>
              <div className="text-left">
                <img src={social3} className="w-5 md:w-14 mx-5 my-2 inline " />
                <a
                  className="inline text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://lin.ee/LtrrqGM"
                >
                  WEBSITE
                </a>
              </div>
              <div className="text-left">
                <img src={social4} className="w-5 md:w-14  mx-5 my-2 inline " />
                <a
                  className="inline text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://lin.ee/LtrrqGM"
                >
                  GMAIL
                </a>
              </div>
            </div>
            <div className=" px-5 py-10 mx-auto w-full md:w-1/3">
          <div className="flex flex-wrap w-full justify-center">
            <div className="border-purple-100 text-white border-2 rounded-sm bg-sky-800 p-0 md:p-2 w-full md:w-1/3 m-2 h-28">
              <div className="w-full text-center mx-auto mt-2">
                <RssFeedIcon fontSize="large" className="text-center" />
              </div>
              <p className="text-lg text-center">RSS</p>
            </div>
            <div className="border-purple-100 text-white border-2 rounded-sm bg-sky-800 p-0 md:p-2 w-full md:w-1/3 m-2 h-28">
              <div className="w-full text-center mx-auto mt-2">
                <HelpIcon fontSize="large" className="text-center" />
              </div>
              <p className="text-lg text-center">ข้อเสนอแนะ</p>
            </div>
            <div className="border-purple-100 text-white border-2 rounded-sm bg-sky-800 p-0 md:p-2 w-full md:w-1/3 m-2 h-28">
              <div className="w-full text-center mx-auto mt-2">
                <LaptopIcon fontSize="large" className="text-center" />
              </div>
              <p className="md:text-xs lg:text-md text-center mt-6">ระบบอินทราเน็ต</p>
            </div>
            <div className="border-purple-100 text-white border-2 rounded-sm bg-sky-800 p-0 md:p-2 w-full md:w-1/3 m-2 h-28">
              <div className="w-full text-center mx-auto mt-2 ">
                <GavelIcon fontSize="large" className="text-center" />
              </div>
              <p className="text-xs text-center mt-6">สินเชื่อที่เกี่ยวข้อง</p>
            </div>
          </div>
        </div>
            <div className="w-full self-center flex md:w-1/3 md:block ">
              {/* <img src={logo} className="w-1/4 m-5 " /> */}
              <div className="flex justify-end  ">
                <img src={bngLogo} className="w-2/4 m-5 " />
              </div>
              <div className="block text-right text-white mr-5">
                <p className="p-0 m-1">บริษัท บีเอ็นจี จำกัด (มหาชน)</p>
                <p className="p-0 m-1">
                  บริการสินเชื่อที่จะดูแลคุณตลอดเวลา 24 ชั่วโมง
                </p>
                <p className="p-0 m-1">
                  ให้วงเงินสูงที่สุดในประเทศไทย ถึง 5 ล้านบาท
                </p>
                <p className="p-0 m-1">กู้ง่าย จ่ายไว ภายใน 10 นาทีเท่านั้น</p>
              </div>
            </div>
          </div>

          {/* mobile */}
          <div
            className="md:hidden container block "
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          >
            <div className="flex justify-center ">
              <img src={bngLogo} alt="logo" className="block w-1/2" />
            </div>
            <div className="block text-white mb-2 ">
              <p className="text-xs ">
                บริษัท บีเอ็นจี จำกัด (มหาชน)
                <br />
                บริการสินเชื่อที่จะดูแลคุณตลอดเวลา 24 ชั่วโมง
                <br />
                ให้วงเงินสูงที่สุดในประเทศไทย ถึง 5 ล้านบาท
                <br />
                กู้ง่าย จ่ายไว ภายใน 10 นาทีเท่านั้น
                <br />
              </p>
            </div>
            <div className="w-full flex gap-4 justify-center p-3 text-white">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://lin.ee/LtrrqGM"
              >
                <img src={social1} className="w-10 shadow-sm" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://lin.ee/LtrrqGM"
              >
                <img src={social2} className="w-10 shadow-sm" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://lin.ee/LtrrqGM"
              >
                <img src={social3} className="w-10 shadow-sm" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://lin.ee/LtrrqGM"
              >
                <img src={social4} className="w-10 shadow-sm" />
              </a>
            </div>
          </div>

          <div
            className="text-white text-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
          >
            <p className="text-xs">© 2017 BNG.COM. ALL RIGHTS RESERVED.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default User;
