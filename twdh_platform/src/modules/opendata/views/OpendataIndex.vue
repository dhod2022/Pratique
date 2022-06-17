<template>
  <div>
		<PageTitle :title="{title: 'Open Data'}" />
    <div style="text-align:center;">
      <svg height="28.5" width="28.5" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M7,9H2V7h5V9z M7,12H2v2h5V12z M20.59,19l-3.83-3.83C15.96,15.69,15.02,16,14,16c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5 c0,1.02-0.31,1.96-0.83,2.75L22,17.59L20.59,19z M17,11c0-1.65-1.35-3-3-3s-3,1.35-3,3s1.35,3,3,3S17,12.65,17,11z M2,19h10v-2H2 V19z"/></g></svg> 
    </div>
  </div>
  <div style="margin-top: 20px; margin-bottom: 130px; text-align:center">
    <button type="button" class="btn btn-outline-warning"  @click="prevPage">← 返回 史料脈絡系統</button>
    <button type="button" class="btn btn-outline-success"  @click="nextPage">前往 T-DocuSky 服務 →</button>
  </div>


  <div class="flexContainer" v-if="login">
    <div class="dirBlock">
      <div class="userBlock">
        你好，使用者 {{displayName}}
      </div>
      <form @submit.prevent="submit">
        <input type="text" v-model="newDir" placeholder="輸入新資料夾名字" class="newDirBox"> 
         <button type="submit" @click="createDir()" class="newDirBtn">
            建立新資料夾
        </button>
      </form>
      <table class="dirList">
        <tr v-for="dir in dirs">
          <button type="submit" @click="getDocs(dir)" name="listDocs" class="btn-link">
            {{dir}}
          </button>
        </tr>
      </table>
    </div>
    <div class="metaBlock">
      <div v-if="inDir">
        <div>
            <button @click="removeDir()" class="removeDirBtn">刪除此資料夾</button>
          </div>
        <br><br>
        <div>
          [metadata 後分類]
        </div>
      </div>
    </div>
    <div class="contentBlock">
      <div v-if="inDir">
        {{"現在正在資料夾：" + curDir}}<br><br>
        <!-- 上傳 csv -->
        <label>上傳一個 csv 檔以加入新資料：
          <input type="file" id="csvFile" ref="csvFile" v-on:change="onChangeFileUpload()"/>
        </label>
        <button v-on:click="submitCSV()">Upload</button>
        <!-- 顯示 documents -->
        <div v-if="docs">
          <div class="docActions">
            <form @submit.prevent="submit" class="docAction">
                  <select v-model="copyTargetDir" class="selectList">
                    <option v-for="dir in dirs" :value="dir">{{dir}}</option>
                  </select>
                  <button @click="copyDoc()" class="docBtn">將勾選資料複製到其他資料夾</button>
              </form>

              <form @submit.prevent="submit" class="docAction">
                  <select v-model="moveTargetDir" class="selectList">
                    <option v-for="dir in dirs" :value="dir">{{dir}}</option>
                  </select>
                  <button @click="moveDoc()" class="docBtn">將勾選資料移動到其他資料夾</button>
              </form>
              <button @click="removeDoc()" class="docBtn deleteBtn">刪除勾選資料</button>
          </div>
          <ul>
            <li v-for="doc in docs" class="docBlock" :key="doc.ID">
              <input type="checkbox" v-model="checkedDocs" :value="doc" class="checkBox"/>
              <div class="rowBlock"><span class="tag-first">題名</span><span class="content-first">{{doc.題名}}</span></div>
              <div class="rowBlock"><span class="tag">id</span><span class="content">{{doc.ID}}</span></div>
              <div class="rowBlock"><span class="tag">metadata id</span><span class="content">{{doc.Metadata_ID}}</span></div>
              <div class="rowBlock"><span class="tag">來源系統</span><span class="content">{{doc.來源系統}}</span></div>
              <div class="rowBlock"><span class="tag">類目階層</span><span class="content">{{doc.類目階層}}</span></div>
              <div class="rowBlock"><span class="tag">時間</span><span class="content">{{doc.原始時間記錄}}</span></div>
              <div class="rowBlock"><span class="tag">相關人員</span><span class="content">{{doc.相關人員? doc.相關人員 : " - "}}</span></div>
              <div class="rowBlock"><span class="tag">相關地點</span><span class="content">{{doc.相關地點? doc.相關地點 : " - "}}</span></div>
              <div class="rowBlock"><span class="tag">相關組織</span><span class="content">{{doc.相關組織? doc.相關組織 : " - "}}</span></div>
              <div class="rowBlock"><span class="tag">關鍵詞</span><span class="content">{{doc.關鍵詞? doc.關鍵詞 : " - "}}</span></div>
              <div class="rowBlock"><span class="tag">原系統 URL</span><span class="content">{{doc.文件原系統頁面URL? doc.文件原系統頁面URL : " - "}}</span></div>
              <div class="rowBlock"><span class="tag-last">摘要</span><span class="content-last">{{doc.摘要}}</span></div>
            </li>
          </ul>
        </div>
        <div v-if="noDocs">
          此資料夾還沒有任何資料
        </div>
      </div>
      <div v-else>
        選擇一個資料夾以查看資料
      </div>
    </div>
  </div>
  <div v-else>
    <h2 style="padding-left:20px">請先登入</h2>
  </div>
