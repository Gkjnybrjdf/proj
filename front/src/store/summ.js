
import axios from "axios";

const state={
        text:"",
        resp:"",
        amount:10,
        type:"Lda",
        respSelected:"",
        items:["TF","TF-IDF","LDA"],
        formats:['TXT','DOCX'],
        format:null,
        selected:false,
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
        }
      }
const actions= {
        async send({commit}){
          commit('clear');
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
        }

      }
      export default{
          namespace:true,
          state,
          actions,
          mutations
      }
