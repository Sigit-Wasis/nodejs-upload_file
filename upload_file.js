var http 	= require('http')
var fs 		= require('fs')
var formidable 	= require('formidable')
var mv 		= require('mv')

http.createServer (function (req, res) {

	// Kirim form upload
	if (req.url === "/" && req.method === "GET") {
		// Method untuk membaca file
		fs.readFile("form_upload.html", (err, data) => {
			// Parameter 200 berarti request telah berhasil
			res.writeHead(200, { 'Content-Type': 'text/html' });
			if (err) throw err;
			res.end(data);
		});
	}

	// Upload File
	if (req.url == '/' && req.method === "POST") {
		// Membuat objek form dari formidable
		var form = new formidable.IncomingForm();

		// Menangani upload file
		form.parse(req, function (err, fields, files) {
			var oldpath  = files.filetoupload.path;
			// Tempat menyimpan file dan sesuai namanya
			var newpath  = __dirname + "/uploads/" + files.filetoupload.name;

			// Pindah file yang telah di upload
			mv(oldpath, newpath, function (err) {
				if (err) { throw err; }
				console.log('File uploaded Successfully');
				// Mengakhiri Respon
				return  res.end ("File uploaded Successfully");
			}); 
		});
	}
	// Memberitahu server untuk mendengarkan port 8000
}).listen(8000);

// Untuk memastikan bahwa server telah berjalan
console.log("Server listening on http://localhost:8000");