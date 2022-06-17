<template>
    <div>
        <div>
            <PageTitle :title="{title: '相關連結'}" />
            <div style="text-align:center;">  
                <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Globe</title><path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M256 48c-58.07 0-112.67 93.13-112.67 208S197.93 464 256 464s112.67-93.13 112.67-208S314.07 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M117.33 117.33c38.24 27.15 86.38 43.34 138.67 43.34s100.43-16.19 138.67-43.34M394.67 394.67c-38.24-27.15-86.38-43.34-138.67-43.34s-100.43 16.19-138.67 43.34" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 48v416M464 256H48"/></svg>
            </div>
        </div>


        <div style="margin-top: 90px;text-align:center; font-size: 18px;">
            <table style="margin-left: auto;margin-rigth: auto;">
                <tr>
                    <p style="margin-bottom: 30px;">
                        <a class="linkLabelBGColor" style="text-decoration:none;color:black;" target="_blank" href="http://www.digital.ntu.edu.tw/" title="臺灣大學數位人文研究中心">臺灣大學數位人文研究中心</a>
                    </p>
                </tr>
                <tr>
                    <p style="margin-bottom: 30px;">
                        <a class="linkLabelBGColor" style="text-decoration:none;color:black;" target="_blank" href="https://www.drnh.gov.tw" title="國史館">國史館</a>
                    </p>
                </tr>
                <tr>
                    <p style="margin-bottom: 30px;">
                        <a class="linkLabelBGColor" style="text-decoration:none;color:black;" target="_blank" href="https://www.th.gov.tw/" title="國史館臺灣文獻館">國史館臺灣文獻館</a>
                    </p>
                </tr>
                <tr>
                    <p style="margin-bottom: 30px;">
                        <a class="linkLabelBGColor" style="text-decoration:none;color:black;" target="_blank" href="https://zh.wikipedia.org/wiki/臺灣省諮議會" title="臺灣省諮議會">臺灣省諮議會</a>
                    </p>
                </tr>
            </table>
        
          
        </div>		
    </div>


    <div style="margin-bottom: 450px;"></div>
</template>



<script>
import PageTitle from '../components/PageTitle'
export default {
  name: 'RelatedLink',

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

