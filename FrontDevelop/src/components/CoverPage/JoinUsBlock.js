import "../../styles/CoverPage/JoinUsBlock.css";
import React from "react";
import Img1 from "../../matirial/Image/part2-1.png";
import Img2 from "../../matirial/Image/part2-2.png";
import Img3 from "../../matirial/Image/part2-3.png";
import Img4 from "../../matirial/Image/part2-4.png";
import Img5 from "../../matirial/Image/part2-5.png";
function JoinUsBlock() {
  return (
    <div className={"block-content"}>
      <div className={"bigHeader"}>FIVE REASONS TO JOIN US</div>

      <div>EVcharge more than charging</div>
      <div className={"reasonDiv"}>
        <div>
          <img className={"reasonImg"} src={Img1} alt="Reason 1" />
        </div>
        <div>
          <img className={"reasonImg"} src={Img2} alt="Reason 2" />
        </div>
        <div>
          <img className={"reasonImg"} src={Img3} alt="Reason 3" />
        </div>
        <div>
          <img className={"reasonImg"} src={Img4} alt="Reason 4" />
        </div>
        <div>
          <img className={"reasonImg"} src={Img5} alt="Reason 5" />
        </div>
      </div>
    </div>
  );
}

export default JoinUsBlock;
