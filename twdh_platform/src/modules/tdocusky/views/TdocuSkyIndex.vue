<template>
  <div>
		<PageTitle :title="{title: 'T-DocuSky'}" />
    <div style="text-align:center;">
      <svg height="25.5" width="25.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-5h2v5zm4 0h-2v-3h2v3zm0-5h-2v-2h2v2zm4 5h-2V7h2v10z"/></svg>
    </div>
  </div>
  <div style="margin-top: 20px;margin-bottom: 100px; text-align: center">
    <button type="button" class="btn btn-outline-primary"  @click="prevPage">← 返回 Open Data 服務</button>
  </div>




  <b-alert :show="isShowAlert" fade variant="warning">
    {{ alertMessage }}
  </b-alert>

  <div>
    <VueMultiselect ref="multiselect" v-model="selectedColumns" placeholder="Select metadata?" label="headerName"
      track-by="headerName" @remove="removeConditionally" @open="afterOpenDropdown" @close="afterCloseDropdown"
      :options="options" :multiple="true" :custom-label="customLabel">
    </VueMultiselect>
  </div>
  
  <div>
    <b-button-group>
      <b-button variant="secondary" @click="generateTable">Generate</b-button>
      <div style="width: 150px; padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px;">
        <label>&nbsp; Row number:</label>
        <input class="form-control" type="number" id="row-num" name="row-num" min="1" max="100" value="10">  
      </div>
      <b-button variant="secondary" @click="reorganizeTable">Reorganize</b-button>
      <b-button variant="secondary" @click="extractTable">Extract</b-button>
      <b-button variant="secondary" @click="rewindTable">Rewind</b-button>
    </b-button-group>
  </div>

  <form>
    <div class="form-group">
      <label for="upload">&nbsp;  Select .csv files:  &nbsp;&nbsp;&nbsp;&nbsp;</label>
      <input class="form-control" id="csv-file" type=file accept=".csv" name="files[]" size=30 multiple="multiple">
    </div>
  </form>

  <div>
    <b-button-group>
      <b-button variant="secondary" @click="importCSV">Import CSV</b-button>
      <b-button variant="secondary" @click="toEN">EN</b-button>
      <b-button variant="secondary" @click="toTW">TW</b-button>
      <b-button variant="secondary" @click="undoHot">UNDO</b-button>
      <b-button variant="secondary" @click="redoHot">REDO</b-button>
      <b-button variant="secondary" @click="exportCSV">Export CSV</b-button>
   </b-button-group>
  </div>

  <hot-table ref="userTable" v-show="isShowTable" :settings="hotSettings"></hot-table>




  <div style="margin-bottom: 150px;"></div>
</template>

<script>
import { HotTable } from '@handsontable/vue3';
import { registerAllModules } from 'handsontable/registry';
import VueMultiselect from 'vue-multiselect' // for vue3 multiselect
import 'handsontable/dist/handsontable.full.css';
import 'vue-multiselect/dist/vue-multiselect.css';
import PageTitle from '../../portal/components/PageTitle'


// register Handsontable's modules
registerAllModules();

