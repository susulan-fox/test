import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import adventure from "../assets/adventure.svg";
import contact from "../assets/contact.svg";
import Footer from "../components/Footer"

const HomePage = () => {
  return (
    <div className="bg-light">
      <NavBar />

      {/* Header */}
      <header className="vh-100 vw-100 d-flex align-items-center">
        <div className="container-fluid px-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1>
                <span className="text-black">Kualitas</span> Yang Tak{" "}
                <span className="text-black">Tergantikan</span>
              </h1>
              <p className="lead">
                Pilih{" "}
                <span className="text-primary fw-bold">Enigma Laundry </span>,
                Untuk Hidup{" "}
                <span className="text-primary fw-bold">Lebih Bersih</span>
              </p>
              <Link to="/target-page">
                <button className="btn btn-primary btn-lg">
                  Order Sekarang
                </button>
              </Link>
            </div>
            <div className="col-lg-6 text-center">
              <img
                className="img-fluid w-75"
                src={adventure}
                alt="Ilustrasi Petualangan"
              />
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Services */}
        <section className="container py-5" id="services">
          <h2 className="text-center mb-4">Layanan Kami</h2>
          <div className="row text-center">
            {/* Card 1 */}
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card shadow h-100">
                <img
                  src="https://via.placeholder.com/300"
                  className="card-img-top"
                  alt="Cuci Kering"
                />
                <div className="card-body">
                  <h5 className="card-title">Cuci Kering</h5>
                  <p className="card-text">
                    Layanan mencuci pakaian Anda hingga bersih dan kering dalam
                    waktu singkat.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card shadow h-100">
                <img
                  src="https://via.placeholder.com/300"
                  className="card-img-top"
                  alt="Setrika"
                />
                <div className="card-body">
                  <h5 className="card-title">Setrika</h5>
                  <p className="card-text">
                    Pakaian Anda akan disetrika dengan rapi dan wangi, siap
                    untuk digunakan kapan saja.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card shadow h-100">
                <img
                  src="https://via.placeholder.com/300"
                  className="card-img-top"
                  alt="Cuci Lipat"
                />
                <div className="card-body">
                  <h5 className="card-title">Cuci Lipat</h5>
                  <p className="card-text">
                    Layanan mencuci dan melipat pakaian Anda, sehingga langsung
                    siap disimpan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Promo */}
        <section className="bg-primary text-light p-5" id="promo">
          <div className="container">
            <div className="d-md-flex justify-content-between align-items-center">
              <h3>Dapatkan Promo Menarik</h3>

              <div className="input-group mt-3 mt-md-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan kode voucher"
                />
                <button className="btn btn-dark btn-lg" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}

        <section className="p-5" id="contact">
          <div className="container">
            <div className="row g-4 align-items-center">
              {/* Informasi Kontak */}
              <div className="col-md">
                <h2 className="text-center mb-4">Contact Us</h2>
                <ul className="list-group list-group-flush lead">
                  <li className="list-group-item pb-1">
                    <i className="bi bi-geo-alt"></i>
                    <span className="fw-bold"> Location:</span> Jalan Parahiangan, 04
                  </li>
                  <li className="list-group-item pb-1">
                    <i className="bi bi-telephone"></i>
                    <span className="fw-bold"> Mobile Phone:</span> (+62)
                    821-1234-5678
                  </li>
                  <li className="list-group-item pb-1">
                    <i className="bi bi-instagram"></i>
                    <span className="fw-bold"> Instagram:</span> @enigmacamp
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-envelope"></i>
                    <span className="fw-bold"> Email:</span>{" "}
                    enigmacamp@gmail.com
                  </li>
                </ul>
              </div>

              {/* Gambar */}
              <div className="col-md text-center">
                <img
                  className="img-fluid d-none d-md-block"
                  src={contact}
                  alt="Contact Information Illustration"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default HomePage;
