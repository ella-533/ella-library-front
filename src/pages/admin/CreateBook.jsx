function CreateBook(){
    
    const handleCreateBook = async(event) =>{
        console.log('createbook');

        event.preventDefault();
        const token = localStorage.getItem('jwt');

        const title = event.target.title.value;
        const author = event.target.author.value;
        const publication=event.target.publication.value;
        const description = event.target.description.value;
        const language = event.target.language.value;
        const price = event.target.price.value;
        const imageUrl = event.target.imageUrl.value;

        const CreateBookData = {
            title , 
            author , 
            publication,
            description,
            language,
            price,
            imageUrl
        };
        const CreateBookDataJson = JSON.stringify(CreateBookData);

        const CreateBookResponse = await fetch("http://localhost:3005/api/books" , { 
            method: "POST" ,
            headers:{
                "Content-Type":"application/json" ,
                "Authorization": `Bearer ${token}`,
            },
            body: CreateBookDataJson ,
        });
        const bookRes = await CreateBookResponse.json();
        console.log(bookRes)
        
    }
    return(
        <>
            <form onSubmit={handleCreateBook}>
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
export default CreateBook;