export default {
  name: 'TdocuSkyIndex',
  components: {
    VueMultiselect,
    HotTable,
    PageTitle,
  },
  data: function () {
    return {
      isShowAlert: false,
      alertMessage: 'Warning! 檔案名稱是必要欄位！',
      options: columnDefinition,
      selectedColumns: [{
        field: 'filename',
        headerName: '檔案名稱',
      }],
      isShowTable: true,
      isTableLoad: false,
      isViewMode: false, // true, if header in TW; false, if header in EN
      backupTable: [[]],
      hotSettings: {
        rowHeaders: true,
        colHeaders: true,
        dropdownMenu: true,
        manualColumnMove: true,
        contextMenu: true,
        manualColumnFreeze: true,
        afterCreateCol: (index) => {
          this.$refs.userTable.hotInstance.setDataAtCell(0, index, "metadata/");
        },
        licenseKey: 'non-commercial-and-evaluation', // for non-commercial use only
      },
    };
  },
  methods: {
    prevPage(){
      this.$router.push({ name: this.$router.currentRoute.value.meta.prev });
    },
    customLabel({ headerName, field }) {
      return `${headerName} (${field})`
    },
    delayedAlert: function () {
      this.isShowAlert = true;
      setTimeout(() => {
        this.isShowAlert = false;
      }, 1000);
    },
    highlightSelected: function () {
      var cols = this.selectedColumns.length;
      var rows = this.$refs.userTable.hotInstance.getData().length;
      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
          this.$refs.userTable.hotInstance.setCellMeta(i, j, 'className', 'lightblue-bg');
        }
      }
      this.$refs.userTable.hotInstance.render();
      setTimeout(() => {
        for (var i = 0; i < rows; i++) {
          for (var j = 0; j < cols; j++) {
            this.$refs.userTable.hotInstance.setCellMeta(i, j, 'className', 'white-bg');
          }
        }
        this.$refs.userTable.hotInstance.render();
      }, 1000);
    },
    removeConditionally: function (removedOption) {
      if (removedOption.headerName === '檔案名稱') {
        this.delayedAlert();
        this.selectedColumns.unshift({ // push element at the beginning
          field: 'filename',
          headerName: '檔案名稱',
        });
      }
    },
    afterOpenDropdown: function () {
      this.isShowTable = false;
    },
    afterCloseDropdown: function () {
      this.isShowTable = true;
    },
    undoHot: function () {
      this.$refs.userTable.hotInstance.undo();
    },
    redoHot: function () {
      this.$refs.userTable.hotInstance.redo();
    },
    generateTable: function () {
      if (this.isTableLoad) {
        if (!confirm("Are you sure to generate a new table?")) return;
      }
      this.backupTable = this.$refs.userTable.hotInstance.getData(); // backup
      var colName = this.selectedColumns.map((x) => x.headerName);
      this.$refs.userTable.hotInstance.updateData([[]]); // refresh table
      for (var i = 0; i < document.getElementById('row-num').value; i++) {
        this.$refs.userTable.hotInstance.setDataAtCell(i, 0, "");
      }
      for (var j = 0; j < colName.length; j++) {
        this.$refs.userTable.hotInstance.setDataAtCell(0, j, colName[j]);
      }
      this.isViewMode = true;
      this.isTableLoad = true;
    },
    reorganizeTable: function () {
      if (!this.isTableLoad) { // check if table be loaded first
        alert("Need generate/load tabe first!");
        return;
      }
      if (!confirm("Are you sure to reorgnize table?")) return;
      this.backupTable = this.$refs.userTable.hotInstance.getData(); // backup
      var isNeedTranslate = !this.isViewMode; // check if header is EN
      if (isNeedTranslate) { // if yes, then translate header to TW first
        this.fieldToHeaderName();
      }
      var colName = this.selectedColumns.map((x) => x.headerName);
      var data = this.$refs.userTable.hotInstance.getData();
      var rows = data.length;
      this.$refs.userTable.hotInstance.updateData([[]]); // refresh table
      var j = 0;
      for (; j < colName.length; j++) { // check selected field is in table
        var colIdx = data[0].findIndex((x) => x === colName[j]);
        if (colIdx >= 0) { // if field already have existed, then copy cols
          for (var i = 0; i < rows; i++) {
            this.$refs.userTable.hotInstance.setDataAtCell(i, j, data[i][colIdx]);
          }
          data.forEach(a => a.splice(colIdx, 1)); // if col copied, then delete col from previous table
        } else {// if field not existed, then just add new col
          this.$refs.userTable.hotInstance.setDataAtCell(0, j, colName[j]);
        }
      }
      for (var k = 0; k < data[0].length; k++, j++) { // copy other cols from previous table
        for (var i = 0; i < rows; i++) {
          this.$refs.userTable.hotInstance.setDataAtCell(i, j, data[i][k]);
        }
      }
      this.highlightSelected();
      if (isNeedTranslate) { // translate header back to EN
        this.headerNameToField();
      }
    },
    extractTable: function () {
      if (!this.isTableLoad) { // check if table be loaded first
        alert("Need generate/load tabe first!");
        return;
      }
      if (!confirm("Are you sure to extract table?")) return;
      this.backupTable = this.$refs.userTable.hotInstance.getData(); // backup
      var isNeedTranslate = !this.isViewMode; // check if header is EN
      if (isNeedTranslate) { // if yes, then translate header to TW first
        this.fieldToHeaderName();
      }
      var colName = this.selectedColumns.map((x) => x.headerName);
      var data = this.$refs.userTable.hotInstance.getData();
      var rows = data.length;
      this.$refs.userTable.hotInstance.updateData([[]]); // refresh table
      var j = 0;
      for (; j < colName.length; j++) { // check selected field is in table
        var colIdx = data[0].findIndex((x) => x === colName[j]);
        if (colIdx >= 0) { // if field already have existed, then copy cols
          for (var i = 0; i < rows; i++) {
            this.$refs.userTable.hotInstance.setDataAtCell(i, j, data[i][colIdx]);
          }
          data.forEach(a => a.splice(colIdx, 1)); // if col copied, then delete col from previous table
        } else {// if field not existed, then just add new col
          this.$refs.userTable.hotInstance.setDataAtCell(0, j, colName[j]);
        }
      }
      this.highlightSelected();
      if (isNeedTranslate) { // translate header back to EN
        this.headerNameToField();
      }
    },
    rewindTable: function () {
      this.$refs.userTable.hotInstance.loadData(this.backupTable);
    },
    importCSV: function () {
      var file = document.getElementById('csv-file').files[0];
      if (!file) {
        alert("No file selected!");
        return;
      }
      if (this.isTableLoad) {
        if (!confirm("Are you sure to import csv?")) return;
      }
      this.backupTable = this.$refs.userTable.hotInstance.getData(); // backup
      var self = this; // pass this object
      this.parseCSV(file).then(function (results) {
        console.log("results", results);
        // Papa.parse will execute in parallel process. (async function)
        // Put in then function ensure do these commands after parsing.
        self.$refs.userTable.hotInstance.loadData(results);
        self.fieldToHeaderName();
      });
      this.isViewMode = true;
      this.isTableLoad = true;
    },
    parseCSV: function (file) {
      return new Promise(resolve => {
        this.$papa.parse(file, {
          dynamicTyping: true,
          complete: function (results) {
            resolve(results.data)
          }
        });
      });
    },
    exportCSV: function () {
      var isNeedTranslate = this.isViewMode; // check if header is TW
      if (isNeedTranslate) { // if yes, then translate header to EN first
        this.headerNameToField();
      }
      this.downloadTable();
      if (isNeedTranslate) { // translate header back to TW
        this.fieldToHeaderName();
      }
    },
    downloadTable: function () {
      this.$refs.userTable.hotInstance.getPlugin('exportFile').downloadFile('csv', {
        bom: false,
        columnDelimiter: ',',
        columnHeaders: false,
        exportHiddenColumns: true,
        exportHiddenRows: true,
        fileExtension: 'csv',
        filename: 'Handsontable-CSV-file_[YYYY]-[MM]-[DD]',
        mimeType: 'text/csv',
        rowDelimiter: '\r\n',
        rowHeaders: false
      });
    },
    fieldToHeaderName: function () {
      const getHeaderNameByField = (columnDefinition, value) =>
        (columnDefinition.find(x => Object.values(x)[0] === value) || {})['headerName'];
      console.log("before:", this.$refs.userTable.hotInstance.getDataAtRow(0));
      for (var j = 0; j < this.$refs.userTable.hotInstance.getDataAtRow(0).length; j++) {
        if (getHeaderNameByField(columnDefinition, this.$refs.userTable.hotInstance.getDataAtRow(0)[j]) !== undefined) {
          this.$refs.userTable.hotInstance.setDataAtCell(0, j, getHeaderNameByField(columnDefinition, this.$refs.userTable.hotInstance.getDataAtRow(0)[j]));
        }
      }
      console.log("after:", this.$refs.userTable.hotInstance.getDataAtRow(0));
      this.isViewMode = true;
    },
    headerNameToField: function () {
      const getFieldByHeaderName = (columnDefinition, value) =>
        (columnDefinition.find(x => Object.values(x)[1] === value) || {})['field'];
      console.log("before:", this.$refs.userTable.hotInstance.getDataAtRow(0));
      for (var j = 0; j < this.$refs.userTable.hotInstance.getDataAtRow(0).length; j++) {
        if (getFieldByHeaderName(columnDefinition, this.$refs.userTable.hotInstance.getDataAtRow(0)[j]) !== undefined) {
          this.$refs.userTable.hotInstance.setDataAtCell(0, j, getFieldByHeaderName(columnDefinition, this.$refs.userTable.hotInstance.getDataAtRow(0)[j]));
        }
      }
      console.log("after:", this.$refs.userTable.hotInstance.getDataAtRow(0));
      this.isViewMode = false;
    },
    toEN: function () {
      this.headerNameToField();
    },
    toTW: function () {
      this.fieldToHeaderName();
    },
  },
}

