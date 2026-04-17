class ImagesProductValidator{
async post(req){
console.log(req.files)
return {
imgs: req.files,
productId: parseInt(req.params.productId)
}
}
}

export default new ImagesProductValidator()