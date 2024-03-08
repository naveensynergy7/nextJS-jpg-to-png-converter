import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { BsUpload } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { RiDownload2Fill } from "react-icons/ri";
import { FaFileZipper } from "react-icons/fa6";

class HeicTojpg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFiles: [], // Store the File objects of the uploaded images
      isDraggingOver: false, // Track if dragging over the drop area
      isLoading: false, // Add isLoading state
      isLoadingText: "",
      heic2any: null,
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
  async componentDidMount() {
    // Lazy load heic2any when the component mounts
    const heic2any = await import("heic2any");
    this.setState({ heic2any: heic2any.default });
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
    if (typeof window !== "undefined") {
      this.processFiles(files);
    }
    // Clear the input value
    event.target.value = "";
  }

  async processFiles(files) {
    if (typeof window !== "undefined") {
      const filesArray = Array.from(files);

      this.setState({
        isLoading: true,
      });

      let unsupportedFound = false;
      let loadedFilesCount = 0;

      for (let index = 0; index < filesArray.length; index++) {
        const file = filesArray[index];
        const supportedTypes = ["image/heic"];
        const fileExtension = file.name.split(".").pop().toLowerCase();

        if (fileExtension !== "heic") {
          unsupportedFound = true;
          filesArray[index] = null;
          continue;
        }

        if (fileExtension === "heic") {
          const { heic2any } = this.state;
          try {
            const jpgBlob = await heic2any({ blob: file, toType: "image/jpg" });
            loadedFilesCount++;
            this.setState({
              isLoadingText: `Converting ${loadedFilesCount}/${filesArray.length} Images...`,
            }); // Update loading text
            const convertedFile = new File(
              [jpgBlob],
              file.name.replace(/\.heic$/, ".jpg"),
              {
                type: "image/jpg",
              }
            );
            filesArray[index] = convertedFile;
          } catch (error) {
            console.error("Error converting HEIC to JPG:", error);
            unsupportedFound = true;
            continue;
          }
        } else {
          loadedFilesCount++;
          this.setState({
            isLoadingText: `Converting ${loadedFilesCount}/${filesArray.length} Images...`,
          });
        }
      }

      if (unsupportedFound) {
        alert("Only JPG, JPEG, or HEIC images are allowed.");
      }

      const filteredFiles = filesArray.filter((file) => file !== null);

      this.setState({ imageFiles: filteredFiles, isLoading: false });
    }
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
    link.download = `image_${index}.jpg`;
    link.click();
  }

  // Download all images as a ZIP file
  async downloadImagesAsZip() {
    const zip = new JSZip();

    const imagePromises = this.state.imageFiles.map(async (file, index) => {
      const imageData = await file.arrayBuffer();
      zip.file(`image_${index}.jpg`, imageData);
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
      link.setAttribute("download", `image_${index}.jpg`);
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
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "999",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                padding: "20px",
                borderRadius: "5px",
                textAlign: "center",
                fontSize: "20px",
              }}
            >
              {this.state.isLoadingText || "Loading..."}
            </span>
          </div>
        )}

        <div style={{ textAlign: "center" }} className="App">
          <h2>HEIC TO JPG</h2>
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
                  alt={`Uploaded jpg ${index}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <button
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
                  jpg
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
        </div>
      </>
    );
  }
}
export default HeicTojpg;
