QR Code and vCard Generator App
This is a React application that allows users to generate QR codes for various purposes, including generating QR codes from text input, uploading links, files, or vCard data.

Features
QR Code Generation: Users can generate QR codes from text input.
Upload Link or File: Users can upload a link, file, or vCard data to generate QR codes.
Download QR Code: Users can download the generated QR code.
Setup
Clone the repository:

bash
Copy code
git clone <repository-url>
Navigate to the project directory:


Install dependencies:
npm install qrcode
npm install express
npm install multer



bash
Copy code
npm install
Usage
Start the server:

bash
Copy code
go to /src
start the server.js file
node server.js
The server should now be serving react app on th http://localhost:4000/.


Use the app to generate QR codes:

Enter text and click "Submit" to generate a QR code.
Upload a link, file, or vCard data to generate a QR code.
Click the "Download" button to download the generated QR code.
Technologies Used
React
Node.js
Express
qrcode.react (for QR code generation)