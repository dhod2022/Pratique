<template>
    <div>
        <div>
            <PageTitle :title="{title: '相關資訊'}" />
            <div style="text-align: center;">  
                <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            </div>
        </div>

        <div style="display: flex; justify-content: center; margin-top: 15px; margin-bottom: 45px;">
            <div class="card" style="width: 25rem; margin-top: 80px;">
                <div class="card-body">
                    <h5 class="card-title" style="font-weight: bold;">開發團隊</h5>
                    <h6 class="card-subtitle mb-2 text-muted">臺大數位人文研究中心規劃設計，項潔教授主持。</h6>
                    <p class="card-text">
                        臺大資訊工程學系暨研究所、資訊網路與多媒體研究所學生-
                        董光立、陳泂杋、高正玥、陳詩淇、蔡念成、陳昱安、高聖傑、王偉吉，負責平台開發。
                    </p>        
                </div>

            </div> 
        </div>
 

        <div style="margin-top: 90px; font-size: 17px;">
            <div style="display: grid; justify-content: center;">
                <table>
                    <tr>
                        <h3 style="margin-bottom: 35px; text-align: center;"><span class="badge bg-light text-dark">相關連結</span></h3>
                    </tr>
                    <tr>
                        <p style="margin-bottom: 3px; text-align: left;">
                            <li><a class="linkLabelBGColor" style="text-decoration:none;color:black;" target="_blank" href="http://www.digital.ntu.edu.tw/" title="臺灣大學數位人文研究中心">臺大數位人文研究中心</a></li>
                        </p>
                    </tr>
                    <tr>
                        <p style="margin-bottom: 3px; text-align: left;">
                            <li><a class="linkLabelBGColor" style="text-decoration:none;color:black;" target="_blank" href="https://www.drnh.gov.tw" title="國史館">國史館</a></li>
                        </p>
                    </tr>
                    <tr>
                        <p style="margin-bottom: 3px; text-align: left;">
                            <li><a class="linkLabelBGColor" style="text-decoration:none;color:black;" target="_blank" href="https://www.th.gov.tw/" title="國史館臺灣文獻館">國史館臺灣文獻館</a></li>
                        </p>
                    </tr>
                    <tr>
                        <p style="margin-bottom: 3px; text-align: left;">
                            <li><a class="linkLabelBGColor" style="text-decoration:none;color:black;" target="_blank" href="https://zh.wikipedia.org/wiki/臺灣省諮議會" title="臺灣省諮議會">臺灣省諮議會</a></li>
                        </p>
                    </tr>
                </table>
            </div>
        </div>	


           	
    </div>



    <div style="margin-bottom: 150px;"></div>
</template>



<script>
import PageTitle from '../components/PageTitle'
export default {
  name: 'RelatedInfo',

components: {
    PageTitle,
  }
}
</script>

<style>
    .linkLabelBGColor:hover {
        background-color: #bf9a0b;
        border-radius: 2px 2px 2px 2px;
    }
</style>