</template>


<script>
import axios from 'axios';
import VueCookies from 'vue-cookies';
import PageTitle from '../../portal/components/PageTitle'



let dirID = 1;
let remoteBackend = "https://skolem.csie.ntu.edu.tw/OD/ODmission4/ODtest/";
let localBackend = "http://127.0.0.1:80/ODserver/";
let curBackend = remoteBackend;
export default {
  name: 'OpendataIndex',
  data() {
    return {
      displayName: '',
      username: '',
      login: false,
      dirs: [],
      docs: '',
      noDocs: true,
      curDir: '',
      inDir: false,
      newDir: '',
      csvFile: '',
      copyTargetDir: '',
      moveTargetDir: '',
      checkedDocs: []
    }
  },
  components: {
    PageTitle,
  },
  methods: {
    prevPage(){
      this.$router.push({ name: this.$router.currentRoute.value.meta.prev });
    },
    nextPage(){
      this.$router.push({ name: this.$router.currentRoute.value.meta.next });
    },
    getDirList() {
      axios({
          credentials: "include",
          method: "get",
          url: curBackend + "listDir.php",
          params: {username: this.username},
          headers: {"Content-Type": "application/json"},
          crossdomain: true,
      }).then(
          (response) => {
            console.log(response.data);
            this.dirs = response.data;
            }
      ).catch(function(error){ 
        // Error handling
        console.log("error: in method getDirList()");
        console.error(error);
      });
    },

    getDocs(dirName) {
      axios({
          credentials: "include",
          method: "get",
          url: curBackend + "getData.php",
          params: {listDocs: dirName, username: this.username},
          headers: {"Content-Type": "application/json"},
          crossdomain: true,
      }).then(
          (response) => {
            this.docs = response.data.list;
            this.curDir = response.data.dirName;
            this.checkedDocs = [];
            console.log("docs: ");
            console.log(this.docs[0]);
            if(this.docs[0] == null) {
              this.noDocs = true;
            } else {
              this.noDocs = false;
            }
          }
      ).catch(function(error){ 
        // Error handling 
        console.log("error: in method seeDocs()");
        console.error(error);
      });
      this.inDir = true;
    },
    createDir() {
      axios({
          credentials: "include",
          method: "get",
          url: curBackend + "createDir.php",
          params: {createDir: this.newDir, username: this.username},
          headers: {"Content-Type": "application/json"},
          crossdomain: true,
      }).then(
          (response) => {
            console.log("fin create dir");
            console.log(response.data);
            this.msg = response.data;
            alert(this.msg);
          }
      ).catch(function(error){ 
        // Error handling 
        console.log("error: in method createDir()");
        console.error(error);
      });
      this.newDir = '';
      this.getDirList();
    },

    removeDir() {
      if(confirm("確認要刪除此資料夾與當中的所有文件？") == true) {
        axios({
            credentials: "include",
            method: "get",
            url: curBackend + "removeDir.php",
            params: {removeDir: this.curDir, username: this.username},
            headers: {"Content-Type": "application/json"},
            crossdomain: true,
        }).then(
            (response) => {
              console.log(response.data);
              alert(response.data);
            }
        ).catch(function(error){ 
          // Error handling 
          console.log("error: in method removeDir()");
          console.error(error);
        });
        this.curDir = '';
        this.getDirList();
        this.checkedDocs = [];
        this.copyTargetDir = '';
        this.moveTargetDir = '';
        this.inDir = false;
        this.docs = '';
        this.noDocs = true;
      }
    },

    submitCSV(){
      let formData = new FormData();
      formData.append('submitCSV', this.csvFile);
      formData.append('username', this.username);
      formData.append('dirName', this.curDir);
      axios.post(curBackend + 'uploadCSV.php',
        formData,
        {
          header: {
              'Content-Type': 'multipart/form-data'
          }
        }
      ).then(
        (response) => {
          console.log("no error in submit csv");
          console.log(response.data);
          this.csvFile = '';
          this.$refs.csvFile.value = null;
        }
      )
      .catch(function(error){
        console.log('error in method submitCSV()');
        console.error(error);
      });
    },
    
    onChangeFileUpload(){
      this.csvFile = this.$refs.csvFile.files[0];
    },

    copyDoc() {
      let stopCopy = false;
      console.log(this.copyTargetDir);
      if(this.copyTargetDir == '') {
        alert("請選擇目標資料夾後再點選此按鈕");
        stopCopy = true;
      }
      if(this.copyTargetDir === this.curDir) {
        alert("請選擇當前資料夾以外的資料夾");
        stopCopy = true;
      }

      if(!stopCopy) {
        this.checkedDocs.forEach(doc =>
          axios({
              credentials: "include",
              method: "get",
              url: curBackend + "copyDoc.php",
              params: {username: this.username, docID: doc.Metadata_ID, targetDir: this.copyTargetDir},
              headers: {"Content-Type": "application/json"},
              crossdomain: true,
          }).then(
              (response) => {
                console.log("in copy response");
                console.log(response.data);
              }
          ).catch(function(error){ 
            // Error handling
            console.log("error: in method copyDoc()");
            console.error(error);
          })
        )
        alert("成功複製文件");
        this.copyTargetDir = ''
      }
    },
   
    moveDoc() {
      let stopMove = false;
      console.log(this.checkedDocs);
      if(this.moveTargetDir == '') {
        alert("請選擇目標資料夾後再點選此按鈕");
        stopMove = true;
      }
      if(this.moveTargetDir === this.curDir) {
        alert("請選擇當前資料夾以外的資料夾");
        stopMove = true;
      }

      if(!stopMove) {
        this.checkedDocs.forEach(doc =>
          axios({
              credentials: "include",
              method: "get",
              url: curBackend + "moveDoc.php",
              params: {username: this.username, docID: doc.ID, docMetaID: doc.Metadata_ID, targetDir: this.moveTargetDir},
              headers: {"Content-Type": "application/json"},
              crossdomain: true,
          }).then(
              (response) => {
                console.log(response.data);
              }
          ).catch(function(error){ 
            // Error handling
            console.log("error: in method moveDoc()");
            console.error(error);
          })
        )
        alert("成功移動文件");
        this.getDocs(this.curDir);
        this.moveTargetDir = '';
      }
    },

    removeDoc() {
      console.log(this.checkedDocs);
      if(confirm("確認要刪除這些文件嗎？") == true) {
        this.checkedDocs.forEach(doc =>
            axios({
                credentials: "include",
                method: "get",
                url: curBackend + "removeDoc.php",
                params: {username: this.username, docID: doc.ID},
                headers: {"Content-Type": "application/json"},
                crossdomain: true,
            }).then(
                (response) => {
                  console.log(response.data);
                  if(response.data == true) {
                    alert("刪除成功");
                  }
                }
            ).catch(function(error){ 
              // Error handling
              console.log("error: in method removeDoc()");
              console.error(error);
            })
          )
        
        this.getDocs(this.curDir);
      }
    },
  },
  mounted() {
    this.displayName = $cookies.get("display_name");
    axios({
        credentials: "include",
        method: "get",
        url: curBackend + "getUsername.php",
        params: {},
        headers: {"Content-Type": "application/json"},
        crossdomain: true,
    }).then(
        (response) => {
          console.log("get response from getUsername.php:");
          console.log(response.data);
          this.username = response.data;
          console.log(this.username);
          console.log("username: " + this.username);

          console.log("here");
          // this.username = $cookies.get("username");
          if(this.username !== '') {
            this.login = true;
            this.getDirList();
            console.log("login success");
          }
        }
    ).catch(function(error){ 
      // Error handling
      console.log("error: in method mounted(): getting username from server");
      console.error(error);
    })
  }
  
}
</script>

