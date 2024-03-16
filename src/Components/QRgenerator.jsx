import React, { useEffect, useRef, useState } from "react";
// import "./styles.css";
import QRCodeStyling from "qr-code-styling";
import "./QRgenerator.css";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  image:
    "",
  dotsOptions: {
    color: "#4267b2",
    type: "rounded"
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20
  }
});

export default function QRgenerator() {
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('')
  const [type ,setType] = useState('');
  const [color,setColor] = useState('')
  const [fileExt, setFileExt] = useState("png");
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url,
      image: imageUrl,
      dotsOptions:{type: type,
      color: color}

    });
  }, [url,imageUrl,type,color]);

  const onUrlChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const onImageUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result; 
        setImageUrl(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };


  const onColorChange =(e)=>{
    e.preventDefault();
    setColor(e.target.value);
  };

  const onTypeChange = (e)=>{
    e.preventDefault();
    setType(e.target.value);
  }

  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt
    });
  };

  const onClearClick =() =>{
    setUrl('');
    setColor('');
    setType('');
    setImageUrl('');

  }

  return (
    <div className="link-container p-4">
    <div className="row mb-3">
      <div className="col">
        <label>Enter URL</label>
        <input className="form-control" value={url} onChange={onUrlChange} />
      </div>
      <div className="col">
        <label>Upload Logo</label>
        <input type="file" className="form-control" onChange={onImageUpload} />
      </div>

    </div>
    <div className="row mb-3">
      <div className="col">
        <input type='color' value={color} onChange={onColorChange} className="form-control" />
      </div>
      <div className="col">
        <label>Select Pattern Type</label>
        <select onChange={onTypeChange} value={type} className="form-control">
          <option value="rounded">Rounded</option>
          <option value="dots">Dots</option>
          <option value="classy">Classy</option>
          <option value="square">Squared</option>
        </select>
      </div>
      <div className="col">
        <label>Select Extension</label>
        <select onChange={onExtensionChange} value={fileExt} className="form-control">
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select>
      </div>
    </div>
    <div className="row mb-3">
      <div className="col">
        <button onClick={onDownloadClick} className="btn btn-primary me-2">Download</button>
        <button onClick={onClearClick} className="btn btn-danger">Clear</button>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col d-flex justify-content-center">
        <div className="link-canvas" ref={ref} />
      </div>
    </div>
  </div>
  );
};


