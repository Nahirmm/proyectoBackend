class ControllerProducts {

    const allProducts = async (req, res) => {
        try {
            const allProducts =  await newContainerProducts.getAllProducts()
            res.status(200).json(allProducts)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = ControllerProducts