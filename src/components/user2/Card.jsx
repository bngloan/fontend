import { logo } from './img/logo.jpg';


import pro1 from './img/loan1.webp';
import pro2 from './img/loan2.webp';
import pro3 from './img/loan3.webp';
import pro4 from './img/loan4.webp';
import pro5 from './img/loan5.webp';
import styles from './button.css';


export default function Example() {
  const imgData = [
    {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
      img: pro1
    },
    {
      img: pro2
    },
    {
      img: pro3
    },
    {
      img: pro4
    },
    {
      img: pro5
    },
  ]
  return (
    <>
    {imgData.map((value,index) =>(
        <div className={`w-full m-5 md:block md:w-3/12 bg-white rounded-md shadow-md ${styles}`} key={index} >
          <div  className="h-50">
            <img src={value.img} alt="profile-picture" />
          </div>
          <div className="text-center">
            <p  className="myFont text-lg my-2">
              แผนการกู้ยืม
            </p>
            <a href="/user" className="btnstyloan w-3/5 mx-auto text-center myFont my-3">กู้ยืม</a>
          </div>
        </div>
        ))}
    </>
  );
}
    
