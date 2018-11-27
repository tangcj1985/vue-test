function isValueNumber(value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
}

Vue.component('input-number', {
    template: '111\
        <div class="input-number">\
            <input type="text" :value="currentValue" v-on:change="handleChange" />\
            <button \
                @click="handleDown" \
                :disabled="currentValue <= min">-</button> \
            <button \
                @click="handleUp" \
                :disabled="currentValue >= max">+</button> \
        </div>',
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data: function () {
        return {
            currentValue: this.value
        }
    },
    watch: {
        currentValue: function (val) {
            this.$emit('input', val);
            this.$emit('change', val);
        },
        value: function (val) {
            this.updateValue(val);
        }
    },
    methods: {
        handleDown: function () {
            if (this.currentValue <= this.min) return;
            this.currentValue -= 1;
        },
        handleUp: function () {
            if (this.currentValue >= this.max) return;
            this.currentValue += 1;
        },
        updateValue: function (val) {
            if (val > this.max) val = this.max;
            if (val < this.min) val = this.min;
            this.currentValue = val;
        },
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
        }
    },
    mounted: function () {
        this.updateValue(this.value);
    }
});