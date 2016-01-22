;(function( $ ) {

    $(function() {
        var sumbitType = "Add";
        var current_index = -1;
        var books = [];
        var booksFromStorage = localStorage.getItem("books");
        var tbodyBooks = $("#tableBooks").find($("#tbodyBooks"));
        var formBook = $('#formBook');
        var submit = formBook.find($("#submit"));

        if (booksFromStorage !== null) {
            books = JSON.parse(booksFromStorage);
            loadBooks();
        }

        function addBook() {
            var book = JSON.stringify({
                author : $("#inputAuthor").val(),
                year   : $("#inputYear").val(),
                title  : $("#inputTitle").val(),
                pages  : $("#inputPages").val()
            });

            books.push(book);
            localStorage.setItem("books", JSON.stringify(books));
        }

        function editBook() {
            books[current_index] = JSON.stringify({
                author  : $("#inputAuthor").val(),
                year  : $("#inputYear").val(),
                title : $("#inputTitle").val(),
                pages : $("#inputPages").val()
            });

            localStorage.setItem("books", JSON.stringify(books));

            submit.html('Создать');
            sumbitType = "Add";
        }

        function loadBooks() {
            tbodyBooks.html("");

            for (var i in books) {

                var book = JSON.parse(books[i]);

                tbodyBooks.append(
                    "<tr>"+
                        "<td>"+ ++i +"</td>"+
                        "<td>"+ book.author +"</td>"+
                        "<td>"+ book.title +"</td>"+
                        "<td><span id=\"delete_" + --i + "\"class=\"fa fa-times\"></span></td>"+
                        "<td><span id=\"edit_" + i + "\"class=\"fa fa-pencil\"></span></td>"+
                    "</tr>"
                );
            }
        }

        submit.click(function(e) {
            e.preventDefault();

            if (sumbitType === "Add") {
                addBook();
            }
            else {
                editBook();
            }

            loadBooks();
            formBook.trigger("reset");
        });

        tbodyBooks.on("click", ".fa.fa-times", function() {
            var id = $(this).attr("id");

            current_index = id.replace("delete_","");
            books.splice(current_index, 1);
            localStorage.setItem("books", JSON.stringify(books));

            formBook.trigger("reset");
            submit.html('Создать');
            loadBooks();
        });

        tbodyBooks.on("click", ".fa.fa-pencil", function() {
            sumbitType = 'Edit';

            var id = $(this).attr("id");

            current_index = id.replace("edit_","");
            var book = JSON.parse(books[current_index]);

            $("#inputAuthor").val(book.author);
            $("#inputYear").val(book.year);
            $("#inputTitle").val(book.title);
            $("#inputPages").val(book.pages);
            submit.html('Изменить');
        });
    });
})( jQuery );
