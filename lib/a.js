var Student=function(){
	    var name='';

	     this.setName=function(n){
		             name=n;
		         }; 

	    this.printName=function(){
		            console.log(name)    ;
		        };
};

module.exports=Student;
