import { useParams } from "react-router-dom";

function UpdateBook(){
        const { id } = useParams();
        const handleUpdateBook = async(event) =>{
            console.log('updatebook');

        event.preventDefault();
        const token = localStorage.getItem('jwt');

        const title = event.target.title.value;
        const author = event.target.author.value;
        const publication=event.target.publication.value;
        const description = event.target.description.value;
        const language = event.target.language.value;
        const price = event.target.price.value;
        const imageUrl = event.target.imageUrl.value;

        const UpdateBookData = {
            title , 
            author , 
            publication,
            description,
            language,
            price,
            imageUrl
        };
        const UpdateBookDataJson = JSON.stringify(UpdateBookData);

        const UpdateBookResponse = await fetch(`http://localhost:3005/api/books/${id}`, { 
            method: "PUT" ,
            headers:{
                "Content-Type":"application/json" ,
                "Authorization": `Bearer ${token}`,
            },
            body: UpdateBookDataJson ,
        });
        const bookRes = await UpdateBookResponse.json();
        console.log(bookRes)
        
    }
    return(
        <>
            <form onSubmit={handleUpdateBook}>
                <div>
                    <label>
                        Title : 
                        <input type="text" name="title"/>
                    </label>
                </div>
                <div>
                    <label>
                        Author : 
                        <input type="text" name="author"/>
                    </label>
                </div>
                <div>
                    <label>
                        Publication : 
                        <input type="number" name="publication"/>
                    </label>
                </div>
                <div>
                    <label>
                        Description : 
                        <input type="text" name="description"/>
                    </label>
                </div>
                <div>
                    <label>
                        Language : 
                        <input type="text" name="language"/>
                    </label>
                </div>
                <div>
                    <label>
                        Price : 
                        <input type="number" name="price"/>
                    </label>
                </div>
                <div>
                    <label>
                        Picture : 
                        <input type="text" name="imageUrl" />
                    </label>
                    
                </div>
                <input type="submit" />
            </form>
        </>
    )
}
export default UpdateBook;