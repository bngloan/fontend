import React,{useEffect,useState} from "react";
import entersiteimg from "../../image/bgblur.webp";
import imgaeprofilepng from "../../image/blank_profile.png";
import { Divider } from "@mui/material";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import ImageIcon from "@mui/icons-material/Image";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Modal } from "antd";
import configapi from '../../config/configapi'

function Nav5info({userdata}) {
  const [imageprofile, setImageprofile] = useState({});
  const [imagefront,setImagefront] = useState({});
  const [imageback,setImageback] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indeximg,setIndeximg] = useState(0);  

  const showModal = (index) => {
    setIndeximg(index);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if(userdata!=null){
      setImageprofile(userdata.imageprofile!==null?`${configapi.API_SERVER}${userdata.imageprofile}`:null);
      setImagefront(userdata.imagefront!==null?`${configapi.API_SERVER}${userdata.imagefront}`:null);
      setImageback(userdata.imageback!==null?`${configapi.API_SERVER}${userdata.imageback}`:null);
    }
  }, [userdata]);

  

  return (
    <div>
      <div
        className="h-32 md:h-52 text-center flex items-center justify-center bg-image"
        style={{
          backgroundImage: `url(${entersiteimg})`,
        }}
      >
        <p className=" my-auto bg-text w-full    drop-shadow-lg">ข้อมูลส่วนตัว</p>
      </div>
      <div className="h-1 bg-orange-400 w-full"></div>
      <div className="py-2 md:py-8 px-1 md:px-8 lg:px-20">
        <div className="rounded-md shadow-md p-1 md:p-5 w-full md:w-5/6 lg:w-4/6 mx-0 md:mx-auto bg-white">
          <div className="w-full md:flex">
            <div className="w-full md:w-1/2 py-7 shadow-lg rounded-md">
              <img
                src={imageprofile ? imageprofile : imgaeprofilepng}
                style={{ width: "130px", height: "130px" }}
                alt="nice"
                className="rounded-full border-2 border-black mx-auto"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = imageprofile; // prevents looping
                  currentTarget.src = imgaeprofilepng;
                }}
              />
              <Divider sx={{ my: 1, mx: 4 }} />
              <div className="flex px-8 justify-between ">
                <p className="text-sm text-gray-600 my-auto">ชื่อ</p>
                <p className="text-xs md:text-sm font-bold  my-auto max-w-sm truncate">
                  {userdata!==null?userdata.firstname:'-'}
                </p>
              </div>
              <Divider sx={{ my: 1, mx: 4 }} />
              <div className="flex px-8 justify-between">
                <p className="text-sm text-gray-600 my-auto">นามสกุล</p>
                <p className="text-xs md:text-sm font-bold  my-auto max-w-sm truncate pl-2">
                {userdata!==null?userdata.lastname:'-'}
                </p>
              </div>
              <Divider sx={{ my: 1, mx: 4 }} />
              <div className="flex px-8 justify-between">
                <p className="text-sm text-gray-600 my-auto">เบอร์โทร</p>
                <p className="text-xs md:text-sm font-bold  my-auto max-w-sm truncate">
                {userdata!==null?userdata.phone:'-'}
                </p>
              </div>
              <Divider sx={{ my: 1, mx: 4 }} />
              <div className="flex px-8 justify-between">
                <p className="text-sm text-gray-600 my-auto w-1/6">ที่อยู่</p>
                <p className="text-xs md:text-sm font-bold  my-auto max-w-sm w-5/6 px-0 py-2 text-right">
                {userdata!==null?userdata.useraddress:'-'}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <div className="text-center">
                <button
                  onClick={()=>showModal(0)}
                  className="px-7 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-white my-1"
                >
                  <ImageIcon className="my-auto mr-3" fontSize="small" />{" "}
                  ดูบัตรประชาชน (หน้า)
                </button>
                <button
                  onClick={()=>showModal(1)}
                  className="px-7 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-white my-1"
                >
                  <CollectionsIcon className="my-auto mr-3" fontSize="small" />{" "}
                  ดูบัตรประชาชน (หลัง)
                </button>
              </div>
              <div className="mt-10 text-center">
                <p className="text-red-500 ">***หากพบปัญหา,ลืมรหัสผ่านหรือต้องการเปลี่ยนรหัสผ่าน<br/>โปรดติดต่อเจ้าหน้าที่</p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://lin.ee/LtrrqGM"
                  className="mx-auto flex justify-center"
                >
                  <button className="px-7 py-3 bg-green-600 hover:bg-green-900 rounded-lg text-white ">
                    <MarkUnreadChatAltIcon
                      className="my-auto mr-3"
                      fontSize="small"
                    />{" "}
                    ติดต่อเจ้าหน้าที่
                  </button>
                </a>
              </div>
            </div>
            <Modal
        style={{
          top: 5,
        }}
        title={indeximg===0?"บัตรประชาชน ( หน้า )":"บัตรประชาชน ( หลัง )"}
        visible={isModalOpen}
        onCancel={showModal}
        footer={null}
      >
        <div className="flex-col justify-center">
            <p className="text-center text-red-500 text-xs md:text-lg">***โปรดระวัง!!!! อย่าเปิดเผยข้อมูลส่วนตัวกับบุคคลอื่น เพื่อป้องกันการถูกสวมรอย</p>
          {indeximg===0?<>
            {imagefront ? (
            <img
              src={imagefront && imagefront}
              style={{  height: "250px" }}
              alt="nice2"
              className="rounded-md mx-auto"
            />
          ) : (
            <p className="text-md font-semibold text-center">
              ไม่มีข้อมูลบัตรประชาชนด้านหน้าของคุณ
            </p>
          )}
          </>:<>
          {imageback ? (
            <img
              src={imageback && imageback}
              style={{  height: "250px" }}
              alt="nice2"
              className="rounded-md mx-auto"
            />
          ) : (
            <p className="text-md font-semibold text-center">
               ไม่มีข้อมูลบัตรประชาชนด้านหลังของคุณ
            </p>
          )}
          </>}
          
        </div>
      </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav5info;
