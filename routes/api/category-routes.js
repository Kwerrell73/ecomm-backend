const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Catergory.findAll({
    include: [{model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']    
    }]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
       id: req.params.id
      },
    include: [{
      model: Product,
      //include column names separated by commas in the [] below
      attributes: []
    }]
  })
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
 Category.destroy({
  where: {
    id: req.params.id
  }
})
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No catergory found with this id!' });
      return;
    }
    res.json(dbCatergoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
