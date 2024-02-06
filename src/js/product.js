import { getParam } from './utils.mjs';
import productDetails from './productDetails.mjs';
import { renderHeader, renderFooter } from './utils.mjs';

renderHeader();
renderFooter();

const productId = getParam('product');
productDetails(productId, '.product-detail');
