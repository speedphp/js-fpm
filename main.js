response.redirect("http://www.baidu.com")

response.write(
    '<form action="/cgi/234" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload1" multiple="multiple"><br>'+
    '<input type="file" name="upload2" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
);