const columnDefinition = [
  {
    field: 'filename',
    headerName: '檔案名稱',
    $isDisabled: true,
  },
  {
    field: 'corpus',
    headerName: '文獻集名稱',
  },
  {
    field: 'compilation_name',
    headerName: '文件出處',
  },
  {
    field: 'compilation_vol',
    headerName: '文件出處的冊數',
  },
  {
    field: 'title',
    headerName: '文件標題',
  },
  {
    field: 'author',
    headerName: '文件作者',
  },
  {
    field: 'doc_source',
    headerName: '文件來源',
  },
  {
    field: 'topic',
    headerName: '文件主題',
  },
  {
    field: 'geo',
    headerName: '文件地域',
  },
  {
    field: 'doc_topic_l1',
    headerName: '文件主題階層一',
  },
  {
    field: 'doc_topic_l2',
    headerName: '文件主題階層二',
  },
  {
    field: 'doc_topic_l3',
    headerName: '文件主題階層三',
  },
  {
    field: 'geo_level1',
    headerName: '文件地域階層一',
  },
  {
    field: 'geo_level2',
    headerName: '文件地域階層二',
  },
  {
    field: 'geo_level3',
    headerName: '文件地域階層三',
  },
  {
    field: 'geo_longitude',
    headerName: '文件所在經度',
  },
  {
    field: 'geo_latitude',
    headerName: '文件所在緯度',
  },
  {
    field: 'doc_category_l1',
    headerName: '文件分類階層一',
  },
  {
    field: 'doc_category_l2',
    headerName: '文件分類階層二',
  },
  {
    field: 'doc_category_l3',
    headerName: '文件分類階層三',
  },
  {
    field: 'docclass',
    headerName: '文件類別',
  },
  {
    field: 'docclass_aux',
    headerName: '文件子類別',
  },
  {
    field: 'doctype',
    headerName: '文件型態',
  },
  {
    field: 'doctype_aux',
    headerName: '文件子型態',
  },
  {
    field: 'book_code',
    headerName: '文件書碼',
  },
  {
    field: 'time_orig_str',
    headerName: '文件時間(字串)',
  },
  {
    field: 'time_varchar',
    headerName: '文件時間(西曆)',
  },
  {
    field: 'time_norm_year',
    headerName: '文件時間(中曆)',
  },
  {
    field: 'era',
    headerName: '文件時間(年號)',
  },
  {
    field: 'time_norm_kmark',
    headerName: '文件時間(帝號)',
  },
  {
    field: 'year_for_grouping',
    headerName: '文件時間(西元年)',
  },
  {
    field: 'time_dynasty',
    headerName: '文件時間(朝代)',
  },
  {
    field: 'doc_seq_number',
    headerName: '文件順序',
  },
  {
    field: 'timeseq_not_before',
    headerName: '文件起始時間',
  },
  {
    field: 'timeseq_not_after',
    headerName: '文件結束時間',
  },
  {
    field: 'date_not_before',
    headerName: '文件在某日期之後的時間',
  },
  {
    field: 'date_not_after',
    headerName: '文件在某日期之前的時間',
  },
  {
    field: 'date_number',
    headerName: '文件的日期',
  },
  {
    field: 'doc_seq_number',
    headerName: '文件的時間順序',
  }
];
</script>

<style>
.handsontable .lightblue-bg {
  background-color: #edf8e2;
}

.handsontable .white-bg {
  background-color: white;
}
</style>
