angular.module ("doniphan_demo", ['ngRoute', 'factories'])

.config(function ($routeProvider, $locationProvider) {
	$routeProvider

	.when("/" ,{
		templateUrl: 'views/home.html',
		controller: 'homeCtrl',
		controllerAs: 'home'
	})
	.when("/characters", {
		templateUrl: 'views/characters.html',
		controller: 'sectionCtrl',
		controllerAs: 'section'
	})
})

.controller ('homeCtrl', function (Books) {
	var vm = this;
	$("#loading").show();

	Books.all()
	.then(function (data) {
		vm.books = data;
	}). finally(function () {
				$("#loading").hide();
			})
})

.controller ('sectionCtrl', function (Characters, Books) {
	var vm = this;
	$("#loading").show();

	Characters.all()
	.then(function (data) {
		vm.characters = data;

		console.log(data)		

		// for (var j = 0; j < vm.characters.data.length; j++) {
		// 	vm.characters.data[j].books_names = []
		// 	var book_url = vm.characters.data[j].url

		// 	Books.one(book_url.substr(book_url.lastIndexOf('/') + 1))
		// 	.then(function (data) {
		// 		var book_object = data.data;
		// 		var book_object_url = book_object.url
		// 		var book_object_id = book_object_url.substr(book_object_url.lastIndexOf('/') + 1)
				

		// 		console.log (book_object_id)

		// 		for (var i = 0; i < vm.characters.data.length; i++) {
		// 			for (var y = 0; y < vm.characters.data[i].books.length; y++) {
		// 				var character_book_url = vm.characters.data[i].books[y]
		// 				var character_book_id = character_book_url.substr(character_book_url.lastIndexOf('/') + 1)
		// 				console.log(character_book_id)
		// 				console.log(book_object.url)

		// 				if (character_book_id == book_object_id){
		// 					vm.characters.data[i].books_names.push(book_object)
		// 				}
		// 			}
					
					
		// 			console.log(vm.characters.data[i])
		// 		}
		// 	},function (err) {
		// 		console.log(err)
		// 	})
			
		// }
		
	},function (err) {
				console.log(err)
			}). finally(function () {
				$("#loading").hide();
			});

	


})

angular.module ("factories", [])

.factory ('Characters', function ($http) {

 	var charactersFactory = {};

 	charactersFactory.all = function () {
 		return $http.get('https://api.got.show/api/characters');
 	};

 	charactersFactory.all_locations = function () {
 		return $http.get('https://api.got.show/api/characters/locations');
 	};

 	return charactersFactory;
 })

.factory ('Books', function ($http) {
 	var booksFactory = {};

 	booksFactory.all = function () {
 		return $http.get('http://www.anapioficeandfire.com/api/books');
 	};

 	booksFactory.one = function (id) {
 		return $http.get('http://www.anapioficeandfire.com/api/books/'+id);
 	}

 	return booksFactory;
 })

