import "./styles/QrStyle.css";

const QrProjector = (props) => {   
  const myImage = require(`../images/${props.imageUrl}`);
  console.log(myImage);
    return (
        <>
        <div className="body">
          <div id="qrCodeContainer">
            <img id="qrCode" src={myImage} alt="QR Code"></img> 
          </div>
        </div>
        </>
    )
}

export default QrProjector;