import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { FaChevronLeft, FaChevronRight, FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation(); // Initialize translation function

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await api.getProducts();
        console.log("Loaded ", result.data);
        setProducts(result.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id="products" className="products section xl:px-28 py-10">
      <div className="container section-title text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-gray-800">{t("ourProducts")}</h2>
      </div>

      <div className="container mt-6">
        <div
          className={`${
            loading || products.length === 0
              ? "w-full"
              : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          }`}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="no-products-message flex justify-center">
              No products available
            </div>
          ) : (
            products.map((product, index) => (
              <div
                key={product._id}
                className="border rounded-2xl p-5 shadow-lg bg-white hover:shadow-2xl transition-all duration-300 flex flex-col items-center relative"
                data-aos={
                  index === 0
                    ? "fade-right"
                    : (index + 1) % 4 === 0
                    ? "fade-left"
                    : "fade-up"
                }
                data-aos-delay={`${index * 300}`}
              >
                {/* Swiper Slider for Images & Videos */}
                <div className="w-full relative">
                  <Swiper
                    modules={[Navigation, Pagination, EffectFade]}
                    pagination={{ clickable: true }}
                    effect="fade"
                    loop={true}
                    className="w-full rounded-xl overflow-hidden"
                    navigation={{
                      prevEl: `.prev-${product._id}`,
                      nextEl: `.next-${product._id}`,
                    }}
                  >
                    {product.images.map((img, index) => (
                      <SwiperSlide key={index} className="flex justify-center">
                        <img
                          src={img.url}
                          alt={`Image ${index + 1}`}
                          className="w-full aspect-[4/3] object-cover rounded-lg"
                        />
                      </SwiperSlide>
                    ))}

                    {/* Video at the end if available */}
                    {product.video && (
                      <SwiperSlide>
                        <video
                          className="w-full aspect-[4/3] mx-auto rounded-lg"
                          controls
                          muted
                          preload="metadata"
                        >
                          <source src={product.video.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </SwiperSlide>
                    )}
                  </Swiper>

                  {/* Custom Navigation Arrows */}
                  <button
                    className={`${
                      product.images.length > 1 || product.video
                        ? "block"
                        : "hidden"
                    } absolute top-1/2 z-40 left-2 transform -translate-y-1/2 bg-gray-900 bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition duration-300 prev-${
                      product._id
                    }`}
                  >
                    <FaChevronLeft size={20} />
                  </button>
                  <button
                    className={`${
                      product.images.length > 1 || product.video
                        ? "block"
                        : "hidden"
                    } absolute top-1/2 z-40 right-2 transform -translate-y-1/2 bg-gray-900 bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition duration-300 next-${
                      product._id
                    }`}
                  >
                    <FaChevronRight size={20} />
                  </button>
                </div>

                {/* Product Details */}
                <div className="mt-4 flex justify-between items-center w-full">
                  <h4 className="font-semibold text-lg text-gray-900">
                    {product.art_number}
                  </h4>

                  {/* WhatsApp Button */}
                  <a
                    href={`https://wa.me/+552278970?text=I'm interested in product ${product.art_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-1 items-center justify-center bg-green-500 text-white p-2 px-2.5 rounded-full hover:bg-green-600 transition duration-300"
                  >
                    <FaWhatsapp size={20} />
                    <div>Order</div>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Products;
