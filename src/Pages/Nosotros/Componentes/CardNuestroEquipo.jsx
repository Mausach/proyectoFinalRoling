import React from 'react'
import foto from '../../../assets/img/Yo/yo.jpg'

export const CardNuestroEquipo = () => {
    return (

        <div>
            <div className="card mt-3 card text-white bg-dark border border-white" style={{ maxwidth: '540px' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={foto} className="img-fluid rounded-start" alt="..." style={{ width: '200px' }} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Quien Soy</h5>
                            <p className="card-text"> Mi nombre es Mauro Ybañez.
                                Soy un estudiante de programación de: "Rolling Code".
                                Estoy trabajando en mi proyecto final, poniendo a prueba todo lo aprendido hasta el momento.
                                Con mucho esfuerzo y dedicación, hiciendo esta página web de un comercio de comidas online con delivery.
                            </p>
                            <p className="card-text"><small class="text-muted">Espero haya tenido una buena experiencia como usuario</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
