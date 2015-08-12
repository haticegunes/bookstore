var app=angular.module("expoApp", ['ngResource']); //Sunucu ile haberleşmek için yazdık parantez içini (dependency)

app.factory("Book", function($resource) {
  return $resource("/books/:id.json", { id: "@id" },
    {
      create:  { method: 'POST' },
      index:   { method: 'GET', isArray: true },
      get:     { method: 'GET', isArray: false },
      update:  { method: 'PUT' },
      destroy: { method: 'DELETE' }
    }
  );
});

app.controller("ExpoCtrl", ["$scope", "Book", function($scope, Book){
  $scope.books = Book.index(); //get metodu çalışsın diye
	
  $scope.addBook = function(){
  	Book.create({title: $scope.book_title, like: 0}); //sayfa yenilenince bilgiler gitmesin diye
  	$scope.books.push({title: $scope.book_title, like: 0});
  	$scope.book_title = '';
  };

  $scope.likeBook = function(index){
  	book= $scope.books[index];
  	book.like +=1;
  	Book.update({id: book.id, like: book.like})  //böylece likelar sayfa yenilenince gitmiyo aynı kalıyo	
  };

  $scope.deleteBook = function(index) {
  	book= $scope.books[index];
  	Book.destroy(book);
  	$scope.books.splice(index,1); //sayfa yenilenince sildiğimiz geri gelmesin diye böyle yaptık


  }
}]);