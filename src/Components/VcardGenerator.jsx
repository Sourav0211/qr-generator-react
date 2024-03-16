import React, { useState,useRef,useEffect } from 'react';
import './VcardGenerator.css';
import QRCodeStyling from 'qr-code-styling';


const qrCode = new QRCodeStyling();
const vCardData = ('');

export default function ContactQRCode  ({bgColor,fgColor})  {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');
  // const [submit,setSubmit] = useState(false);
  const [imageUrl, setImageUrl] = useState('')
  const [type ,setType] = useState('');
  const [color,setColor] = useState('')
  const [fileExt, setFileExt] = useState("png");
  const ref = useRef(null);


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


  useEffect(() => {
    const generateVCard = () => {
      return `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phone}
EMAIL:${email}
URL:${link}
END:VCARD`;
    };

    qrCode.update({
      data: generateVCard(),
      image: imageUrl,
      dotsOptions: { type: type, color: color },
    });
  }, [name, phone, email, link, imageUrl, type, color]);
  
  useEffect(() => {
    qrCode.append(ref.current);
  }, []);



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
    setColor('');
    setType('');
    setImageUrl('');
    setName('');
    setEmail('');
    setPhone('')
    setLink('')
  }



  return (
    <div className="link-container p-4">
      <div className="form-info">
        <div className='row mb-3'>
        <div className="col">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control input-fields"
            placeholder="Enter Name"
          />
        </div>
        <div className="col">
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control input-fields"
            placeholder="Enter Contact Number"
          />
        </div>
        </div>
        <div className='row mb-3'>
        <div className="col">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control input-fields"
            placeholder="Enter Email"
          />
        </div>
        <div className="col">
          <label>Link:</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="form-control input-fields"
            placeholder="Enter Link"
          />
        </div>
        </div>
          <div className="row mb-3">
            <div className="col">
              <label>Upload Logo</label>
              <input
                type="file"
                className="form-control"
                onChange={onImageUpload}
              />
            </div>
          </div>  
      </div>
      <div className="row mb-3">
        <div className="col">
          <input
            type="color"
            value={color}
            onChange={onColorChange}
            className="form-control"
          />
        </div>
        <div className="col">
          <label>Select Pattern Type</label>
          <select
            onChange={onTypeChange}
            value={type}
            className="form-control"
          >
            <option value="square">Squared</option>
            <option value="rounded">Rounded</option>
            <option value="dots">Dots</option>
            <option value="classy">Classy</option>
          </select>
        </div>
        <div className="col">
          <label>Select Extension</label>
          <select
            onChange={onExtensionChange}
            value={fileExt}
            className="form-control"
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WEBP</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <button
            onClick={onDownloadClick}
            className="btn btn-primary me-2"
          >
            Download
          </button>
          <button onClick={onClearClick} className="btn btn-danger">
            Clear
          </button>
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


