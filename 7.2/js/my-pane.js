Vue.component('my-pane', {
    name: 'my-pane',
    template: '<div class="my-pane" v-show="show"><slot></slot></div>',
    data: function () {
        return {
            show: true
        }
    },
    props: {
        name: {
            type: String
        },
        label: {
            type: String,
            default: ''
        },
        closable:{
             type:Boolean,
             default:true
        }
    },
    methods:{
        updateNav:function(){
            this.$parent.updateNav();
        }
    },
    watch:{
        label:function(){
            this.updateNav();
        }
    },
    mounted:function(){
        this.updateNav();
    }
})