import React from 'react';

const Home: React.FC = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className=' z-0 relative bg-cover bg-center h-screen' style={{ backgroundImage: 'url(https://www.shutterstock.com/image-illustration/shiny-diamonds-falling-on-blackwhite-600nw-1406709977.jpg)' }} aria-label="jewelry showcase image" >
                <div className='bg-black bg-opacity-50 w-full h-full flex flex-col justify-center items-center text-center'>
                    <h1 className='text-5xl text-white font-bold' style={{ paddingTop: "2rem" }}>Chic Charms</h1>
                    <h2 className='text-2xl mt-2 text-white'>Where Elegance Meets Craftsmanship</h2>
                </div>
            </div>

            {/* About Us Section */}
            <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white text-center'>
                <h2 className='text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>About Us</h2>
                <p className='mt-4 max-w-2xl mx-auto text-xl text-gray-500'>
                    At Chic Charms, we believe that jewelry is more than just an accessory – it’s a reflection of your unique style and the moments you cherish. Our passion for creating beautiful, timeless pieces is at the heart of everything we do.
                </p>
            </div>

            {/* Our Collection Section */}
            <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-100'>
                <h2 className='text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center'>Our Collection</h2>
                <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    <div className='bg-white p-6 rounded-lg shadow-lg'>
                        <img src='https://cdn.pixabay.com/photo/2022/08/16/04/52/jewel-7389356_640.jpg' alt='Engagement Ring' className='h-48 w-full object-cover'/>
                        <h3 className='text-lg font-semibold mt-4'>Engagement Rings</h3>
                        <p className='mt-2 text-gray-600'>Celebrate your love story with a ring that captures the essence of your commitment.</p>
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-lg'>
                        <img src='https://as2.ftcdn.net/v2/jpg/02/74/62/07/1000_F_274620724_G1rPM08axNRCGT2uRpOJGCx67EQItht0.jpg' alt='Wedding Bands' className='h-48 w-full object-cover'/>
                        <h3 className='text-lg font-semibold mt-4'>Wedding Bands</h3>
                        <p className='mt-2 text-gray-600'>Symbolize your eternal bond with beautifully crafted bands.</p>
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-lg'>
                        <img src='https://img.freepik.com/free-photo/beautiful-luxury-necklace-jewelry-stand-neck_1339-7946.jpg' alt='Necklaces' className='h-48 w-full object-cover'/>
                        <h3 className='text-lg font-semibold mt-4'>Necklaces</h3>
                        <p className='mt-2 text-gray-600'>Add a touch of elegance to any outfit with our stunning necklaces.</p>
                    </div>
                </div>
            </div>

            {/* Our Promise Section */}
            <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white text-center'>
                <h2 className='text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>Our Promise</h2>
                <p className='mt-4 max-w-2xl mx-auto text-xl text-gray-500'>
                    At Chic Charms, customer satisfaction is our top priority. We are committed to providing exceptional service and ensuring that your shopping experience is as delightful as our jewelry.
                </p>
            </div>

            {/* Footer */}
            <footer className='bg-gray-800 py-8'>
                <div className='max-w-7xl mx-auto text-center text-white'>
                    <p>&copy; 2024 Chic Charms. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
