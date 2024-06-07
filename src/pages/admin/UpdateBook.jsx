import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { useVerifyIfUserIsLogged } from "../Utils/security-utils";



const AdminMangaUpdate = () => {
  useVerifyIfUserIsLogged();

  const { id } = useParams();
  const [book, setBook] = useState(null);

  const [message, setMessage] = useState(null);

  useEffect(() => {
    (async () => {
      const Response = await fetch(`http://localhost:3005/api/books/${id}`);
      const ResponseData = await Response.json();

      setBook(ResponseData.data);
    })();
  }, [id]);

  const handleUpdateBook = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const author = event.target.author.value;
    const language = event.target.language.value;
    const price = event.target.price.value;
    const publication = event.target.publication.value;
    const description = event.target.description.value;
    
    const formData = new FormData();

    // dans mon formdata, je créé un champs title, qui contient le nom issu du champs "title", transformé en json
    formData.append("title", title);
    formData.append("author", author);
    formData.append("language", language);
    formData.append("price", price);
    formData.append("publication", publication);
    formData.append("description", description);
    
    // dans mon formData, je créé un champs file, qui contient le fichier issu du champs image
    formData.append("imageUrl", event.target.image.files[0]);
   
    const token = localStorage.getItem("jwt");

    const updateBookResponse = await fetch(`http://localhost:3005/api/books/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    if (updateBookResponse.status === 201) {
      setMessage("Mise à jour OK");
    } else {
      setMessage("Erreur");
    }
  };

  return (
    <>
      <HeaderAdmin />
      <div className="mangaUpdateBloc">
        <>{message && <p>{message}</p>}</>
        {book && (
          <form  onSubmit={handleUpdateBook}>
            <div>
          <label >
          Title
            <input  type="text" name="title" defaultValue={book.title}/>
          </label>
        </div>
        <div>
          <label className="authorsLab">
          Author
            <input  type="text" name="author" defaultValue={book.author}/>
          </label>
        </div>
        <div>
          <label >
          Language
            <input  type="text" name="language" defaultValue={book.language}/>
          </label>
        </div>
        <div>
          <label >
          Price
            <input  type="text" name="price" defaultValue={book.price}/>
          </label>
        </div>
        <div>
          <label >
          Publication
            <input  type="number" name="publication" defaultValue={book.publication} />
          </label>
        </div>
        <div>
          <label >
          Description
            <input  type="text" name="description" defaultValue={book.description} />
          </label>
        </div>
        <div>
            <label>
              Image
              <input type="file" name="image" />
            </label>
          </div>
            <input  type="submit" />
          </form>
        )}
      </div>
    </>
  );
};

export default AdminMangaUpdate;
