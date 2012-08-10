$(function(){


    ChangeTitleModel= Backbone.Model.extend({
    	defaults: {
            oldTitle: 'default',
            newTitle: 'default'

        },

        initialize: function(){

            this.bind("change:newTitle", function(){
                return true;
                var newTitle = this.get("newTitle"); 
                alert("Changed my name to " + title );
            });


            this.bind("error", function(model, error){
                // We have received an error
                alert( error );
            });

        },


        validate: function( attributes ){
            var title=attributes.newTitle;

            if( title == "" ){
                return "This field can't be empty!";
            }

            if( title.length>70 ){
                return "The size of this field can't be longer than 70 characters!";
            }
        },

        facade: function(){

            alert("Данные ушли на сервер");
           /* $.ajax({
              url: 'http:',
              success: function(){
                alert('Load was performed.');
              }
            }); */
        }

    });

    changeTitleModel = new ChangeTitleModel();






    SearchView = Backbone.View.extend({

        initialize: function(){
            this.render();
        },

        render: function(){
            var template = _.template( $("#main_template").html(), {} );
            this.$el.html( template );
        },

        events: {
            "click      span.icon":             "changeTitle",
            "keypress   input[type='text']":    "doChangeTitleOnEnter",
            "blur       input[type='text']":    "doChangeTitleOnBlur"
        },

        changeTitle: function( event ){

            var pencil=event.currentTarget;
            var uploadFile = $(pencil).parent().children(".text-my");

            var inputTitle=jQuery('<input />', {
                type: 'text',
                maxlength: '70',
                class: 'qwerty',
                value: $(uploadFile).text()
            });


            $(pencil).hide();
            $(uploadFile).hide();

            $(inputTitle).insertBefore(pencil).focus();

            changeTitleModel.set({  oldTitle: $(uploadFile).text(), pencil:pencil, uploadFile:uploadFile, inputTitle:inputTitle });
    
        },

        doChangeTitle: function(){
            var pencil = changeTitleModel.get('pencil');
            var uploadFile = changeTitleModel.get('uploadFile');
            var inputTitle = changeTitleModel.get('inputTitle');
  
            if(changeTitleModel.set({ newTitle:$(inputTitle).val() })){

                $(inputTitle).detach();
                $(uploadFile).show();
                $(uploadFile).text(changeTitleModel.get('newTitle'));
                $(pencil).show();

                if(changeTitleModel.get('newTitle')!=changeTitleModel.get('oldTitle')){
                    alert("Не равны");
                    changeTitleModel.facade();
                }else{
                    alert("Равны");
                }

            }else{
                //alert("Возникли проблемы");
            }    

        },

        doChangeTitleOnEnter: function( event ){
            if ( event.which == 13 ) {
                this.doChangeTitle();
            }
        },

        doChangeTitleOnBlur: function( event ){
            this.doChangeTitle();
        }



    });
    
    var search_view = new SearchView({ el: $("#main_container") });






});