Vue.component('number-input',{
    // 定义来自父级的参数
    props:{
        max:{
            type:Number,
            default:Infinity
        },
        min:{
            type:Number,
            default:-Infinity
        },
        value:{
            type:Number,
            default:0
        },
        step:{
            type:Number,
            default:1
        }
    },
    template:'\
        <div>\
            <input type="text" :value="currentValue" @change="handleChange" @keydown="handleKeydown" />\
            <button @click="handleAdd" :disabled="currentValue>=max"> ADD </button>\
            <button @click="handleReduce" :disabled="currentValue<=min"> Reduce </button>\
        </div>',
    data:function(){
        // Vue组件是单向数据流，无法直接修改prop中的值
        var currentValue = 0 ;
        if(this.value > this.max){
            currentValue = this.max ;    
        } else if(this.value < this.min){
            currentValue = this.min ;    
        } else{
            currentValue = this.value ;
        }
        return {
            currentValue :currentValue 
        }
    },
    methods:{
        handleChange:function(event){
            var val = event.target.value.trim() ;
            if(isValueNumber(val)){
                var max = this.max ;
                var min = this.min ;
                val = Number(val);
                this.currentValue = val ;
                if(val>max) this.currentValue = max ;
                if(val<min) this.currentValue = min ;
            }else{
                // 如果输入的非数字，则保留之前的数据
                event.target.value = this.currentValue ;
            }
        },
        // 绑定键盘事件
        handleKeydown:function(event){
            if(event.keyCode==38){
                this.handleAdd();
            }
            if(event.keyCode==40){
                this.handleReduce() ;
            }
        },    
        handleAdd:function(){
            if(this.currentValue>=this.max) return ;
            this.currentValue += this.step ;
        },handleReduce:function(){
            if(this.currentValue<=this.min) return ;
            this.currentValue -= this.step;
        },
        updateVal:function(val){
            if(val>this.max) val = this.max ;
            if(val<this.min) val = this.min ;
            this.currentValue = val ;
        }
    },
    watch:{
        // 增加监听
        currentValue:function(val){
            this.$emit('input',val);
            this.$emit('on-change',val);
        },
        value:function(val){
            this.updateVal(val);
        }
    }
})