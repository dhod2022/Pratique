<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link active" aria-current="page">民 國</a>
    </li>
  </ul>


  <div class="container">
    <div class="row" style="margin-top: 50px; margin-left: 60px;">

      <div class="col">
        <div class="card" style="width: 22rem; text-align:center">
          <a href="http://ahdas.drnh.gov.tw/" target="_blank" style="text-decoration:none;color:black;">
            <div>
              <img :src="require(`@/assets/img/slider/1.jpg`)" 
                alt="國史館檔案史料文物查詢系統"
                class="card-img-top"                 
                />
            </div> 
            <div class="card-body">
              <p class="card-text">國史館檔案史料文物查詢系統</p>
            </div>                       
          </a>
        </div>   
      </div>

      <div class="col">
        <div class="card" style="width: 22rem; text-align:center">
          <a href="https://onlinearchives.th.gov.tw/index.php?act=Archive" target="_blank" style="text-decoration:none;color:black;">
            <div>
              <img :src="require(`@/assets/img/slider/2.jpg`)" 
                alt="國史館檔案史料文物查詢系統"
                class="card-img-top"                 
                />
            </div> 
            <div class="card-body">
              <p class="card-text">國史館臺灣文獻館文獻檔案查詢系統</p>
            </div>                       
          </a>
        </div>   
      </div>

    </div>
  </div>

  <div class="container">
    <div class="row" style="margin-top: 50px; margin-left: 60px;">

      <div class="col">
        <div class="card" style="width: 22rem; text-align:center">
          <a href="https://drtpa.th.gov.tw/" target="_blank" style="text-decoration:none;color:black;">
            <div>
              <img :src="require(`@/assets/img/slider/3.jpg`)" 
                alt="國史館檔案史料文物查詢系統"
                class="card-img-top"                 
                />
            </div> 
            <div class="card-body">
              <p class="card-text">臺灣省議會史料總庫</p>
            </div>                       
          </a>
        </div>   
      </div>

      <div class="col">
        <div class="card" style="width: 22rem; text-align:center">
          <a href="http://journal.th.gov.tw/" target="_blank" style="text-decoration:none;color:black;">
            <div>
              <img :src="require(`@/assets/img/slider/4.jpg`)" 
                alt="國史館檔案史料文物查詢系統"
                class="card-img-top"                 
                />
            </div> 
            <div class="card-body">
              <p class="card-text">中華民國地方議會議事錄總庫</p>
            </div>                       
          </a>
        </div>   
      </div>

    </div>
  </div>


   

    


     






 
</template>



<script>
export default {
  name: 'Material',
}
</script>