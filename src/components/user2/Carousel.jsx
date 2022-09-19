import { Carousel } from "react-carousel-minimal";
import ban1 from "./img/happy1.jpg";
import ban2 from "./img/happy2.jpg";

export default function carousel() {

    const bannerCarousel = [
        {
            image: ban1,
        },
        {
            image: ban2,
        },
    ];

    return (
        <div>
            <div className=" rounded-none">
                <div className="block text-center">
                    <Carousel
                        data={bannerCarousel}
                        time={6000}
                        width="w-full"
                        height="600px"
                        // captionStyle={captionStyle}
                        // radius="10px"
                        slideNumber={false}
                        // slideNumberStyle={slideNumberStyle}
                        captionPosition="bottom"
                        automatic={true}
                        dots={false}
                        pauseIconColor="white"
                        pauseIconSize="40px"
                        slideBackgroundColor="darkgrey"
                        slideImageFit="cover"
                        thumbnails={false}
                        thumbnailWidth="100px"
                        style={{
                            textAlign: "center",

                            maxHeight: "600px",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}