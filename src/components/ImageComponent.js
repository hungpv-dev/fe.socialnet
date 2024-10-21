
export function showImages(images){
    return (
        <div className="list-images">
            {images.map((image, index) => (
                <div className="column d-flex justify-content-end" key={index}>
                    <img src={image} alt="Image" style={{width: '80%'}} />
                </div>
            ))}
        </div>
    )
}
