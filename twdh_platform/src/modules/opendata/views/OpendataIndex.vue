<template>
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
      [metadata 後分類]
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
          <ul>
            <li v-for="doc in docs" style="border:2px solid blue">
              <div>{{doc.題名}}</div>
              <div>{{doc.原始時間紀錄}}</div>
              <div>{{doc.摘要}}</div>
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

let dirID = 1;
export default {
  name: 'OpendataIndex',
  data() {
    return {
      displayName: '',
      username: '',
      login: false,
      dirs: [],
      dir0: [],
      docs: '',
      noDocs: true,
      curDir: '',
      inDir: false,
      newDir: '',
      csvFile: ''
    }
  },
  components: {
    
  },
  methods: {
    getDirList() {
      axios({
          credentials: "include",
          method: "get",
          url: "http://127.0.0.1:80/ODserver/listDir.php",
          params: {username: this.username},
          headers: {"Content-Type": "application/json"},
          crossdomain: true,
      }).then(
          (response) => {
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
          url: "http://127.0.0.1:80/ODserver/getData.php",
          params: {listDocs: dirName, username: this.username},
          headers: {"Content-Type": "application/json"},
          crossdomain: true,
      }).then(
          (response) => {
            this.docs = response.data.list;
            this.curDir = response.data.dirName;
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
          url: "http://127.0.0.1:80/ODserver/createDir.php",
          params: {createDir: this.newDir, username: this.username},
          headers: {"Content-Type": "application/json"},
          crossdomain: true,
      }).then(
          (response) => {
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
    submitCSV(){
      let formData = new FormData();
      formData.append('submitCSV', this.csvFile);
      formData.append('username', this.username);
      axios.post('http://127.0.0.1:80/ODserver/uploadCSV.php',
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
    }
  },
  mounted() {
    this.displayName = $cookies.get("display_name");
    this.username = $cookies.get("username");
    if(this.username != null) {
      this.login = true;
      this.getDirList();
    }
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
</style>
