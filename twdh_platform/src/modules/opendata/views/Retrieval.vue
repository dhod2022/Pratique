<template>
    <div>
        <PageTitle :title="{title: '整合檢索視覺化服務'}" />
        <div style="text-align:center;">  
            <svg height="28.5" width="28.5" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M7,9H2V7h5V9z M7,12H2v2h5V12z M20.59,19l-3.83-3.83C15.96,15.69,15.02,16,14,16c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5 c0,1.02-0.31,1.96-0.83,2.75L22,17.59L20.59,19z M17,11c0-1.65-1.35-3-3-3s-3,1.35-3,3s1.35,3,3,3S17,12.65,17,11z M2,19h10v-2H2 V19z"/></g></svg> 
        </div>
    </div>

    <div>
        <Form @submit="getRetrieval">
            <label class="form-label">關鍵字：</label>
            <Field 
                type="text"
                class="form-control form-control-lg"
                name="關鍵字"
            /><br>
     
            <Field 
                type="checkbox"
                class="form-check-input"
                name="使用全文檢索[]"
                :value="是" 
                checked
            />
            <label class="form-label">&nbsp;&nbsp;使用全文檢索</label><br>



            <div class="d-grid gap-2" style="margin-top: 20px;">
                <button class="btn btn-secondary">提 交</button>      
            </div>
      </Form>
    </div>










    <div style="margin-bottom: 280px;"></div>
</template>



<script>
import PageTitle from '../../portal/components/PageTitle'
import { Form, Field } from "vee-validate";
import axios from 'axios';
import VueSimpleAlert from "vue3-simple-alert";


export default {
  name: 'retrieval',

  components: {
    PageTitle,
    Form,
    Field,
  },

  methods: {
    getRetrieval(retrievalData) {
    }
  }
}
</script>