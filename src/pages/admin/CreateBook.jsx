import { useState } from "react";

import { useVerifyIfUserIsLogged } from "../Utils/security-utils";
import HeaderAdmin from "../../component/admin/HeaderAdmin";

const CreateBook = () => {
  useVerifyIfUserIsLogged();

  const [message, setMessage] = useState(null);

  const handleCreateBook = async (event) => {
    event.preventDefault();

   
    const title = event.target.title.value;
    const author = event.target.author.value;
    const language = event.target.language.value;
    const price = event.target.price.value;
    const publication = event.target.publication.value;
    const description = event.target.description.value;

 

    const formData = new FormData();

    // formData.append("imageUrl", imageUrl);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("language", language);
    formData.append("price", price);
    formData.append("publication", publication);
    formData.append("description", description);
    formData.append("imageUrl", event.target.image.files[0]);

    const token = localStorage.getItem("jwt");

    const createBookResponse = await fetch("http://localhost:3005/api/books", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    if (createBookResponse.status === 201) {
      setMessage("Book créé !");
    } else {
      setMessage("Erreur !");
    }
  };

  return (
    <>
      <HeaderAdmin />
      {message && <p>{message}</p>}
      <form onSubmit={handleCreateBook}>
        
        <div>
          <label>
            title
            <input type="text" name="title" />
          </label>
        </div>
        <div>
          <label>
           author
            <input type="text" name="author" />
          </label>
        </div>
        <div>
          <label>
            language
            <input type="text" name="language" />
          </label>
        </div>
        <div>
          <label>
          price
            <input type="number" name="price" />
          </label>
        </div>
        <div>
          <label>
          publication
            <input type="number" name="publication" />
          </label>
        </div>
        <div>
          <label>
          description
            <textarea name="description"></textarea>
          </label>
        </div>

        <div>
          <label>
            Image
            <input type="file" name="image" />
          </label>
        </div>

        <input type="submit" />
      </form>
    </>
  );
};

export default CreateBook;

