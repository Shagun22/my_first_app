'use strict';

module.exports = function(Books) {

	Books.fetchBooks = function(category,cb){
		console.log('category',category)
		if (!category){
			let err = new Error("Pls enter valid category.")
			err.statusCode = 412
			return cb(err);
		} 

		let query = {'where' : {'category' : category}};
		console.log('query',query)

		this.find(query,function(err,res){
			console.log('res',res)
			if(err){
				return cb(err);
			}
			return cb(null,res);
		});

	}

	Books.remoteMethod(
	'fetchBooks',{
		description:'to fetch all books',
		accepts:{'arg':'category','type':'string','description':'string showing category'},
		returns:{'arg':'data','type':'object','root':true},
		http:{'verb':"GET",path:"/fetchBooks"}
		
	}
	);

};
