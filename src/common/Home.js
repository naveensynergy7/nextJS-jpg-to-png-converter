import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { BsUpload } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { RiDownload2Fill } from "react-icons/ri";
import { FaFileZipper } from "react-icons/fa6";
import Faq from "../common/Faq";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFiles: [], // Store the File objects of the uploaded images
      isDraggingOver: false, // Track if dragging over the drop area
      isLoading: false, // Add isLoading state
    };
    this.handleImageDrop = this.handleImageDrop.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleFileInputClick = this.handleFileInputClick.bind(this);
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
    this.clearImages = this.clearImages.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.downloadImage = this.downloadImage.bind(this);
    this.downloadImagesAsZip = this.downloadImagesAsZip.bind(this);
    this.downloadImages = this.downloadImages.bind(this);
  }

  // Handle dropping images
  handleImageDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.processFiles(files);
  }

  // Handle drag entering
  handleDragEnter(event) {
    event.preventDefault();
    this.setState({ isDraggingOver: true });
  }

  // Handle dragging over
  handleDragOver(event) {
    event.preventDefault(); // Prevent default to enable drop
  }

  // Handle drag leaving
  handleDragLeave(event) {
    event.preventDefault();
    this.setState({ isDraggingOver: false });
  }

  // Handle file input click
  handleFileInputClick() {
    this.fileInput.click();
  }

  // Handle file input change
  handleFileInputChange(event) {
    const files = event.target.files;
    this.processFiles(files);

    // Clear the input value
    event.target.value = "";
  }

  // Process files after input or drop
  processFiles(files) {
    this.setState({ isLoading: true });
    const imageFiles = [...this.state.imageFiles];
    let unsupportedFound = false; // Flag to track if unsupported files are found
    for (let i = 0; i < files.length; i++) {
      // Check if the file type is not jpg or jpeg
      if (
        !files[i].type.startsWith("image/jpeg") &&
        !files[i].type.startsWith("image/jpg")
      ) {
        unsupportedFound = true;
        continue; // Skip this file
      }
      imageFiles.push(files[i]);
    }

    if (unsupportedFound) {
      alert("Only JPG or JPEG images are allowed.");
    }

    setTimeout(() => {
      this.setState({ imageFiles, isLoading: false });
    }, 2000);
  }

  // Clear all images
  clearImages() {
    this.setState({ imageFiles: [] });
  }

  // Remove a specific image by index
  removeImage(index) {
    const imageFiles = [...this.state.imageFiles];
    imageFiles.splice(index, 1);
    this.setState({ imageFiles });
  }

  // Download a specific image by index
  downloadImage(url, index) {
    const link = document.createElement("a");
    link.href = url;
    link.download = `image_${index}.png`;
    link.click();
  }

  // Download all images as a ZIP file
  async downloadImagesAsZip() {
    const zip = new JSZip();

    const imagePromises = this.state.imageFiles.map(async (file, index) => {
      const imageData = await file.arrayBuffer();
      zip.file(`image_${index}.png`, imageData);
    });

    await Promise.all(imagePromises);

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "images.zip");
    });
  }

  // Helper function to load image file and return promise
  loadImage(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  downloadImages() {
    this.state.imageFiles.forEach((file, index) => {
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `image_${index}.png`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  render() {
    return (
      <>
        {this.state.isLoading && (
          <div
            style={{
              position: "absolute",
              opacity: "0.7",
              zIndex: "999",
              width: "100%",
              height: "100vh",
              backgroundColor: "#fff",
            }}
          >
            <span
              style={{
                top: "50%",
                position: "absolute",
                fontSize: "20px",
                left: "50%",
              }}
            >
              Loading...
            </span>
          </div>
        )}
        <div style={{ textAlign: "center" }} className="App">
          <h1>JPG To PNG - Convert JPG To PNG</h1>
          <div style={{ marginTop: "30px", marginBottom: "10px" }}>
            <h2>How to convert jpg to png in 1 second</h2>
            <ol
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <li>
                Upload your images by clicking on the below "Upload Images"
                button or drag and drop images into the box below.
              </li>
              <br />
              <li>
                Images will be converted to PNG in a few seconds. Just download
                images one by one or all together or as a zip bundle.
              </li>
            </ol>
          </div>
          <div style={{ marginTop: "30px", marginBottom: "10px" }}>
            <button
              className="uploadButton"
              onClick={this.handleFileInputClick}
              style={{ margin: "2px" }}
            >
              <BsUpload /> &nbsp; Upload Images
            </button>
            <button
              onClick={this.clearImages}
              className={`clearImages ${
                this.state.imageFiles?.length > 0 ? "" : "disabled"
              }`}
              style={{ margin: "2px" }}
            >
              <RxCrossCircled /> Clear All Images
            </button>
            <input
              type="file"
              ref={(input) => {
                this.fileInput = input;
              }}
              onChange={this.handleFileInputChange}
              style={{ display: "none" }}
              multiple
            />
          </div>

          <div
            onClick={this.handleFileInputClick}
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #2a73d9, #2a73d9 9px, transparent 9px, transparent 19px, #2a73d9 19px), repeating-linear-gradient(90deg, #2a73d9, #2a73d9 9px, transparent 9px, transparent 19px, #2a73d9 19px), repeating-linear-gradient(180deg, #2a73d9, #2a73d9 9px, transparent 9px, transparent 19px, #2a73d9 19px), repeating-linear-gradient(270deg, #2a73d9, #2a73d9 9px, transparent 9px, transparent 19px, #2a73d9 19px)",
              backgroundSize: "3px 100%, 100% 3px, 3px 100% , 100% 3px",
              backgroundPosition: "0 0, 0 0, 100% 0, 0 100%",
              backgroundRepeat: "no-repeat",
              padding: "50px",
              textAlign: "center",
              marginBottom: "20px",
              color: "#2a73d9",
              textTransform: "uppercase",
              margin: "25px 10%",
            }}
            className="dropBox"
            onDrop={this.handleImageDrop}
            onDragOver={this.handleDragOver}
            onDragEnter={this.handleDragEnter}
            onDragLeave={this.handleDragLeave}
          >
            <p>Drop your images here</p>
          </div>

          <div>
            <button
              className={`download ${
                this.state.imageFiles?.length > 0 ? "" : "disabled"
              }`}
              onClick={this.downloadImages}
            >
              <RiDownload2Fill /> Download All Images
            </button>
            <button
              className={`download ${
                this.state.imageFiles?.length > 0 ? "" : "disabled"
              }`}
              onClick={this.downloadImagesAsZip}
            >
              <FaFileZipper /> Download All Images as ZIP
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: "20px",
              justifyContent: "center",
            }}
          >
            {this.state.imageFiles.map((file, index) => (
              <div
                key={index}
                style={{
                  margin: "10px",
                  position: "relative",
                  height: "150px",
                  width: "150px",
                  overflow: "hidden",
                  border: "2px solid lightgrey",
                  borderRadius: "5px",
                  padding: "2px",
                }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded PNG ${index}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <button
                  onClick={() => this.removeImage(index)}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    padding: "5px",
                    background: "#2e353e",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  PNG
                </button>

                <button
                  onClick={() => this.removeImage(index)}
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    left: "5px",
                    padding: "5px",
                    background: "#f00",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
                <button
                  onClick={() =>
                    this.downloadImage(URL.createObjectURL(file), index)
                  }
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "5px",
                    padding: "5px",
                    background: "#00f",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Download
                </button>
              </div>
            ))}
          </div>

          {/* <section className="video">
            <h2>How to use ?</h2>
            <div className="hs-responsive-embed-youtube">
              <iframe src="https://www.youtube.com/embed/7VjBaHIb4IA?rel=0&amp;showinfo=0"></iframe>
            </div>
          </section> */}

          <Faq />
        </div>
      </>
    );
  }
}
export default Home;
