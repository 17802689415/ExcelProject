<template>
    <div id="uploadBox">
        <el-upload
            class="upload-demo"
            action=""
            drag
            ref="upload"
            :limit="limitUpload"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :auto-upload="false"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip"><span style="color:red;font-weight:800;">请上传 .xls / .xlsx 格式文件</span></div>
        </el-upload>
    </div>
</template>
<script>


export default ({
    name:'myUpload',
    data(){
        return{
            limitUpload:10
        }
    },
    methods:{
        handleChange(file) {
            const _this = this
            const fileName = file.name;
            console.log(fileName);

            const reader = new FileReader();
            //提取excel中文件内容
            reader.readAsArrayBuffer(file.raw);
            reader.onload = function () {
                const buffer = reader.result;
                const bytes = new Uint8Array(buffer);
                const length = bytes.byteLength;
                let binary = "";
                for (let i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                const XLSX = require("xlsx");  //import xlsx from 'xlsx'
                console.log(XLSX);
                //转换二进制
                const wb = XLSX.read(binary, {
                    type: "binary",
                });
                const outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                console.log(outdata);
                //这里for循环将excel表格数据转化成json数据
                let arr=[];
                let array=[];
                let ary=[];
                for(let prop in outdata[1]){
                    ary.push({
                        name:prop,
                        ct:outdata[1][prop]
                    })
                }
                console.log(ary)
                
                outdata.forEach((i) => {
                    console.log(i.__EMPTY_1)
                    console.log(i.__EMPTY_7)
                    if(i.__EMPTY_7!=null){
                        array.push(i.__EMPTY_7)
                    }
                    arr.push(i.__EMPTY_1)
                });
                
                console.log(array)
                console.log(arr)
                

                


                let obj={
                        
                        operator:array[1],
                        sn:arr[1],
                        testName:ary[0].ct,

                        floorCurrent1:arr[arr.length-15],
                        floorCurrent2:arr[arr.length-14],
                        shellCurrent1:arr[arr.length-13],
                        shellCurrent2:arr[arr.length-12],
                        patientCurrent1:arr[arr.length-11],
                        patientCurrent2:arr[arr.length-10],
                        patientCurrent3:arr[arr.length-9],
                        patientCurrent4:arr[arr.length-8],
                        patientCurrent5:arr[arr.length-7],
                        patientAssistCurrent1:arr[arr.length-6],
                        patientAssistCurrent2:arr[arr.length-5],
                        patientAssistCurrent3:arr[arr.length-4],
                        patientAssistCurrent4:arr[arr.length-3],
                        impedance:arr[arr.length-2],
                        inputPower:arr[arr.length-1]
                }

                console.log(obj)
                        

                
                var formData = new FormData();
                formData.append('testLog',obj);
                _this.$axios.post('http://localhost:8099/testLog/test',formData).then(function (res){

                    if(res.data.code==1){
                        alert('上传成功')
                    }
                })
            
                    // _this.tableData.push(obj);  //此处是把数据添加到表格中
               




            };
        },
    }
})
</script>
