const express = require('express');
const router = express.Router();
const {
  getVariantsByProduct,
  createVariant,
  getVariantById,
  updateVariant,
  deleteVariant,
} = require('../controllers/productVariantController');

/**
 * Product Variant Routes
 * Nested under product: /api/products/:productId/variants
 * Individual variant: /api/variants/:id
 */
router.get('/products/:productId/variants', getVariantsByProduct);
router.post('/products/:productId/variants', createVariant);
router.get('/variants/:id', getVariantById);
router.put('/variants/:id', updateVariant);
router.delete('/variants/:id', deleteVariant);

module.exports = router;