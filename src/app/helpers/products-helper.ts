import _ from 'lodash';

export class ProductsHelper {

  public static DEFAULT_STATUS = 'status2';
  public static categoryIds: {[ key: number ]: string} = {
    6: 'Peinture',
    9: 'Photographie',
    5: 'Sculpture',
    23: 'Dessin',
    15: 'Edition'
  };

  public static getSortFunction(id: number): (expo1, expo2) => number {
    switch (id) {
      case 1:
        return (expo1, expo2) => expo1.artwork_title >= expo2.artwork_title ? 1 : -1;
      case 2:
        return (expo1, expo2) => expo1.artwork_title <= expo2.artwork_title ? 1 : -1;
      case 3:
        return (expo1, expo2) => expo1.artwork_price >= expo2.artwork_price ? 1 : -1;
      case 4:
        return (expo1, expo2) => expo1.artwork_price <= expo2.artwork_price ? 1 : -1;
      case 11:
        return (expo1, expo2) => expo1.date_created >= expo2.date_created ? 1 : -1;
      case 13:
        return (expo1, expo2) => expo1.count_followers >= expo2.count_followers ? 1 : -1;
      default:
        return (expo1, expo2) => expo1.date_created >= expo2.date_created ? 1 : -1;
    }
  }

  public static getCategoryById(id: number): string {
    if (_.isNil(id)) { return ProductsHelper.categoryIds[1]; }
    return ProductsHelper.categoryIds[id];
  }

  public static patternMatch = (title, str) => title?.toLowerCase().includes(str?.toLowerCase()) || _.isNil(str);
  public static categoryFilter = (category, idCat) => {
    return (_.isEqual(category, ProductsHelper.getCategoryById(idCat)) || _.isNil(idCat));
  }

  public static priceFilter = (productPrice, interval) => {
    if (_.isNil(interval)) { return true; }
    const [min, max] = interval?.split('-') || [];
    return (_.toInteger(min) <= productPrice && _.toInteger(max) >= productPrice);
  }
}