<style>
.flexContainer {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.dirBlock {
  font-size: 28px;
  width: 20%;
}

.userBlock {
  font-size: 20px;
  background-color: blanchedalmond;
  border: 20px solid white;
  
}

.metaBlock {
  width: 20%;
}

.contentBlock {
  width: 55%;
}

.dirList {
  border: 20px solid white;
  background-color: #81baca;
  
}

.btn-link {
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  color: #0000EE;
  padding: 0;
  text-decoration: underline;
  font-family: inherit;
  font-size: inherit;
}

.newDirBox {
  position: relative;
  border: 2px solid black;
  left: 20px;
  padding: 2px;
}

.newDirBtn {
  position: relative;
  left: 30px;
}

.uploadBox {
  display: flex;
  flex-direction: row;
  margin: 0px auto;
  padding: 20px;
  border: 1px solid #B0C4DE;
  background: white;
  border-radius: 0px 0px 10px 10px;
}

.docBlock {
  border:2px solid #317284;
  margin: 10px;
}

.rowBlock {
  display: flex;
  flex-direction: row;
}

.tag {
  color: white;
  background-color: #317284;
  width: 15%;
  border-bottom: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag-first {
  color: white;
  background-color: #317284;
  width: 15%;
  border-bottom: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag-last {
  color: white;
  background-color: #317284;
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  padding: 3px;
  width: 85%;
  border-bottom: 2px solid #317284;
}

.content-first {
  padding: 3px;
  width: 85%;
  border-top: 2px solid #317284;
  border-bottom: 2px solid #317284;
}

.content-last {
  padding: 3px;
  width: 85%;
}

.docActions {
  display: flex;
  flex-direction: row;
  position: relative;
  margin: 10px 0px 10px 0px;
  font-size: 18px;
}

.docAction {
}

.selectList {
  background-color: #f0ede1;
  position: relative;
  display: inline;
  height: 30px;
  border-radius: 0px;
  border: 2px solid #317284;
  padding: 5px;
  top: -3px;
}

.docBtn {
  background-color: #e2d396;
  position: relative;
  height: 30px;
  border-radius: 0px;
  padding: 5px;
  border: 2px solid #317284;
}

.deleteBtn {
  position: absolute;
  right: 0px;
  background-color: #e20b0b;
  color: white;
}

.checkBox {
  width: 20px;
  height: 20px;
}

.removeDirBtn {
  background-color: red;
  color: white;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 14px;
  padding: 5px;
}

</style>
