<template>
    <div>
		<PageTitle :title="{title: '相關連結'}" />
        <div class="tbody_link">
            <tbody>
                <tr>
                    <td>
                        <li>
                            <span class="tbody_link_span">
                                <a target="_blank" href="http://www.digital.ntu.edu.tw/" title="臺灣大學數位人文研究中心">臺灣大學數位人文研究中心</a>
                            </span>
                        </li>
                    </td>
                </tr>
                <tr>
                    <td>
                        <li>
                            <span class="tbody_link_span">
                                <a target="_blank" href="https://www.drnh.gov.tw" title="國史館">國史館</a>
                            </span>
                        </li>
                    </td>
                </tr>
                <tr>
                    <td>
                        <li>
                            <span class="tbody_link_span">
                                <a target="_blank" href="https://www.th.gov.tw" title="國史館臺灣文獻館">國史館臺灣文獻館</a>
                            </span>
                        </li>
                    </td>
                </tr>
                <tr>
                    <td>
                        <li>
                            <span class="tbody_link_span">
                                <a target="_blank" href="https://zh.wikipedia.org/wiki/臺灣省諮議會" title="臺灣省諮議會">臺灣省諮議會</a>
                            </span>
                        </li>
                    </td>
                </tr>
            </tbody>
        </div>	
			
    </div>
    <div style="margin-bottom: 13%;"></div>
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
