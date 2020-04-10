import { Catalog } from './../entity/Catalog';
import * as express from 'express';
import { Request, Response } from 'express';
import IControllerBase from '../interfaces/IControllerBase';
import { getManager } from 'typeorm';

class CatalogController implements IControllerBase {
  public path = '/catalogs';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path + '/:id', this.getCatalog);
    this.router.get(this.path, this.getAllCatalogs);
    this.router.post(this.path, this.saveCatalog);
  }

  getCatalog = (req: Request, res: Response) => {};

  getAllCatalogs = async (req: Request, res: Response) => {
    const catalogRepo = getManager().getRepository(Catalog);
    const allCatalogs = await catalogRepo.find();
    
    res.render('index', { allCatalogsData: allCatalogs });
  };

  // the two in one approach mechanism you've always known
  saveCatalog = async (req: Request, res: Response) => {
    
    const payload = req.body;
    console.log(payload);

    if(payload.id){
      await this.updateCatalog(payload);
    }else{
      await this.createCatalog(payload);
    }
    
    // i did this because i'm using a single page, 
    // and i need all catalog to still display on that page
    return res.redirect('/catalogs');
  }

  createCatalog = async (payload) => {
    console.log("Creating catalog");
    const catalogForCreate = payload;
    const catalogRepo = await getManager().getRepository(Catalog);

    // you have to create a new instance of the catalog entity
    let newCatalog = new Catalog();
    // and this spreads the properties into the entity
    newCatalog = {...catalogForCreate};
    // this finally save the new instance
    return await catalogRepo.save(newCatalog);

  };

  updateCatalog = async (payload) => {
    console.log("Updating catalog");
    const catalogForUpdate = payload;
    const catalogRepo = await getManager().getRepository(Catalog);

    // i'm doing a findone by id ops here
    let catalogInDb = await catalogRepo.findOne(catalogForUpdate.id)

    // then you begin to map, for time sake, i only mapped title
    // so only that can i update, u can do the rest
    catalogInDb.title = catalogForUpdate.title

    // then i call the save method
    // save() in typeorm is wise, if it finds Id, it update,
    // else it create, so u know how it works
    return await catalogRepo.save(catalogInDb);

  };
}
export default CatalogController;
