import React, { useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import "./FileUploader.css";
import { useRef } from 'react';
import { useEffect } from 'react';


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

const FileUploader = () => {
  // const [file, setFile] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
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
      data: downloadLink,
      image: imageUrl,
      dotsOptions:{type: type,
      color: color}

    });
  }, [imageUrl,type,color,downloadLink]);

  

  const handleUpload = (e) => {
    const uploadedFile = e.target.files[0];
    // setFile(uploadedFile);
    if (uploadedFile) {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        setDownloadLink(data.downloadLink);
      })
      .catch(error => console.error('Error uploading file:', error));
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
  const onClearClick =() =>{
    // setFile('');
    setColor('');
    setType('');
    setImageUrl('');

  }

  const onImageUpload=(e)=>{
    e.preventDefault();

    const file = e.target.files[0];
    if(file)
    {
      const reader = new FileReader();
      reader.onloadend = () =>{
        const imageUrl = reader.result;
        setImageUrl(imageUrl);
      };
      reader.readAsDataURL(file);
    }

  };
  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt
    });
  };

  return (

<div className="link-container p-4">
    <div className="row mb-3">
      <div className="col">
        <label>Upload File</label>
        <input type="file" onChange={handleUpload}  className='form-control'/>
        {/* <button onClick={handleUpload} className='button-upload'>Upload</button> */}
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

export default FileUploader;
