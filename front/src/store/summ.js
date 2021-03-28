
import axios from "axios";

const state={
        text:"",
        resp:"",
        amount:10,
        type:"Lda",
        respSelected:"",
        items:["TF","TF-IDF","LDA","TextRank"],
        formats:['TXT','DOCX'],
        format:null,
        selected:false,
        file:null,
      }
const mutations= {
        setResp(state,data){
          state.resp=data;
        },
        setRespSelected(state,data){
          state.respSelected=data;
        },
        setText(state,data){
          state.text = data;
        },
        setType(state,data){
          state.type = data;
        },
        setAmount(state,data){
            state.amount = data;
        },
        setSelected(state,data){
            state.selected =data;
        },
        clear(state){
          state.resp="";
          state.respSelected="";
        },
        clearFile(state){
          state.file=null;
        },
        setFile(state,data){
          state.file=data;
        },
        setFormat(state,data){
          state.format=data;
        }
        
      }
const actions= {
          changeFormat({commit},data){
            commit('setFormat',data);
          },
          async downloadText(){
            let data = new FormData()
            data.append("file_type", state.format)
            data.append("output_text", state.selected ? state.respSelected : state.resp)
            await axios({
              method: 'post',
              url: "http://localhost:8081/file/download",
              data: data,
              responseType: 'blob'
            })
                .then(resp => {
                  const url = window.URL.createObjectURL(new Blob([resp.data]))
                  const link = document.createElement('a')
                  link.href = url
                  link.setAttribute('download', `file_name.${state.format.toLowerCase()}`)
                  document.body.appendChild(link)
                  link.click()
          })
          },
        async send({commit}){
          commit('clear');
          if(state.file!=null)
          {
            let data = new FormData()
            data.append("sentence_count", state.amount)
            data.append("type", state.type)
            data.append("file", state.file)  
            await axios({
              method:'post',
              url: "http://localhost:8081/file/upload",
              data: data
            }).then(response => {
             commit('setResp',response.data.output_text);
             commit('setRespSelected',response.data.output_text.split('.').filter(x=>x.includes('<strong>')).join('. '));
            });
          }
          else{
          await axios({
            method:'post',
            url: "http://localhost:8081/message",
            data: {
              id:1,
              input_text:state.text,
              sentence_count:state.amount,
              type:state.type
            }
          }).then(response => {
           commit('setResp',response.data.output_text);
           commit('setRespSelected',response.data.output_text.split('.').filter(x=>x.includes('<strong>')).join('. '));
          });
        }
        commit('clearFile');
        },
        changeText({commit},text){
          commit('setText',text);
        },
        changeType({commit},type)
        {
          commit('setType',type);
        },
        changeAmount({commit},amount)
        {
          commit('setAmount',amount);
        },
        changeSelected({commit},selected){
            commit('setSelected',selected);
        },
        clearAll({commit}){
          commit('clear');
        },
        changeFile({commit},data){
          commit('setFile',data);
        }

      }
      export default{
          namespace:true,
          state,
          actions,
          mutations
      }
