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
    this.router.post(this.path, this.createCatalog);
    this.router.put(this.path, this.updateCatalog);
  }

  getCatalog = (req: Request, res: Response) => {};

  getAllCatalogs = async (req: Request, res: Response) => {
    const catalogRepo = getManager().getRepository(Catalog);
    const allCatalogs = await catalogRepo.find();
    
    res.render('index', { allCatalogsData: allCatalogs });
  };

  createCatalog = (req: Request, res: Response) => {};
  updateCatalog = (req: Request, res: Response) => {};
}
export default CatalogController;
