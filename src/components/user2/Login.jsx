import React from "react";
import TabsRender from "./Tab.jsx";

import bngLogo from './img/BNG_logo2.png';
import login_bg from './img/login_bg2.jpg';
import { useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="lg:flex">
                <div className="lg:w-1/2 xl:max-w-screen-sm ">
                    <div className="py-1 bg-indigo-100 lg:bg-white hidden md:flex justify-center lg:justify-start lg:px-12" >
                        <div className="cursor-pointer mx-auto ">
                            <img src={bngLogo} className='w-36 ' onClick={() => navigate("/")} />
                        </div>
                        
                    </div>
                    <div className="py-1 bg-indigo-100 lg:bg-white flex md:hidden justify-center lg:justify-start lg:px-12" style={{backgroundImage: `url(${login_bg})`,backgroundSize:'cover',backgroundPosition:"center"}}>
                        <div className="cursor-pointer hidden md:flex mx-auto ">
                            <img src={bngLogo} className='w-36 ' />
                        </div>
                        <div className="cursor-pointer flex md:hidden mx-auto " >
                            <img src={bngLogo} className='w-36 ' />
                        </div>
                    </div>
                    
                    {/* tab */}
                    <div className="w-full mt-1 px-3 overflow-hidden my-auto">
                        <TabsRender />
                    </div>

                </div>
                <div className="hidden lg:flex items-center justify-center flex-1 h-auto" style={{backgroundImage: `url(${login_bg})`,backgroundSize:'cover',backgroundPosition:"center"}}>
                   <div >
                    <div className="mx-auto max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
                        <img src={bngLogo} />
                        
                    </div>
                    <div className="p-14 " >
                        <div className="px-5 py-3 rounded-md" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                            <p className="text-white text-md my-auto">เราคือหนึ่งในผู้ให้บริการสินเชื่อเงินหมุนเวียน เพื่อเสริมสภาพคล่องทางการเงินและธุรกิจ ให้กับบุคคล,บริษัท,โรงงาน, ชั้นนำของประเทศหลากหลายรูปแบบธุรกิจ เพื่อให้ท่านไม่พลาดโอกาสสำคัญที่จะขยายกิจการให้เติบโตขึ้นและช่วยให้ท่านฝ่าฟันปัญหาทางด้านการเงินไปด้วยกัน</p>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
            
        </div>
    );
};

export default Login;