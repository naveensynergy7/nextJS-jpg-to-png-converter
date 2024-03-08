export default function Faq() {
  return (
    <>
      <section className="faq-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="faq-title text-center pb-3">
                <h2>Frequently asked questions</h2>
              </div>
            </div>
            <div className="col-md-6 offset-md-3">
              <div className="faq" id="accordion">
                <div className="card">
                  <div className="card-header">
                    <div className="mb-0">
                      <h5 className="faq-title">
                        <span className="badge">1</span>Is there a limit of
                        image file size or number of images I can convert?
                      </h5>
                    </div>
                  </div>
                  <div className="collapse">
                    <div className="card-body">
                      <p>
                        No, there is no limit of file size or number of images.
                        You can upload as much as you wish but it is suggested
                        converted max 500 images at once.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <div className="mb-0">
                      <h5 className="faq-title">
                        <span className="badge">2</span>Is my data secure on
                        this tool?
                      </h5>
                    </div>
                  </div>
                  <div className="collapse">
                    <div className="card-body">
                      <p>
                        Yes, we don't send any data to servers. all conversion is
                        done on your system and by using your system power. we
                        don't store any images converted on our tool. it is
                        completely safe.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <div className="mb-0">
                      <h5 className="faq-title">
                        <span className="badge">3</span>Do I need to download or
                        install any software to use this tool?
                      </h5>
                    </div>
                  </div>
                  <div className="collapse">
                    <div className="card-body">
                      <p>
                        No, you can use it by visting our website on your
                        browser.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <div className="mb-0">
                      <h5 className="faq-title">
                        <span className="badge">4</span>How do I use the
                        drag-and-drop feature for image conversion?
                      </h5>
                    </div>
                  </div>
                  <div className="collapse">
                    <div className="card-body">
                      <p>
                        simply drag and drop images into the box above and it
                        will start converting images into png.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="mb-0">
                      <h5 className="faq-title">
                        <span className="badge">5</span>Can I convert multiple
                        images at once?
                      </h5>
                    </div>
                  </div>
                  <div className="collapse">
                    <div className="card-body">
                      <p>Yes, there is no limit on the number of images.</p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="mb-0">
                      <h5 className="faq-title">
                        <span className="badge">6</span>What should I do if I
                        encounter an error during conversion?
                      </h5>
                    </div>
                  </div>
                  <div className="collapse">
                    <div className="card-body">
                      <p>
                        There are very few chances of error but if you get one ,
                        Just reload the website and try again.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="mb-0">
                      <h5 className="faq-title">
                        <span className="badge">7</span>Can I use this tool on
                        mobile devices?
                      </h5>
                    </div>
                  </div>
                  <div className="collapse">
                    <div className="card-body">
                      <p>
                        Yes, this tool can be used on any device that have
                        browser and internet connectivity.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="mb-0">
                      <h5 className="faq-title">
                        <span className="badge">8</span>Can I use this tool on
                        mobile devices?
                      </h5>
                    </div>
                  </div>
                  <div className="collapse">
                    <div className="card-body">
                      <p>
                        Yes, this tool can be used on any device that have
                        browser and internet connectivity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
