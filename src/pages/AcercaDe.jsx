import React, { Fragment } from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import imagen from '../assets/react.svg' 
const AcercaDe = () => {
  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={imagen}
              alt="Talento Tech GCBA"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">Sobre Talento Tech</h2>
            <p className="lead">
              Talento Tech es una iniciativa del Gobierno de la Ciudad de Buenos Aires que impulsa la formación y empleabilidad en tecnología para jóvenes y adultos.
            </p>
            <p>
              Promovemos la inclusión digital a través de cursos gratuitos, mentorías, ferias de empleo y alianzas con empresas del sector. Buscamos reducir la brecha digital y conectar el talento con las oportunidades reales del mercado laboral.
            </p>
            <p className="fw-bold text-primary">
              ¡Creemos que el futuro de la Ciudad se construye con talento y tecnología!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AcercaDe
