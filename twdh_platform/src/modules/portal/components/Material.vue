<template>
  <div style="margin-top: 60px;">
    <div style="width: 37%; margin-left: auto; margin-right: auto;" id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="3000">
          <a href="https://onlinearchives.th.gov.tw/index.php?act=Archive" target="_blank">
            <img src="@/assets/img/slider/1.jpg" class="d-block w-100">
          </a>
        </div>
        <div class="carousel-item" data-bs-interval="3000"> 
          <a href="http://ahdas.drnh.gov.tw/" target="_blank">
            <img src="@/assets/img/slider/2.jpg" class="d-block w-100">
          </a>
        </div>
        <div class="carousel-item" data-bs-interval="3000">
          <a href="https://drtpa.th.gov.tw/" target="_blank">
            <img src="@/assets/img/slider/3.jpg" class="d-block w-100">
          </a>
        </div>
        <div class="carousel-item" data-bs-interval="3000">
          <a href="http://journal.th.gov.tw/" target="_blank">
            <img src="@/assets/img/slider/4.jpg" class="d-block w-100">
          </a>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>


</template>


<script>
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import SwiperCore, { Navigation } from 'swiper/core'

SwiperCore.use([Navigation])

export default {
  name: 'Material',
}
</script>
