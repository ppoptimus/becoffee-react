import React from 'react'

export default function Footer() {
  return (
    <>
      <footer className='text-center text-white' style={{ backgroundColor: '#45637d', marginBottom:'5rem' }}>
        {/* Grid container */}
        <div className='container p-4'>
          {/* Section: Iframe */}
          <section className>
            <div className='row d-flex justify-content-center'>
              <div className='col-lg-6'>
                <div className='ratio ratio-16x9'>
                  <iframe
                    width='{560}'
                    height='{315}'
                    src='https://www.youtube.com/embed/BB_LkUUeeIw'
                    title='YouTube video player'
                    frameBorder='{0}'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
          {/* Section: Iframe */}
        </div>
        {/* Grid container */}
        {/* Copyright */}
        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2021 Copyright:
          <a className='text-white' href='https://beeasythailand.co/'>
            EasyCoffee.com
          </a>
        </div>
        {/* Copyright */}
      </footer>
    </>
  )
}
