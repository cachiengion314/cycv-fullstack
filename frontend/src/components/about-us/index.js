import React from "react";
import Text from "../../custom-components/Text";
import Vars from "../other-stuffs/Vars";
import "./index.css";

const index = ({ width, className }) => {
  const image = "https://res.cloudinary.com/cachiengion314/image/upload/v1619718969/cv-image_jhl0qo.png"
  return (
    <div style={{ width: width, padding: "0 2rem" }} className={className}>
      <Text width="100%" textAlign="center" className="mt-5">Về chúng tôi</Text>
      <div className={`about-us-container ${className}`}>
        <div>
          <p style={{ fontSize: Vars.FONT_SIZE_SSM }} className="about-us-text">
            Trước sự phát triển vượt bậc của nền kinh tế, rất nhiều ngành nghề
            trở nên khan hiếm nhân lực hoặc thiếu nhân lực giỏi. Tại Việt Nam,
            rất nhiều doanh nghiệp có nhu cầu tuyển dụng nhân sự với mức lương
            hấp dẫn. Một công việc ưng ý thì không thể thiếu 1 mẫu CV bắt mắt
            đúng không nào? Thế nên với Create your CV, chúng tôi sẽ mang đến cho các bạn rất nhiều
            sự lựa cho các mẫu CV đẹp và bắt mắt.
          </p>
        </div>
        <div style={{ width: "100%" }} className="align-center">
          <img src={image} className="cycv-image me-3" alt="about-us"></img>
        </div>
        <div>
          <p style={{ fontSize: Vars.FONT_SIZE_SSM }} className="about-us-text">
            Tại Mindx Create your CV, bạn có thể tìm thấy những mẫu CV cực kỳ
            bắt mắt và chuyên dụng với những ngành nghề khác nhau. Mindx Create
            your CV là nền tảng tuyển dụng công nghệ cao giúp các nhà tuyển dụng
            và ứng viên kết nối với nhau. Nhanh tay tạo CV để ứng tuyển vào các
            vị trí việc làm hấp dẫn tại việc làm mới nhất tại các tỉnh thành
            trên cả nước, bạn sẽ tìm thấy những việc làm ưng ý với mức lương tốt
            nhất!
          </p>
        </div>
      </div>
    </div>
  )
}

export default index