
export function showImages(images){
    return (
        <div className="d-flex list-images flex-wrap gap-2">
            {images.map((image) => (
                <img src={image} alt="Image" />
            ))}
        </div>
    )
}
